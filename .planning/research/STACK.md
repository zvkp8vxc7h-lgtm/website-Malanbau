# Stack Research: Premium Static HTML — alanbau.de

**Researched:** 2026-05-01  
**Domain:** Vanilla JS + CSS, Static Multi-Page HTML, No Build Step  
**Confidence:** HIGH (core recommendations verified via npm registry and official docs)

---

## Project Constraints (from CLAUDE.md)

These directives are non-negotiable and constrain all recommendations below:

- Static Multi-Page HTML — no React, no SPA, no build step
- Deployable on Hostinger Shared Hosting
- No base64 in HTML (images, fonts, video)
- No inline JavaScript — event handlers belong in `main.js`
- One H1 per page, no heading hierarchy jumps
- Labels on all form fields — no placeholder-as-label
- `loading="lazy"` on all non-above-fold `<img>` elements
- `rel="noopener noreferrer"` on all `target="_blank"` links
- No hardcoded `px` font sizes — use `clamp()` or `rem`

---

## Summary

This document answers four research questions for planning the next improvement phase of
alanbau.de: scroll animations, language toggle, image/video optimization, and blog architecture.
All are evaluated strictly within the constraint of static HTML with no build step, deployed
to shared hosting.

The primary recommendation across all four areas is: **favor native browser capabilities
over libraries wherever the complexity budget allows.** The Intersection Observer API + CSS
is sufficient for corporate site reveals. Separate `/en/` HTML pages with hreflang tags is
the only approach that is SEO-clean. WebP conversion via `npx` one-liner (Node 25 is
available) is the right workflow. A flat-file blog with a hand-maintained `feed.xml` is
appropriate for the low-volume content a Bauunternehmen actually produces.

---

## 1. Animation Libraries

### Decision Summary

**Recommendation: Pure Intersection Observer + CSS transitions (zero dependencies)**  
**Fallback for complex sequences: GSAP 3.15 via CDN**

### Verified Library Versions

| Library | Latest Version | Source |
|---------|---------------|--------|
| GSAP | 3.15.0 | [VERIFIED: npm registry — `npm view gsap version`] |
| Motion | 12.38.0 | [VERIFIED: npm registry — `npm view motion version`] |
| AOS | 2.3.4 | [VERIFIED: npm registry — `npm view aos version`] |

### Comparison

#### Option A: Pure Intersection Observer + CSS Animations

**Weight:** 0 KB (native browser API, no CDN dependency)  
**Suitable for:** Fade-in, slide-up, scale reveals triggered by scroll entry  
**Not suitable for:** Scrubbing (animating based on scroll position), pinning, complex timelines

```javascript
// Pattern for main.js — zero dependencies
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // fire once
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

```css
/* CSS side — define initial + animated states */
[data-animate] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Accessibility: respect reduced-motion preference */
@media (prefers-reduced-motion: reduce) {
  [data-animate] { transition: none; opacity: 1; transform: none; }
}
```

**Verdict:** Best choice for alanbau.de. A corporate construction site needs section reveals,
stat counters animating, and card entrances — all achievable with this pattern. Zero CDN
dependency means zero failure risk on Hostinger shared hosting.

[CITED: https://alxwntr.com/animations-with-the-intersection-observer-api-2024/]  
[CITED: https://www.w3.org/WAI/WCAG21/Techniques/css/C39 — prefers-reduced-motion]

---

#### Option B: GSAP 3.15 (Free Tier) via CDN

**Weight:** ~67 KB minified (~24 KB gzip for core + ScrollTrigger)  
**License:** Fully free since Webflow acquisition of GSAP in 2024, including all bonus plugins
(SplitText, MorphSVG, ScrollTrigger) [VERIFIED: npm registry + gsap.com]  
**CDN:** `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/gsap.min.js`  
**ScrollTrigger CDN:** `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/ScrollTrigger.min.js`

**Suitable for:** Scroll-scrubbed animations (parallax, reveal-as-you-scroll), staggered
timelines, pinned sections, number counters  
**Not suitable (overkill):** Simple fade-in reveals

GSAP handles debounced scroll events, pre-calculated intersection points, and throttled resize
recalculations internally — it outperforms manually tuned Intersection Observer for sequences
involving more than 3 coordinated elements. [CITED: https://www.clcreative.co/blog/should-you-use-the-intersection-observer-api-or-gsap-for-scroll-animations]

**Verdict:** Add only if the design calls for scroll-scrubbed parallax or staggered counter
animations. The free tier is genuinely unlimited since 2024.

---

#### Option C: AOS (Animate on Scroll) v2.3.4

**Weight:** ~8 KB gzip  
**CDN:** `https://unpkg.com/aos@2.3.4/dist/aos.js` + `aos.css`  
**Maintenance status:** Last major release 2.3.1 (2018), minor patch 2.3.4. The GitHub
repository (github.com/michalsnik/aos) has not seen substantive commits in years.
[VERIFIED: npm registry]

**Verdict:** Do not use. AOS is effectively unmaintained. It causes Cumulative Layout Shift
(CLS) issues (documented HubSpot community reports) and has known performance issues on
pages with many elements. The data-attribute API is convenient but not worth the debt.
The Intersection Observer pattern above is a drop-in replacement for everything AOS offers.

---

#### Option D: Motion 12.38 (Web Animations API wrapper)

**Weight:** 2.3 KB for the mini `animate()` function; full bundle is larger  
**CDN (ESM):** `import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@12.38.0/+esm"`  
**CDN (global):** `https://cdn.jsdelivr.net/npm/motion@12.38.0/dist/motion.js`

Motion (formerly Motion One, now merged with Framer Motion) uses the Web Animations API
for hardware acceleration. The ESM import pattern works in `<script type="module">` without
a build step. [CITED: https://motion.dev/docs/quick-start]

**Verdict:** Technically sound but designed for React-first workflows. The documentation
and community patterns are React-oriented. For a vanilla static HTML site, it adds cognitive
overhead without advantages over GSAP. If the team is already using Motion elsewhere,
pin to `@12.38.0` — never use `@latest` in production CDN URLs.

---

### Final Recommendation for alanbau.de

| Use Case | Tool |
|----------|------|
| Section reveals (fade, slide-up) | Intersection Observer + CSS |
| Counter animations (numbers counting up) | Intersection Observer + vanilla JS |
| Parallax or scroll-scrubbed effects | GSAP 3.15 + ScrollTrigger via CDN |
| Anything AOS was being used for | Intersection Observer + CSS (replace) |

Do NOT add AOS. Do NOT add Motion unless there is a specific React integration need.

---

## 2. DE/EN Language Toggle

### Decision Summary

**Recommendation: Separate `/en/` HTML pages with hreflang tags in `<head>`**

This is the only approach that is fully SEO-clean, requires no JavaScript for indexing,
and works on static shared hosting without a server-side layer.

### Approach Comparison

#### Option A: Separate `/en/` HTML pages + hreflang (RECOMMENDED)

**How it works:**
- German pages at root: `index.html`, `leistungen.html`, etc.
- English pages in subfolder: `en/index.html`, `en/services.html`, etc.
- Both sets include reciprocal hreflang tags in `<head>`

```html
<!-- On every German page (e.g., index.html) -->
<link rel="alternate" hreflang="de" href="https://www.alanbau.de/" />
<link rel="alternate" hreflang="en" href="https://www.alanbau.de/en/" />
<link rel="alternate" hreflang="x-default" href="https://www.alanbau.de/" />

<!-- On every English page (e.g., en/index.html) -->
<link rel="alternate" hreflang="de" href="https://www.alanbau.de/" />
<link rel="alternate" hreflang="en" href="https://www.alanbau.de/en/" />
<link rel="alternate" hreflang="x-default" href="https://www.alanbau.de/" />
```

**Critical hreflang rules (Google official):**
- Every page variant must reference itself AND all other variants — bidirectional
- Use fully-qualified URLs with protocol (https://)
- `x-default` is required — points to the default/fallback language version
- Broken bidirectionality causes Google to ignore all annotations

[CITED: https://developers.google.com/search/docs/specialty/international/localized-versions]

**SEO impact:** POSITIVE — Google indexes both language versions independently, no duplicate
content penalty, correct language served per user region.

**Implementation cost:** HIGH — every page must be duplicated and translated. This is
appropriate only if an English version is actually needed.

---

#### Option B: data-i18n attribute + JSON fetch (JavaScript translation)

**How it works:** Single HTML file, JS swaps visible text via `data-i18n` attributes
linked to a translations JSON file. Language preference stored in `localStorage`.

```javascript
// Conceptual pattern only
const t = await fetch('./translations/en.json').then(r => r.json());
document.querySelectorAll('[data-i18n]').forEach(el => {
  el.textContent = t[el.dataset.i18n] ?? el.textContent;
});
```

**SEO impact:** NEGATIVE — Googlebot may or may not execute the JavaScript before indexing.
The canonical URL is identical for both languages. Meta title/description cannot differ.
There is no hreflang signal. Both Google and Bing treat client-side rendered text as
secondary content. [CITED: multiple SEO authorities — medium.com/@nohanabil, americaneagle.com]

**Verdict:** Adequate for a language toggle as a UX feature if alanbau.de is a German-only
business (which it is — Berlin/Brandenburg market). Not adequate if English content needs
to rank in Google.

---

#### Option C: URL hash approach (#en, #de)

**How it works:** Single HTML page, JS reads `location.hash` to determine language.

**SEO impact:** CATASTROPHIC — Hash fragments are not sent to the server. Google ignores
fragment identifiers for indexing. This approach has no SEO value.

**Verdict:** Do not use for any content that needs to rank.

---

#### Option D: HTTP `Content-Language` header via .htaccess

**How it works:** Hostinger shared hosting supports Apache .htaccess. Redirect based on
`Accept-Language` header. Requires separate page files.

**Verdict:** Complex to maintain, returns 301/302 which can confuse crawlers. Separate
static `/en/` pages (Option A) is simpler and achieves the same outcome.

---

### Practical Recommendation for alanbau.de

The CLAUDE.md notes "DE/EN Toggle — entfernen oder implementieren" as an open task.
Given that alanbau.de's market is explicitly Berlin/Brandenburg/Germany:

**If English is needed for international clients visiting the site:**
Implement Option A (separate `/en/` pages) only for high-value pages:
`en/index.html`, `en/leistungen.html` (services), `en/kontakt.html` (contact).
Skip `/en/` versions of legal pages (Impressum, Datenschutz, AGB) — German law only.

**If English is NOT needed for business goals:**
Remove the toggle entirely. Do not ship a partially implemented language feature.
A half-translated site with missing English pages damages credibility more than
having no English version at all.

---

## 3. Image Optimization (2025 Standards)

### Decision Summary

**Recommendation:** Convert all project images to WebP. Use `<picture>` with JPEG fallback.
Use `srcset` with 3 breakpoints. Use `preload="metadata"` on hero video.

### WebP Conversion Workflow (No Build Step)

This machine has Node 25 available (verified: `node --version` = v25.9.0).
`cwebp`, `ffmpeg`, and `sips -s format webp` are NOT available on this system.
[VERIFIED: shell probe]

**Recommended workflow using `npx` (no install required):**

```bash
# One-time conversion of all JPG/PNG in assets/images/ to WebP
# Run from project root (no npm init, no package.json required)
npx sharp-cli@latest assets/images/*.jpg -o assets/images/ --webp --quality 82
npx sharp-cli@latest assets/images/*.jpeg -o assets/images/ --webp --quality 82
npx sharp-cli@latest assets/images/*.png -o assets/images/ --webp --quality 85

# Or using @squoosh/cli (note: deprecated but still functional)
npx @squoosh/cli --webp '{"quality":82}' assets/images/*.jpg
```

Alternatively, install cwebp via Homebrew (one-time setup):
```bash
brew install webp
# Then batch convert:
for f in assets/images/*.jpg assets/images/*.jpeg; do
  cwebp -q 82 "$f" -o "${f%.*}.webp"
done
```

[CITED: https://developers.google.com/speed/webp/docs/precompiled]  
[CITED: https://waylonwalker.com/squoosh-cli/ — note: @squoosh/cli is deprecated but functional]

---

### `<picture>` Element with Fallback

Use this pattern for ALL content images. The browser uses the first `<source>` it supports.

```html
<!-- Standard content image -->
<picture>
  <source srcset="assets/images/construction-site-1.webp" type="image/webp">
  <img
    src="assets/images/construction-site-1.jpg"
    alt="Baustelle mit Kran und Stahlgerüst"
    width="800"
    height="533"
    loading="lazy"
  >
</picture>

<!-- Above-the-fold / LCP image: NO lazy loading, add fetchpriority -->
<picture>
  <source srcset="assets/images/hero-still.webp" type="image/webp">
  <img
    src="assets/images/hero-still.jpg"
    alt="Modernes Bürogebäude — Alan Bau Referenzprojekt"
    width="1920"
    height="1080"
    fetchpriority="high"
  >
</picture>
```

**Important:** Always include explicit `width` and `height` on `<img>` to prevent layout shift
(CLS). Never rely on CSS alone for aspect ratio if the intrinsic dimensions are known.  
[CITED: https://www.aleksandrhovhannisyan.com/blog/optimizing-images-for-the-web/]

---

### `srcset` — Responsive Images

For images used at varying sizes across breakpoints, add `srcset` and `sizes`:

```html
<picture>
  <source
    type="image/webp"
    srcset="
      assets/images/projekt-card-400.webp  400w,
      assets/images/projekt-card-800.webp  800w,
      assets/images/projekt-card-1200.webp 1200w
    "
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 400px"
  >
  <img
    src="assets/images/projekt-card-800.jpg"
    alt="[Projektbeschreibung]"
    width="800"
    height="533"
    loading="lazy"
  >
</picture>
```

**Recommended breakpoints for alanbau.de's 1200px container:**

| Image role | Widths to generate |
|-----------|-------------------|
| Full-width hero/banner | 640w, 1024w, 1920w |
| Two-column grid card | 400w, 800w |
| Three-column grid card | 320w, 640w |
| Logo / cert badge | Single size (vector SVG preferred) |

**Do not create `srcset` for:** small logos, certification badges, icons — use SVG or a
single appropriately sized PNG/WebP.

[CITED: https://aibudwp.com/image-optimization-in-2025-webp-avif-srcset-and-preload/]

---

### AVIF in 2025: Should You Use It?

Browser support for AVIF is near-universal in 2025 (Chrome, Firefox, Safari 16+). AVIF
provides ~30% better compression than WebP at equal visual quality. However, AVIF encoding
is CPU-intensive (slow to compress) and decoding is slightly more CPU-heavy on client.

**Recommendation for alanbau.de:** Skip AVIF for now. The added complexity of maintaining
three image variants (AVIF/WebP/JPEG) is not justified for a 10-image portfolio site on
shared hosting. Revisit if Core Web Vitals scores indicate image weight as the bottleneck.

Use a two-layer `<picture>`: WebP source + JPEG fallback only.

---

### Hero Video Optimization

Current asset: `assets/video/hero-video.mp4`

**Preload strategy:**

```html
<!-- Correct hero background video markup for static HTML -->
<video
  autoplay
  muted
  loop
  playsinline
  preload="metadata"
  poster="assets/images/hero-poster.jpg"
>
  <source src="assets/video/hero-video.mp4" type="video/mp4">
</video>
```

**Why `preload="metadata"` not `preload="auto"`:**
- `preload="auto"` on cellular connections is overridden by Chrome to `none` anyway
- `preload="metadata"` fetches only duration/dimensions (a few KB), preserving bandwidth
  for CSS/JS that block rendering
- `<link rel="preload" as="video">` is NOT currently supported in Chrome or Safari
  and should not be used [CITED: https://web.dev/fast-playback-with-preload/]

**Why `poster` is important:**
The poster image displays while the video loads. Without it, users on slow connections
see a black rectangle for 1–3 seconds. Generate the poster:

```bash
# macOS: extract frame at 1 second using ffmpeg (if available)
ffmpeg -i assets/video/hero-video.mp4 -ss 00:00:01.000 -vframes 1 assets/images/hero-poster.jpg

# If ffmpeg not available: use any video player (QuickTime → File → Export Frame)
```

**Video file size target:** Max 5 MB for hero background. Encode at 720p (1280×720) for
background video — users won't notice lower resolution when overlaid with text.
Remove audio track (saves ~20% size). [CITED: https://www.mux.com/articles/guidelines-for-better-website-background-videos]

---

### Lazy Loading Threshold

Native `loading="lazy"` uses browser-default thresholds (approximately 1200px below
viewport for Chrome). This is suitable for alanbau.de — no JavaScript lazy loading
library is needed.

**Rule (per CLAUDE.md, already in place):** `loading="lazy"` on all `<img>` that are
not above-the-fold. Do NOT add `loading="lazy"` to the LCP image (typically the hero
image or first visible project photo).

Add `fetchpriority="high"` to the single LCP image per page:
- `index.html` — hero still image or first content image
- `projekte.html` — first project card image
- `ueber-uns.html` — first team/office photo

---

## 4. Static Blog Architecture

### Decision Summary

**Recommendation:** Flat-file blog (`/blog/` folder, one HTML file per article), manually
maintained `feed.xml` (RSS 2.0). No tag/category JS filtering. Category pages as static
HTML index files.

### File Naming and URL Structure

```
/blog/
├── index.html                          ← Blog index, most recent 10 articles
├── feed.xml                            ← RSS 2.0 feed
├── bau-projektmanagement-trends.html   ← Article (slug-only, no date)
├── nachhaltigkeit-im-hochbau.html      ← Article
├── bim-methoden-erklaert.html          ← Article
├── kategorie/
│   ├── projektmanagement.html          ← Category index (static HTML list)
│   └── baudienstleistungen.html        ← Category index (static HTML list)
└── ...
```

**Naming rules:**
- Use German slugs (aligns with site language and SEO target market)
- Lowercase only, hyphens only (no underscores, no dates, no trailing slashes)
- Max 4–5 words in slug for readability
- Never include dates in the URL — changing slugs destroys SEO equity

[CITED: https://www.codemzy.com/blog/best-blog-url-structure]  
[CITED: https://searchenginejournal.com/technical-seo/url-structure/]

---

### Article HTML Template

Each blog article is a complete standalone HTML file. No CMS, no templating engine.

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BIM Methoden erklärt · Alan Projektmanagement GmbH — ALANBAU</title>
  <meta name="description" content="[Max 155 Zeichen]">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.alanbau.de/blog/bim-methoden-erklaert.html">
  <link rel="alternate" type="application/rss+xml" title="ALANBAU Blog" href="https://www.alanbau.de/blog/feed.xml">

  <!-- BreadcrumbList Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://www.alanbau.de/"},
      {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.alanbau.de/blog/"},
      {"@type": "ListItem", "position": 3, "name": "BIM Methoden erklärt"}
    ]
  }
  </script>

  <!-- Article Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "BIM Methoden erklärt",
    "datePublished": "2025-03-15",
    "dateModified": "2025-03-15",
    "author": {"@type": "Organization", "name": "Alan Projektmanagement GmbH"},
    "publisher": {"@type": "Organization", "name": "Alan Projektmanagement GmbH", "url": "https://www.alanbau.de"}
  }
  </script>

  <link rel="stylesheet" href="../assets/css/main.css">
</head>
```

---

### Category Pages Without JavaScript

Static category index pages are just HTML files that list articles belonging to that
category. There is no dynamic filtering. Each article manually appears in one category
page (copy the list item).

This is intentionally low-tech. For a construction company publishing 2–4 articles per
year, the overhead of maintaining a static category list is negligible compared to the
complexity of any JavaScript filtering or pseudo-CMS approach.

**Anti-pattern to avoid:** Implementing tag/category filtering with JavaScript (show/hide
via class toggle). This is unnecessary complexity for low-volume content, and the filtered
views are not indexable by search engines.

**Category recommendation for alanbau.de:**

| Category | Target keyword cluster |
|----------|----------------------|
| Projektmanagement | Bau-PM, Terminplanung, Kostensteuerung |
| Hoch- und Tiefbau | Neubau, Umbau, Erdarbeiten |
| Nachhaltigkeit | Energieeffizienz, Green Building |
| Branchennews | Allgemeine Bauindustrie |

---

### RSS Feed (RSS 2.0)

**Why bother:** RSS enables news aggregators, Google Discover, and industry feed readers
to index articles. One-time setup, maintained manually.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ALANBAU Blog — Alan Projektmanagement GmbH</title>
    <link>https://www.alanbau.de/blog/</link>
    <description>Fachbeiträge zu Bau-Projektmanagement, Hoch- und Tiefbau</description>
    <language>de</language>
    <lastBuildDate>Thu, 15 Mar 2025 10:00:00 +0100</lastBuildDate>
    <atom:link href="https://www.alanbau.de/blog/feed.xml" rel="self" type="application/rss+xml"/>

    <item>
      <title>BIM Methoden erklärt</title>
      <link>https://www.alanbau.de/blog/bim-methoden-erklaert.html</link>
      <description>Eine Einführung in Building Information Modeling und seine Anwendung im Hochbau.</description>
      <pubDate>Sat, 15 Mar 2025 10:00:00 +0100</pubDate>
      <guid>https://www.alanbau.de/blog/bim-methoden-erklaert.html</guid>
    </item>
  </channel>
</rss>
```

**Feed discovery in HTML `<head>` (add to every page's `<head>`):**
```html
<link rel="alternate" type="application/rss+xml" title="ALANBAU Blog" href="https://www.alanbau.de/blog/feed.xml">
```

**Maintenance:** Update `feed.xml` manually every time a new article is published.
Keep only the 10 most recent items. Update `<lastBuildDate>` each time.

[CITED: https://mchartigan.github.io/blog/20220118.html]  
[CITED: https://pawelgrzybek.com/simple-rss-atom-and-json-feed-for-your-blog/]

---

### robots.txt and sitemap.xml for Blog

Add blog pages to the existing `sitemap.xml`:

```xml
<url>
  <loc>https://www.alanbau.de/blog/</loc>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
<url>
  <loc>https://www.alanbau.de/blog/bim-methoden-erklaert.html</loc>
  <lastmod>2025-03-15</lastmod>
  <changefreq>never</changefreq>
  <priority>0.5</priority>
</url>
```

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Node.js | npx WebP conversion | YES | v25.9.0 | — |
| Python 3 | scripting if needed | YES | 3.9.6 | — |
| ffmpeg | Video poster extraction | NO | — | QuickTime manual export |
| cwebp | WebP batch conversion | NO | — | `npx sharp-cli` via Node |
| sips -s format webp | macOS native WebP | NO | — | Cannot write webp on this OS version |
| ImageMagick convert | Image processing | NO | — | `npx sharp-cli` via Node |

**sips note:** `sips -s format webp` returns "Can't write format: org.webmproject.webp" on
this system (macOS Darwin 24.5.0 / Sequoia). Use `npx sharp-cli` instead. [VERIFIED: shell probe]

**Missing dependencies with no fallback:**
- None — all required conversions can be performed via npx with Node 25 available

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Hostinger shared hosting supports Apache .htaccess for language redirects | Language Toggle | Low risk — irrelevant if Option A (separate /en/ pages) is chosen |
| A2 | alanbau.de publishes 2–4 blog articles per year | Blog Architecture | If volume is higher (monthly+), a lightweight static site generator (Eleventy) should be evaluated |
| A3 | Hero video is a single MP4 with audio track | Video Optimization | If already muted/silent, audio removal step not needed |

---

## Open Questions

1. **Is an English version actually needed?**
   - What we know: CLAUDE.md lists "DE/EN Toggle entfernen oder implementieren" as open
   - What's unclear: Does alanbau.de have international clients who specifically need English?
   - Recommendation: Ask the client. If no, remove the toggle entirely. Do not ship
     a partially translated site.

2. **Blog volume and content ownership**
   - What we know: No blog exists yet
   - What's unclear: Who writes content? How frequently?
   - Recommendation: If content will be monthly or more frequent, evaluate Eleventy
     (generates static HTML, no runtime). If quarterly, hand-maintained HTML files are fine.

3. **Hero video file size**
   - What we know: `assets/video/hero-video.mp4` exists
   - What's unclear: Current file size and whether audio track is present
   - Recommendation: Check with `ls -lh assets/video/hero-video.mp4` and
     `ffprobe assets/video/hero-video.mp4` before deciding on re-encoding strategy.

---

## Sources

### Primary (HIGH confidence — registry verified)
- npm registry — `gsap@3.15.0`, `motion@12.38.0`, `aos@2.3.4` — version probed directly
- [Google Search Central: Localized Versions](https://developers.google.com/search/docs/specialty/international/localized-versions) — hreflang rules
- [web.dev: Fast playback with preload](https://web.dev/fast-playback-with-preload/) — video preload strategy
- [Motion.dev Quick Start](https://motion.dev/docs/quick-start) — CDN/ESM setup, version 12.37.0 confirmed

### Secondary (MEDIUM confidence — official source confirmed)
- [W3C WAI: C39 prefers-reduced-motion](https://www.w3.org/WAI/WCAG21/Techniques/css/C39) — accessibility requirement
- [Google WebP Precompiled Utilities](https://developers.google.com/speed/webp/docs/precompiled) — cwebp installation
- [Mux: Background Video Guidelines](https://www.mux.com/articles/guidelines-for-better-website-background-videos) — hero video best practices
- [CL Creative: Intersection Observer vs GSAP](https://www.clcreative.co/blog/should-you-use-the-intersection-observer-api-or-gsap-for-scroll-animations) — comparison article
- [Alex Winter: Animations with IO API 2024](https://alxwntr.com/animations-with-the-intersection-observer-api-2024/)

### Tertiary (LOW confidence — single source, WebSearch only)
- [OSXDaily: Convert to WebP on Mac](https://osxdaily.com/2024/01/31/how-convert-images-webp-mac-command-line/) — cwebp CLI syntax
- [Codemzy: Best blog URL structure](https://www.codemzy.com/blog/best-blog-url-structure)
- [mchartigan.github.io: RSS for static HTML](https://mchartigan.github.io/blog/20220118.html)

---

## Metadata

**Research date:** 2026-05-01  
**Valid until:** 2026-08-01 (stable domain; GSAP version may update, check npm before pinning CDN URL)

**Confidence breakdown:**
- Animation Libraries: HIGH — versions verified via npm registry, CDN usage patterns verified via official docs
- Language Toggle / hreflang: HIGH — directly sourced from Google Search Central documentation
- Image Optimization: HIGH (WebP pattern) / MEDIUM (srcset breakpoints are [ASSUMED] based on common practice)
- Video Preload: HIGH — sourced from web.dev (Google)
- Blog Architecture: MEDIUM — standard patterns, no single authoritative specification
