# Architecture Research — alanbau.de

**Last updated:** 2026-05-01
**Stack:** Static multi-page HTML · Vanilla JS · CSS custom properties · Hostinger Shared Hosting
**Scope:** Four architectural questions for ongoing development

---

## Project Constraints (from CLAUDE.md)

The following rules are non-negotiable and every recommendation in this document respects them:

| Rule | Implication for this research |
|------|-------------------------------|
| No base64 in HTML | Translation JSON loaded via `fetch()`, never inlined |
| No inline JavaScript | All event handlers in `main.js` |
| `clamp()` or `rem` for font sizes | No hardcoded `px` font sizes in i18n-generated content |
| `loading="lazy"` on non-ATF images | Blog article images require this attribute |
| `rel="noopener noreferrer"` on `target="_blank"` | Blog external links require this |
| No React, no SPA, no build step | i18n must work via plain `fetch()` + DOM manipulation |
| Deployable to Hostinger Shared Hosting | All solutions must be pure static files |

---

## Existing Codebase Baseline

Relevant facts discovered by reading the live code before researching:

- **Nav height variables already exist:** `--nav-h: 80px` (`:root`), overridden to `--nav-h: 68px` at `@media (max-width: 768px)`.
- **`scroll-margin-top` is already used once:** `legal-content h2` has `scroll-margin-top: calc(var(--nav-h) + 24px)` at line 1591 of `main.css`. The pattern is proven and working.
- **Smooth scroll JS already exists:** `main.js` lines 42-50 manually calculate `target.offsetTop - offset` using `getComputedStyle` to read `--nav-h`. This dual-approach (CSS scroll-margin + JS offset) creates a slight mismatch — see Topic 1.
- **Nav anchor links are already context-sensitive in the HTML:** `index.html` uses `href="#services"` and `href="#projects"`. Sub-pages (`karriere.html`, `ueber-uns.html`) would need `href="./leistungen.html"` etc.
- **`scroll-behavior: smooth` is set on `html`.** This means CSS-native anchor navigation already animates; JS smooth scroll is technically redundant for same-page links if `scroll-margin-top` is correct.

---

## Topic 1: Sticky Nav Scroll Offset Fix

### The Bug

When a user clicks `#services` or any anchor, the browser scrolls `target.offsetTop - 80` (from the JS in `main.js`). If `scroll-behavior: smooth` is active on `html` AND the JS `preventDefault()` fires first, the JS offset wins. But if an anchor is reached via a URL hash on page load (e.g., navigating from another page to `index.html#services`), the JS listener never fires — the browser uses its native scroll, which does not apply the `--nav-h` offset. Result: the section header sits behind the nav.

### Property Comparison

| Property | Applied To | Mechanism | Best For |
|----------|-----------|-----------|----------|
| `scroll-padding-top` | Scroll container (`:root` / `html`) | Shifts the browser's "optimal viewing region" inward | Global offset for all anchor navigation on the page |
| `scroll-margin-top` | Individual target elements | Adds outward margin around the element in the scroll snap area | Per-element overrides (e.g., legal h2s need more space) |

**Verdict for this project:** Use `scroll-padding-top` on `:root` as the primary fix — one declaration covers every anchor on every page. Keep `scroll-margin-top` only where an individual element needs a different offset (already done for legal headings). [VERIFIED: MDN docs]

### Browser Support (2025)

Both properties have **Baseline: Widely Available** status — available across all major browsers since April 2021. Safari has historically had edge cases with `scroll-margin` outside explicit scroll-snap containers, but `scroll-padding-top` on `:root` has no such restriction. [VERIFIED: MDN Web Docs]

### Recommended Implementation

#### Step 1 — CSS fix (covers hash-on-load, forward/back navigation)

```css
/* main.css — add to the :root block or html rule */
html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--nav-h); /* Fix: offset all anchors by nav height */
}
```

Because `--nav-h` is already `80px` on desktop and `68px` on mobile (via the existing `@media (max-width: 768px)` override), this single line is automatically responsive. No additional media queries needed.

#### Step 2 — Remove the redundant JS offset

The current JS in `main.js` (lines 42-50) manually calculates the scroll position:

```js
// CURRENT (conflicting with scroll-padding-top):
const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
```

With `scroll-padding-top` set in CSS, `scrollIntoView()` or `element.scrollIntoView({ behavior: 'smooth' })` respects the padding automatically. Replace the manual calculation:

```js
// REPLACEMENT — cleaner, respects scroll-padding-top:
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
```

`scrollIntoView` with `block: 'start'` honours `scroll-padding-top` on the scroll container. The inline `onclick` on the "Anfrage stellen" button in `index.html` line 115 should also be migrated to `main.js` as a `data-scroll-to="#contact"` delegate (respects the "no inline JS" rule).

#### Step 3 — Dynamic height safety net (optional but future-proof)

If the nav ever becomes variable height (e.g., an announcement bar above it), use `ResizeObserver` to keep the CSS variable in sync:

```js
// In main.js — add after navbar is defined:
if ('ResizeObserver' in window) {
  new ResizeObserver(([entry]) => {
    document.documentElement.style.setProperty(
      '--nav-h',
      `${entry.contentRect.height}px`
    );
  }).observe(navbar);
}
```

This overwrites the static `--nav-h` value with the live measured height. Works for desktop and mobile because the observer fires whenever the element resizes. [VERIFIED: kurtrank.me ResizeObserver pattern, MDN ResizeObserver]

### Summary Decision

| Approach | Verdict |
|----------|---------|
| `scroll-padding-top: var(--nav-h)` on `html` | **Use — primary fix** |
| `scroll-margin-top` on individual sections | Use only where per-element override needed (legal h2 already correct) |
| JS manual `offsetTop - navHeight` | **Remove — conflicts with CSS approach** |
| `scrollIntoView({ behavior: 'smooth', block: 'start' })` | Replace current JS scroll logic |
| `ResizeObserver` for `--nav-h` | Add as optional future-proofing |

---

## Topic 2: Multi-Page Nav Consistency

### The Problem

`index.html` has `href="#services"` and `href="#projects"` — correct for the homepage. But when a user is on `karriere.html` and clicks "Leistungen", they need to go to `leistungen.html`, not `#services` (which does not exist on that page).

Two separate things need solving:
1. **Context-sensitive href values** — same link must point to different targets depending on current page.
2. **Active nav item highlighting** — current page/section should be visually marked.

### Pattern A: Context-Sensitive Links (data-attribute driven)

The cleanest vanilla JS approach uses `data-*` attributes to carry both the anchor-on-homepage and the full-page-on-subpage target:

**HTML in every page's `<nav>`:**

```html
<ul class="nav-links">
  <li>
    <a href="./leistungen.html"
       data-page-href="./leistungen.html"
       data-home-href="#services">Leistungen</a>
  </li>
  <li>
    <a href="./projekte.html"
       data-page-href="./projekte.html"
       data-home-href="#projects">Projekte</a>
  </li>
  <li><a href="./ueber-uns.html">Unternehmen</a></li>
  <li><a href="./karriere.html">Karriere</a></li>
  <li><a href="#contact"
         data-page-href="./index.html#contact"
         data-home-href="#contact">Kontakt</a></li>
</ul>
```

**JS in `main.js` — runs on every page:**

```js
/* ── CONTEXT-SENSITIVE NAV LINKS ────────────────────────── */
const isHome = ['/', '/index.html', ''].some(
  p => window.location.pathname.endsWith(p)
);

document.querySelectorAll('[data-home-href]').forEach(link => {
  if (isHome) {
    link.setAttribute('href', link.dataset.homeHref);
  }
  // On sub-pages, href already points to the full page URL (the default)
});
```

On `index.html`: "Leistungen" becomes `#services` and smooth-scrolls.
On any other page: "Leistungen" stays `./leistungen.html` and navigates normally.

**Why `data-*` over conditional `<nav>` includes:** No server-side rendering available; duplicating the nav per page introduces maintenance drift. One nav fragment with data attributes is DRY and declarative. [ASSUMED — common pattern, not from a single authoritative source]

### Pattern B: Active State Highlighting

Two layers work together:

**Layer 1 — Current page (all pages):**

```js
/* ── ACTIVE NAV — CURRENT PAGE ──────────────────────────── */
const currentPath = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-links a, .nav-mobile-overlay a').forEach(link => {
  const linkPath = link.getAttribute('href').split('/').pop().split('#')[0] || 'index.html';
  if (linkPath && linkPath === currentPath) {
    link.classList.add('nav-active');
    link.setAttribute('aria-current', 'page');
  }
});
```

**Layer 2 — Current section while scrolling (homepage only):**

```js
/* ── ACTIVE NAV — SCROLLSPY (homepage only) ─────────────── */
if (isHome) {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[data-home-href]');

  const spyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        const target = link.dataset.homeHref.replace('#', '');
        link.classList.toggle('nav-active', target === id);
      });
    });
  }, {
    rootMargin: '-50% 0px -49% 0px', // triggers when section crosses the midpoint
    threshold: 0
  });

  sections.forEach(s => spyObserver.observe(s));
}
```

The `rootMargin: '-50% 0px -49% 0px'` trick creates a 1% horizontal "laser line" at 50% of the viewport — a section activates when it crosses the middle of the screen. This is the standard scrollspy pattern. [VERIFIED: multiple CSS-Tricks and DEV Community sources]

**CSS for active state:**

```css
/* main.css */
.nav-links a.nav-active,
.nav-links a[aria-current="page"] {
  color: var(--red);
}
.nav-links a.nav-active::after,
.nav-links a[aria-current="page"]::after {
  /* assumes nav links already have a ::after underline animation */
  transform: scaleX(1);
}
```

### Mobile Overlay

The same JS logic applies to `.nav-mobile-overlay a` — both selectors should be included in the `querySelectorAll` calls above so mobile and desktop nav stay in sync.

### Summary Decision

| Problem | Solution |
|---------|----------|
| Homepage anchor vs sub-page URL | `data-home-href` + `data-page-href` attributes, resolved in JS on load |
| Current page highlight | `window.location.pathname` comparison, add `.nav-active` + `aria-current="page"` |
| Current section highlight (scroll) | `IntersectionObserver` with `rootMargin: '-50% 0px -49% 0px'` |
| Both nav variants (desktop + mobile) | Include both selectors in every query |

---

## Topic 3: DE/EN Toggle Architecture

### Scope Decision

CLAUDE.md lists "DE/EN Toggle entfernen oder implementieren" as an open client task. This section provides the concrete architecture so the decision to implement is low-friction.

### Architecture Overview

```
assets/
└── i18n/
    ├── de.json        ← default language
    └── en.json        ← English translations
```

Translation key lookup via `data-i18n` attributes. Language stored in `localStorage`. Switched by a button in the nav. [VERIFIED: andreasremdt.com implementation pattern]

### JSON File Structure

```jsonc
// assets/i18n/de.json
{
  "nav": {
    "leistungen": "Leistungen",
    "projekte": "Projekte",
    "unternehmen": "Unternehmen",
    "karriere": "Karriere",
    "kontakt": "Kontakt",
    "cta": "Anfrage stellen →"
  },
  "hero": {
    "eyebrow": "BERLIN · SCHÖNEFELD · DEUTSCHLANDWEIT",
    "title_line1": "Planen.",
    "title_line2": "Bauen.",
    "title_line3": "Betreiben.",
    "subtitle": "Vom Konzept bis zur Schlüsselübergabe — Bau-Projektmanagement, Hoch- & Tiefbau und Baudienstleistungen aus einer Hand.",
    "cta_primary": "Jetzt Anfrage stellen →",
    "cta_secondary": "Unsere Leistungen"
  },
  "meta": {
    "title": "ALANBAU — Bau-Projektmanagement · Hoch- & Tiefbau · Berlin & Brandenburg",
    "description": "Alan Projektmanagement GmbH — Ihr Partner für Bau-Projektmanagement..."
  }
}
```

```jsonc
// assets/i18n/en.json
{
  "nav": {
    "leistungen": "Services",
    "projekte": "Projects",
    "unternehmen": "Company",
    "karriere": "Careers",
    "kontakt": "Contact",
    "cta": "Request a quote →"
  },
  "hero": {
    "eyebrow": "BERLIN · SCHÖNEFELD · NATIONWIDE",
    "title_line1": "Plan.",
    "title_line2": "Build.",
    "title_line3": "Operate.",
    "subtitle": "From concept to handover — construction project management, civil & structural engineering, and building services from a single source.",
    "cta_primary": "Request a quote →",
    "cta_secondary": "Our Services"
  },
  "meta": {
    "title": "ALANBAU — Construction Project Management · Civil & Structural Engineering · Berlin",
    "description": "Alan Projektmanagement GmbH — Your partner for construction project management..."
  }
}
```

Use **dot-notation keys** (`"hero.title_line1"`) when putting the key in HTML — the JS resolves the path through the nested object. Flat keys are acceptable for simple sites; nesting prevents key collisions.

### HTML Markup

Add `data-i18n` to every translatable element:

```html
<!-- Nav example -->
<a href="#services" data-i18n="nav.leistungen">Leistungen</a>

<!-- Hero example -->
<p class="hero-eyebrow" data-i18n="hero.eyebrow">BERLIN · SCHÖNEFELD · DEUTSCHLANDWEIT</p>

<!-- For attributes (title, placeholder, aria-label): -->
<button data-i18n="nav.cta" data-i18n-attr="aria-label,title" aria-label="Anfrage stellen">
  Anfrage stellen →
</button>
```

### JavaScript Implementation

Add to `main.js` (respects "no inline JS" rule):

```js
/* ── I18N ────────────────────────────────────────────────── */
const LANG_KEY = 'alanbau_lang';
const SUPPORTED = ['de', 'en'];
const DEFAULT_LANG = 'de';

let translations = {};

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? path;
}

async function loadTranslations(lang) {
  try {
    const res = await fetch(`./assets/i18n/${lang}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    translations = await res.json();
    applyTranslations(lang);
  } catch {
    // Silently fall back — original HTML text stays visible
    console.warn(`i18n: could not load ${lang}.json`);
  }
}

function applyTranslations(lang) {
  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = getNestedValue(translations, el.dataset.i18n);
    if (value && value !== el.dataset.i18n) el.textContent = value;
  });

  // HTML content (use sparingly — only for elements with inline markup)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const value = getNestedValue(translations, el.dataset.i18nHtml);
    if (value) el.innerHTML = value;
  });

  // Attribute translations (aria-label, placeholder, title)
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const attrs = el.dataset.i18nAttr.split(',');
    const key = el.dataset.i18n;
    const value = getNestedValue(translations, key);
    if (value) attrs.forEach(attr => el.setAttribute(attr.trim(), value));
  });

  // Update lang attribute and meta tags
  document.documentElement.lang = lang;
  const metaTitle = getNestedValue(translations, 'meta.title');
  const metaDesc  = getNestedValue(translations, 'meta.description');
  if (metaTitle) document.title = metaTitle;
  if (metaDesc) {
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', metaDesc);
  }

  // Update lang toggle button UI
  document.querySelectorAll('.lang-toggle span').forEach(span => {
    span.classList.toggle('active', span.textContent.trim().toLowerCase() === lang.toUpperCase() ||
      span.textContent.trim() === lang.toUpperCase());
  });

  localStorage.setItem(LANG_KEY, lang);
}

function initI18n() {
  const stored = localStorage.getItem(LANG_KEY);
  const browser = navigator.language?.split('-')[0];
  const lang = SUPPORTED.includes(stored) ? stored
             : SUPPORTED.includes(browser)  ? browser
             : DEFAULT_LANG;

  if (lang !== DEFAULT_LANG) {
    // Only fetch if not German — German is the default HTML content
    loadTranslations(lang);
  }

  // Wire up toggle buttons
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.lang;
      if (!SUPPORTED.includes(target)) return;
      if (target === DEFAULT_LANG) {
        // Reload page to restore original HTML (avoids needing de.json at all)
        localStorage.setItem(LANG_KEY, DEFAULT_LANG);
        location.reload();
      } else {
        loadTranslations(target);
      }
    });
  });
}

initI18n();
```

### Nav Toggle HTML

Replace the static lang toggle in `index.html`:

```html
<div class="lang-toggle" aria-label="Sprache wählen">
  <button data-lang="de" class="lang-btn active" aria-pressed="true">DE</button>
  <span aria-hidden="true">/</span>
  <button data-lang="en" class="lang-btn" aria-pressed="false">EN</button>
</div>
```

### SEO: hreflang Tags

For proper multi-language SEO, add reciprocal `hreflang` links in every page's `<head>`. Each version must reference itself and all other versions. [VERIFIED: Google Search Central docs]

```html
<!-- In <head> of index.html (German, the primary) -->
<link rel="alternate" hreflang="de" href="https://www.alanbau.de/">
<link rel="alternate" hreflang="en" href="https://www.alanbau.de/en/">
<link rel="alternate" hreflang="x-default" href="https://www.alanbau.de/">
```

**Two valid structural approaches for static HTML:**

| Approach | URL Structure | Files |
|----------|--------------|-------|
| **Subfolder** (recommended) | `alanbau.de/` (DE) · `alanbau.de/en/` (EN) | Duplicate HTML files in `en/` folder |
| **In-page switch** (simpler) | `alanbau.de/` only, JS swaps content | Single set of files, no separate EN URLs |

For a small 7-page site, the **in-page switch approach** is pragmatic — no duplicate file maintenance, no hreflang management. The trade-off: search engines cannot index separate EN pages, so English SEO benefit is minimal. Given the target market is Berlin/Brandenburg with German-speaking clients, the in-page switch is the correct call.

**Common hreflang mistakes to avoid:** [VERIFIED: Google Search Central docs]
- Missing reciprocal links (page A must link to page B and vice versa)
- Using region codes alone (`be`) instead of language-region (`de-be`)
- Non-absolute URLs (must include `https://`)

### Date and Number Formats

Use the browser-native `Intl` API — no library needed:

```js
// In translation helper:
const locale = lang === 'en' ? 'en-DE' : 'de-DE'; // en-DE keeps German number format convention

function formatDate(isoString, lang) {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'de-DE', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date(isoString));
}

function formatNumber(value, lang) {
  return new Intl.NumberFormat(lang === 'en' ? 'en-GB' : 'de-DE').format(value);
}
```

`Intl.DateTimeFormat` and `Intl.NumberFormat` are baseline-supported in all modern browsers. [VERIFIED: MDN — widely available]

### localStorage Persistence

The `LANG_KEY = 'alanbau_lang'` key is consistent with the existing `alanbau_cookie_consent` key naming convention already used in `main.js`. No conflict.

---

## Topic 4: Static Blog Structure

### Scope Note

No blog currently exists on the site. This section provides an architecture that can be added without changing the existing pages or build process.

### Directory Structure

```
alanbau.de/
├── index.html
├── leistungen.html
├── ... (existing pages)
│
├── blog/
│   ├── index.html              ← Blog overview (page 1 of paginated list)
│   ├── page-2.html             ← Paginated archive page 2
│   ├── page-3.html             ← etc.
│   │
│   ├── artikel/                ← Individual articles (each is a full HTML file)
│   │   ├── bim-im-hochbau.html
│   │   ├── projektmanagement-phasen.html
│   │   └── ...
│   │
│   └── themen/                 ← Tag/topic index pages (manual)
│       ├── bim.html            ← All articles tagged "BIM"
│       ├── projektmanagement.html
│       └── nachhaltigkeit.html
│
└── assets/
    └── images/
        └── blog/               ← Blog-specific images (lazy-loaded)
```

### Article File Template

Each article is a self-contained HTML file:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BIM im Hochbau: Einsparpotenziale 2025 · ALANBAU</title>
  <meta name="description" content="[max 155 Zeichen]">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.alanbau.de/blog/artikel/bim-im-hochbau.html">

  <!-- Article-specific Open Graph -->
  <meta property="og:type"  content="article">
  <meta property="og:title" content="BIM im Hochbau: Einsparpotenziale 2025">
  <meta property="og:image" content="https://www.alanbau.de/assets/images/blog/bim-hero.jpg">
  <meta property="og:url"   content="https://www.alanbau.de/blog/artikel/bim-im-hochbau.html">

  <!-- Article Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "BIM im Hochbau: Einsparpotenziale 2025",
    "author": { "@type": "Organization", "name": "Alan Projektmanagement GmbH" },
    "publisher": {
      "@type": "Organization",
      "name": "ALANBAU",
      "logo": { "@type": "ImageObject", "url": "https://www.alanbau.de/assets/images/logo.png" }
    },
    "datePublished": "2025-03-15",
    "dateModified": "2025-03-15",
    "image": "https://www.alanbau.de/assets/images/blog/bim-hero.jpg",
    "description": "[description]"
  }
  </script>

  <!-- BreadcrumbList Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://www.alanbau.de/" },
      { "@type": "ListItem", "position": 2, "name": "Blog",       "item": "https://www.alanbau.de/blog/" },
      { "@type": "ListItem", "position": 3, "name": "BIM im Hochbau", "item": "https://www.alanbau.de/blog/artikel/bim-im-hochbau.html" }
    ]
  }
  </script>

  <link rel="stylesheet" href="../../assets/css/main.css">
</head>
<body>
  <!-- standard nav (shared) -->

  <article class="blog-article">
    <header class="article-header">
      <nav aria-label="Breadcrumb" class="breadcrumb">
        <ol>
          <li><a href="../../index.html">Startseite</a></li>
          <li><a href="../index.html">Blog</a></li>
          <li aria-current="page">BIM im Hochbau</li>
        </ol>
      </nav>

      <div class="article-meta">
        <time datetime="2025-03-15">15. März 2025</time>
        <span class="article-tag">
          <a href="../themen/bim.html">BIM</a>
        </span>
      </div>

      <h1>BIM im Hochbau: Einsparpotenziale 2025</h1>

      <img src="../../assets/images/blog/bim-hero.jpg"
           alt="3D-Modell eines Hochbaus in BIM-Software"
           width="1200" height="630">
      <!-- No loading="lazy" on the hero — it is above the fold -->
    </header>

    <div class="article-body">
      <!-- article content -->
    </div>

    <!-- Prev/Next navigation -->
    <nav class="article-nav" aria-label="Artikel-Navigation">
      <a class="article-nav__prev" href="./projektmanagement-phasen.html">
        ← Vorheriger Artikel: Projektmanagement-Phasen
      </a>
      <a class="article-nav__next" href="./nachhaltigkeit-bauprojekte.html">
        Nächster Artikel: Nachhaltigkeit im Bauprojekt →
      </a>
    </nav>
  </article>

  <!-- standard footer -->
  <script src="../../assets/js/main.js"></script>
</body>
</html>
```

### Prev/Next Pagination — No JS, No Backend

The cleanest approach for a small blog (< 50 articles) is **hardcoded sequential links**: each article HTML file simply contains `<a>` links to the previous and next articles by filename. There is no automatic pagination — every time an article is published:

1. Update the new article's `article-nav__prev` link to point to the most recent existing article.
2. Update the most recent existing article's `article-nav__next` link to point to the new article.
3. Add the new article as the first card in `blog/index.html`.

This is tedious at scale but requires zero infrastructure for a company blog publishing a few articles per month. [ASSUMED — based on static site maintenance practices; no single authoritative source]

**Archive pagination** (blog/index.html → blog/page-2.html) follows the same manual pattern:

```html
<!-- blog/index.html footer pagination -->
<nav class="pagination" aria-label="Blog-Seiten">
  <span class="pagination__current" aria-current="page">Seite 1 von 3</span>
  <a class="pagination__next btn-ghost" href="./page-2.html">Nächste Seite →</a>
</nav>

<!-- blog/page-2.html footer pagination -->
<nav class="pagination" aria-label="Blog-Seiten">
  <a class="pagination__prev btn-ghost" href="./index.html">← Vorherige Seite</a>
  <span class="pagination__current" aria-current="page">Seite 2 von 3</span>
  <a class="pagination__next btn-ghost" href="./page-3.html">Nächste Seite →</a>
</nav>
```

### Tag/Topic Index Pages

Each `themen/bim.html` is a manually maintained HTML page listing articles with that tag. Structure:

```html
<!-- blog/themen/bim.html -->
<h1>Artikel zum Thema: BIM</h1>
<ul class="article-list">
  <li>
    <a href="../artikel/bim-im-hochbau.html">
      <h2>BIM im Hochbau: Einsparpotenziale 2025</h2>
      <time datetime="2025-03-15">15. März 2025</time>
    </a>
  </li>
  <!-- add entries manually when new BIM articles are published -->
</ul>
```

Tag pages should be `index, follow` in robots meta — they provide legitimate navigation value and link internally to all articles on that topic. [VERIFIED: Search Engine Journal — tag pages with unique value should be indexed]

Keep the number of tag pages small (5-8 topics max). Each tag page must have enough articles to be substantive — a tag page with one article provides no value and should not be published until it has at least 3 articles.

### SEO for Blog Articles

- `<article>` element with `Article` Schema.org structured data (see template above)
- `<time datetime="ISO-date">` on all publication dates
- `<h1>` is the article title — one per page (aligns with CLAUDE.md rule)
- Canonical tag pointing to the article's own URL
- `og:type` is `article` not `website`
- Images: `loading="lazy"` on all in-body images; hero image (`above-the-fold`) does NOT get `loading="lazy"`
- Internal linking: each article should link to at least one related article and to the relevant `themen/` page

### Maintenance Workflow

When publishing a new article:

```
1. Create blog/artikel/neuer-artikel.html (from template)
2. Update previous article: add article-nav__next link
3. Add card to top of blog/index.html (shift older cards down, 
   remove last card from page 1 to page 2, etc.)
4. Update blog/page-X.html if cards overflow
5. Update sitemap.xml with new URL and lastmod date
6. Add to any relevant themen/XXX.html tag index pages
```

This workflow is verbose but completely transparent, requires no tooling, and is Hostinger-deployable as-is.

---

## Cross-Cutting Decisions

### Inline onclick Must Be Removed

`index.html` line 115 has:
```html
<button ... onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">
```
This violates the CLAUDE.md "no inline JavaScript" rule. Replace with:
```html
<button class="btn-primary" data-scroll-to="contact" aria-label="Projektanfrage stellen">
  Anfrage stellen →
</button>
```
Then in `main.js`:
```js
document.querySelectorAll('[data-scroll-to]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.scrollTo);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
```

### CSS custom property `--nav-h` is the source of truth

Every scroll offset, padding calculation, and JS measurement should read from `--nav-h`. Never hardcode `72px` or `80px` anywhere — the variable already handles the mobile/desktop split correctly.

---

## Assumptions Log

| # | Claim | Risk if Wrong |
|---|-------|---------------|
| A1 | In-page JS language switching is preferable to subfolder EN pages for this market | Low — German B2B construction market; EN audience is small |
| A2 | Manual prev/next links in article HTML are maintenance-acceptable at the expected blog frequency (a few articles per month) | Low — if cadence increases, an SSG like Eleventy should be evaluated |
| A3 | `data-home-href` / `data-page-href` pattern is DRY enough to not require a separate nav include or server-side templating | Low — 7 pages; manual consistency is manageable |

---

## Sources

### Primary (HIGH confidence — verified via tool)
- [MDN: scroll-margin-top](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-top) — browser support, Baseline Widely Available
- [MDN: scroll-padding-top](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-top) — distinction from scroll-margin, :root usage
- [Google Search Central: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions) — hreflang correct format, x-default, common mistakes
- [kurtrank.me: Dynamic Scroll Offset via Custom Properties](https://kurtrank.me/dynamic-scroll-offset-via-custom-properties/) — ResizeObserver pattern for `--nav-h`

### Secondary (MEDIUM confidence — verified with codebase or additional source)
- [CSS-Tricks: scroll-margin-top for fixed headers](https://css-tricks.com/fixed-headers-and-jump-links-the-solution-is-scroll-margin-top/) — CSS variable driven approach confirmation
- [andreasremdt.com: Building a small i18n script](https://andreasremdt.com/blog/building-a-super-small-and-simple-i18n-script-in-javascript/) — JSON structure, fetch approach, dot-notation keys
- [Search Engine Journal: Tag pages SEO](https://www.searchenginejournal.com/tagging-seo/427762/) — tag pages should be indexed if they provide value
- Existing `main.css` line 1591 — `scroll-margin-top: calc(var(--nav-h) + 24px)` confirms the approach is already in use

### Tertiary (LOW confidence — training knowledge, not separately verified)
- Manual prev/next pagination maintenance workflow
- `data-home-href` data-attribute pattern for context-sensitive links
- Blog file naming conventions (`artikel/`, `themen/`)
