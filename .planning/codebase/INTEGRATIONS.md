# External Integrations

**Analysis Date:** 2026-05-01

## APIs & External Services

### Web3Forms — Contact Form Backend

- **Purpose:** Receives contact form submissions and forwards them to `info@alanprojekt.de`
- **Endpoint:** `https://api.web3forms.com/submit` (POST)
- **Integration method:** HTML `action` attribute + JS `fetch()` in `assets/js/main.js` line 225
- **Auth:** `access_key` hidden input field — currently set to placeholder `DEIN_WEB3FORMS_KEY_HIER`
- **Pages with forms:** `index.html` (line 569), `karriere.html` (line 305), `ueber-uns.html` (line 443)
- **Spam protection:** Honeypot field `<input name="botcheck" style="display:none!important">`
- **Form fields sent:** `access_key`, `subject`, `from_name`, `redirect`, `botcheck`, `first_name`, `last_name`, `email`, `phone`, `projektart`, `message`
- **Hidden config fields per form:**
  ```html
  <input type="hidden" name="subject" value="Neue Projektanfrage — ALANBAU">
  <input type="hidden" name="from_name" value="ALANBAU Website">
  <input type="hidden" name="redirect" value="false">
  ```
- **Status:** Not live — placeholder key not replaced. Client must register at web3forms.com and insert real key.
- **Privacy disclosure:** Documented in `datenschutz.html` line 141 — references `web3forms.com/privacy`

## CDN-Loaded Resources

### Google Fonts

- **Purpose:** Typography for entire site — display and body fonts
- **Fonts loaded:**
  - `Barlow` weights 400, 500, 600 (body font)
  - `Barlow Semi Condensed` weights 600, 700, 800 (display/headline font)
- **URL:** `https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Semi+Condensed:wght@600;700;800&display=swap`
- **Performance:** `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` present on every page
- **Present in:** All 8 HTML pages — `index.html`, `leistungen.html`, `projekte.html`, `ueber-uns.html`, `karriere.html`, `impressum.html`, `datenschutz.html`, `agb.html`

## External Links (Non-API)

### Google Maps

- **Type:** External link only (not embedded iframe or Maps JavaScript API)
- **Usage:** Footer address link on every page
- **URL pattern:** `https://maps.google.com/?q=Willy-Brandt-Platz+2,+12529+Schönefeld`
- **No API key required** — plain query link, opens Google Maps in new tab

### LinkedIn

- **Type:** External profile link only (no SDK, no embed, no pixel)
- **URL:** `https://www.linkedin.com/company/alan-consulting-bau-projektmanagement-gmbh/`
- **Present in:** Footer of all pages + Schema.org `sameAs` in `index.html`

### XING

- **Type:** External profile link only (no SDK, no embed)
- **URL:** `https://www.xing.com/pages/alan-projektmanagement-gmbh/about_us`
- **Present in:** Footer of all pages + Schema.org `sameAs` in `index.html`

## Structured Data (Schema.org)

All Schema.org data is embedded as `<script type="application/ld+json">` — no external service.

| Page | Schema Type | File |
|------|-------------|------|
| `index.html` | `LocalBusiness` + `GeoCoordinates` + `PostalAddress` | lines 38–68 |
| `leistungen.html` | `BreadcrumbList` | lines 38–47 |
| `projekte.html` | `BreadcrumbList` | lines 38–47 |
| `ueber-uns.html` | `Organization` + `Person` + `BreadcrumbList` | head section |
| `karriere.html` | `BreadcrumbList` | head section |
| `impressum.html` | `BreadcrumbList` | head section |
| `datenschutz.html` | `BreadcrumbList` | head section |
| `agb.html` | `BreadcrumbList` | head section |

## Analytics & Tracking

- **None detected.** No Google Analytics, no Google Tag Manager, no Meta Pixel, no Matomo, no Plausible, no Hotjar, or any other tracking script present in any file.

## Payment & E-commerce

- **None.** No payment processor integration.

## CMS & Headless

- **None.** No CMS. All content is hardcoded HTML. No API calls to any CMS backend.

## Email

- **No direct email service integration.** Email delivery is handled by Web3Forms (see above) which routes to `info@alanprojekt.de`.

## Environment Variables & Config Keys

| Key | Location | Value | Status |
|-----|----------|-------|--------|
| Web3Forms access_key | `index.html` line 571 | `DEIN_WEB3FORMS_KEY_HIER` | Placeholder — not live |
| Web3Forms access_key | `karriere.html` line 306 | `DEIN_WEB3FORMS_KEY_HIER` | Placeholder — not live |
| Web3Forms access_key | `ueber-uns.html` line 444 | `DEIN_WEB3FORMS_KEY_HIER` | Placeholder — not live |

No `.env` file exists. No other secrets or API keys present.

## Cookie / Consent

- **Self-implemented** — no Cookiebot, OneTrust, or any consent management platform
- Cookie banner state stored in `localStorage` under key `alanbau_cookie_consent`
- Values: `'accepted'` or `'declined'`
- Implementation: `assets/js/main.js` lines 182–200

## Webhooks & Callbacks

- **Incoming:** None
- **Outgoing:** POST to `https://api.web3forms.com/submit` on form submit (JavaScript fetch, not a server webhook)

## Sitemap & SEO Services

- **Sitemap:** Self-hosted static file at `sitemap.xml` — references `https://www.alanbau.de/` canonical URLs
- **Robots:** `robots.txt` allows all crawlers, references sitemap URL
- **No external SEO SaaS** (no Ahrefs, SEMrush, or similar integrations)

---

_Last updated: 2026-05-01_
