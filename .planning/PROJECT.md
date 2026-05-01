# alanbau.de — Premium Website Relaunch & Extension

## What This Is

Erweiterung und Qualitätssteigerung der bestehenden statischen 8-Seiten-Website für alanbau.de (Alan Projektmanagement GmbH). Das Projekt umfasst Bug-Fixes, Integration neuer Seiten und Sektionen, eine Deutsch/Englisch-Umschaltung sowie eine Premium-Aufwertung auf Niveau von thost.de, goldbeck.de und dreso.com — alles ohne Build-Step, deploybar auf Hostinger Shared Hosting.

## Core Value

Eine Premium-Bauunternehmen-Website die sofort Vertrauen schafft, Anfragen generiert und sich klar von der Berliner/Brandenburger Konkurrenz abhebt.

## Requirements

### Validated

- ✓ 8 HTML-Seiten fertig (index, leistungen, projekte, karriere, ueber-uns, impressum, datenschutz, agb) — existing
- ✓ Design-System vollständig (CSS Custom Properties, Barlow-Fonts, Farb-Tokens) — existing
- ✓ Responsive Navigation + Mobile-Hamburger-Menü — existing
- ✓ Hero-Video-Hintergrund auf Startseite — existing
- ✓ Kontaktformular (Web3Forms, key noch offen) — existing
- ✓ SEO-Metadaten, robots.txt, sitemap.xml — existing
- ✓ branchen.html + nachhaltigkeit.html vorhanden (müssen überarbeitet werden) — existing

### Active

**Bug-Fixes & Stabilisierung**
- [ ] BUG-01: Scroll-Offset-Fix — sticky Nav überdeckt Ankersektionen (fehlend: `scroll-margin-top`)
- [ ] BUG-02: Nav-Inkonsistenz — "Mehr erfahren →" Buttons auf Homepage-Karten, konsistentes Linkverhalten über alle Seiten
- [ ] BUG-03: Mobile-Layout-Bugs — Navigation, Touch-Verhalten, Abstände auf kleinen Screens
- [ ] BUG-04: Web3Forms-Integration — echten API-Key einbinden, Formular-Feedback verbessern
- [ ] BUG-05: Inline-Event-Handler entfernen (4× onclick in index.html → main.js verschieben)
- [ ] BUG-06: Hardcodierte px-Schriftgrößen ersetzen (85× im Code → clamp()/rem)

**Neue Seiten — Integration & Redesign**
- [ ] PAGE-01: branchen.html — auf aktuelles Design-System anpassen, Premium-Niveau
- [ ] PAGE-02: nachhaltigkeit.html — auf aktuelles Design-System anpassen, Premium-Niveau
- [ ] PAGE-03: lean.html — erstellen/adaptieren (Vorlage in ../lean.html), auf Design-System anpassen

**Neue Sektionen & Features**
- [ ] FEAT-01: Blog/News — statische HTML-Seiten, Übersichtsseite + Einzelartikel-Template
- [ ] FEAT-02: Zertifikate/Awards-Sektion — IHK Cottbus, Architektenkammer Berlin prominent auf Startseite & Über uns
- [ ] FEAT-03: DE/EN Language Toggle — Button in Nav, In-Page Content-Swap (gleiche URL-Struktur)

**Premium-Aufwertung**
- [ ] QUAL-01: Scroll-Animationen & Micro-Interactions — Intersection Observer, Hover-Effekte, flüssige Übergänge
- [ ] QUAL-02: Performance & SEO — PageSpeed 90+, strukturierte Daten (Schema.org), lokales SEO Berlin/Brandenburg
- [ ] QUAL-03: Tiefergehende Inhalte — Leistungsseiten mit Zahlen, Prozessen, Alleinstellungsmerkmalen ausbauen
- [ ] QUAL-04: Medien-Optimierung — Bildformate (WebP), srcset, optimierte Ladezeiten

### Out of Scope

- CMS oder dynamisches Content-Management — zu komplex für Hostinger Shared Hosting
- React/Next.js oder andere Frameworks — statisches HTML ist Architekturentscheidung
- Eigenes Backend / Server-Side-Rendering — kein Node.js auf Hostinger
- Datenbankanbindung — kein Server-Side-State

## Context

**Technisch:** Statisches Multi-Page HTML auf Hostinger Shared Hosting. Kein Build-Step. Alle Assets lokal. Design-System vollständig in `assets/css/main.css` (~44 KB). JavaScript in `assets/js/main.js` (~11 KB, IIFE-Pattern).

**Extern vorhanden:** `branchen.html`, `nachhaltigkeit.html` und `lean.html` existieren außerhalb von `alanbau v2.1/` (im Parent-Verzeichnis) und müssen auf das aktuelle Design-System portiert werden. Für `lean.html` gibt es noch keine Version in `alanbau v2.1/`.

**Codebase Map:** `.planning/codebase/` enthält vollständige Analyse (STACK, INTEGRATIONS, ARCHITECTURE, STRUCTURE, CONVENTIONS, TESTING, CONCERNS).

**Wettbewerb:** thost.de, goldbeck.de, dreso.com — das sind die Referenz-Benchmark für Premium-Niveau.

**Bekannte Bugs (dokumentiert in CONCERNS.md):**
- Scroll-Offset (kein `scroll-margin-top` auf Ankersektionen)
- Nav-Links inkonsistent: Auf Homepage scrollen Leistungen/Projekte zur Sektion, von Unterseiten gehen sie zu externen HTMLs
- "Mehr erfahren →" Buttons fehlen auf Homepage-Leistungs- und Projektkarten
- Web3Forms-Key ist Platzhalter (`DEIN_WEB3FORMS_KEY_HIER`) in 4 Formularen
- 85× hardcodierte `px`-Schriftgrößen (CLAUDE.md-Regel: clamp()/rem)
- 4× inline onclick-Handler in index.html (CLAUDE.md-Regel: kein inline JS)

## Constraints

- **Architektur:** Statisches Multi-Page HTML — kein Framework, kein Build-Step, kein base64
- **Hosting:** Hostinger Shared Hosting — kein Node.js, kein Server-Side-Code
- **Design-System:** Bestehendes CSS-System erweitern, nicht ersetzen
- **Goldene Regel:** Kein base64 im HTML, kein inline JavaScript, ein H1 pro Seite

## Key Decisions

| Decision | Rationale | Outcome |
|---|---|---|
| DE/EN Toggle statt /en/ Unterverzeichnis | Gleiche URL-Struktur, einfacher zu maintainen auf Shared Hosting | — Pending |
| Statischer Blog (HTML) statt CMS | Passt zur bestehenden Architektur, kein Server-Side-Code nötig | — Pending |
| branchen/lean/nachhaltigkeit als eigene Seiten integrieren | Bereits als externe HTMLs vorhanden, müssen auf Design-System portiert werden | — Pending |
| Animations via Intersection Observer | Kein JS-Framework, CSS-Animationen + minimales JS | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-01 after initialization*
