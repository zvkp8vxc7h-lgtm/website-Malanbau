# ROADMAP — alanbau.de Premium Relaunch

**Project:** alanbau.de — Premium Website Relaunch & Extension
**Milestone:** M1 — Launch-Ready
**Total Phases:** 7 | **Requirements covered:** 34/34 ✓

---

## Phase Overview

| # | Phase | Goal | Requirements | Status |
|---|---|---|---|---|
| 1 | Bug Fixes & Codequality | Alle bekannten Bugs und Code-Qualitätsprobleme beheben | BUG-01…09 | ⬜ Pending |
| 2 | Externe Seiten Integration | branchen, nachhaltigkeit, lean auf Design-System portieren | PAGE-01…04 | ⬜ Pending |
| 3 | Premium Animationen & UI | Scroll-Animationen, Stats-Strip, Zertifikate-Logobar | ANIM-01…05 | ⬜ Pending |
| 4 | DE/EN Sprachumschaltung | In-Page Language Toggle mit JSON-Translations | I18N-01…06 | ⬜ Pending |
| 5 | Blog / News | Statischer Blog mit PHP Includes | BLOG-01…06 | ⬜ Pending |
| 6 | Performance & SEO | Core Web Vitals, WebP, Schema.org, lokales SEO | SEO-01…07 | ⬜ Pending |
| 7 | Content-Tiefe | Projekt-Detail-Seiten, Named Contact, ausgebautere Inhalte | CONT-01…04 | ⬜ Pending |

---

## Phase Details

### Phase 1: Bug Fixes & Codequality

**Goal:** Alle bekannten Bugs beheben und den Code auf die CLAUDE.md-Regeln bringen — erst dann ist die Basis sauber genug für weitere Erweiterungen.

**Requirements:** BUG-01, BUG-02, BUG-03, BUG-04, BUG-05, BUG-06, BUG-07, BUG-08, BUG-09

**Success Criteria:**
1. Klick auf "Leistungen" oder "Projekte" im Nav scrollt präzise zur Sektion — Überschrift ist vollständig sichtbar, nicht von der Nav verdeckt
2. "Mehr erfahren →" Links erscheinen auf allen Leistungs- und Projekt-Karten der Homepage
3. Nav-Verhalten ist konsistent: auf der Homepage scrollen, auf Unterseiten verlinken
4. Alle 4 Kontaktformulare senden erfolgreich ab und zeigen eine Bestätigungsmeldung
5. Kein inline `onclick` in index.html, alle Schriftgrößen in `clamp()`/`rem`, Hero-Video respektiert prefers-reduced-motion

**Dependencies:** keine (Phase 1 ist die Basis)

**Plans:**
- 01-01-PLAN.md: Scroll & Nav Fixes (BUG-01, BUG-02, BUG-03)
- 01-02-PLAN.md: Mobile & Form Fixes (BUG-04, BUG-05)
- 01-03-PLAN.md: Code Quality Cleanup (BUG-06, BUG-07, BUG-08, BUG-09)

---

### Phase 2: Externe Seiten Integration

**Goal:** Die drei Seiten branchen.html, nachhaltigkeit.html und lean.html vollständig auf das aktuelle Design-System portieren und nahtlos in die bestehende Website integrieren.

**Requirements:** PAGE-01, PAGE-02, PAGE-03, PAGE-04

**Success Criteria:**
1. branchen.html, nachhaltigkeit.html, lean.html sehen visuell konsistent aus mit den bestehenden Seiten (gleiche Nav, Footer, Typografie, Farben, Spacing)
2. Alle drei Seiten sind über die Navigation erreichbar (oder via "Mehr erfahren" auf relevanten Seiten)
3. sitemap.xml enthält alle drei neuen Seiten
4. Mobile-Darstellung aller drei Seiten ist korrekt
5. Keine base64-Inhalte, kein inline JS in den neuen Seiten

**Dependencies:** Phase 1 (saubere Basis, korrekte Nav)

**Plans:**
- 02-01-PLAN.md: branchen.html Redesign & Integration (PAGE-01, PAGE-04 partial)
- 02-02-PLAN.md: nachhaltigkeit.html Redesign & Integration (PAGE-02)
- 02-03-PLAN.md: lean.html Erstellen & Integration (PAGE-03, PAGE-04 final)

---

### Phase 3: Premium Animationen & UI

**Goal:** Die Website durch Scroll-Animationen, einen Stats-Strip und Premium-Hover-Effekte auf das Niveau von thost.de und goldbeck.de heben.

**Requirements:** ANIM-01, ANIM-02, ANIM-03, ANIM-04, ANIM-05

**Success Criteria:**
1. Elemente erscheinen mit flüssigen Reveal-Animationen beim Scrollen (expo-out Easing, keine Layout-Sprünge)
2. Stats-Strip unter dem Hero zeigt animierte Zähler (Jahre / Projekte / Mitarbeiter) die beim Scrollen in den Viewport auslösen
3. Zertifikate-Logobar (IHK, Architektenkammer) ist im Footer und auf der Über-uns-Seite sichtbar, Graustufen mit Beschriftung
4. Animationen respektieren `prefers-reduced-motion: reduce` — keine Bewegung für betroffene Nutzer
5. PageSpeed verschlechtert sich durch Animationen nicht (IO ist kostenlos)

**Dependencies:** Phase 1 (korrekte Basis), Phase 2 (alle Seiten vorhanden)

**Plans:**
- 03-01-PLAN.md: Scroll-Reveal System & Timing (ANIM-01, ANIM-03)
- 03-02-PLAN.md: Stats-Strip & Hover-Effekte (ANIM-02, ANIM-04)
- 03-03-PLAN.md: Zertifikate-Logobar (ANIM-05)

---

### Phase 4: DE/EN Sprachumschaltung

**Goal:** Einen funktionierenden DE/EN Toggle in der Navigation implementieren, der alle sichtbaren Inhalte übersetzt und die Sprachpräferenz speichert.

**Requirements:** I18N-01, I18N-02, I18N-03, I18N-04, I18N-05, I18N-06

**Success Criteria:**
1. Klick auf "EN" in der Nav wechselt alle sichtbaren Texte der Seite auf Englisch
2. Klick auf "DE" wechselt zurück auf Deutsch
3. Nach einem Seiten-Reload wird die zuletzt gewählte Sprache wiederhergestellt
4. Formular-Validierungsmeldungen erscheinen in der gewählten Sprache
5. `lang` Attribut auf `<html>` wird bei Sprachwechsel aktualisiert

**Dependencies:** Phase 1 und 2 (alle Seiten müssen fertig sein bevor Texte übersetzt werden)

**Plans:**
- 04-01-PLAN.md: i18n Infrastruktur & JSON (I18N-01, I18N-02, I18N-03, I18N-04)
- 04-02-PLAN.md: SEO & Formular-Lokalisierung (I18N-05, I18N-06)

---

### Phase 5: Blog / News

**Goal:** Eine pflegbare statische Blog-Struktur aufbauen die mit PHP Includes auf Hostinger wartbar bleibt und als Content-Marketing-Kanal dient.

**Requirements:** BLOG-01, BLOG-02, BLOG-03, BLOG-04, BLOG-05, BLOG-06

**Success Criteria:**
1. `/blog/` Übersichtsseite zeigt Artikel-Karten mit Titel, Datum, Teaser, Kategorie
2. Mindestens 1 Demo-Artikel existiert mit vollständigem Template (Schema.org, BreadcrumbList, prev/next)
3. RSS Feed unter `/blog/feed.xml` ist valides RSS 2.0 und über `<link>` autodiscovery erreichbar
4. Nav-Änderung erfordert nur eine Datei (PHP Include) statt 38 Datei-Edits
5. Themen-Index-Seiten existieren für mindestens 3 Kategorien

**Dependencies:** Phase 1 (korrekte Nav-Struktur als PHP Include Basis)

**Plans:**
- 05-01-PLAN.md: Blog Struktur & PHP Includes (BLOG-01, BLOG-06)
- 05-02-PLAN.md: Blog Übersicht & Artikel-Template (BLOG-02, BLOG-03)
- 05-03-PLAN.md: Themen, RSS & Integration (BLOG-04, BLOG-05)

---

### Phase 6: Performance & SEO

**Goal:** Core Web Vitals erfüllen, Bilder in WebP konvertieren und strukturierte Daten für lokales SEO Berlin/Brandenburg ausbauen.

**Requirements:** SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07

**Success Criteria:**
1. Alle Bilder sind als WebP ausgeliefert (mit JPEG-Fallback via `<picture>`)
2. Keine CLS-Verschiebungen durch fehlende Bild-Dimensionen
3. LCP < 2.5s auf Desktop (Hero-Video mit optimiertem Poster + fetchpriority)
4. Schema.org `LocalBusiness` auf der Startseite, `BreadcrumbList` auf allen Unterseiten
5. PageSpeed Desktop ≥ 90, Mobile ≥ 75

**Dependencies:** Phase 1–3 (alle Seiten und Assets müssen fertig sein)

**Plans:**
- 06-01-PLAN.md: Bildoptimierung WebP & CLS (SEO-01, SEO-02, SEO-03)
- 06-02-PLAN.md: Schema.org & lokales SEO (SEO-04, SEO-05, SEO-06)
- 06-03-PLAN.md: Core Web Vitals Audit & Fix (SEO-07)

---

### Phase 7: Content-Tiefe

**Goal:** Die Inhalte auf Premium-Niveau bringen — Named Contact Person, Projekt-Detail-Seiten und ausgebautere Leistungstexte die Vertrauen bei institutionellen Investoren aufbauen.

**Requirements:** CONT-01, CONT-02, CONT-03, CONT-04

**Success Criteria:**
1. Kontakt-Seite zeigt einen namentlich genannten Ansprechpartner mit Foto und Direktdurchwahl
2. Mindestens 3 Projekt-Detail-Seiten existieren mit Metrics-Bar, Challenge/Solution-Text und Foto-Galerie
3. Jede Leistungs-Sektion hat mindestens 400 Wörter inhaltliche Tiefe und einen Alleinstellungsmerkmal-Block
4. Jede Leistungs-Sektion endet mit einem Inline-CTA (nicht nur der Hero-Button)
5. Die Seite besteht einen visuellen Vergleich mit thost.de auf Augenhöhe

**Dependencies:** Phase 1–6 (Basis, Animationen, SEO alle fertig)

**Plans:**
- 07-01-PLAN.md: Named Contact & Kontakt-Seite (CONT-01)
- 07-02-PLAN.md: Projekt-Detail-Seiten (CONT-02)
- 07-03-PLAN.md: Leistungs-Content & CTAs (CONT-03, CONT-04)

---

## Requirement Traceability

| REQ-ID | Anforderung | Phase |
|---|---|---|
| BUG-01 | Scroll-Offset Fix | 1 |
| BUG-02 | Nav-Inkonsistenz + data-href | 1 |
| BUG-03 | "Mehr erfahren" Buttons | 1 |
| BUG-04 | Mobile Layout-Bugs | 1 |
| BUG-05 | Web3Forms Integration | 1 |
| BUG-06 | Inline onclick → main.js | 1 |
| BUG-07 | px → clamp()/rem | 1 |
| BUG-08 | prefers-reduced-motion Video | 1 |
| BUG-09 | Touch-Guard 3D-Tilt | 1 |
| PAGE-01 | branchen.html Integration | 2 |
| PAGE-02 | nachhaltigkeit.html Integration | 2 |
| PAGE-03 | lean.html Erstellen | 2 |
| PAGE-04 | Navigation + Sitemap Update | 2 |
| ANIM-01 | Scroll-Reveal System | 3 |
| ANIM-02 | Stats-Strip | 3 |
| ANIM-03 | Hero-Timing | 3 |
| ANIM-04 | Hover-Effekte | 3 |
| ANIM-05 | Zertifikate-Logobar | 3 |
| I18N-01 | DE/EN Toggle Button | 4 |
| I18N-02 | Translation JSON | 4 |
| I18N-03 | data-i18n Attribute | 4 |
| I18N-04 | localStorage Persistenz | 4 |
| I18N-05 | hreflang + lang Attribut | 4 |
| I18N-06 | Formular-Lokalisierung | 4 |
| BLOG-01 | Blog Verzeichnisstruktur | 5 |
| BLOG-02 | Blog Übersichtsseite | 5 |
| BLOG-03 | Artikel-Template | 5 |
| BLOG-04 | Themen/Kategorie-Seiten | 5 |
| BLOG-05 | RSS Feed | 5 |
| BLOG-06 | PHP Includes Nav/Footer | 5 |
| SEO-01 | WebP Konvertierung | 6 |
| SEO-02 | width/height auf img | 6 |
| SEO-03 | fetchpriority Hero-Poster | 6 |
| SEO-04 | Schema.org ausbauen | 6 |
| SEO-05 | Lokales SEO | 6 |
| SEO-06 | Sitemap Update | 6 |
| SEO-07 | Core Web Vitals | 6 |
| CONT-01 | Named Contact | 7 |
| CONT-02 | Projekt-Detail-Seiten | 7 |
| CONT-03 | Leistungs-Content | 7 |
| CONT-04 | Inline-CTAs | 7 |
