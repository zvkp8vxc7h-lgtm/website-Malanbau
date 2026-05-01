<!-- refreshed: 2026-05-01 -->
# Architecture

**Analysis Date:** 2026-05-01

## System Overview

```text
┌──────────────────────────────────────────────────────────────┐
│                  Browser — Static HTML MPA                   │
├───────────┬───────────┬───────────┬──────────┬──────────────┤
│ index.html│leistungen │ projekte  │ ueber-uns│karriere /    │
│ (homepage)│  .html    │  .html    │  .html   │impressum /   │
│           │           │           │          │datenschutz / │
│           │           │           │          │   agb.html   │
└─────┬─────┴─────┬─────┴─────┬─────┴────┬─────┴──────┬───────┘
      │           │           │          │            │
      └───────────┴───────────┴──────────┘            │
                       │                              │
              ┌────────▼────────┐          ┌──────────▼──────┐
              │ assets/css/     │          │ assets/js/      │
              │   main.css      │          │   main.js       │
              │  (1,695 lines)  │          │  (264 lines)    │
              └─────────────────┘          └─────────────────┘
                                                    │
                                          ┌─────────▼──────────┐
                                          │ External API:       │
                                          │ web3forms.com/submit│
                                          │ fonts.googleapis.com│
                                          └────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Homepage | Full one-page experience: hero, services, projects, about, contact | `index.html` |
| Services page | Three service pillars in full detail with lists | `leistungen.html` |
| Projects page | Filterable project gallery with lightbox | `projekte.html` |
| About page | Company profile, team, office, certifications, brands | `ueber-uns.html` |
| Career page | Job listings and application form | `karriere.html` |
| Legal pages | Impressum, Datenschutz, AGB | `impressum.html`, `datenschutz.html`, `agb.html` |
| Stylesheet | Complete design system — all pages share one file | `assets/css/main.css` |
| JavaScript | All interactivity for all pages — one IIFE bundle | `assets/js/main.js` |

## Pattern Overview

**Overall:** Static Multi-Page Application (MPA) — no build step, no framework, no Node.js. Deployable by FTP upload.

**Key Characteristics:**
- Each HTML file is a self-contained page with nav, content, and footer copied in full
- One global `main.css` and one global `main.js` are loaded by every page
- No server-side rendering; no templating engine; content is hardcoded in HTML
- No JavaScript module system — single IIFE (`(function(){...})()`) with `'use strict'`
- Form submission via `fetch()` to `https://api.web3forms.com/submit` (no server needed)

## Layers

**Presentation Layer:**
- Purpose: Page markup, content, SEO metadata, Schema.org JSON-LD
- Location: `*.html` (root directory)
- Contains: Structural HTML, inline `<script type="application/ld+json">`, no inline styles (except one `style="display:none"` on cookie banner)
- Depends on: `assets/css/main.css`, `assets/js/main.js`
- Used by: All browsers directly

**Style Layer:**
- Purpose: Complete design system — variables, reset, component styles, responsive breakpoints
- Location: `assets/css/main.css`
- Contains: CSS custom properties, section-scoped component classes, three responsive breakpoints
- Depends on: Google Fonts (external CDN)
- Used by: All HTML pages

**Behavior Layer:**
- Purpose: All interactive JavaScript
- Location: `assets/js/main.js`
- Contains: Navbar scroll state, hamburger menu, smooth scroll, scroll reveal (IntersectionObserver), 3D card tilt, service modal, lightbox, cookie banner, contact form (fetch), project filter
- Depends on: DOM IDs and data attributes in HTML
- Used by: All HTML pages (graceful no-op if element not found — each function guards with `if (element)`)

**Asset Layer:**
- Purpose: Images, video, favicon
- Location: `assets/images/`, `assets/video/`, `assets/favicon.ico`
- Contains: 36 image files (`.jpg`, `.webp`, `.png`), 1 video (`hero.mp4`)

## Data Flow

### Contact Form Submission

1. User fills `#contact-form` (`index.html:569`, `karriere.html` — duplicate form)
2. `main.js` intercepts `submit` event, checks honeypot field `botcheck`
3. `fetch('https://api.web3forms.com/submit', { method: 'POST', body: FormData })`
4. On `json.success`: shows `#form-success`; on error: shows `#form-error`
5. No server-side code involved — all handled by Web3Forms SaaS

### Page Navigation

- Internal links use relative paths: `./leistungen.html`, `./projekte.html`, etc.
- Anchor navigation on homepage: `href="#services"`, `href="#projects"`, `href="#contact"` (smooth-scrolled by `main.js`)
- On subpages, "Kontakt" links redirect to `./index.html#contact` (cross-page anchor)
- "Anfrage stellen →" CTA button on homepage is a `<button onclick="...scrollIntoView(...)">` (inline handler — exception to the no-inline-JS rule)
- On subpages, "Anfrage stellen →" is an `<a href="./index.html#contact">` link

### Scroll Reveal

1. All elements with class `reveal` start as `opacity:0; transform:translateY(32px)`
2. `main.js` IntersectionObserver triggers at `threshold:0.12`
3. Class `visible` added → CSS transitions to `opacity:1; transform:none`
4. Observer disconnects after first trigger (`revealObserver.unobserve`)

### Project Filter (`projekte.html` only)

1. Filter tabs carry `data-filter="alle|wohnungsbau|gewerbebau"`
2. Project cards carry `data-category="wohnungsbau|gewerbebau"`
3. On tab click: non-matching cards get `hidden` attribute, matching cards have it removed
4. CSS rule `.project-card-full[hidden] { display: none; }` hides them

## Key Abstractions

**Service Card (`data-service`):**
- Purpose: Clickable card that opens a service details modal
- Examples: `index.html:177–207` (3 cards with `data-service="projektmanagement|hochtiefbau|baudienstleistungen"`)
- Pattern: `data-service` attribute on any element → JS reads it → looks up `svcData[key]` object in `main.js` → populates `#svc-modal-overlay`

**Project Card (`data-lightbox`):**
- Purpose: Clickable card that opens fullscreen image lightbox
- Examples: `projekte.html:134–`, `index.html:432–`
- Pattern: `data-lightbox="./path/to/img.jpg"` + `data-lightbox-alt="..."` on any element → JS opens `#lightbox`

**Reveal Animation:**
- Purpose: Fade-up entrance animation on scroll
- Usage: Add class `reveal` to any element — JS handles the rest automatically
- CSS: `assets/css/main.css:1023–1028`

**Page Hero vs. Full Hero:**
- `index.html` uses `#hero` (fullscreen video background, 100vh)
- All subpages use `.page-hero` (dark background, fixed height, breadcrumb + H1)
- CSS: `assets/css/main.css:1037–1073`

## Entry Points

**Homepage:**
- Location: `index.html`
- Triggers: Direct URL `/` or `./index.html`
- Responsibilities: Full marketing page — all sections on one page (hero, services, infographics, projects, about, contact)

**Subpages (leistungen, projekte, ueber-uns, karriere):**
- Location: `leistungen.html`, `projekte.html`, `ueber-uns.html`, `karriere.html`
- Triggers: Nav links or direct URL
- Responsibilities: Dedicated content pages; each has full nav + footer copy

**Legal Pages (impressum, datenschutz, agb):**
- Location: `impressum.html`, `datenschutz.html`, `agb.html`
- Responsibilities: Compliance content; use `.legal-content` and `.legal-toc` CSS classes

## Page Routing Strategy

There is no router. Navigation is via standard `<a href>` links:

| Target | Link style | Example |
|--------|-----------|---------|
| Another page | Relative file path | `./leistungen.html` |
| Section on same page | Anchor | `#contact` |
| Section on another page | Path + anchor | `./index.html#contact` |
| Service anchor on leistungen | Path + anchor | `./leistungen.html#projektmanagement` |

**Active nav item:** Manually set via inline `style="color:var(--red)"` on the active `<a>` (example: `projekte.html:82`). Not automated — must be set per page.

## CSS Architecture

**System:** Custom properties-first, component-scoped classes. Not BEM, not utility-first.

**Structure in `main.css`:**
1. `:root` — all design tokens (colors, shadows, radius, transitions, container, nav height, fonts)
2. Reset + base (`*`, `html`, `body`, `img`, `a`, `ul`, `h1–h5`)
3. Global utilities (`.container`, `.section`, `.section--alt`, `.section-label`, `.section-title`, `.section-sub`)
4. Button variants (`.btn-primary`, `.btn-ghost`, `.btn-hero`, `.btn-white`)
5. Component blocks (navbar, hero, services, projects, about, contact, form, footer, modals, cookie banner)
6. Page-specific sections (`/* ── LEISTUNGEN PAGE`, `/* ── PROJEKTE PAGE`, etc.)
7. Animations (`@keyframes fadeUp`, `@keyframes scrollPulse`, `@keyframes spin`)
8. Responsive breakpoints at `1024px`, `768px`, `480px`

**Naming convention:** Kebab-case class names; block-prefixed for component elements:
- `.service-card`, `.service-num`, `.service-icon`, `.service-desc`, `.service-link`
- `.project-card`, `.project-img`, `.project-card-content`, `.project-name`, `.project-tags`, `.project-tag`
- `.footer-grid`, `.footer-brand`, `.footer-col`, `.footer-social`, `.footer-bottom`

**Color approach:** All colors via CSS variables (`var(--red)`, `var(--text)`, etc.) — never hardcoded hex in component rules.

**Font approach:** Two fonts only — `var(--font)` (Barlow, body text) and `var(--font-display)` (Barlow Semi Condensed, all headings).

**Responsive approach:** Mobile-first is NOT used. Desktop is base; media queries progressively simplify. Key breakpoints:
- `max-width: 1024px` — collapse multi-column grids to 2-column or 1-column
- `max-width: 768px` — hide nav links, show hamburger; reduce padding
- `max-width: 480px` — stack footer to single column; stack hero CTAs

## JavaScript Architecture

**Pattern:** Single IIFE (`(function(){'use strict'; ...})()`) loaded via `<script src="./assets/js/main.js" defer>`.

**No modules.** No `import`/`export`. No external libraries. No jQuery.

**Module sections (comment-delimited within the IIFE):**
1. Navbar scroll state — `window.scroll` listener toggles `.scrolled` class
2. Hamburger menu — open/close functions, `Escape` key handler
3. Smooth scroll — `querySelectorAll('a[href^="#"]')` with CSS variable `--nav-h` offset
4. Scroll reveal — `IntersectionObserver` on `.reveal` elements
5. 3D card tilt — `mousemove` / `mouseleave` on `.tilt-card`
6. Service modal — `svcData` object keyed by service name; populates `#svc-modal-overlay`
7. Lightbox — `data-lightbox` attribute triggers `#lightbox`
8. Cookie banner — `localStorage` key `alanbau_cookie_consent`
9. Contact form — `fetch()` to Web3Forms, honeypot check, loading state
10. Project filter — `data-filter` tabs + `data-category` cards (only active on `projekte.html`)

**State management:** No global state object. State is held directly in the DOM (class toggling: `.open`, `.active`, `.visible`, `.scrolled`) and `localStorage` (cookie consent).

**Data in JS:** Service modal content (`svcData` object, `main.js:81–130`) is the only non-DOM data. It is hardcoded in JS, not fetched.

**Event delegation:** Not used globally. Each element is directly bound. Guards like `if (hamburger) hamburger.addEventListener(...)` prevent errors on pages where the element does not exist.

## Content Management

All content is hardcoded in HTML. There is no CMS, no API, no database. To update:
- Text: edit the HTML file directly
- Contact form key: replace `DEIN_WEB3FORMS_KEY_HIER` in each HTML file that contains a form
- Service modal copy: edit `svcData` in `assets/js/main.js:81–130`
- Project data: edit cards in `projekte.html` directly

## Error Handling

**Contact form:** Try/catch around `fetch()`. On failure, shows `#form-error` with fallback `mailto:` link.

**JS null guards:** Every DOM query followed by `if (element)` before attaching listeners — prevents crashes on pages missing optional elements.

**No server errors to handle** — pure static hosting.

## Cross-Cutting Concerns

**Security headers:** Set as `<meta http-equiv>` in every HTML `<head>`:
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

**SEO:** Every page has unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph tags, and `<script type="application/ld+json">` Schema.org markup.

**Accessibility:** All images have `alt` attributes; decorative elements use `aria-hidden="true"`; nav has `role="navigation"` + `aria-label`; modals have `role="dialog"` + `aria-modal`; form inputs all have `<label>` elements; hamburger button uses `aria-expanded`.

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` block at `main.css:1649` disables all animations and hero entrance animations.

**External links:** All `target="_blank"` links include `rel="noopener noreferrer"`.

## Anti-Patterns

### Inline onclick handlers on homepage hero buttons

**What happens:** `<button onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'})">` in `index.html:115,147,150`

**Why it's wrong:** Violates the project's own rule (CLAUDE.md: "Kein inline JavaScript — Event-Handler gehören in main.js").

**Do this instead:** Give the button an ID or data attribute and bind the handler in `main.js`, matching the pattern used for all other interactive elements.

### Nav active state set via inline style

**What happens:** Active nav link uses `style="color:var(--red)"` hardcoded in each page's HTML (e.g., `projekte.html:82`).

**Why it's wrong:** Must be manually maintained per page; easy to forget when adding pages.

**Do this instead:** Add a `data-page` attribute on `<body>` and use a CSS rule like `[data-page="projekte"] .nav-links a[href="./projekte.html"]` to apply the active color automatically.

### Nav/footer/cookie banner copied verbatim into every HTML file

**What happens:** The full `<nav>`, `<footer>`, `.cookie-banner`, and `.nav-mobile-overlay` blocks are copy-pasted into all 8 HTML files.

**Why it's wrong:** A change to nav items (e.g., adding a new page) requires editing all 8 files.

**Do this instead:** Use server-side includes (if Apache/Nginx supports it) or accept the tradeoff as a constraint of static hosting with no build step.

---

_Last updated: 2026-05-01_
