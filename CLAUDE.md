# CLAUDE.md — alanbau.de · Aktives Projekt

## Design Role & Philosophy

Arbeite als **Senior Web Designer, UI/UX-Designer und Frontend-Entwickler mit 15+ Jahren Erfahrung** für Bauunternehmen. Maßstab: Premium-Agentur-Qualität (Referenz: thost.de, goldbeck.de, dreso.com).

- Klar, modern, professionell — kein visuelles Rauschen
- Vertrauen und Anfragen als primäre Ziele — jede Seite führt zur Kontaktaufnahme
- Ein H1 pro Seite, keine Heading-Sprünge
- Corporate-Aesthetic Baubranche — seriös, kompetent, verlässlich

---

## Architektur

**Statisches Multi-Page HTML** — kein React, kein SPA, kein Build-Step. Deploybar auf Hostinger Shared Hosting. **Goldene Regel: KEIN base64 im HTML.**

---

## Design-System

### Farben
```css
--bg:          #FFFFFF
--bg-alt:      #F4F5F7
--bg-dark:     #111111
--red:         #CC1020
--red-hover:   #A80E1A
--red-pale:    #FFF0F1
--text:        #111111
--text-muted:  #6B7280
--border:      #E5E7EB
```

### Typografie
- **Display/Headlines:** `Barlow Semi Condensed` (Google Fonts)
- **Body:** `Barlow` (Google Fonts)

### Abstände
- Section-Padding: `80px 0` (Desktop), `48px 0` (Mobile)
- Container: `1200px`, `margin: 0 auto`, `padding: 0 24px`
- Grid-Gap: `32px`

### Buttons
- Primary: `background: #CC1020`, weiß, `border-radius: 4px`, `padding: 14px 32px`
- Ghost: transparenter Hintergrund, roter Border
- Hover: `#A80E1A`

---

## Firmendaten

```
Firma:    Alan Projektmanagement GmbH
GF:       Mehmet Emre Alan
Adresse:  Willy-Brandt-Platz 2, 12529 Schönefeld
Tel:      +49 30 258 141 642
E-Mail:   info@alanprojekt.de
Website:  www.alanbau.de
HRB:      251074 B · Amtsgericht Berlin-Charlottenburg
USt-ID:   DE 360360535
Kammer:   IHK Cottbus
LinkedIn:  https://www.linkedin.com/company/alan-consulting-bau-projektmanagement-gmbh/
XING:      https://www.xing.com/pages/alan-projektmanagement-gmbh/about_us
Instagram: https://www.instagram.com/alaninteriordesign/
```

---

## Navigation (Final)

```
ALANBAU [Logo]    Leistungen · Projekte · Unternehmen · Karriere · Kontakt    [Anfrage stellen →]
```

Alle internen Links: relative Pfade (`./leistungen.html` etc.) — Logo → `./index.html`

---

## Formular-Backend

**Web3Forms** — POST an `https://api.web3forms.com/submit`
- Key-Platzhalter: `DEIN_WEB3FORMS_KEY_HIER` (noch einzutragen in index.html, leistungen.html, karriere.html, ueber-uns.html)
- Honeypot: `<input name="botcheck" style="display:none">` ✅ bereits vorhanden
- Pflichtfelder: Vorname, E-Mail, Nachricht

---

## Technische Regeln (nicht verhandelbar)

1. Kein base64 im HTML — weder Bilder noch Fonts noch Video
2. Kein inline JavaScript — Event-Handler gehören in main.js
3. Ein H1 pro Seite
4. Labels auf allen Formularfeldern — kein Placeholder als Ersatz
5. `loading="lazy"` auf allen `<img>` die nicht above-the-fold sind
6. `rel="noopener noreferrer"` auf allen `target="_blank"` Links
7. Font-Größen: `px` für feste Werte, `clamp()` für fluid scaling bei Headlines

---

## Projektstand — Milestone M1 abgeschlossen (7/7 Phasen, 20/20 Plans)

| Datei | Status |
|---|---|
| index.html | ✅ Clean — Contact-Person-Card (Mehmet Emre Alan) |
| leistungen.html | ✅ Clean — 400+ Wörter/Sektion, USP + Prozess + Inline-CTAs |
| projekte.html | ✅ Clean — „Mehr erfahren"-Links auf 3 Karten |
| projekte/residenz-am-park.html | ✅ Neu — Wohnungsbau Detail-Seite |
| projekte/buerozentrum-techpark.html | ✅ Neu — Gewerbebau Detail-Seite |
| projekte/produktionshalle-brandenburg.html | ✅ Neu — Industriebau Detail-Seite |
| karriere.html | ✅ Clean |
| ueber-uns.html | ✅ Clean |
| branchen.html | ✅ Clean |
| nachhaltigkeit.html | ✅ Clean |
| lean.html | ✅ Clean |
| impressum.html | ✅ Clean |
| datenschutz.html | ✅ Clean |
| agb.html | ✅ Clean |
| blog/ | ✅ PHP-Blog mit index, Artikel, 5 Themen-Seiten, RSS-Feed |
| sitemap.xml | ✅ 22 Einträge |
| assets/css/main.css | ✅ Vollständig (~2360 Zeilen) |
| assets/js/main.js | ✅ Vollständig |
| assets/js/i18n.js | ✅ DE/EN inline, 220+ Keys |

### Noch offen (Client-Aufgaben)
- [ ] Web3Forms-Key eintragen (index.html, leistungen.html, karriere.html, ueber-uns.html)
- [ ] Portrait-Foto Mehmet Emre Alan liefern → ersetzt `bueroraum.jpg` Platzhalter in #contact
- [ ] Echte Referenzdaten in projekte.html und Detail-Seiten einpflegen

---

## Leistungen — 3 Säulen (Ankerpunkte)

| Leistung | Anker |
|---|---|
| Bau-Projektmanagement | `#projektmanagement` |
| Hoch- & Tiefbau | `#hochtiefbau` |
| Baudienstleistungen | `#baudienstleistungen` |

---

## SEO-Template (für neue Seiten)

```html
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Seitenspezifisch] · Alan Projektmanagement GmbH — ALANBAU</title>
  <meta name="description" content="[Max. 155 Zeichen]">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.alanbau.de/[seite].html">
  <meta property="og:title" content="[Titel]">
  <meta property="og:description" content="[Beschreibung]">
  <meta property="og:image" content="https://www.alanbau.de/assets/images/[bild].jpg">
  <meta property="og:url" content="https://www.alanbau.de/[seite].html">
  <meta property="og:type" content="website">
```

Schema.org auf Unterseiten: `BreadcrumbList` (Position 1 = Startseite, Position 2 = aktuelle Seite, Position 3 = Detail-Seite ohne `item`-Property)

**Für Seiten in Unterordnern (projekte/*.html):** alle Asset-Pfade mit `../` prefix — niemals `./`

---

## Asset-Inventar

**Originale:** `/Users/sedatceylan/claude/orginal web alan/hostinger-export/`
**Eingebunden:** `./assets/images/` (relativer Pfad immer ohne führenden Slash)

### Schlüssel-Assets (tatsächliche Dateinamen auf Disk)
| Dateiname | Verwendung |
|---|---|
| `logo.png` | Nav + Footer Logo |
| `favicon.ico` | Browser-Tab |
| `hero-video.mp4` (assets/video/) | Hero-Hintergrundvideo |
| `bueroraum.jpg` / `.webp` | Contact-Person Platzhalter (→ durch Portrait ersetzen) |
| `baustelle-1.jpg` / `.webp` | Allgemeine Baustelle (Galerie-Slot) |
| `bauarbeiter.jpg` / `.webp` | Team auf der Baustelle (Galerie-Slot) |
| `architekturplaene.jpg` / `.webp` | Architekturpläne |
| `zertifikat-ihk-cottbus.png` / `.webp` | IHK Cottbus Zertifikat |
| `zertifikat-architektenkammer.png` / `.webp` | Architektenkammer Zertifikat |

### Projektfotos
| Dateiname | Projektname |
|---|---|
| `projekt-residenz-am-park.jpg` / `.webp` | Residenz am Park (Detail-Seite) |
| `projekt-buerozentrum-techpark.jpg` / `.webp` | Bürozentrum Techpark (Detail-Seite) |
| `projekt-produktionshalle.jpg` / `.webp` | Produktionshalle Brandenburg (Detail-Seite) |
| `projekt-mfh-berlin.jpg` / `.webp` | MFH Berlin-Neukölln |
| `projekt-wohnquartier-stadtmitte.jpg` / `.webp` | Wohnquartier Stadtmitte |
| `projekt-stadthaus-modern.jpg` / `.webp` | Stadthaus Modern |
| `projekt-seniorenwohnen.jpg` / `.webp` | Seniorenwohnen Gartenblick |
| `projekt-villa-sonnenhang.jpg` / `.webp` | Villa Sonnenhang |
| `projekt-familienhaus-waldblick.jpg` / `.webp` | Familienhaus Waldblick |
| `projekt-neubau-gewerbe.jpg` / `.webp` | Neubau Gewerbe |
| `projekt-solar.jpg` / `.webp` | Solar Energie Projekt |
| `projekt-sonnenallee2.png` | Sonnenallee 2 (echtes Projekt) |

**WICHTIG:** `construction-site-1` und `construction-workers` existieren NICHT auf Disk — immer `baustelle-1` und `bauarbeiter` verwenden.

---

## Deployment

Upload aller Dateien aus `alanbau v2/` → Hostinger `public_html/`
