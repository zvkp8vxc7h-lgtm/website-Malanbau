# Codebase Structure

**Analysis Date:** 2026-05-01

## Directory Layout

```
alanbau v2.1/                     # Project root — deploy contents of this folder to public_html/
│
├── index.html                    # Homepage (713 lines) — hero video, services, projects, about, contact
├── leistungen.html               # Services page (447 lines) — 3-pillar detail with lists
├── projekte.html                 # Projects gallery (402 lines) — filterable, lightbox-enabled
├── ueber-uns.html                # About page (579 lines) — team, office, certs, sister brands
├── karriere.html                 # Career page (440 lines) — job listings, application form
├── impressum.html                # Legal: Imprint (226 lines)
├── datenschutz.html              # Legal: Privacy policy (256 lines)
├── agb.html                      # Legal: Terms & conditions (226 lines)
│
├── robots.txt                    # Allows all crawlers; links sitemap
├── sitemap.xml                   # 8 URLs, all pages listed
├── CLAUDE.md                     # Project instructions for Claude Code
│
├── assets/
│   ├── favicon.ico               # Browser tab icon
│   │
│   ├── css/
│   │   └── main.css              # Entire design system (1,695 lines) — shared by all pages
│   │
│   ├── js/
│   │   └── main.js               # All JavaScript (264 lines) — shared by all pages
│   │
│   ├── images/                   # 36 image files
│   │   ├── logo.png              # Nav + footer logo
│   │   ├── company-logo.png      # Alternative logo variant
│   │   │
│   │   ├── bauprojekt.jpg        # Hero poster / OG default image
│   │   ├── bauarbeiter.jpg       # Workers on site
│   │   ├── architekturplaene.jpg # Architectural plans
│   │   ├── besprechungsraum.jpg  # Meeting room (about page)
│   │   ├── buero.jpg             # Office view
│   │   ├── bueroraum.jpg         # Office room (alternate)
│   │   ├── baustelle-1.jpg       # Construction site 1
│   │   ├── baustelle-2.jpg       # Construction site 2
│   │   ├── gebaeude.jpg          # Building exterior
│   │   ├── modernes-gebaeude.jpg # Modern building
│   │   ├── nachhaltiges-bauen.jpg# Sustainable construction
│   │   ├── team-meeting.webp     # Team meeting (index.html Beratung section)
│   │   ├── baumanagement.webp    # Construction management
│   │   ├── projektmanagement.webp# Project management hero (leistungen OG image)
│   │   ├── bim-hero.webp         # BIM hero (unused — for potential BIM page)
│   │   ├── bim-koordination.jpg  # BIM coordination (unused)
│   │   ├── projektphase-infografik.jpg    # Phase overview infographic (index.html)
│   │   ├── projektmanagement-infografik.jpg # PM org chart infographic (index.html)
│   │   ├── zertifikat-ihk-cottbus.png     # IHK certificate logo
│   │   ├── zertifikat-architektenkammer.png # Chamber certificate logo
│   │   │
│   │   ├── projekt-residenz-am-park.jpg   # Project card image
│   │   ├── projekt-buerozentrum-techpark.jpg
│   │   ├── projekt-mfh-berlin.jpg
│   │   ├── projekt-wohnquartier-stadtmitte.jpg
│   │   ├── projekt-stadthaus-modern.jpg
│   │   ├── projekt-seniorenwohnen.jpg
│   │   ├── projekt-villa-sonnenhang.jpg
│   │   ├── projekt-familienhaus-waldblick.jpg
│   │   ├── projekt-produktionshalle.jpg
│   │   ├── projekt-solar.jpg
│   │   ├── projekt-neubau-gewerbe.jpg
│   │   └── projekt-sonnenallee2.png       # Real reference project photo
│   │
│   └── video/
│       └── hero.mp4              # Homepage fullscreen background video
│
└── .planning/
    └── codebase/                 # GSD planning documents
        ├── ARCHITECTURE.md
        └── STRUCTURE.md
```

## Entry Points

**Primary entry point:**
- `index.html` — the homepage; default file served at `https://www.alanbau.de/`

**Secondary page entry points:**
- `leistungen.html` — accessed via nav "Leistungen" or footer links
- `projekte.html` — accessed via nav "Projekte" or "Alle Projekte →" button on homepage
- `ueber-uns.html` — accessed via nav "Unternehmen"
- `karriere.html` — accessed via nav "Karriere"

**Legal entry points** (footer links only):
- `impressum.html`, `datenschutz.html`, `agb.html`

## Files Shared Across All Pages

Every HTML page loads these two files:

| File | Size | Purpose |
|------|------|---------|
| `assets/css/main.css` | 1,695 lines | Full design system |
| `assets/js/main.js` | 264 lines | All interactivity |

Every HTML page also contains these HTML blocks, copied verbatim:

| Block | Content |
|-------|---------|
| `<head>` security meta tags | 3 `http-equiv` tags (`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) |
| `<link>` to Google Fonts | Barlow + Barlow Semi Condensed, weights 400/500/600/700/800 |
| `.cookie-banner` | Full cookie accept/decline UI with IDs `cookie-banner`, `cookie-accept`, `cookie-decline` |
| `.nav-mobile-overlay` | Full-screen mobile menu with links |
| `<nav id="navbar">` | Logo + nav links + lang toggle + CTA button + hamburger |
| `<footer>` | 4-column footer grid + bottom bar with legal links |

## File Naming Conventions

**HTML pages:** Lowercase, hyphenated German words matching the URL slug:
- `ueber-uns.html` (not `ueber_uns.html` or `ueberuns.html`)
- `datenschutz.html`, `karriere.html`

**Images:** Two distinct naming patterns:

1. General/editorial images — descriptive German words, lowercase, hyphenated:
   - `besprechungsraum.jpg`, `bauarbeiter.jpg`, `architekturplaene.jpg`

2. Project images — prefixed with `projekt-`, then project name, lowercase, hyphenated:
   - `projekt-residenz-am-park.jpg`, `projekt-mfh-berlin.jpg`
   - Exception: `projekt-sonnenallee2.png` (uses number, not hyphen)

**Certificates/logos:** Descriptive prefix:
- `zertifikat-ihk-cottbus.png`, `zertifikat-architektenkammer.png`

**Mixed formats:** `.jpg` is default; `.webp` for some editorial images (`team-meeting.webp`, `baumanagement.webp`, `projektmanagement.webp`, `bim-hero.webp`); `.png` for logos and project `sonnenallee2`

## Page Anatomy — Two Templates

### Template A: Homepage (`index.html`)

All sections on one long-scroll page, no `.page-hero`:

```
<head> — LocalBusiness Schema.org
<body>
  .cookie-banner
  .nav-mobile-overlay (anchor links: #services, #projects, #contact)
  <nav #navbar>
  <section #hero> — fullscreen video, 100vh
  <section #services .section>
  <section #projektphasen>
  <section #beratung .section>
  <section .section.section--alt> (Beratung service list)
  <section #projektmanagement-detail .section>
  <section .section.section--alt> (PM infographic)
  <section .section> (PM service list)
  <section #baumanagement .section.section--alt>
  <section .section> (Baumanagement service list)
  <section .cta-callout>
  <section #projects .section.section--alt>
  <section #about .section>
  <section #contact .section.section--alt>
  <footer>
  .svc-modal-overlay (service modal)
  .lightbox-overlay
  <script src="./assets/js/main.js" defer>
```

### Template B: Subpages (all other pages)

Dark `.page-hero` with breadcrumb replaces the video hero:

```
<head> — BreadcrumbList Schema.org
<body>
  .cookie-banner
  .nav-mobile-overlay (file links: ./leistungen.html, etc.; Kontakt → ./index.html#contact)
  <nav #navbar>
  <header .page-hero> OR <section .page-hero> — dark bg, H1, breadcrumb
  [page-specific content sections]
  <footer>
  <script src="./assets/js/main.js" defer>
```

## Asset Organization

**Images used on specific pages:**

| Page | Images used |
|------|-------------|
| `index.html` | `bauprojekt.jpg` (poster), `team-meeting.webp`, `architekturplaene.jpg`, `bauarbeiter.jpg`, `projektphase-infografik.jpg`, `projektmanagement-infografik.jpg`, `besprechungsraum.jpg`, 3 `projekt-*.jpg` |
| `leistungen.html` | `projektmanagement.webp`, `baumanagement.webp`, `nachhaltiges-bauen.jpg` |
| `projekte.html` | All 12 `projekt-*.jpg/png` files |
| `ueber-uns.html` | `buero.jpg`, `bueroraum.jpg`, `besprechungsraum.jpg`, `zertifikat-ihk-cottbus.png`, `zertifikat-architektenkammer.png` |
| `karriere.html` | `bauarbeiter.jpg` |

**Unused images** (present in `assets/images/` but not referenced in any HTML):
- `bim-hero.webp` — reserved for a potential future BIM page
- `bim-koordination.jpg` — same
- `company-logo.png` — alternate logo, not used in HTML

**Video:**
- `assets/video/hero.mp4` — used exclusively as `<video>` background in `index.html:128–130`; `bauprojekt.jpg` is set as its `poster`

## Notable File Size and Complexity

| File | Lines | Notes |
|------|-------|-------|
| `assets/css/main.css` | 1,695 | Single file for entire site — includes page-specific sections at bottom (lines ~1088–1647). No splitting by component. |
| `index.html` | 713 | Longest page — contains full homepage + service modal + lightbox markup. |
| `ueber-uns.html` | 579 | Second-longest — team card, office gallery, certifications, 7-brand grid. |
| `assets/js/main.js` | 264 | Single IIFE, reasonably compact. `svcData` object (lines 81–130) is the only hardcoded data. |
| `karriere.html` | 440 | Contains full duplicate contact form — same fields, same Web3Forms action, same `#contact-form` ID. |
| `leistungen.html` | 447 | Three service blocks with anchors `#projektmanagement`, `#hochtiefbau`, `#baudienstleistungen`. |

## Where to Add New Code

**New content page (e.g., `bim.html`):**
- Copy `karriere.html` as base template
- Change `<head>`: update `<title>`, `<meta name="description">`, `<link rel="canonical">`, OG tags, Schema.org `BreadcrumbList`
- Change `.page-hero`: update label, H1, breadcrumb text
- Add nav link to `nav-links` and `nav-mobile-overlay` in **all 8 existing HTML files**
- Add to `sitemap.xml`
- Place images in `assets/images/` using `prefix-descriptive-name.jpg` convention

**New image:**
- Place in `assets/images/`
- Use lowercase, hyphenated filenames
- Prefix project images with `projekt-`
- All `<img>` below the fold must have `loading="lazy"`

**New CSS component:**
- Add at the bottom of `assets/css/main.css`, before the `/* ── REDUCED MOTION` block
- Name classes as `component-element` (e.g., `.timeline-item`, `.timeline-date`)
- Use `var(--red)`, `var(--text)`, `var(--border)` — never hardcode hex values
- Add responsive overrides in the existing `@media (max-width: 1024px)` and `@media (max-width: 768px)` blocks at the bottom

**New JavaScript behavior:**
- Add a new named section inside the existing IIFE in `assets/js/main.js`
- Follow the `/* ── SECTION NAME */` comment delimiter pattern
- Use `const el = document.getElementById('...')` + `if (el) el.addEventListener(...)` guard pattern

**New contact form:**
- Copy the full `<form>` block from `index.html:569–628`
- Replace `DEIN_WEB3FORMS_KEY_HIER` with the actual key once the client registers at web3forms.com

---

_Last updated: 2026-05-01_
