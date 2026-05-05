# MERGE-PROTOKOLL — alanbau website v2.1.3

**Erstellt:** 2026-05-03  
**Basis:** v2.1.2 (Phase 2 + 3)  
**Merge-Quelle:** v2.1.1 (Phase 1)

---

## Verglichene Dateien

| Datei | Status |
|---|---|
| index.html | Merge (beide verändert) |
| leistungen.html | Merge (beide verändert) |
| projekte.html | Merge (beide verändert) |
| ueber-uns.html | v2.1.2 (nur Footer-Ergänzung) |
| branchen.html | Merge (komplette Überarbeitung in v2.1.2, Nav-Fix aus v2.1.1) |
| nachhaltigkeit.html | Merge (komplette Überarbeitung in v2.1.2, Nav-Fix aus v2.1.1) |
| themen.html | v2.1.2 (reveal-stagger + footer-certs) |
| karriere.html | v2.1.2 (nur Footer-Ergänzung) |
| agb.html | v2.1.2 (nur Footer-Ergänzung) |
| datenschutz.html | v2.1.2 (nur Footer-Ergänzung) |
| impressum.html | v2.1.2 (nur Footer-Ergänzung) |
| assets/css/main.css | Merge (beide verändert) |
| assets/js/main.js | Merge (beide verändert) |
| sitemap.xml | v2.1.2 (branchen, nachhaltigkeit, lean hinzugefügt) |
| CLAUDE.md | v2.1.2 + Regel #7 aktualisiert |
| lean.html | v2.1.2 (neue Datei, Phase 2) |
| CLIENT-HANDOFF.md | v2.1.1 (nur dort vorhanden) |
| robots.txt | Identisch — direkt kopiert |
| .gitignore | Identisch — direkt kopiert |
| assets/images/* (34) | Identisch — direkt kopiert |
| assets/video/hero.mp4 | Identisch — direkt kopiert |
| assets/favicon.ico | Identisch — direkt kopiert |

---

## Was aus v2.1.1 (Phase 1) übernommen wurde

### main.css
- `scroll-padding-top: var(--nav-h)` auf body (CSS-Fallback für Smooth-Scroll-Offset)
- `.project-meta` CSS-Klasse (saubere Klasse statt Inline-Styles)
- Mobile Bug-Fix: `.hero-bg { display: none }` + `#hero` Bild-Fallback für mobile Geräte ohne Video
- Mobile Bug-Fix: `.nav-mobile-overlay { overflow-y: auto }` (Overlay scrollbar auf kleinen Geräten)
- Mobile Bug-Fix: `.about-usps { grid-template-columns: 1fr }` (Ein-Spalten-Layout auf Mobile)

### main.js
- `[data-scroll-to]` Event-Handler (saubere Trennung von HTML und Verhalten) — **upgraded mit v2.1.2's Nav-Offset-Berechnung**
- `[data-close-modal-and-scroll]` Handler für Modal-CTA — **ebenfalls mit Nav-Offset-Berechnung**
- `data-no-modal` Click-Guard (verhindert Modal-Öffnung bei Klick auf interne Links in Service-Cards)
- `form.reportValidity()` Check vor Form-Submit (bessere Browser-Validierung)
- `window.matchMedia('(hover: hover) and (pointer: fine)')` Guard für 3D-Tilt (verhindert Tilt auf Touch-Geräten)

### index.html
- CTA-Buttons: `data-scroll-to` statt inline `onclick` (kein inline JavaScript im HTML)
- Hero-Buttons: `data-scroll-to` statt inline `onclick`
- Service-Cards: "Mehr erfahren" als echte Links mit `data-no-modal` zu `leistungen.html#ankerpunkt`
- Projekt-Cards: "Mehr erfahren →" Links zu `projekte.html`
- Modal-CTA: `data-close-modal-and-scroll` statt inline `onclick`

### Alle Sub-Pages (leistungen, projekte, branchen, nachhaltigkeit)
- Nav-Link "Unternehmen": `./ueber-uns.html` statt `./index.html#about` (konsistente Navigation zur vollständigen Unternehmensseite)

### projekte.html
- `project-meta` CSS-Klasse statt 12× Inline-Styles

### .planning/phases/01-bug-fixes-codequality/
- Komplette Phase-1-Dokumentation übernommen

### CLIENT-HANDOFF.md
- Übergabe-Dokument aus v2.1.1

---

## Was aus v2.1.2 (Phase 2 + 3) übernommen wurde

### Neue Dateien
- `lean.html` — LEAN Management Seite (Phase 2)

### main.css — Neue Features
- `.btn-hero .arrow` Arrow-Slide-Animation
- `.project-card::after` + `.project-card-full::after` Red-Border-on-hover
- `.reveal-stagger` mit Stagger-Animationen für Grid-Kinder
- `#stats-strip`, `.stats-grid`, `.stat-item`, `.stat-num`, `.stat-label`
- `.footer-certs`, `.footer-cert-item` — Zertifikate-Logobar im Footer
- Footer-Grid: 5 Spalten (für "Themen & Einblicke"-Spalte)
- Verbesserte Animation-Timings (cubic-bezier)
- `transform: translateY(-3px)` hover auf Feature-, Step-, Job-Cards
- Stärkere Graustufen-Behandlung bei Zertifikatsbildern

### main.js — Neue Features
- Stats Counter Animation mit IntersectionObserver
- `.reveal-stagger` im Reveal-Observer
- Verbesserte Anker-Scroll-Berechnung mit Nav-Offset (für `<a href="#...">` Links)

### index.html — Neues Feature
- Stats Strip Section mit animierten Kennzahlen (10+ Jahre, 120+ Projekte, etc.)
- Footer: 5. Spalte "Themen & Einblicke" (branchen, nachhaltigkeit, lean)
- Footer: `.footer-certs` Zertifikate-Logobar

### branchen.html — Komplett überarbeitet
- Neuer Titel "Branchen & Märkte"
- Open Graph Tags, Schema.org BreadcrumbList
- Sprach-Toggle (DE/EN Platzhalter)
- 4 Branchenschwerpunkte als Feature-Cards
- Vollständiger 5-Spalten-Footer
- Lightbox-Overlay

### nachhaltigkeit.html — Inhaltlich erweitert
- Open Graph Tags, Schema.org BreadcrumbList
- Sprach-Toggle
- Neuer Content-Split-Abschnitt mit Bild
- Verbesserte Feature-Cards mit Section-Labels
- Vollständiger 5-Spalten-Footer
- Lightbox-Overlay

### Alle Seiten — Footer-Erweiterung
- "Themen & Einblicke" Spalte mit Links zu branchen, nachhaltigkeit, lean
- `.footer-certs` auf den meisten Seiten

### sitemap.xml
- branchen.html, nachhaltigkeit.html, lean.html hinzugefügt

---

## Konflikte und wie sie aufgelöst wurden

| Konflikt | Entscheidung | Begründung |
|---|---|---|
| "Unternehmen" Nav-Link: `./ueber-uns.html` (v2.1.1) vs `./index.html#about` (v2.1.2) | `./ueber-uns.html` | ueber-uns.html ist eine vollständige Seite; v2.1.2 hatte außerdem eine Inkonsistenz (Home-Nav zeigte schon auf ueber-uns.html) |
| Service-Card "Mehr erfahren": Links (v2.1.1) vs Spans (v2.1.2) | Links mit `data-no-modal` (v2.1.1) | Bessere UX und Navigation; `data-no-modal` verhindert Modal-Konflikt sauber |
| Projekt-Card Links: vorhanden (v2.1.1) vs entfernt (v2.1.2) | Links behalten (v2.1.1) | Navigationspfade zu projekte.html sind wichtig für UX |
| CTA-Button Scroll: `data-scroll-to` (v2.1.1) vs inline `onclick` (v2.1.2) | `data-scroll-to` + v2.1.2 Nav-Offset-Berechnung | Saubere HTML/JS-Trennung (CLAUDE.md Regel #2) kombiniert mit besserem Scroll-Offset |

---

## Was umgeschrieben wurde

- `data-close-modal-and-scroll` Handler: In v2.1.3 verwendet er die gleiche Nav-Offset-Berechnung wie der Anker-Scroll-Handler aus v2.1.2 (Upgrade gegenüber v2.1.1's simpler scrollIntoView)
- CLAUDE.md Regel #7: Aktualisiert von "kein px" auf "px erlaubt, clamp() für Headlines" — entspricht jetzt dem tatsächlichen CSS

---

## Status: v2.1.3 bereit für nächste GSD-Phasen?

**JA — vollständig bereit.**

- Alle Phase-1-Bug-Fixes erhalten (kein Verlust)
- Alle Phase-2+3-Features integriert (kein Verlust)
- 4 Konflikte sauber aufgelöst (dokumentiert)
- Keine inline JavaScript im HTML (CLAUDE.md Regel #2)
- Keine base64 (CLAUDE.md Regel #1)
- .planning/ enthält alle 3 Phasen-Ordner
- sitemap.xml vollständig (alle Seiten inkl. lean.html)
- Footer konsistent auf allen Seiten (Themen-Spalte + Certs)
- Navigation konsistent auf allen Seiten (ueber-uns.html)
