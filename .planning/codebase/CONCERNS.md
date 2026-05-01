# Codebase Concerns

**Analysis Date:** 2026-05-01
**Project:** alanbau.de — Alan Projektmanagement GmbH
**Base path:** `alanbau v2.1/`

---

## Deployment Concerns

### 🔴 Web3Forms API Key — Placeholder Not Replaced (3 of 4 Files)

**Files:**
- `index.html` line 571: `<input type="hidden" name="access_key" value="DEIN_WEB3FORMS_KEY_HIER">`
- `karriere.html` line 306: `<input type="hidden" name="access_key" value="DEIN_WEB3FORMS_KEY_HIER">`
- `ueber-uns.html` line 444: `<input type="hidden" name="access_key" value="DEIN_WEB3FORMS_KEY_HIER">`

**Impact:** All three contact/application forms will silently fail on submission. Visitors who submit a form receive no delivery, yet see the success message (since `main.js` shows it on `json.success`). The API will return an auth error, triggering the error message path — but during testing with a non-key the behavior depends on Web3Forms' response format. Zero leads or job applications will reach the client.

**Fix:** Client registers at web3forms.com and replaces all three occurrences with the real API key. Also verify that `leistungen.html` does not need its own form — the CLAUDE.md notes it as one of the four pages requiring the key, but no form exists in the current `leistungen.html`.

### 🟡 CLAUDE.md Lists leistungen.html as Needing Web3Forms Key — No Form Present

**File:** `CLAUDE.md` line 82 lists `leistungen.html` as one of four files requiring the Web3Forms key. The current `leistungen.html` contains no form element at all.

**Impact:** Either the form was removed and CLAUDE.md is stale, or the form was accidentally omitted. If a conversion form on the Leistungen page is desired, it is missing.

**Fix:** Confirm with client whether a contact form belongs on `leistungen.html`. Update CLAUDE.md to reflect the final state.

### 🟡 Copyright Year Hardcoded as 2025 in All 8 HTML Files

**Files:** All HTML files, footer section (e.g., `index.html` line 679, `karriere.html` line 421).

**Impact:** The footer reads `© 2025 Alan Projektmanagement GmbH` and will be outdated on 1 January 2026. There is no dynamic year generation.

**Fix:** Either update the year manually each year, or replace with a small JS snippet: `document.write(new Date().getFullYear())`. Since inline scripts are forbidden per CLAUDE.md rule 2, a `<span id="year"></span>` + one line in `main.js` is the compliant approach.

### 🟢 sitemap.xml lastmod Dates Frozen at 2025-01-30

**File:** `sitemap.xml` — all `<lastmod>` values are `2025-01-30`.

**Impact:** Search engines see all pages as unchanged since January 2025 regardless of actual updates. Minor SEO signal degradation.

**Fix:** Update `<lastmod>` entries to actual last-modified dates when deploying, or automate via a deploy script.

---

## Security Concerns

### 🟡 Google Fonts Loads Before Cookie Consent

**Files:** All 8 HTML files, `<head>` section lines 30–32.

**Issue:** The Google Fonts stylesheet (`fonts.googleapis.com`) is loaded unconditionally in the `<head>` before the cookie banner is shown or the user can decline. Loading this resource transmits the user's IP address to Google servers. Under DSGVO/ePrivacy, loading third-party resources that transmit personal data (IP address) requires prior consent unless technically necessary.

The `datenschutz.html` section 4 states "Kein Tracking, keine Analyse-Tools" and only mentions `localStorage` — it does not disclose the Google Fonts IP transmission.

**Impact:** Potential DSGVO violation. German data protection authorities (e.g., LfDI Baden-Württemberg) have specifically ruled against unconditional Google Fonts loading.

**Fix options:**
1. Self-host the Barlow/Barlow Semi Condensed fonts in `assets/fonts/` and serve them from the same origin (eliminates the concern entirely).
2. Load Google Fonts only after cookie acceptance (complex, causes FOUT).
Option 1 is strongly recommended. Update `datenschutz.html` accordingly.

### 🟡 Inline `onclick` Handlers in index.html Violate CLAUDE.md Rule 2

**File:** `index.html` lines 115, 147, 150, 698.

**Examples:**
- Line 115: `onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})"`
- Line 698: `onclick="document.getElementById('svc-modal-overlay').classList.remove('active');document.body.style.overflow=''"`

**Impact:** Violates the explicit project rule "Kein inline JavaScript — Event-Handler gehören in main.js". These handlers are duplicated / inconsistent with the `main.js` smooth-scroll implementation (which already handles `a[href^="#"]` anchors). The modal close CTA inline handler also bypasses the `closeSvcModal()` function already defined in `main.js`.

**Fix:** Remove all four `onclick` attributes. For the scroll buttons, convert `<button>` elements to `<a href="#contact">` / `<a href="#services">` / `<a href="#projects">` anchors (the smooth-scroll listener in `main.js` already covers these). For the modal CTA (line 698), attach the event listener in `main.js` via `document.querySelector('.svc-modal-cta')`.

### 🟡 CSS Contains a data:URI (SVG) — Violates CLAUDE.md Rule 1

**File:** `assets/css/main.css` line 713.

**Content:** `background-image: url("data:image/svg+xml,%3Csvg...")` — an inline SVG chevron arrow used for the `<select>` dropdown indicator.

**Impact:** Technically violates the project rule "Kein base64 im HTML" (spirit of the rule). The SVG is tiny (< 200 bytes) so performance impact is negligible, but the rule is written to cover all asset embedding. The CLAUDE.md says "weder Bilder noch Fonts noch Video".

**Fix:** Export the chevron as `assets/images/select-arrow.svg` and reference it as `url('../images/select-arrow.svg')`. Low priority given the negligible size.

### 🟢 No Content Security Policy Header

**Files:** All HTML files. No `<meta http-equiv="Content-Security-Policy">` tag present. No `.htaccess` file in the project.

**Impact:** Without a CSP, any injected third-party script (e.g., via a compromised CDN or XSS) can execute freely. The project uses no CDN-hosted JS, so risk is low, but a basic CSP would add meaningful protection.

**Fix:** Add a CSP header via Hostinger's `.htaccess` or server config once deployed. A minimal policy: `default-src 'self'; font-src fonts.gstatic.com; style-src 'self' fonts.googleapis.com; script-src 'self';`

---

## Performance Concerns

### 🟡 logo.png is 787 KB — Not Optimized

**File:** `assets/images/logo.png` (787 KB)

**Impact:** The logo is loaded in `<head>`-adjacent nav on every page. It renders with `width="48" height="48"` (navbar) and `width="40" height="40"` (footer) — a 787 KB PNG for a 48×48 display pixel element is dramatically oversized. It will slow initial render on mobile connections.

**Fix:** Export the logo as an optimized PNG or SVG at the actual display size. A 48×48 PNG should be under 5 KB. Alternatively, use a 2× retina version at 96×96px, which should still be under 15 KB after optimization.

### 🟡 projekt-sonnenallee2.png is 913 KB

**File:** `assets/images/projekt-sonnenallee2.png` (913 KB)

**Impact:** This project card image loads lazily (`loading="lazy"`) but is still oversized for a card thumbnail. On the Projekte page all 12 images load as users scroll, making the 913 KB PNG the heaviest individual asset after the hero video.

**Fix:** Convert to WebP format (typically 60–80% size reduction) and resize to maximum display dimensions (~800px wide). Target: under 100 KB.

### 🟡 projekt-stadthaus-modern.jpg is 453 KB

**File:** `assets/images/projekt-stadthaus-modern.jpg` (453 KB)

**Impact:** Same issue as above. All project images display at roughly 400–600px wide in a 3-column grid.

**Fix:** Resize and re-compress to target ≤ 100 KB each for thumbnail use. Add `srcset` for responsive loading.

### 🟡 hero.mp4 is 7 MB — No Alternative Loading Strategy

**File:** `assets/video/hero.mp4` (7 MB)

**Impact:** The hero video auto-plays on every page load of `index.html`. On mobile, `playsinline` is set (correct), but 7 MB will be partially or fully downloaded on initial load — the browser typically loads enough to begin playback. This is a significant First Contentful Paint and LCP concern, particularly on 4G/mobile.

**Current mitigation:** `poster="./assets/images/bauprojekt.jpg"` is set (good — the poster renders before video loads). The `muted` and `playsinline` attributes are correct.

**Fix:** Compress the video to target ≤ 2 MB (H.264, CRF 28–32, 1080p max). Consider adding a WebM version with `<source type="video/webm">` before the MP4 source for better browser compression. Optionally, use JavaScript to skip video loading on mobile (`if (window.matchMedia('(max-width: 768px)').matches) { videoEl.removeAttribute('src'); }`).

### 🟡 Google Fonts is a Render-Blocking Resource

**Files:** All 8 HTML files.

**Impact:** The `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` is a synchronous stylesheet that blocks rendering until it resolves. `display=swap` is specified in the URL (reducing invisible text), but the DNS + TCP + TLS roundtrip still delays render.

**Current partial mitigation:** `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` are present on all pages — this reduces latency.

**Fix:** Self-hosting fonts (see Security section) would also eliminate this render-blocking dependency.

### 🟢 No Image srcset or sizes Attributes

**Files:** All HTML files.

**Impact:** All `<img>` tags use fixed `src` without `srcset`/`sizes`. On mobile (320–480px viewport), full-resolution images are downloaded unnecessarily.

**Fix:** Add `srcset` with 400w, 800w, 1200w variants for key content images, particularly project card images in `projekte.html` and `index.html`.

### 🟢 main.css Is Not Minified (46 KB uncompressed)

**File:** `assets/css/main.css` (46 KB, 1,695 lines uncompressed with comments and whitespace)

**Impact:** Minor. Hostinger typically serves with gzip/Brotli compression, reducing transfer size significantly. Not critical for a static site, but a minified version would be ~20–25 KB.

**Fix:** Run through a CSS minifier before deployment. Low priority if Hostinger gzip is enabled.

---

## Maintainability Concerns

### 🟡 Entire Nav + Footer HTML Duplicated Across 8 Files

**Files:** `index.html`, `leistungen.html`, `projekte.html`, `karriere.html`, `ueber-uns.html`, `impressum.html`, `datenschutz.html`, `agb.html`

**Issue:** The navbar (including cookie banner and mobile overlay) and the footer are copied verbatim into each page. Each page has ~60 lines of nav HTML and ~55 lines of footer HTML duplicated. Any change to nav links, footer content, copyright year, or social links requires updating all 8 files manually.

**Impact:** High maintenance burden. E.g., adding a new nav item requires 8 edits; updating the copyright year requires 8 edits; a footer address change requires 8 edits.

**No fix available without a build step** given the static HTML architecture. Document the 8-file update requirement prominently. If the project grows, consider migrating to a lightweight SSG (11ty, Hugo) that supports includes/partials.

### 🟡 "Unternehmen" Nav Link Inconsistent Between index.html and Subpages

**Issue:** On `index.html` (desktop and mobile nav), "Unternehmen" links to `./ueber-uns.html`. On `leistungen.html` and `projekte.html`, it links to `./index.html#about`. This means clicking "Unternehmen" from `leistungen.html` navigates to the About section on the homepage, not to the dedicated `ueber-uns.html` page.

**Files:**
- `leistungen.html` lines 68, 83: `href="./index.html#about"`
- `projekte.html` lines 68, 83: `href="./index.html#about"`
- `index.html` lines 89, 104: `href="./ueber-uns.html"` (correct)
- `karriere.html` lines 67, 83: `href="./ueber-uns.html"` (correct)
- `ueber-uns.html` lines 90, 107: `href="./ueber-uns.html"` (correct)

**Fix:** Change `href="./index.html#about"` to `href="./ueber-uns.html"` in `leistungen.html` lines 68, 83 and `projekte.html` lines 68, 83.

### 🟡 Hardcoded Inline Styles Used for Spacing and Active States

**Scope:** Widespread across `leistungen.html`, `projekte.html`, and `karriere.html`.

**Examples:**
- `leistungen.html` line 81: `style="color:var(--red)"` for active nav link
- `leistungen.html` lines 130, 215, 300: `style="margin-top:32px"` on CTA buttons
- `leistungen.html` lines 172, 257, 342: `style="margin-top:56px"` on section dividers
- `projekte.html` lines 145–321: `style="font-size:12px;color:rgba(255,255,255,0.55);margin-top:4px"` repeated on every project card (12 occurrences)
- `karriere.html` line 209: `style="background:var(--bg-alt)"` on a job card

**Impact:** Violates the CLAUDE.md principle of consistent design system. The project card metadata style (`font-size:12px; color:rgba(255,255,255,0.55)`) is repeated 12 times in `projekte.html` — any change requires 12 manual edits.

**Fix:** Create CSS classes for these patterns (e.g., `.project-card-meta`, `.leistung-cols--spaced`, `.nav-link--active`) in `main.css` and replace all inline instances.

### 🟡 CSS Contains 102 Hardcoded `px` Font Sizes vs 13 `clamp()` Uses

**File:** `assets/css/main.css`

**Issue:** CLAUDE.md rule 6 states "Keine hardcodierten px-Schriftgrößen — `clamp()` oder `rem`". The CSS has 102 `font-size: Xpx` declarations and only 13 `clamp()` declarations. Many UI text sizes (labels, tags, captions: `11px`, `12px`, `14px`) are fixed and do not scale with browser font preferences or viewport.

**Impact:** Accessibility concern — users who set a larger browser default font size will not benefit from any scaling on these elements. Also contradicts the explicit project rule.

**Fix:** Progressively convert fixed `px` font sizes to `rem` equivalents at minimum. Reserve `clamp()` for display/headline sizes. E.g., `font-size: 14px` → `font-size: 0.875rem`.

---

## SEO / Accessibility Concerns

### 🟡 Heading Hierarchy Skip in impressum.html

**File:** `impressum.html`

**Issue:** After the `<h1>Impressum.</h1>` (line 89), the next headings are `<h3>` (lines 101–138 for the company info blocks), jumping directly from H1 to H3 without an H2. The legal content sections then use H2 (lines 151+). Screen readers and document outline tools will flag this as a structural gap.

**Fix:** Change the four company info block headings (`<h3>Angaben zum Unternehmen</h3>` etc.) to `<h2>`, or restructure them as `<dt>`/`<dd>` within `<dl>` elements (which semantically fits the definition-list content).

### 🟡 projekte.html Uses `<h2>` for Project Names Inside `<article>` Cards

**File:** `projekte.html` lines 144, 160, 176, etc. (all 12 project cards)

**Issue:** Each project card uses `<h2 class="project-name">` for the project title. This places 12 `<h2>` headings at the same level as each other on a page that has only one `<h1>`. While not technically wrong (multiple H2s per page is valid), these are card titles inside `<article>` elements, making `<h3>` semantically more appropriate — the section heading would be H2 (there is none explicitly, but the page heading is H1). Note: `index.html` uses `<h3 class="project-name">` for the same project cards shown there, creating an inconsistency.

**Fix:** Change `<h2 class="project-name">` to `<h3 class="project-name">` in `projekte.html` to match the pattern used in `index.html`.

### 🟡 Language Toggle (DE/EN) Is Non-Functional — Visible UI Without Backing Feature

**Files:** All 8 HTML files, nav section.

**Code:** `<span class="active">DE</span><span style="opacity:0.3">EN</span>` — the EN span has no link, no `href`, no `aria-*` attributes, and no JavaScript handler. It is visible but inert.

**Impact:** Users may click "EN" expecting an English version and receive no feedback. Screen readers will read "DE / EN" as text with no indication that EN is inactive. CLAUDE.md explicitly lists "DE/EN Toggle entfernen oder implementieren" as an open task.

**Fix:** Either remove the language toggle entirely (`display:none` or delete the `.lang-toggle` block from all 8 files), or implement genuine EN versions of all pages and wire up the toggle. Removing is the lower-risk option until EN content exists.

### 🟡 Google Fonts Not Disclosed in Datenschutzerklärung

**File:** `datenschutz.html` section 4.

**Issue:** The privacy policy states the site uses only `localStorage` and no third-party tracking. It does not mention Google Fonts, which transmits the visitor's IP address to Google's servers (`fonts.googleapis.com`, `fonts.gstatic.com`). This is a DSGVO disclosure gap.

**Fix:** Either self-host fonts (eliminating the issue), or add a section to `datenschutz.html` disclosing Google Fonts usage, its purpose, the data transferred (IP address), the legal basis (Art. 6 Abs. 1 lit. f DSGVO — legitimate interest), and a link to Google's privacy policy.

### 🟢 Open Graph `og:type` is "website" on All Pages — Could Be More Specific

**Files:** `index.html`, `leistungen.html`, etc.

**Impact:** Minor. Service pages could use `og:type: "service"` or structured data. Not a practical concern for B2B.

### 🟢 No `<link rel="icon" sizes="...">` or Apple Touch Icon

**Files:** All HTML files. Only `<link rel="icon" href="./assets/favicon.ico">` is present.

**Impact:** Mobile browsers (especially iOS Safari) show a blank or auto-generated icon when bookmarked. Modern browsers prefer PNG favicons and Apple Touch Icons.

**Fix:** Add `<link rel="apple-touch-icon" href="./assets/images/logo.png">` and a `<link rel="icon" type="image/png" sizes="32x32" href="./assets/favicon-32x32.png">` once optimized icon files are created.

---

## Known Feature Gaps

### 🟡 leistungen.html Has No Contact Form Despite CLAUDE.md Specification

**File:** `leistungen.html` (no form present)

**CLAUDE.md** (line 82) lists `leistungen.html` as one of four pages requiring the Web3Forms key, implying a form should exist. Every other primary page (`index.html`, `karriere.html`, `ueber-uns.html`) has a form section. The Leistungen page ends with a `<section class="cta-callout">` linking to `./index.html#contact`, which works but sends users away from the page.

**Impact:** Missed conversion opportunity. Users reading the services page have to navigate away to submit an inquiry.

**Fix:** Add a contact form section to `leistungen.html`, matching the pattern in `ueber-uns.html` (reuse the same HTML block and assign the Web3Forms key).

### 🟢 Unused Image Assets in assets/images/

**Files (never referenced in any HTML):**
- `assets/images/baustelle-1.jpg` (135 KB)
- `assets/images/baustelle-2.jpg` (67 KB)
- `assets/images/bim-hero.webp` (53 KB)
- `assets/images/bim-koordination.jpg` (95 KB)
- `assets/images/buero.jpg` (113 KB)
- `assets/images/company-logo.png` (32 KB)
- `assets/images/modernes-gebaeude.jpg` (350 KB)
- `assets/images/nachhaltiges-bauen.jpg` (80 KB)

**Impact:** Approximately 925 KB of unused assets deployed to production. No functional impact but increases hosting upload time and directory noise.

**Fix:** Move unused assets to a separate archive directory or remove them before deployment. The BIM assets may be reserved for a future `alan-bim.de` page per CLAUDE.md notes.

---

## Summary Table

| Concern | Severity | File(s) |
|---|---|---|
| Web3Forms key placeholder not replaced | 🔴 Critical | `index.html:571`, `karriere.html:306`, `ueber-uns.html:444` |
| Google Fonts loads before cookie consent (DSGVO) | 🟡 Medium | All 8 HTML files, `<head>` lines 30–32 |
| Google Fonts not disclosed in Datenschutz | 🟡 Medium | `datenschutz.html` section 4 |
| Inline onclick handlers violate CLAUDE.md rule 2 | 🟡 Medium | `index.html:115,147,150,698` |
| "Unternehmen" nav link inconsistency | 🟡 Medium | `leistungen.html:68,83`, `projekte.html:68,83` |
| logo.png oversized at 787 KB | 🟡 Medium | `assets/images/logo.png` |
| hero.mp4 at 7 MB, no compression | 🟡 Medium | `assets/video/hero.mp4` |
| CSS has 102 hardcoded px font sizes | 🟡 Medium | `assets/css/main.css` |
| Inline styles for spacing/active state (widespread) | 🟡 Medium | `leistungen.html`, `projekte.html`, `karriere.html` |
| H1→H3 heading jump in impressum.html | 🟡 Medium | `impressum.html:89,101` |
| `<h2>` project names in projekte.html (vs `<h3>` in index.html) | 🟡 Medium | `projekte.html` lines 144–320 |
| Language toggle inert but visible (open task) | 🟡 Medium | All 8 HTML files |
| leistungen.html missing contact form | 🟡 Medium | `leistungen.html` |
| CLAUDE.md leistungen.html form ref is stale | 🟡 Medium | `CLAUDE.md:82` |
| Copyright year hardcoded as 2025 | 🟡 Medium | All 8 HTML files, footer |
| CSS data:URI SVG (minor rule violation) | 🟢 Low | `assets/css/main.css:713` |
| No CSP header or .htaccess | 🟢 Low | Deployment config |
| sitemap.xml lastmod dates frozen | 🟢 Low | `sitemap.xml` |
| projekt-sonnenallee2.png 913 KB | 🟢 Low | `assets/images/projekt-sonnenallee2.png` |
| No image srcset attributes | 🟢 Low | All HTML files |
| 8 unused assets (~925 KB) in images dir | 🟢 Low | `assets/images/` |
| main.css not minified | 🟢 Low | `assets/css/main.css` |
| No apple-touch-icon or modern favicon | 🟢 Low | All HTML files |

---

_Last updated: 2026-05-01_
