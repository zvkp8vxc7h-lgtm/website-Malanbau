# Requirements — alanbau.de Premium Relaunch

## v1 Requirements

### Bug Fixes & Code-Qualität (BUG)

- [ ] **BUG-01**: Scroll-Offset wird durch sticky Nav verdeckt — `html { scroll-padding-top: var(--nav-h); }` einsetzen und JS-Scroll-Logik auf `scrollIntoView()` umstellen
- [ ] **BUG-02**: Nav-Links "Leistungen" und "Projekte" verhalten sich auf der Homepage anders als auf Unterseiten — `data-home-href` / `data-page-href` Pattern implementieren (Anker auf Homepage, externe HTML auf Unterseiten)
- [ ] **BUG-03**: Homepage-Karten (Leistungen, Projekte) haben keine "Mehr erfahren →" Buttons, die zur jeweiligen Detail-Seite führen
- [ ] **BUG-04**: Mobile Layout-Bugs — Navigation, Touch-Verhalten, Abstände auf kleinen Screens überprüfen und beheben
- [ ] **BUG-05**: Web3Forms-Key ist Platzhalter (`DEIN_WEB3FORMS_KEY_HIER`) in 4 Formularen — echten Key einbinden und Formular-Feedback verbessern
- [ ] **BUG-06**: 4× inline `onclick` Handler in index.html → nach main.js verschieben (CLAUDE.md-Regel)
- [ ] **BUG-07**: 85× hardcodierte `px` Schriftgrößen → `clamp()`/`rem` ersetzen (CLAUDE.md-Regel)
- [ ] **BUG-08**: Hero-Video ignoriert `prefers-reduced-motion` — `.hero-bg { display: none; }` unter Media Query
- [ ] **BUG-09**: 3D-Tilt-Karte in main.js hat keinen Touch-Device-Guard — `mousemove` nur wenn `hover: hover`

### Externe Seiten Integration (PAGE)

- [ ] **PAGE-01**: `branchen.html` auf aktuelles Design-System portieren (Nav, Footer, Typografie, Farben, Spacing) — Premium-Niveau
- [ ] **PAGE-02**: `nachhaltigkeit.html` auf aktuelles Design-System portieren — Premium-Niveau
- [ ] **PAGE-03**: `lean.html` erstellen — Vorlage aus `../lean.html` adaptieren und auf Design-System portieren
- [ ] **PAGE-04**: Alle drei neuen Seiten in Navigation verlinken und sitemap.xml aktualisieren

### Premium UI & Animationen (ANIM)

- [ ] **ANIM-01**: Scroll-Reveal Animationen — Intersection Observer + CSS, expo-out Easing `cubic-bezier(0.16,1,0.3,1)` auf `.reveal` Klasse
- [ ] **ANIM-02**: Stats-Strip direkt unter dem Hero — animierte Zähler: Jahre Erfahrung / Projekte / Mitarbeiter
- [ ] **ANIM-03**: Hero-Text-Stagger Timing verkürzen (1.7s → 1.15s gesamt)
- [ ] **ANIM-04**: Hover-Effekte Premium-Niveau — Projekt-Karten, Service-Karten, CTA-Buttons
- [ ] **ANIM-05**: Zertifikate-Logobar — IHK Cottbus + Architektenkammer Berlin, Graustufen, mit Beschriftung, im Footer und auf Über-uns-Seite

### DE/EN Sprachumschaltung (I18N)

- [ ] **I18N-01**: DE/EN Toggle Button in der Navigation implementieren
- [ ] **I18N-02**: Translation JSON-Dateien erstellen — `assets/i18n/de.json` und `en.json`
- [ ] **I18N-03**: Alle HTML-Elemente mit `data-i18n` Attributen versehen
- [ ] **I18N-04**: Sprachpräferenz in `localStorage` persistieren (`alanbau_lang`)
- [ ] **I18N-05**: `hreflang` Tags und `lang` Attribut dynamisch setzen
- [ ] **I18N-06**: Formular-Validierungsmeldungen lokalisieren (custom JS Validation)

### Blog / News (BLOG)

- [ ] **BLOG-01**: Blog-Verzeichnisstruktur anlegen — `blog/index.html`, `blog/artikel/`, `blog/themen/`
- [ ] **BLOG-02**: Blog-Übersichtsseite mit Artikel-Karten (Titel, Datum, Teaser, Kategorie)
- [ ] **BLOG-03**: Artikel-Template — Schema.org `Article`, BreadcrumbList, `og:type: article`, prev/next Navigation
- [ ] **BLOG-04**: Themen/Kategorie-Index-Seiten (max. 5–8 Themen)
- [ ] **BLOG-05**: RSS 2.0 Feed — `blog/feed.xml`, autodiscovery `<link>` auf allen Seiten
- [ ] **BLOG-06**: PHP Includes für Nav/Footer auf Blog-Seiten (Hostinger unterstützt PHP) — verhindert 38-Datei-Problem bei Nav-Änderungen

### Performance & SEO (SEO)

- [ ] **SEO-01**: WebP Bildkonvertierung — `npx sharp-cli` Workflow, `<picture>` mit WebP + JPEG Fallback
- [ ] **SEO-02**: Explizite `width`/`height` auf allen `<img>` (CLS-Vermeidung)
- [ ] **SEO-03**: `fetchpriority="high"` auf Hero-Poster-Preload hinzufügen
- [ ] **SEO-04**: Schema.org strukturierte Daten ausbauen — `LocalBusiness`, `BreadcrumbList` auf allen Unterseiten
- [ ] **SEO-05**: Lokales SEO Berlin/Brandenburg — NAP-Konsistenz, lokale Keywords in Metadaten
- [ ] **SEO-06**: `sitemap.xml` aktualisieren (alle neuen Seiten)
- [ ] **SEO-07**: Core Web Vitals Ziele: LCP < 2.5s, CLS < 0.1 (PageSpeed Mobile 75–85, Desktop 90+)

### Content-Tiefe (CONT)

- [ ] **CONT-01**: Named Contact Person auf Kontakt-Seite — Foto, Name, Direktdurchwahl (kein anonymes Formular)
- [ ] **CONT-02**: 3–5 Projekt-Detail-Seiten — Metrics-Bar (m², Bauzeit, Volumen), Challenge, Solution, Foto-Galerie, CTA
- [ ] **CONT-03**: Leistungs-Sektionen ausbauen — jeweils 400+ Wörter, Alleinstellungsmerkmale, Prozess-Schritte
- [ ] **CONT-04**: Inline-CTAs am Ende jeder Leistungs-Sektion (nicht nur im Hero)

---

## v2 Requirements (deferred)

- Eigenes CMS oder Headless CMS (Contentful, Sanity) — zu komplex für v1
- Online-Terminbuchung (Calendly-Integration)
- Kundenportal / Login-Bereich
- Mehrsprachigkeit über DE/EN hinaus
- Automatisierte Bildoptimierungs-Pipeline (Eleventy, Vite)
- Bewerbungsportal für Karriere-Seite

---

## Out of Scope

- Backend / Server-Side-Rendering — kein Node.js auf Hostinger
- React / Vue / andere Frameworks — Architekturentscheidung: statisches HTML
- Datenbankanbindung — kein Server-Side-State
- base64 in HTML — explizit verboten (CLAUDE.md)
- Inline JavaScript Event-Handler — explizit verboten (CLAUDE.md)

---

## Traceability

| REQ-ID | Phase |
|---|---|
| BUG-01 bis BUG-09 | Phase 1 |
| PAGE-01 bis PAGE-04 | Phase 2 |
| ANIM-01 bis ANIM-05 | Phase 3 |
| I18N-01 bis I18N-06 | Phase 4 |
| BLOG-01 bis BLOG-06 | Phase 5 |
| SEO-01 bis SEO-07 | Phase 6 |
| CONT-01 bis CONT-04 | Phase 7 |
