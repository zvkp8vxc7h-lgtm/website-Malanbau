# Testing Patterns

**Analysis Date:** 2026-05-01

## Automated Tests

**No automated tests exist in this codebase.**

- No test files found (no `*.test.*`, `*.spec.*`)
- No test runner configuration (`jest.config.*`, `vitest.config.*`, `*.test.config.*`)
- No `package.json` — this is a static HTML project with no Node.js toolchain
- No CI pipeline configuration (no `.github/workflows/`, no `Makefile`, no shell scripts)

---

## Linting and Validation Tooling

**No linting tooling is configured.**

- No `.eslintrc*`, `eslint.config.*`, or `biome.json` found
- No `.stylelintrc*` or CSS validation config found
- No `.prettierrc*` formatting config found
- No `package.json` to hold script definitions

Code quality is enforced entirely through CLAUDE.md authoring rules, not automated tooling.

---

## Manual Testing Artifacts

No formal test plan, checklist document, or QA log file exists in the repository. The CLAUDE.md file at the project root serves as the de-facto quality specification, defining rules that should be visually verified:

- One `<h1>` per page
- No `base64` in HTML
- No inline JavaScript (with known exceptions — see CONVENTIONS.md)
- All `<img>` below the fold must have `loading="lazy"`
- All `<label>` elements present on form fields
- All `target="_blank"` links carry `rel="noopener noreferrer"`

These are author-enforced rules, not automatically checked.

---

## Browser Compatibility Considerations

**Target:** Modern browsers. No IE11 support patterns are present.

**CSS features in use that have broad support but may need awareness:**
- `clamp()` — supported in all modern browsers (Chrome 79+, Firefox 75+, Safari 13.1+)
- `aspect-ratio` — supported Chrome 88+, Firefox 89+, Safari 15+
- `backdrop-filter` — requires `-webkit-backdrop-filter` prefix for Safari; the codebase correctly includes both:
  ```css
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  ```
- CSS custom properties (`var()`) — universally supported in modern browsers
- `IntersectionObserver` in JS — supported Chrome 51+, Firefox 55+, Safari 12.1+; no polyfill present
- `async/await` in form handler — no transpilation; requires Chrome 55+, Firefox 52+, Safari 10.1+

**The codebase does not include a browserslist config.** There is no transpilation step — the JavaScript runs as-written, directly in the browser.

**Scrollbar styling** uses `::-webkit-scrollbar` (Chrome/Safari) plus `scrollbar-width` / `scrollbar-color` (Firefox). Covered for both engines.

---

## Performance Optimization Practices

**Lazy Loading:**
- `loading="lazy"` present on all `<img>` elements that are not above the fold
- Above-the-fold images NOT lazy-loaded (correct):
  - `assets/images/logo.png` in navbar (line 97, `index.html`) — no `loading` attribute
- Below-fold images correctly lazy: all project cards, about section, footer logo
- Background video has `preload` not set explicitly — browser default applies

**Resource Hints:**
- `<link rel="preconnect" href="https://fonts.googleapis.com">` — present on every page
- `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` — present on every page
- No `<link rel="preload">` for critical assets (hero video, hero poster image, or critical CSS)
- No `<link rel="dns-prefetch">` for third-party domains beyond Google Fonts

**Script Loading:**
- `<script src="./assets/js/main.js" defer>` — `defer` attribute on all pages, ensuring script runs after DOM parse

**No Minification:**
- `main.css` (1,695 lines) and `main.js` (264 lines) are unminified
- No build pipeline exists to generate minified/compressed versions
- Files are served as-authored

**Font Loading:**
- Google Fonts loaded via stylesheet with `display=swap` parameter: `?display=swap` — ensures text visible during font load using `font-display: swap`
- Both font weights loaded in a single request

**Image Formats:**
- Mix of `.jpg`, `.webp`, and `.png` in `assets/images/`
- Some images use `.webp` (`baumanagement.webp`, `bim-hero.webp`, `projektmanagement.webp`, `team-meeting.webp`) — modern format with better compression
- Most project photos are `.jpg` — no next-gen format conversion applied universally
- No responsive `srcset` or `sizes` attributes on any `<img>` — images are not served at different resolutions based on viewport

**Hero Video:**
- `autoplay loop muted playsinline` attributes set correctly for background video
- `poster="./assets/images/bauprojekt.jpg"` provides fallback image before video loads
- `aria-hidden="true"` on video element — correct for decorative media

**CSS Animations:**
- `@media (prefers-reduced-motion: reduce)` block at line 1649 of `main.css` disables all animations and transitions, and resets hero entry animations to their visible state. This is a correct and complete implementation.

**Scroll Behavior:**
- `html { scroll-behavior: smooth; }` in CSS — native smooth scroll
- JS smooth scroll override for anchor links reads `--nav-h` CSS variable to offset the fixed navbar height

---

## Accessibility Testing Evidence

No dedicated accessibility audit file, test report, or automated a11y test configuration (e.g., axe-core, Lighthouse CI) exists in the codebase.

**What is present (code evidence of a11y awareness):**

| Pattern | Status |
|---------|--------|
| `<html lang="de">` on all pages | Present |
| Semantic sectioning elements (`<nav>`, `<header>`, `<footer>`, `<section>`) | Present |
| `aria-labelledby` on content sections | Present |
| `aria-label` on icon-only controls and links | Present |
| `aria-expanded` toggled on hamburger button | Present |
| `aria-current="page"` on active nav item | Present on subpages |
| `aria-hidden="true"` on decorative emoji and elements | Present |
| `role="dialog"` + `aria-modal="true"` on modals | Present |
| `role="alert"` on form feedback messages | Present |
| `role="navigation"` + `role="dialog"` where appropriate | Present |
| Explicit `<label for="">` on all form inputs | Present |
| Escape key closes modals | Present |
| `tabindex="0"` on non-button interactive cards | Present |
| Skip-to-main-content link | **Missing** |
| Focus trap in modal dialogs | **Missing** |
| Focus restoration after modal close | **Missing** |
| Color contrast audit evidence | **None** |

---

## Overall QA Maturity Assessment

**Maturity Level: Low (manual author discipline only)**

This is a static HTML/CSS/JS site with no automated QA infrastructure whatsoever. Quality depends entirely on:

1. Author adherence to CLAUDE.md rules
2. Visual browser inspection during development
3. No regression safety net

**What works well:**
- CLAUDE.md is a well-defined authoring spec — rules are clear and specific
- Consistent HTML structure across all 8 pages suggests disciplined copy-paste from a template
- Security meta tags, `rel="noopener noreferrer"`, and honeypot form spam protection are present everywhere
- `defer` on the single script tag is correct
- `prefers-reduced-motion` media query is implemented

**Gaps to address before production:**
1. Add `<link rel="preload">` for the hero video or its poster image on `index.html`
2. No minification step — `main.css` and `main.js` should be minified for production
3. No `srcset` on images — single resolution served to all viewports
4. 4 inline `onclick` handlers in `index.html` violate the stated JS rule
5. No focus trap in `.svc-modal` or `.lightbox-overlay`
6. No skip navigation link
7. No automated HTML validation, linting, or accessibility checks
8. Web3Forms access key placeholder (`DEIN_WEB3FORMS_KEY_HIER`) remains in `index.html`, `leistungen.html`, `karriere.html`, `ueber-uns.html` — forms will not work until the client registers and fills in the key

_Last updated: 2026-05-01_
