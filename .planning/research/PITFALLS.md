# PITFALLS — Premium Static Site Upgrade

**Project:** ALANBAU — alanbau.de (Alan Projektmanagement GmbH)
**Stack:** Static Multi-Page HTML · Barlow fonts · vanilla JS (main.js) · Web3Forms
**Last updated:** 2026-05-01

This document answers "what commonly goes wrong?" for five upgrade domains. Each pitfall
is tagged with its relevant phase and a prevention strategy grounded in current sources.

---

## 1. Animation Pitfalls

### 1.1 Layout Thrashing from Scroll Events

**Phase:** Animation upgrade

**What goes wrong:** Using `scroll` event listeners with `getBoundingClientRect()` inside
the handler forces the browser to recalculate layout on every scroll tick. At 60 fps on
mobile, this blocks the main thread and produces visible jank.

**Why it happens:** Developers reach for the scroll event because it's familiar. The DOM
query inside the handler is the trigger — it reads a layout property, which flushes the
layout queue, which then blocks paint.

**Current codebase state:** main.js already uses `IntersectionObserver` for `.reveal`
elements and `{ passive: true }` on the scroll event for the navbar. This is correct.
The only scroll-event handler (`updateNav`) reads `window.scrollY` — safe, no layout
query.

**Prevention:**
- Keep the existing `IntersectionObserver` pattern for all new reveal animations.
- Never put `getBoundingClientRect()`, `offsetTop`, or `scrollTop` inside a live scroll
  handler. Batch reads with `requestAnimationFrame` if necessary.
- Only animate `transform` and `opacity`. These properties are composited on the GPU and
  do not trigger layout or paint.

**Warning signs:** Chrome DevTools Performance tab shows long purple "Layout" bars
during scroll; "Forced reflow" warnings in console.

[VERIFIED: IntersectionObserver pitfall documented at thelinuxcode.com and peerlist.io]

---

### 1.2 Animating Layout-Affecting Properties

**Phase:** Animation upgrade

**What goes wrong:** Animating `width`, `height`, `top`, `left`, `margin`, or `padding`
forces layout recalculation on every frame. On low-end Android devices (still ~30% of
the global market) this drops below 60 fps immediately.

**Why it happens:** The "paint storm" — every frame triggers layout, which triggers
paint, which triggers composite. Three pipeline stages instead of one.

**Prevention:**
- Use `transform: translateX/Y/scale()` instead of positional properties.
- Use `opacity` for fade effects, not `visibility` changes.
- The current `.reveal` system (`transform: translateY(32px) → none`) is already correct.

**Properties that are GPU-composited (safe to animate):** `transform`, `opacity`,
`filter` (with caveats).

**Properties that trigger layout (never animate):** `width`, `height`, `top`, `left`,
`right`, `bottom`, `margin`, `padding`, `border-width`.

[VERIFIED: smashingmagazine.com/2016/12/gpu-animation-doing-it-right,
viget.com/articles/animation-performance-101]

---

### 1.3 Missing or Incomplete `prefers-reduced-motion`

**Phase:** Animation upgrade

**What goes wrong:** Users with vestibular disorders, epilepsy, or motion sensitivity
rely on the OS-level "Reduce Motion" setting. If the site ignores it, parallax effects,
hero fade-ins, and card tilts cause real physical discomfort.

**WCAG compliance level:** SC 2.3.3 "Animation from Interactions" is Level AAA. While
AAA is not legally required in most jurisdictions, WCAG 2.2 SC 2.2.2 (Level A) covers
auto-playing, looping content — which includes the hero video. Failing Level A is a
genuine accessibility violation.

**Current codebase state:** main.css line 1649 has the correct pattern:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .hero-eyebrow, .hero-title, .hero-sub, .hero-ctas {
    opacity: 1; transform: none; animation: none;
  }
}
```
This is the right approach. The gap: the hero **video** is not paused/hidden under
reduced motion. `<video autoplay loop>` will still play.

**Prevention — what to add:**
```css
@media (prefers-reduced-motion: reduce) {
  .hero-bg { display: none; } /* or: animation-play-state: paused; */
}
```
Or in JS:
```js
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelector('.hero-bg')?.pause();
}
```

**Animation types that MUST be suppressible:**
- Parallax effects (any background-moves-at-different-rate)
- Infinite looping animations (`scrollPulse` in the current codebase)
- Auto-advancing carousels
- Animated backgrounds / hero video

**Animation types that are exempt:** Opacity/color changes, essential UI transitions
(dropdown open/close), the scroll indicator that the user actively controls.

[CITED: w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html,
css-tricks.com/accessible-web-animation-the-wcag-on-animation-explained/]

---

### 1.4 `will-change` Overuse on Mobile

**Phase:** Animation upgrade

**What goes wrong:** Adding `will-change: transform` to many elements at once creates
one GPU texture layer per element. On a mid-range phone with 2 GB RAM, loading 12 project
cards + 6 service cards + nav + hero video simultaneously can exhaust GPU memory and
crash the browser tab.

**Why it happens:** Developers apply `will-change` globally as a "performance fix"
without understanding it pre-allocates memory.

**Prevention:**
- Apply `will-change` only to elements that are actively about to animate (add it in
  `mouseenter` JS, remove it on `transitionend`).
- Never apply it in a CSS rule that matches many elements (`.project-card { will-change: transform }` = bad).
- The current codebase does not use `will-change` — this is correct.
- Limit to 1-2 elements per page at any given time.

[VERIFIED: smashingmagazine.com GPU animation article, dev.to GPU compositing article]

---

### 1.5 Stagger Delay Exceeding Duration (Cheap Feel)

**Phase:** Animation upgrade

**What goes wrong:** When a stagger delay (e.g., 200 ms between each card) is longer
than or equal to the animation duration (e.g., 300 ms), each element appears to fully
complete before the next starts. The result looks like a slideshow, not a cascade. This
is the single most common "cheap" animation pattern.

**Current codebase:** Hero text stagger goes 0.3s → 0.5s → 0.7s → 0.9s with 0.8s
duration. The overlap is thin. This works for the hero because elements are large and
the user is watching. For list items (service cards, project cards) the delays will need
to be tighter.

**Premium stagger formula:**
- Duration: 400-500 ms for list item reveals
- Delay increment: 60-80 ms per item (not 200 ms)
- Max total stagger for a 6-item list: ~400 ms additional delay on last item
- Easing: `ease-out` (fast start, slow end) for elements entering the viewport

**Duration sweet spots (NNG research):**
| Transition type | Duration |
|---|---|
| Simple hover feedback | 100-150 ms |
| Button press / micro-interaction | 150-200 ms |
| Modal / panel open | 200-300 ms |
| Page section reveal (scroll) | 400-600 ms |
| Anything over 500 ms | Feels like a delay |

[CITED: nngroup.com/articles/animation-duration/]

---

### 1.6 What NOT to Animate

**Phase:** Animation upgrade

**Avoid animating these on construction/B2B sites:**

| Element | Why |
|---|---|
| CTA buttons (loop/pulse) | Draws attention away from the button label — distraction kills conversion on task-focused users |
| Navigation links | Users are in goal-directed mode, animation adds latency |
| Price/stat counters that weren't asked for | Delays information transfer, confuses meaning |
| Entire page sections sliding in from off-screen | On mobile, causes horizontal scrollbar flash and CLS |
| Background parallax on mobile | Expensive paint, disorienting on small screens |

**Animations that help conversion on B2B sites:**
- Subtle hover state on CTAs (translateY(-2px) + shadow) — acknowledges cursor is on target
- Scroll reveal that reduces cognitive load (items appearing rather than a wall of text)
- Modal entrance (cubic-bezier bounce confirms "action worked")

[CITED: nngroup.com/articles/animation-duration/ — "oversized, slow animations feel like delays";
medium.com/@R.H_Rizvi/why-your-beautiful-web-animations-are-killing-conversions]

---

## 2. i18n Pitfalls

### 2.1 Duplicate Content Without Canonical / hreflang

**Phase:** i18n / language toggle

**What goes wrong:** Adding a `/en/` folder with translated HTML copies creates
duplicate content. Without `hreflang` tags, Google treats them as competing pages and
may penalise both. A 2024 study by Ahrefs found 67% of multilingual sites have hreflang
implementation errors.

**Prevention for static HTML:**
Every page pair must carry hreflang annotations in `<head>`:
```html
<!-- On the German page (index.html) -->
<link rel="alternate" hreflang="de" href="https://www.alanbau.de/index.html">
<link rel="alternate" hreflang="en" href="https://www.alanbau.de/en/index.html">
<link rel="alternate" hreflang="x-default" href="https://www.alanbau.de/index.html">

<!-- On the English page (en/index.html) — MUST reciprocate -->
<link rel="alternate" hreflang="de" href="https://www.alanbau.de/index.html">
<link rel="alternate" hreflang="en" href="https://www.alanbau.de/en/index.html">
<link rel="alternate" hreflang="x-default" href="https://www.alanbau.de/index.html">
```

**The reciprocal link requirement is non-negotiable.** If EN page does not point back
to DE page, the hreflang signal is ignored by Google.

**Use absolute URLs in hreflang** — relative paths break the signal entirely.

[VERIFIED: searchengineland.com hreflang guide, indexrusher.com/blog/hreflang-tag-seo-guide]

---

### 2.2 Incorrect ISO Codes

**Phase:** i18n / language toggle

**What goes wrong:** `hreflang="en-UK"` is invalid. The correct code is `en-GB`.
`hreflang="de-DE"` is correct. Using wrong codes means Google ignores the tag silently
— no error is shown, but the multilingual targeting fails.

**Correct codes for this project:**
| Locale | Correct code |
|---|---|
| German (Germany) | `de-DE` or just `de` |
| English (international) | `en` |
| English (UK) | `en-GB` |
| English (US) | `en-US` |

**`x-default`** must be included and should point to the language-selection page or the
primary language (German for alanbau.de).

[VERIFIED: cognitiveseo.com/blog/17150/multi-language-website-mistakes/]

---

### 2.3 Form Validation Messages Stay in Wrong Language

**Phase:** i18n / language toggle

**What goes wrong:** Native browser `required`, `type="email"`, and `minlength`
validation messages are rendered by the browser in its own language — not the page
language. A German-language user on an English-locale Chrome will see English error
messages even on the German page. Worse, if you add an EN page but the JS-driven
error messages in main.js are hardcoded in German, EN users see German errors.

**Current codebase exposure:** main.js form handler uses fetch/Web3Forms and shows:
- Success: `successMsg.style.display = 'block'` (text in HTML, currently German)
- Error: `errorMsg.style.display = 'block'` (text in HTML, currently German)

**Prevention:**
- Replace native HTML5 validation with custom JS validation — gives full control over
  error message strings.
- Or: use the `setCustomValidity()` API to override browser messages:
  ```js
  field.setCustomValidity(locale === 'en' ? 'Required' : 'Pflichtfeld');
  ```
- The `#form-success` and `#form-error` elements in HTML must have language variants or
  be populated from a JS translation object keyed to the current locale.

[VERIFIED: phrase.com/blog/posts/localized-form-validation/]

---

### 2.4 Mixed-Language Pages During Translation Gaps

**Phase:** i18n / language toggle

**What goes wrong:** A page is 95% translated but the schema.org JSON-LD `"name"` and
`"description"` fields, the `<title>`, `<meta name="description">`, and OG tags remain
in German on the English version. This creates:
- Mixed-language signals confusing search engines
- Screen readers announcing German text mid-English document
- Broken social sharing previews for EN users

**Prevention checklist per page when adding EN version:**
- [ ] `<html lang="en">`
- [ ] `<title>` translated
- [ ] `<meta name="description">` translated
- [ ] All `<meta property="og:*">` translated
- [ ] Schema.org JSON-LD `"name"`, `"description"`, and `"areaServed"` localized
- [ ] Alt text on all images translated
- [ ] Footer copyright + company tagline translated

**Warning sign:** Run page through Google Rich Results Test — if you see German strings
on the EN version, the schema wasn't updated.

[ASSUMED — based on standard i18n practice for static HTML; verification pattern
confirmed by seobility.net/en/blog/multilingual-seo-issues/]

---

### 2.5 `lang` Toggle Losing Page State

**Phase:** i18n / language toggle

**What goes wrong:** The simplest language toggle (`<a href="/en/index.html">EN</a>`) 
navigates to the root of the EN section, losing any anchor position or filter state the
user was in. If a user was reading the "Hochtiefbau" section and clicks DE→EN, they land
at the top of the EN page.

**Prevention:**
- Store the current page path and build the counterpart URL programmatically:
  ```js
  // On DE page: /leistungen.html → /en/leistungen.html
  const lang = 'en';
  const current = window.location.pathname;
  const counterpart = `/${lang}${current}`;
  ```
- Use `sessionStorage` to preserve scroll position and re-apply after navigation.

[ASSUMED — standard static site i18n pattern, no single authoritative source]

---

## 3. PageSpeed / Core Web Vitals Pitfalls

### 3.1 Hero Video Killing LCP

**Phase:** PageSpeed / performance optimization

**What goes wrong:** A `<video autoplay loop muted>` with no `poster` attribute means
the browser has to decode the first video frame before there is any LCP candidate. A
1 MB MP4 hero video can produce LCP of 4-6 seconds on mobile — well into the "Poor"
range (>4.0 s).

**Current codebase state:** index.html line 128 has:
```html
<video class="hero-bg" autoplay loop muted playsinline
       aria-hidden="true" poster="./assets/images/bauprojekt.jpg">
```
The `poster` attribute is present. **This is correct.** The risk is if `bauprojekt.jpg`
is not optimised or is large.

**Full prevention checklist:**
- [ ] Poster image must be WebP, not JPEG, at exact viewport dimensions
- [ ] Poster file size: target < 80 KB for above-fold image
- [ ] Add `fetchpriority="high"` to the poster preload link:
  ```html
  <link rel="preload" as="image" fetchpriority="high"
        href="./assets/images/bauprojekt.webp">
  ```
- [ ] The poster image path must exactly match the `poster=""` attribute (case-sensitive)
- [ ] Never use `loading="lazy"` on the hero `<video>` or its poster
- [ ] The video itself does NOT need a preload link — let it load after poster is painted

**Background image trap:** If you use CSS `background-image` for the hero instead of an
`<img>` or `<video poster>`, the browser cannot discover the image during HTML parse —
it must execute CSS first. This delays LCP by 200-400 ms.
[Verified: corewebvitals.io "hero images should be normal images and never background images"]

**Google data point:** Only 17% of pages set `fetchpriority="high"` on their LCP image.
The Google Flights team added it and saw LCP improve by 700 ms.
[CITED: almanac.httparchive.org/en/2025/performance]

[CITED: debugbear.com/blog/optimize-video-lcp]

---

### 3.2 Google Fonts Blocking Render / CLS from FOUT

**Phase:** PageSpeed / performance optimization

**What goes wrong:** The current implementation in index.html:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow...&display=swap">
```
The `display=swap` parameter is present — this prevents FOIT (invisible text). However
FOUT (flash of unstyled text) still causes CLS if the fallback system font has different
metrics than Barlow/Barlow Semi Condensed.

**What good looks like:**
1. `display=swap` — already done (prevents FOIT)
2. Add `size-adjust`, `ascent-override`, `descent-override` for fallback font to match
   Barlow metrics and eliminate CLS:
   ```css
   @font-face {
     font-family: 'Barlow-fallback';
     src: local('Arial');
     ascent-override: 90%;
     descent-override: 22%;
     line-gap-override: 0%;
     size-adjust: 104%;
   }
   ```
3. Declare the fallback in `font-family` stacks before the Google Font loads.

**Alternative (for highest PageSpeed on Hostinger):** Self-host the Barlow fonts as
`.woff2` files in `assets/fonts/`. Eliminates the Google Fonts DNS/TCP round-trip
entirely. Downside: manual update when fonts change.

**Warning sign:** Lighthouse "Ensure text remains visible during webfont load" audit
flagging non-swap fonts; CLS score above 0.1 in Chrome DevTools.

[CITED: developer.chrome.com/docs/lighthouse/performance/font-display,
debugbear.com/blog/web-font-layout-shift]

---

### 3.3 Third-Party Scripts Blocking INP / TBT

**Phase:** PageSpeed / performance optimization

**What goes wrong:** Web3Forms submits via fetch (fine — not blocking). However if
analytics, tag managers, or chat widgets are added later without `async`/`defer`, they
block the main thread during parse and inflate Total Blocking Time (TBT) and INP.

**Current codebase state:** main.js is loaded without `async` or `defer`. As a
synchronous render-blocking script at the end of `<body>` it is currently acceptable
(browser has already rendered visible content). But if the script grows or additional
third-party tags are added to `<head>`, this becomes a problem.

**Prevention rules:**
- All non-critical third-party scripts (analytics, chat, heatmaps): load with `defer`
- Scripts with no DOM dependency: load with `async`
- Web3Forms form submission is already fetch-based and non-blocking — no change needed
- Any future analytics script: load with `defer` and place at end of `<body>`
- If Google Tag Manager is added: expect 200-400 ms TBT penalty; mitigate with lazy
  loading GTM after first user interaction

**Main thread threshold:** Blocking for >250 ms is reported as an issue by PageSpeed
Insights. A single undeferred analytics script typically costs 80-300 ms.

[CITED: web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript]

---

### 3.4 Realistic PageSpeed 90+ Benchmark for This Site

**Phase:** PageSpeed / performance optimization

**The honest picture:** A site with a hero background video will not achieve PageSpeed
100 on mobile. The question is whether it can hit 90+.

**Achievable targets with current stack:**
| Metric | Target | Risk factor |
|---|---|---|
| LCP (mobile) | < 2.5 s | Hero poster image size |
| INP | < 200 ms | Unlikely issue with vanilla JS |
| CLS | < 0.1 | Font swap, image aspect ratios |
| TBT | < 300 ms | Third-party scripts |
| Overall PSI mobile | 75-85 | Video always costs |
| Overall PSI desktop | 90-95 | Achievable with poster optimisation |

**What Google actually uses for ranking:** Field data (Core Web Vitals from real users),
not the Lighthouse lab score. A mobile score of 75 with good real-user LCP/INP/CLS
performs as well in rankings as a 95 score.

**John Mueller (Google):** "The overall Lighthouse score is not a ranking factor."

**Priority order for maximising real-user CWV:**
1. Poster image: WebP, < 80 KB, `fetchpriority="high"` preload
2. Font: add `display=swap` fallback metrics overrides to eliminate CLS
3. Images: all below-fold images have `loading="lazy"` (already in CLAUDE.md rules)
4. CSS: currently a single file (~44 KB) — acceptable, no splitting needed
5. JS: currently ~11 KB — fine for Hostinger shared hosting

[CITED: tinyfrog.com/reasonable-site-speed-score,
developers.google.com/speed/docs/insights/v5/about]

---

## 4. Static Blog Pitfalls

### 4.1 Nav/Footer Duplication Maintenance Explosion

**Phase:** Blog / content expansion

**What goes wrong:** Adding a blog to the current 8-page site creates a maintenance
burden that grows with every new post. If the nav gains a new link (e.g., "Blog" item),
it must be updated in every existing HTML file AND every new blog post file. With 50
blog posts, one nav change = 58 file edits.

**Why it happens:** Static HTML has no native include mechanism. HTML Imports were
deprecated. Each `.html` file owns its complete DOM.

**Prevention options (in order of fit for this project):**

| Approach | Effort | Fit |
|---|---|---|
| JS `fetch()` include for nav + footer | Low | Good for < 100 pages |
| Eleventy / 11ty static site generator | Medium | Best long-term if blog grows |
| PHP `include` on Hostinger | Zero build step | Works on Hostinger shared PHP server |
| Handlebars/Nunjucks via simple build script | Medium | No server requirement |

**Lowest friction for Hostinger shared hosting:** The server runs PHP. A `.html` → `.php`
rename enables `<?php include 'nav.php'; ?>` with zero build step. The URL stays clean
if `.htaccess` strips the `.php` extension.

**Important:** The current CLAUDE.md rule ("Statisches Multi-Page HTML — kein React,
kein SPA, kein Build-Step") was written for the current 8 pages. A blog makes this
constraint expensive at 20+ posts. Escalate this decision before building the blog.

[ASSUMED — tradeoff analysis from general static site knowledge; PHP include pattern
confirmed by htmlcenter.com/blog/creating-a-headerfooter-to-be-used-on-all-pages/]

---

### 4.2 Broken Internal Links as Site Grows

**Phase:** Blog / content expansion

**What goes wrong:** Blog posts reference `../leistungen.html#projektmanagement`. When
the blog is restructured from `/blog/post-title.html` to `/blog/2026/post-title.html`,
all relative links break silently. No build-time checker catches them.

**Prevention:**
- Use root-relative links everywhere: `/leistungen.html` not `../leistungen.html`
- Run a link-check script before every deployment:
  ```bash
  npx broken-link-checker http://localhost:8080 --recursive
  ```
- Add a `404.html` page that logs the broken URL (client-side) to catch production breaks

[ASSUMED — standard static site link hygiene; broken-link-checker npm package verified
to exist via npm registry]

---

### 4.3 Sitemap.xml Not Updated for Blog Posts

**Phase:** Blog / content expansion

**What goes wrong:** The current sitemap.xml (8 entries, manually maintained) will not
auto-update when blog posts are added. New posts remain undiscovered by Google Search
Console until the sitemap is manually updated. In busy periods, this maintenance step
gets skipped, and content goes unindexed for weeks.

**Current sitemap.xml state:** Static file, ~2 KB, 8 entries. Must be manually edited
for every new page.

**Prevention:**
- For a small blog (< 50 posts): add a task to the content publishing checklist to
  update sitemap.xml and ping Google:
  ```
  https://www.google.com/ping?sitemap=https://www.alanbau.de/sitemap.xml
  ```
- For a growing blog: generate sitemap.xml from a JS script at build time
- Minimum entry per blog post:
  ```xml
  <url>
    <loc>https://www.alanbau.de/blog/post-title.html</loc>
    <lastmod>2026-05-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  ```

[CITED: trysight.ai/blog/how-to-automate-sitemap-updates,
yoast.com/help/xml-sitemap-errors/]

---

### 4.4 OG Image Not Set Per Blog Post

**Phase:** Blog / content expansion

**What goes wrong:** Blog posts without individual `og:image` tags inherit the site-
level OG image (bauprojekt.jpg). All blog post links shared on LinkedIn/XING look
identical. Engagement drops significantly vs. post-specific images.

**Prevention:** Every blog post template must include:
```html
<meta property="og:image" content="https://www.alanbau.de/assets/blog/[slug]-og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```
OG images: 1200×630 px, JPEG or WebP, < 300 KB.

[ASSUMED — standard OG practice; dimensions from official OG protocol spec]

---

## 5. Premium Animation Specifics

### 5.1 Easing: The Single Biggest Quality Signal

**Phase:** Animation upgrade

**The rule:**
| Motion type | Correct easing | Why |
|---|---|---|
| Element enters screen | `ease-out` | Fast arrival, slow settle — eye tracks easily |
| Element exits screen | `ease-in` | Accelerates away — feels intentional |
| UI feedback (button press, hover) | `ease-out` or `cubic-bezier(0.34,1.56,0.64,1)` | Spring feel, confirms action |
| Modal entrance | `cubic-bezier(0.34,1.56,0.64,1)` | Slight overshoot = premium feel |
| Infinite loops (scrollPulse indicator) | `ease-in-out` | Smooth, non-mechanical |
| **Never use** `linear` | — | Looks robotic and artificial |

**Current codebase:** The `.svc-modal` uses `cubic-bezier(0.34,1.56,0.64,1)` (line 852
in main.css). This is correct and premium. The `.reveal` class uses generic `ease` —
switching to `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) would improve the premium feel.

[CITED: nngroup.com/articles/animation-duration/,
smashingmagazine.com/2021/04/easing-functions-css-animations-transitions/]

---

### 5.2 Duration Anti-Patterns

**Phase:** Animation upgrade

**What makes animations feel cheap:**

| Duration | Problem |
|---|---|
| > 600 ms for any reveal | Feels like a loading delay, not a design choice |
| < 80 ms for modal close | Disappears too fast to register as intentional |
| Same duration for everything | Looks mechanical — size/importance should vary duration |
| Hero text reveal total > 1.5 s | Users see incomplete page and scroll past |

**Current codebase:** Hero text stagger: 0.3s, 0.5s, 0.7s, 0.9s. Last element
appears fully at 0.9s + 0.8s = 1.7s. This is at the edge — borderline too slow on
mobile where user may scroll before the last line renders. Consider reducing to
0.2s, 0.35s, 0.5s, 0.65s (last element complete at 1.15s).

**Section reveals:** Current `.reveal` uses 0.7s. Acceptable. Would feel more premium
at 0.55s.

[CITED: nngroup.com/articles/animation-duration/ — "500ms+ starts to feel like a drag"]

---

### 5.3 Stagger Patterns That Feel Cheap vs Premium

**Phase:** Animation upgrade

**Cheap stagger:** Uniform delay increment, same easing, same distance.
```css
/* Cheap — all identical, just delayed */
.card:nth-child(2) { transition-delay: 100ms; }
.card:nth-child(3) { transition-delay: 200ms; }
.card:nth-child(4) { transition-delay: 300ms; }
```

**Premium stagger:** Decreasing increment (fast cascade start), eased delay distribution:
```css
/* Premium — accelerating cascade, feels organic */
.card:nth-child(1) { transition-delay: 0ms; }
.card:nth-child(2) { transition-delay: 60ms; }
.card:nth-child(3) { transition-delay: 110ms; }
.card:nth-child(4) { transition-delay: 150ms; }
.card:nth-child(5) { transition-delay: 180ms; }
.card:nth-child(6) { transition-delay: 200ms; } /* flattens out */
```
The delay increments shrink (60, 50, 40, 30, 20) — mimicking how a physical cascade
would accelerate. Much more natural than uniform increments.

**CSS custom property version (cleaner):**
```css
.card { --i: 0; transition-delay: calc(var(--i) * 60ms); }
.card:nth-child(1) { --i: 0; }
.card:nth-child(2) { --i: 1; }
/* etc. */
```

[CITED: css-tricks.com/staggering-animations/,
frontendmasters.com/blog/staggered-animation-with-css-sibling-functions/]

---

### 5.4 The 3D Tilt Card Trap on Mobile

**Phase:** Animation upgrade

**What goes wrong:** The current `.tilt-card` in main.js uses `mousemove` — this is
a desktop-only interaction. On touch devices, `mousemove` does not fire during scroll.
However `touchmove` can fire during a tap gesture, causing the card to briefly snap to
a tilt position and snap back — a jarring micro-glitch.

**Additional risk:** `perspective()` and `rotateY/X` on many cards simultaneously
creates multiple GPU compositing layers. On a low-end Android with 8-10 project cards
visible, this can cause visible stutter.

**Prevention:**
```js
// Only attach tilt on non-touch devices
if (!window.matchMedia('(hover: none)').matches) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    // ... existing tilt logic
  });
}
```

**Also:** Reset `card.style.transform = ''` must use a `transition` back to identity,
not an instant snap. The current mouseleave handler sets `transform = ''` immediately —
this causes a visible jump. Add `transition: transform 0.4s ease-out` to `.tilt-card`
in CSS.

[VERIFIED: javascript mobile animations article at blog.developerareeb.com]

---

## Summary: Priority by Phase

| Pitfall | Severity | Phase | Effort to Fix |
|---|---|---|---|
| Hero video poster not preloaded (`fetchpriority`) | HIGH | Phase 1 PageSpeed | 1 line HTML |
| `prefers-reduced-motion` missing video pause | HIGH | Phase 1 Animation | 3 lines CSS/JS |
| Stagger delay too long (hero text) | MEDIUM | Phase 1 Animation | 2 numbers in CSS |
| Font FOUT causing CLS | MEDIUM | Phase 1 PageSpeed | `size-adjust` CSS |
| Tilt card on mobile (mousemove touch glitch) | MEDIUM | Phase 1 Animation | 3 lines JS |
| Nav/footer duplication for blog | HIGH | Phase 3 Blog | Architecture decision |
| Sitemap not updating for blog posts | MEDIUM | Phase 3 Blog | Process checklist |
| hreflang reciprocal links missing | HIGH | Phase 2 i18n | Per-page HTML |
| Form error messages in wrong language | MEDIUM | Phase 2 i18n | JS translation object |
| `will-change` overuse on mobile | LOW | Phase 1 Animation | Don't add it |

---

## Sources

### HIGH confidence (verified via official docs or tool)
- [W3C — SC 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [W3C — C39: prefers-reduced-motion technique](https://www.w3.org/WAI/WCAG21/Techniques/css/C39)
- [Chrome for Developers — font-display](https://developer.chrome.com/docs/lighthouse/performance/font-display)
- [DebugBear — Optimize Video LCP](https://www.debugbear.com/blog/optimize-video-lcp)
- [web.dev — Third-party JavaScript](https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript)
- [CoreWebVitals.io — hero images never background-image](https://www.corewebvitals.io/pagespeed/fix-slow-hero-images-core-web-vitals)
- [HTTP Archive Web Almanac 2025 — Performance](https://almanac.httparchive.org/en/2025/performance)

### MEDIUM confidence (multiple corroborating sources)
- [NNG — Animation Duration](https://www.nngroup.com/articles/animation-duration/)
- [CSS-Tricks — Accessible Web Animation](https://css-tricks.com/accessible-web-animation-the-wcag-on-animation-explained/)
- [CSS-Tricks — Staggering Animations](https://css-tricks.com/staggering-animations/)
- [Smashing Magazine — GPU Animation](https://smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
- [DebugBear — Web Font Layout Shift](https://www.debugbear.com/blog/web-font-layout-shift)
- [Ahrefs stat: 67% of multilingual sites have hreflang errors — cited in indexrusher.com](https://indexrusher.com/blog/hreflang-tag-seo-guide-best-practices-2024/)
- [Phrase — Localized Form Validation](https://phrase.com/blog/posts/localized-form-validation/)

### LOW confidence (assumed or single source)
- Nav/footer PHP include pattern for Hostinger — `[ASSUMED]` based on Hostinger PHP support
- Language toggle page-state preservation — `[ASSUMED]` standard pattern
- OG image per blog post — `[ASSUMED]` from OG protocol standard practice
