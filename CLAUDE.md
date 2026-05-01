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
LinkedIn: https://www.linkedin.com/company/alan-consulting-bau-projektmanagement-gmbh/
XING:     https://www.xing.com/pages/alan-projektmanagement-gmbh/about_us
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
7. Keine hardcodierten px-Schriftgrößen — `clamp()` oder `rem`

---

## Projektstand — alle Seiten fertig

| Datei | Größe | Status |
|---|---|---|
| index.html | ~37 KB | ✅ Clean |
| leistungen.html | ~24 KB | ✅ Clean |
| projekte.html | ~20 KB | ✅ Clean |
| karriere.html | ~23 KB | ✅ Clean |
| ueber-uns.html | ~30 KB | ✅ Clean |
| impressum.html | ~8 KB | ✅ Clean |
| datenschutz.html | ~9 KB | ✅ Clean |
| agb.html | ~12 KB | ✅ Clean |
| robots.txt | < 1 KB | ✅ Clean |
| sitemap.xml | ~2 KB | ✅ Clean |
| assets/css/main.css | ~44 KB | ✅ Vollständig |
| assets/js/main.js | ~11 KB | ✅ Vollständig |

### Noch offen (Client-Aufgaben)
- [ ] Web3Forms-Key eintragen (Client registriert sich auf web3forms.com)
- [ ] Projektdaten in projekte.html mit echten Referenzen abgleichen
- [ ] DE/EN Toggle entfernen oder implementieren

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

Schema.org auf Unterseiten: `BreadcrumbList` (Position 1 = Startseite, Position 2 = aktuelle Seite)

---

## Asset-Inventar

**Originale:** `/Users/sedatceylan/claude/orginal web alan/hostinger-export/`
**Eingebunden:** `./assets/images/` (relativer Pfad immer ohne führenden Slash)

### Schlüssel-Assets
| Dateiname | Verwendung |
|---|---|
| `logo.png` | Nav + Footer Logo |
| `favicon.ico` | Browser-Tab |
| `hero-video.mp4` (in assets/video/) | Hero-Hintergrundvideo |
| `Besprechnungraum-Cj2ij_6B.jpg` | Besprechungsraum (ueber-uns) |
| `Büroraum-DHikT2Tq.jpg` | Büro (ueber-uns) |
| `Gebäude-BQHPErG1.jpg` | Gebäude-Außenansicht |
| `construction-site-1.jpg` | Allgemeine Baustelle |
| `construction-workers.jpg` | Team auf der Baustelle |
| `architectural-plans-U7EQprB_.jpeg` | Architekturpläne |
| `ihk-cottbus-user-Dg9aH4Wr-Dg9aH4Wr.png` | IHK Cottbus Zertifikat |
| `ArchitektenkammerBerlin.png` | Architektenkammer Zertifikat |

### Projektfotos (projekte.html)
| Dateiname | Projektname |
|---|---|
| `residenz-am-park-DWrtj3aS.jpg` | Residenz am Park |
| `buerozentrum-techpark-iyr5G9EC.jpg` | Bürozentrum Techpark |
| `mfh-berlin-C0ecTeeF.jpg` | MFH Berlin-Neukölln |
| `wohnquartier-stadtmitte-BptAvnGG.jpg` | Wohnquartier Stadtmitte |
| `stadthaus-modern-DHChysb2.jpg` | Stadthaus Modern |
| `seniorenwohnen-gartenblick-Bgq7WNfK.jpg` | Seniorenwohnen Gartenblick |
| `villa-sonnenhang-B3H9yXsE.jpg` | Villa Sonnenhang |
| `familienhaus-waldblick-e4Jwn2Z0.jpg` | Familienhaus Waldblick |
| `produktionshalle-brandenburg-CkuY0PNs.jpg` | Produktionshalle Brandenburg |
| `solar-energie-projekt-HXliBaG1.jpg` | Solar Energie Projekt |
| `neubau-gewerbe--zJOdZvw.jpg` | Neubau Gewerbe |
| `sonnenallee2-BOdLuhFN.png` | Sonnenallee 2 (echtes Projekt) |

### BIM-Assets (falls BIM-Seite erstellt wird)
`bim-hero.webp`, `bim-coordination.jpg`, `bim-process.webp`, `clash-detection.jpg`, `3d-model.jpg`, `alan-bim-logo.png`

---

## Deployment

Upload aller Dateien aus `alanbau v2/` → Hostinger `public_html/`
