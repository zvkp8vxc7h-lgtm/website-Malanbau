# Technology Stack

**Analysis Date:** 2026-05-01

## Languages

**Primary:**
- HTML5 — all page markup (`index.html`, `leistungen.html`, `projekte.html`, `ueber-uns.html`, `karriere.html`, `impressum.html`, `datenschutz.html`, `agb.html`)
- CSS3 — all styling, custom properties, `clamp()`, `IntersectionObserver`-driven animations (`assets/css/main.css`)
- JavaScript ES2017+ — vanilla JS with `async/await`, IIFE module pattern (`assets/js/main.js`)

**No transpilation, no TypeScript, no preprocessors.**

## Runtime

**Environment:**
- Static files served directly — no server-side runtime required
- Compatible with any static host (Hostinger Shared Hosting target per CLAUDE.md)

**Development Server:**
- Python 3 `http.server` on port 8080 — `python3 -m http.server 8080`
- No Node.js or npm required

**Package Manager:**
- None — no `package.json`, no lockfile, no node_modules

## Frameworks

**Core:**
- None — pure vanilla HTML/CSS/JavaScript, no frontend framework (no React, Vue, Angular)

**CSS:**
- No CSS framework (no Tailwind, Bootstrap, etc.)
- Custom design system via CSS custom properties defined in `:root` in `assets/css/main.css`

**Testing:**
- None — no test framework, no test files present

**Build/Dev:**
- None — no bundler (no Webpack, Vite, Rollup, Parcel)
- No transpiler (no Babel)
- No CSS preprocessor (no Sass, Less)
- Deploy = direct file upload

## CSS Design System

**Custom properties (from `assets/css/main.css` lines 7–26):**
```css
--bg: #FFFFFF
--bg-alt: #F4F5F7
--bg-dark: #111111
--red: #CC1020
--red-hover: #A80E1A
--red-pale: #FFF0F1
--text: #111111
--text-muted: #6B7280
--border: #E5E7EB
--container: 1200px
--nav-h: 80px
```

**Responsive sizing:** `clamp()` used for font sizes (e.g., `clamp(32px, 5vw, 52px)`)
**Section padding:** `96px 0` desktop
**Container:** `max-width: 1200px`, `padding: 0 24px`

## JavaScript Approach

**Pattern:** Single IIFE in `assets/js/main.js` — all logic wrapped in `(function() { 'use strict'; })();`
**Module system:** None (no ES modules, no `import`/`export`)
**Load strategy:** `<script src="./assets/js/main.js" defer>` on every page

**Browser APIs used:**
- `IntersectionObserver` — scroll-reveal animations
- `localStorage` — cookie consent state (`alanbau_cookie_consent` key)
- `fetch` — async form submission to Web3Forms
- `FormData` — form serialization
- `window.scrollTo` with `behavior: 'smooth'`

## Key Dependencies (CDN-loaded only)

| Resource | Source | Version |
|----------|--------|---------|
| Barlow font (400, 500, 600) | Google Fonts CDN | Latest |
| Barlow Semi Condensed (600, 700, 800) | Google Fonts CDN | Latest |

No npm packages. No icon library (icons are Unicode/emoji inline).

## Configuration

**Environment:**
- No `.env` files
- No environment variables in code
- One placeholder in forms: `DEIN_WEB3FORMS_KEY_HIER` (hardcoded literal in `index.html` line 571, `karriere.html` line 306, `ueber-uns.html` line 444)

**Build:**
- No build config files (no `vite.config.*`, `webpack.config.*`, `tsconfig.json`, `.babelrc`, etc.)

## Linting & Formatting

- No ESLint config (no `.eslintrc*`)
- No Prettier config (no `.prettierrc*`)
- No Biome config
- No git hooks

## Asset Formats

**Images:** `.jpg`, `.jpeg`, `.png`, `.webp`
**Video:** `.mp4` — `assets/video/hero.mp4` used as hero background
**Favicon:** `.ico` — `assets/favicon.ico`

## Platform Requirements

**Development:**
- Any HTTP server (Python 3 `http.server` is the documented approach)
- No Node.js required

**Production:**
- Hostinger Shared Hosting (static file hosting)
- Upload contents of project root to `public_html/`
- No server-side processing required

---

_Last updated: 2026-05-01_
