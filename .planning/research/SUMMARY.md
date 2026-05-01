# Research Summary — alanbau.de Premium Relaunch

## Stack

**Animation:** Pure Intersection Observer + CSS (zero dependencies). Expo-out easing `cubic-bezier(0.16, 1, 0.3, 1)` for reveals — noticeably better than generic `ease`. GSAP ist seit der Webflow-Akquisition 2024 vollständig gratis (inkl. ScrollTrigger) — nur hinzufügen wenn scroll-scrubbed Parallax benötigt wird.

**Sprache DE/EN:** In-Page JavaScript Toggle — `data-i18n` Attribute + `assets/i18n/de.json` / `en.json`. Separate `/en/` HTML-Seiten wären SEO-sauberer, aber für eine 7-seitige B2B-Site im deutschen Markt ist der Wartungsaufwand unverhältnismäßig. Hreflang-Tags trotzdem implementieren (bidirektional).

**Blog-Wartbarkeit:** Hostinger unterstützt PHP — Server-Side Includes (`<?php include '../partials/nav.php'; ?>`) lösen das Nav/Footer-Duplikationsproblem ohne Build-Step. Alternativ: manuell wartbare statische HTMLs, aber max. 10–15 Artikel.

**Bildoptimierung:** `npx sharp-cli` über Node (verfügbar auf dem System) — kein `cwebp`/`sips`. `<picture>` mit WebP + JPEG Fallback. Explizite `width`/`height` auf allen `<img>` für CLS-Vermeidung.

## Table Stakes (muss vorhanden sein)

- **Stats-Strip** direkt unter dem Hero: Jahre Erfahrung / abgeschlossene Projekte / Mitarbeiter — animierter Counter
- **Named Contact Person** mit Foto auf der Kontakt-Seite (kein anonymes Formular)
- **Projekt-Detail-Seiten** (mindestens 3–5): Metrics-Bar (m², Bauzeit, Volumen), Challenge, Solution, Fotos
- **Zertifikate-Logobar** im Footer: IHK + Architektenkammer, Graustufen, mit einzeiliger Beschriftung
- **CTA am Ende jeder Leistungs-Sektion**: inline, nicht nur oben im Hero

## Watch Out For

| Risiko | Schwere | Fix |
|---|---|---|
| `prefers-reduced-motion` fehlt für Hero-Video | Mittel | `.hero-bg { display: none; }` unter der Media Query |
| 3D-Tilt-Karte triggert auf Touch-Geräten | Niedrig | `if (!window.matchMedia('(hover: none)').matches)` Guard |
| Reciprocal hreflang-Pflicht | Hoch | Jede DE-Seite muss auf EN-Äquivalent zeigen und umgekehrt |
| Form-Validierung in Browser-Sprache (nicht Page-Sprache) | Mittel | Custom JS Validation nötig |
| PageSpeed-Ziel | Klar | Realistisch: Mobile 75–85, Desktop 90+; Hero-Video macht Mobile-90 fast unmöglich |
| `fetchpriority="high"` auf Hero-Poster fehlt | Mittel | +700ms LCP-Verbesserung laut Google Flights Team |
| Expo-out Easing auf `.reveal` | Niedrig | Tauscht `ease` gegen `cubic-bezier(0.16,1,0.3,1)` |
| Hero-Text-Stagger zu langsam (1.7s) | Niedrig | Auf 1.15s total kürzen |
| Blog: 38 Dateien bei Nav-Änderung | Hoch | PHP includes oder statisch auf max. 10–15 Artikel begrenzen |

## Key Prescriptions

1. **Eine CSS-Zeile** behebt den Scroll-Offset-Bug: `html { scroll-padding-top: var(--nav-h); }`
2. **Stats-Strip** ist der höchste ROI für Premium-Wahrnehmung — kostet wenig, wirkt viel
3. **Projekt-Detail-Seiten** sind der wichtigste Vertrauensaufbau für institutionelle Investoren
4. **PHP includes** wenn Blog implementiert wird — verhindert Wartungshölle
5. **Graustufen-Zertifikate-Logobar** im Footer ist Standard bei Premium-Bauunternehmen

_Last updated: 2026-05-01_
