# Coding Conventions

**Analysis Date:** 2026-05-01

## HTML Conventions

**Doctype and Language:**
- All pages: `<!DOCTYPE html>` followed immediately by `<html lang="de">`
- No exceptions across all 8 HTML files

**Head Structure Order (consistent across all pages):**
1. `<meta charset="UTF-8">`
2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
3. Security meta tags block (`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`)
4. SEO block (`<title>`, `description`, `robots`, `canonical`)
5. Open Graph block (`og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:locale`)
6. `<link rel="icon">` favicon
7. Font preconnects + Google Fonts stylesheet
8. `<link rel="stylesheet" href="./assets/css/main.css">`
9. Schema.org `<script type="application/ld+json">` block

**Indentation:**
- 2-space indentation throughout all HTML files
- Consistent nesting applied to all elements

**Title Format:**
- Index: `ALANBAU — [Core Keyword] · [Secondary Keyword] · [Region]`
- Subpages: `[Page Topic] · [Context] | ALANBAU` or `[Topic] · [Company] — ALANBAU`
- Legal pages follow the same pattern but without OG block comments

**Canonical URLs:**
- Every page carries `<link rel="canonical" href="https://www.alanbau.de/[page].html">`
- Index page uses trailing slash: `https://www.alanbau.de/`

**Internal Links:**
- All relative paths with `./` prefix: `./leistungen.html`, `./assets/images/logo.png`
- No leading slash paths anywhere

**Section Comments:**
- Major HTML regions delimited with a distinctive double-box comment pattern:
  ```html
  <!-- ═══════════════════════════ SECTION NAME ═══════════════════════════ -->
  ```
- Used for every major structural block (COOKIE BANNER, MOBILE OVERLAY, NAVBAR, HERO, SERVICES, etc.)

---

## CSS Naming Conventions

**Class Naming — Mixed Pattern (not pure BEM):**
- Block classes use kebab-case: `.service-card`, `.project-tag`, `.contact-form`, `.footer-grid`
- BEM modifiers with `--` are used selectively, not universally:
  - `.section--alt` — alternate background variant of `.section`
  - `.content-split--reverse` — layout variant
  - `.leistungen-list--sub` — nested list variant
  - `.cookie-btn--accept` / `.cookie-btn--decline` — button variants
  - `.leistung-block--alt` — page-section variant
- BEM element notation (`__`) is not used; element sub-classes are named independently (e.g., `.service-card` + `.service-name` + `.service-desc`, not `.service-card__name`)

**Utility Classes:**
- `.container` — max-width centering wrapper
- `.section` — standard vertical padding (96px)
- `.section--alt` — alternate background
- `.reveal` — scroll animation target (JS-driven)
- `.red` — single utility class for inline red color on text spans
- `.btn-primary`, `.btn-ghost`, `.btn-hero`, `.btn-white` — button variants as independent classes

**Custom Properties (`:root`):**
```css
--bg, --bg-alt, --bg-dark        /* Backgrounds */
--red, --red-hover, --red-pale   /* Brand color + states */
--text, --text-muted, --border   /* Typography + dividers */
--shadow, --shadow-lg            /* Elevation */
--radius, --radius-lg            /* Border radii */
--transition                     /* 0.22s ease — standard transition */
--container                      /* 1200px */
--nav-h                          /* 80px (68px at ≤768px) */
--font, --font-display           /* Font families */
```

**State Classes (JS-toggled):**
- `.scrolled` on `#navbar` — scroll position state
- `.open` on `.nav-hamburger` and `.nav-mobile-overlay` — mobile menu state
- `.active` on `.svc-modal-overlay` and `.lightbox-overlay` — visible modal state
- `.visible` on `.reveal` elements — scroll-reveal triggered
- `.hidden` on `.cookie-banner` — fade-out before removal

**ID Usage:**
- IDs used for: JS targets (`#navbar`, `#hamburger`, `#contact-form`), anchor scroll targets (`#hero`, `#services`, `#projects`, `#contact`), and Schema.org anchor points
- IDs are not used for styling (no `#id { ... }` CSS rules except `#navbar`, `#hero`, `#services`, `#projects`, `#about`, `#contact`, `#projektphasen`, `#baumanagement`)

**Responsive Breakpoints:**
- `@media (max-width: 1024px)` — tablet
- `@media (max-width: 768px)` — mobile (nav collapses, hamburger appears)
- `@media (max-width: 480px)` — small mobile (single-column footer, stacked hero CTAs)
- `@media (prefers-reduced-motion: reduce)` — motion safety

---

## CSS Font Size Practice

**Heading/display sizes use `clamp()`** — 13 instances in `assets/css/main.css`:
```css
.section-title  { font-size: clamp(32px, 5vw, 52px); }
.hero-title     { font-size: clamp(52px, 8vw, 96px); }
.page-hero-title{ font-size: clamp(40px, 7vw, 80px); }
```

**Deviation from CLAUDE.md rule:** Body/component text uses hardcoded `px` values — 85 instances (e.g., `font-size: 14px`, `font-size: 13px`). Only display/heading sizes use `clamp()`. The project CLAUDE.md states "Keine hardcodierten px-Schriftgrößen" but this is only partially observed in practice.

---

## JavaScript Conventions

**Module Pattern:**
- Single IIFE wrapping the entire `assets/js/main.js`:
  ```js
  (function () {
    'use strict';
    // all code here
  })();
  ```
- No ES modules, no imports/exports — compatible with static hosting without a bundler

**Function Naming:**
- `camelCase` for all functions: `updateNav()`, `openMenu()`, `closeMenu()`, `openSvcModal()`, `openLightbox()`
- Named functions used over anonymous where repeated (open/close pairs are named)

**Variable Naming:**
- `camelCase` for variables: `navbar`, `hamburger`, `mobileOverlay`, `svcOverlay`, `cookieBanner`
- `SCREAMING_SNAKE_CASE` for constants: `COOKIE_KEY = 'alanbau_cookie_consent'`

**Event Handling:**
- All event listeners attached via `addEventListener` in `main.js`
- **Deviation:** 4 `onclick` inline handlers remain in `index.html` (lines 115, 147, 150, 698) for scroll-to-section buttons and the service modal CTA link. These violate the CLAUDE.md rule "Kein inline JavaScript."

**Data Attributes as JS Hooks:**
- `data-service="projektmanagement|hochtiefbau|baudienstleistungen"` — modal trigger
- `data-lightbox="[src]"` + `data-lightbox-alt="[text]"` — lightbox trigger
- `data-filter="[category]"` / `data-category="[category]"` — project filter
- This pattern cleanly separates JS behavior from CSS presentation

**Async Pattern:**
- Form submission uses `async/await` with `fetch` + `try/catch/finally`
- Error state shown via `role="alert"` elements

**Comment Style in JS:**
```js
/* ── SECTION NAME ─────────────────── */
```
- Consistent block comments for each functional section using `──` decoration

---

## Accessibility Patterns

**Semantic HTML:**
- `<nav>` with `role="navigation"` + `aria-label` (redundant role but explicit)
- `<header class="page-hero">` used on subpages (not `<div>`)
- `<footer>` for site footer
- `<section>` for all major content areas
- `<form>` with `id`, `method`, `action`, `autocomplete`, `novalidate`
- `<ul>` for nav link lists

**ARIA Labels:**
- `aria-labelledby` on sections referencing their heading IDs (e.g., `aria-labelledby="services-title"`)
- `aria-label` on nav, cookie banner dialog, mobile overlay, buttons without visible text
- `aria-label="ALANBAU — Startseite"` on logo link
- `aria-expanded="false"` toggled to `"true"` on hamburger button by JS
- `aria-controls="mobile-overlay"` on hamburger

**Decorative Elements:**
- Emoji icons, decorative gradients, and scroll indicators all carry `aria-hidden="true"`:
  ```html
  <span class="service-icon" aria-hidden="true">🏗️</span>
  <div class="hero-gradient" aria-hidden="true"></div>
  <div class="hero-scroll" aria-hidden="true">
  ```

**Modal Accessibility:**
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` on service modal and lightbox
- Escape key closes both modals (handled in JS)
- `role="alert"` on form success/error messages
- **Gap:** No focus trap implemented in modals — keyboard focus is not constrained inside `.svc-modal` or `.lightbox-overlay` when open

**Forms:**
- All form inputs have explicit `<label for="[id]">` — no placeholder-only fields
- `required` attribute on mandatory fields
- `autocomplete` attributes set correctly (`given-name`, `family-name`, `email`, `tel`)
- Honeypot field has `aria-hidden="true"` and `tabindex="-1"`

**Current Page Indication:**
- `aria-current="page"` applied to active nav link on subpages (not on index.html which uses anchor `#` links)

**Skip Navigation:**
- No skip-to-main-content link present anywhere in the codebase. This is an accessibility gap for keyboard users.

**Alt Text:**
- All `<img>` elements carry descriptive `alt` attributes
- Decorative background video: `aria-hidden="true"`, no alt needed
- Logo in footer has `alt="ALANBAU Logo"` consistently
- Lightbox placeholder image has `alt=""` (empty, appropriate for dynamic content)

---

## SEO Conventions

**Meta Description:** Max ~155 characters, unique per page, present on all pages.

**Robots:** `content="index, follow"` on all content pages including legal pages (impressum, datenschutz, agb).

**Open Graph:** Full set (`og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:locale`) on all main content pages. Legal pages (impressum.html) omit OG tags.

**Schema.org:**
- `index.html`: `LocalBusiness` with full address, geo coordinates, telephone, `areaServed`, `sameAs`
- `ueber-uns.html`: Array with `BreadcrumbList` + `Organization` (two schema types combined in one script tag)
- All other subpages: `BreadcrumbList` only (Position 1 = Startseite, Position 2 = current page)
- Legal pages: `BreadcrumbList` only

**Sitemap:** `sitemap.xml` lists all 8 pages with `lastmod`, `changefreq`, and `priority` values. Linked from `robots.txt`.

**robots.txt:** `Allow: /` for all agents, Sitemap URL declared.

---

## Comment Style and Documentation

**CSS comments:**
```css
/* ── SECTION NAME ──────────────────────────────────── */
```
Consistent `──` decoration with trailing dashes to fill the line. Used for every logical CSS section.

**HTML comments:**
```html
<!-- ═══════════════════════════ SECTION ═══════════════════════════ -->
```
Box-drawing characters create visually distinct section markers. Also used for inline code notes:
```html
<!-- Web3Forms — Access Key von https://web3forms.com eintragen -->
<!-- Card 1 -->
<!-- Projekt 2 -->
```

**JS comments:**
```js
/* ── SECTION NAME ─────────────────────────────────── */
```
Same `──` pattern as CSS. Inline `/* Honeypot check */` for single-line annotations.

**No JSDoc/TSDoc** — plain JavaScript, no type annotations or documentation comments on functions.

---

## Deviations and Inconsistencies

1. **Inline `onclick` handlers in `index.html`** (lines 115, 147, 150, 698): violates CLAUDE.md rule "Kein inline JavaScript". Other pages do not have this issue.

2. **Hardcoded `px` font sizes**: 85 occurrences of `font-size: [n]px` in `main.css` for body/component text. CLAUDE.md requires `clamp()` or `rem`. Only display/heading sizes consistently use `clamp()`.

3. **`aria-current="page"` inconsistency**: Applied correctly in nav on subpages, but uses different markup between pages — `<span aria-current="page">` in breadcrumb on some pages, `<a aria-current="page">` in nav on others. `index.html` has no `aria-current` at all (uses anchor links, which is contextually appropriate).

4. **No skip navigation link**: Absent from all pages.

5. **No focus trap in modals**: Service modal and lightbox open but do not constrain keyboard focus.

6. **`ueber-uns.html` Schema.org**: Uses a JSON-LD array `[{...}, {...}]` rather than two separate `<script>` blocks. Both approaches are valid per schema.org spec, but this differs from other pages.

7. **`form-select` uses an inline SVG `data:` URI as `background-image`** in CSS (line 713 of `main.css`). This is the only `data:` URI in the codebase — technically not base64 in HTML (it is in CSS), so it does not violate the CLAUDE.md "no base64 in HTML" rule, but it is worth noting.

_Last updated: 2026-05-01_
