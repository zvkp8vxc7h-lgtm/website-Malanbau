# Session Handoff — alanbau v2.1.7

## Projekt
Statisches Multi-Page HTML, Hostinger Shared Hosting. Arbeitsverzeichnis: `/Users/akula/claude/px05.1 - alanbau/website alanbau v2.1.7/`

---

## Erledigte Tasks (Session 1)

### 1. Bug gefixt
- **Problem**: `data-i18n`-Elemente nutzen `textContent` → `&amp;` wurde buchstäblich angezeigt
- **Fix**: Alle `&amp;` in `assets/js/i18n.js` zu `&` geändert (28 Stellen)

### 2. Footer Spaltenreihenfolge getauscht
- **Vorher**: Leistungen → Unternehmen → Kontakt → Themen & Einblicke
- **Nachher**: Leistungen → Unternehmen → Themen & Einblicke → Kontakt (ganz rechts)
- Alle 11 HTML-Dateien aktualisiert

### 3. Logo-Tausch
- **Neu**: `assets/images/company-logo.png` (schwarz/grau/rot, 1177×374px — das korrekte Logo)
- **Alt**: `logo.png` (grünes Logo, falsch)
- Alle 15 HTML-Dateien (Nav + Footer), Schema.org in index.html, `nav-logo-text` Span ausgeblendet

### 4. Image-Upscaling (Lanczos, ImageMagick)
| Bild | Vorher | Nachher |
|---|---|---|
| bueroraum.jpg | 275×183 | 1200×799 |
| besprechungsraum.jpg | 334×151 | 1200×543 |
| gebaeude.jpg | 267×189 | 1200×849 |
| buero.jpg | 750×506 | 1500×1012 |
| projektphase-infografik.jpg | 1270×674 | 2540×1348 |
| projektmanagement-infografik.jpg | 796×629 | 1600×1264 |

### 5. i18n Übersetzung — leistungen.html, karriere.html, ueber-uns.html vollständig
- **leistungen.html** ✅ — ~130 neue Keys (DE+EN)
- **karriere.html** ✅ — vollständig
- **ueber-uns.html** ⚠️ — Hero-Keys vorhanden, aber großer Teil des Seiteninhalts NOCH NICHT übersetzt (siehe Session 3)
- **index.html** ⚠️ — NUR TEILWEISE (siehe Session 2)

---

## Erledigte Tasks (Session 2)

### 6. index.html — Übersetzungslücken geschlossen
| Sektion | Behoben | Keys hinzugefügt |
|---|---|---|
| Projektphasen-Titel | ✅ | 1 |
| Beratung (Text + CTA) | ✅ | 6 |
| Beratung Leistungsliste (2 Spalten, 13 Items) | ✅ | 16 |
| Projektmanagement Detail (Text + CTA) | ✅ | 8 |
| PM Leistungsliste (Nested, 2 Spalten, 13 Items) | ✅ | 17 |
| Baumanagement (Text + CTA) | ✅ | 7 |
| BM Leistungsliste (10 Items) | ✅ | 13 |
| CTA Callout (Haben Sie Fragen?) | ✅ | 3 |
| About (2 Paragraphen + 4 USP Labels + 4 USP Werte) | ✅ | 10 |
| Kontaktformular Projektart-Label + 8 Optionen | ✅ | 9 |

### 7. Service-Modals — i18n-fähig gemacht
- **Problem**: `svcData` in `main.js` war hardcoded auf Deutsch — Modals ignorierten die aktive Sprache
- **Fix**: `svcData` auf i18n-Keys umgestellt (`titleKey`, `leadKey`, `itemKeys[]`), `openSvcModal()` nutzt jetzt `window.i18n.t()` — alle 3 Modals übersetzen korrekt

---

## Erledigte Tasks (Session 3)

### 8. i18n.js — ~90 neue Keys (DE + EN) hinzugefügt
Neue Key-Gruppen:
- `footer.col.kontakt` (fehlte auf allen Seiten)
- `projekte.tag.*`, `projekte.card.cta`, `projekte.cta.*`
- `branchen.cols1.*`, `branchen.cols2.*`, `branchen.seg.*`, `branchen.fc1-4.*`, `branchen.split.*`, `branchen.cta.*`
- `nachhaltigkeit.cards.*`, `nachhaltigkeit.fc1-3.*`, `nachhaltigkeit.split.*`, `nachhaltigkeit.cols1-2.*`, `nachhaltigkeit.cta.*`
- `lean.split1.*`, `lean.principles.*`, `lean.fc1-3.*`, `lean.split2.*`, `lean.cols1-2.*`, `lean.cta.*`

### 9. projekte.html ✅ — vollständig i18n
- Alle 12 Projekt-Tags (`Wohnungsbau`/`Gewerbebau`) mit `data-i18n`
- 3 "Mehr erfahren →" CTAs mit `data-i18n`
- CTA-Callout (h2, p, a) mit `data-i18n`
- Footer `<h5>Kontakt</h5>` mit `data-i18n="footer.col.kontakt"`

### 10. branchen.html ✅ — vollständig i18n
- Leistungs-Cols (Titel + 8 Listenpunkte)
- 4 Feature-Cards (Titel + Text)
- Content-Split (Label, Titel, 2 Paragraphen, CTA)
- CTA-Callout (h2, p, a)
- Footer `<h5>Kontakt</h5>` mit `data-i18n`

### 11. nachhaltigkeit.html ✅ — vollständig i18n + Footer-Keys repariert
- 3 Feature-Cards (Titel + Text)
- Content-Split (Label, Titel, 2 Paragraphen, CTA)
- Leistungs-Cols (Titel + 6 Listenpunkte)
- CTA-Callout (h2, p, a)
- **Repariert:** kaputte Footer-Keys (`footer.link.pm` → `footer.link.projektmanagement`, `footer.link.hoch` → `footer.link.hochtiefbau`, `footer.link.bau` → `footer.link.baudienstleistungen`, `footer.link.ueber` → `footer.link.ueber-uns`, `footer.cert.ihk` → `footer.certs.ihk`, `footer.cert.architekten` → `footer.certs.arch`, `footer.copy` → `footer.copyright`)

### 12. lean.html ✅ — vollständig i18n + Footer-Keys repariert
- Content-Split 1 (Integrale Planung: Label, Titel, 2 Paragraphen, CTA)
- 3 Feature-Cards (Titel + Text)
- Content-Split 2 (LEAN Thinking: Label, Titel, 2 Paragraphen)
- Leistungs-Cols (Titel + 12 Listenpunkte)
- CTA-Callout (h2, p, a)
- **Repariert:** gleiche kaputte Footer-Keys wie nachhaltigkeit.html

---

## Erledigte Tasks (Session 4)

### 13. ueber-uns.html ✅ — vollständig i18n

**68 `ueber.*`-Attribute** neu hinzugefügt, **66 neue Keys** in i18n.js (DE + EN):

| Sektion | Status | Keys |
|---|---|---|
| Hero | ✅ | (bestehend) |
| Breadcrumb | ✅ | `ueber.breadcrumb` |
| Profil (Mission) | ✅ | `ueber.profil.*` (label, title, p1–p3, cta) |
| Fakten & Zahlen | ✅ | `ueber.kennzahlen.*` + `ueber.usp.*` (12 Keys) |
| Werte (4 Cards) | ✅ | `ueber.werte.*` + `ueber.value1–4.*` (11 Keys) |
| Geschäftsführung | ✅ | `ueber.gf.*` (label, title, role, bio1, bio2, pos, loc, con, linkedin) |
| Büro & Standort | ✅ | `ueber.buero.*` (label, title, cta) |
| Zertifikate | ✅ | `ueber.zert.*` (label, title, sub, ihk, arch) |
| Alan-Gruppe | ✅ | `ueber.gruppe.*` + `ueber.brand1–6.desc` (9 Keys) |
| Kontakt-Sektion | ✅ | `ueber.contact.label`, `ueber.contact.social` + shared keys |
| Kontaktformular | ✅ | `form.phone`, `form.projektart` + alle 8 Optionen |
| CTA Callout | ✅ | `ueber.cta.*` (title, sub, btn) |
| Footer Kontakt | ✅ | `footer.col.kontakt` (Attribut fehlte) |

---

## Erledigte Tasks (Session 5)

### 14. i18n — karriere.html Benefits-Karten-Texte fehlten
- 6 `feature-card-text` Paragraphen hatten kein `data-i18n` Attribut
- 12 neue Keys ergänzt (DE + EN: `karriere.benefit1–6.text`)

### 15. Bildschärfe-Fixes — Pixeligkeit bei Retina-Displays (3×)
Ursache: Container-Aspect-Ratio erzwang Hochskalierung über native Auflösung

| Datei | Element | Fix |
|---|---|---|
| nachhaltigkeit.html | `.content-img-wrap` (nachhaltiges-bauen.jpg 1024×1024) | `style="aspect-ratio:1/1"` |
| index.html | `.about-img-wrap` (besprechungsraum.jpg 1200×543) | `style="aspect-ratio:20/9"`, `width/height` korrigiert |
| ueber-uns.html | `.content-img-wrap` (besprechungsraum.jpg) | `style="aspect-ratio:20/9"` |
| ueber-uns.html | `.about-img-wrap` (gebaeude.jpg 1200×849) | `style="aspect-ratio:1200/849"`, Grid-Spalte `400px` |
| ueber-uns.html | `.management-card` (bueroraum.jpg 1200×799) | Wrapper-div `aspect-ratio:3/2`, Grid-Spalte `380px` |
| ueber-uns.html | Lightbox `#lightbox-img` | `max-width: min(400px, 90vw)` — scharf auf 3× |
| ueber-uns.html | Galerie-Thumbnails (3 Bilder) | HTML `width/height` auf native Werte korrigiert |

### 16. Navbar & Footer — Logo-Größe & Nav-Schrift erhöht (main.css)
- Logo-Höhe: `48px` → `64px`
- Nav-Schrift: `14px` → `16px`
- Nav-Gap: `36px` → `44px`

### 17. Logo auf dunklen Hintergründen (Navbar transparent + Footer)
- **Navbar (nicht gescrollt):** `filter: invert(1) hue-rotate(180deg)` — schwarzer Text wird weiß, Rot/Grau des A-Symbols bleibt erhalten
- **Footer:** gleicher Filter dauerhaft
- Beim Scrollen (weißer Hintergrund): Filter entfernt → Originalfarben

### 18. Instagram hinzugefügt — alle 15 HTML-Dateien
- URL: `https://www.instagram.com/alaninteriordesign/`
- Footer-Social-Button (📷-Emoji) auf allen Seiten
- Textlink „LinkedIn · XING · Instagram" in index.html Kontaktbereich + ueber-uns.html
- JSON-LD `sameAs` in index.html ergänzt

### 19. GitHub-Push
- Repo: `https://github.com/zvkp8vxc7h-lgtm/website-Malanbau`
- 105 Dateien committed und force-gepusht (`main` Branch)
- `.gitignore` ergänzt: `alle bilder für alanbau website/`, `.planning/`

---

## Noch offene Übersetzungslücken — NÄCHSTE SESSION

### ueber-uns.html — ✅ ERLEDIGT (Session 4)

### index.html — noch kleine Lücken
- Kontakt-Sektion Info-Labels (`<strong>Adresse</strong>` etc.) — gemischter Inhalt mit Links, braucht `<span data-i18n>` Wrapper
- Stats-Strip Zahlen-Suffixe (ggf. bereits ok)
- Hero-Video `aria-label` Attribut (nice-to-have)

---

## Offene Client-Aufgaben (unverändert)
- [ ] Web3Forms-Key eintragen (index.html, leistungen.html, karriere.html, ueber-uns.html): Platzhalter `DEIN_WEB3FORMS_KEY_HIER`
- [ ] Portrait-Foto Mehmet Emre Alan liefern → ersetzt `bueroraum.jpg` Platzhalter in `#contact`
- [ ] Echte Referenzdaten in projekte.html und Detail-Seiten einpflegen

---

## Technische Hinweise für nächste Session

### Kaputte Footer-Key-Muster (bereits in nachhaltigkeit + lean gefixt)
Wenn eine Seite diese falschen Keys hat, müssen sie ersetzt werden:
| Falsch | Richtig |
|---|---|
| `footer.link.pm` | `footer.link.projektmanagement` |
| `footer.link.hoch` | `footer.link.hochtiefbau` |
| `footer.link.bau` | `footer.link.baudienstleistungen` |
| `footer.link.ueber` | `footer.link.ueber-uns` |
| `footer.cert.ihk` | `footer.certs.ihk` |
| `footer.cert.architekten` | `footer.certs.arch` |
| `footer.copy` | `footer.copyright` |
| `footer.col.kontakt` | ✅ jetzt in i18n.js vorhanden |

### i18n.js Key-Namenskonvention
- Seitenspezifische Keys: `[seite].[bereich].[element]`
- Shared-Footer-Keys: `footer.col.*`, `footer.link.*`, `footer.certs.*`
- Shared-Nav-Keys: `nav.*`, `breadcrumb.*`
