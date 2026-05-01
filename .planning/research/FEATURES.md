# Premium Bauunternehmen Website — Feature Research

_Last updated: 2026-05-01_
_Researched from: thost.de, goldbeck.de, dreso.com, openasset.com, projectmark.com, azurodigital.com_

---

## 1. Table Stakes — What a Premium Bauunternehmen Website Must Have

These are non-negotiable. Their absence signals "average contractor" immediately to Bauherren and institutional investors.

### Navigation & Information Architecture

- **Persistent sticky header** with logo left, primary nav center, single CTA button right ("Anfrage stellen" or "Kontakt")
- **Maximum 5–6 top-level nav items**: Leistungen, Projekte/Referenzen, Unternehmen, Karriere, Kontakt
- **Mega-menu** (or clear dropdown) for Leistungen if there are 3+ service categories — prevents dead-end pages
- **Language toggle** (DE/EN at minimum) if any international clients or institutional investors are targeted
- **Mobile hamburger** that opens a full-screen overlay, not a tiny dropdown

### Hero Section

- **Full-viewport height** (min 100vh) with real project photography or looping video (no stock images)
- **Single, outcome-oriented H1**: not "Willkommen" — something like "Ihr Partner für komplexe Bauprojekte in Berlin"
- **One primary CTA** above the fold (max two: primary + ghost variant)
- **Scroll-indicator** (arrow or fade) — users need to know there's more below
- Hero text must be **legible over video/photo** — dark overlay or contrasting panel

### Social Proof / Stats Strip

A horizontal band directly below the hero (or integrated into it) with 3–4 key figures:
- Jahre Erfahrung, Abgeschlossene Projekte, Mitarbeiter, Projektvolumen (Mio. EUR)
- Large number + small label. Animated counter on scroll is standard at premium tier.

### Services Overview

- 3–6 service cards on the homepage (not a wall of text)
- Icon or photo + short headline + 2-line description + "Mehr erfahren" link
- Each links to a dedicated service subpage (not an anchor jump — a real URL)

### Project Showcase (Homepage Teaser)

- Minimum 3 featured projects visible without scrolling
- Filter or category tabs (even on homepage teaser) signal breadth
- Each card: photo, project name, type, location
- "Alle Referenzen" link to full Projekte page

### Trust Signals (Distributed, Not Isolated)

- Company registration info (HRB, USt-ID) visible in footer — mandatory for German B2B credibility
- IHK / chamber membership logos in footer or on Unternehmen page
- Named contact person on contact page (not just a form) — full name, photo, phone
- SSL, DSGVO-compliant cookie banner, Impressum/Datenschutz in footer

### Contact Accessibility

- Phone number in the header (not just footer)
- Contact form on every page (at minimum: Vorname, E-Mail, Nachricht)
- Response time commitment stated ("Antwort innerhalb von 24 Stunden")

### Technical Foundation

- Core Web Vitals: LCP under 2.5s, CLS near zero — large images must use `loading="lazy"` and explicit dimensions
- `robots.txt` with `index, follow` — not the default Hostinger block
- `sitemap.xml` registered in Google Search Console
- Schema.org `LocalBusiness` or `Organization` on homepage, `BreadcrumbList` on subpages

---

## 2. Differentiators — Premium Tier vs. Average Contractor

### What Average Local Contractor Sites Do

- Generic stock photography (hardhat/shovel/blueprint clichés)
- "Willkommen bei uns" H1
- One phone number, no form
- Projects listed as a text bullet list or a gallery with no metadata
- Certifications buried in "Über uns" as plain text
- No blog, no news, no case studies
- No named contact persons
- Footer: "Alle Rechte vorbehalten" with no registration data

### What Premium Tier (goldbeck.de / thost.de / dreso.com) Does Differently

#### UI Patterns

| Pattern | Average | Premium |
|---|---|---|
| Photography | Stock | Real project photos, drone shots, team on site |
| Hero | Static image, generic copy | Looping video or full-bleed photo with precise positioning |
| Typography | System fonts or heavy serif | Condensed display font (like Barlow Semi Condensed) for headlines |
| Whitespace | Tight, cluttered | Generous — 80px+ section padding, breathing room |
| Color | Multiple accent colors | Strict 2-color palette (corporate + accent) |
| Stats | None | Animated counter strip: Jahre / Projekte / Mitarbeiter |
| Navigation CTA | "Kontakt" link | Filled button ("Anfrage stellen") visually distinct from nav links |
| Project cards | Grid of thumbnails | Cards with overlay: project name + type + location on hover |
| Team | "Unser Team" with head count | Named persons with photos, role, direct contact |

#### Content Depth

- **Premium:** Each service has its own URL, 400+ words, a project example, and a CTA
- **Average:** One "Leistungen" page with a bulleted list of 10 services

- **Premium:** Each project has its own detail page: challenge, solution, scope, timeline, result, photo gallery
- **Average:** Projects page = grid of thumbnails with no metadata

- **Premium:** Team bios with professional headshots, years at company, specialization
- **Average:** "Das ist unser Team" with a group photo

#### Trust Signal Architecture

- **Homepage:** Stats strip (years, projects, employees) + client logos if available
- **Leistungen pages:** Relevant certifications inline ("Zertifiziert nach DIN 18960")
- **Projekte detail:** Client quote + project scope + completion date
- **Unternehmen:** Certifications dedicated section with logos and one-line explanations
- **Footer:** HRB number, IHK/chamber logos, social links (LinkedIn primary)
- **Kontakt:** Named contact with direct phone number + photo

#### Contact Flow

1. User reads project or service page
2. Inline CTA: "Haben Sie ein ähnliches Projekt? Sprechen Sie uns an."
3. Small contact form embedded on that page (3 fields max) OR direct link to Kontakt
4. Kontakt page: Named person photo, phone, email, form, map
5. Confirmation: "Wir melden uns innerhalb von 24 Stunden"

---

## 3. Zertifikate / Awards Presentation

### Placement Strategy (Tiered by Importance)

| Placement | Content | When to Use |
|---|---|---|
| Footer (every page) | IHK logo + chamber logo, small, greyscale | Always — reinforces credibility passively |
| Unternehmen page | Full certification block with logos + 1-line description each | Always — dedicated trust section |
| Homepage (below stats strip) | Logo bar: 4–6 partner/certification logos | If 4+ certifications/partners exist |
| Leistungen subpages | Inline: relevant cert only | When a cert directly validates the service |

### Visual Treatment — What Works

- **Logo bar style:** Greyscale logos on a light grey background (`#F4F5F7`) — color logos look promotional, greyscale signals neutrality and maturity
- **Size:** All logos at consistent height (40–48px), uniform vertical alignment
- **Spacing:** Generous padding between logos (min 40px gap), no cramming
- **No "wall of badges"** — maximum 6 logos total. More dilutes credibility.
- **Label each logo** with one line below it (e.g., "IHK Cottbus — Mitglied seit 2018") — most visitors don't recognize logos alone

### For IHK and Architektenkammer Specifically

- IHK membership (not a quality seal — it's chamber registration): display in footer + Unternehmen page
- Architektenkammer Berlin: display on Leistungen > Planungsleistungen if applicable, + Unternehmen
- Do NOT display in the hero — looks cluttered
- Consider a dedicated "Zertifikate & Mitgliedschaften" subsection on Unternehmen page (not a full separate page at this company size)

### What Separates Premium Handling

- Premium: Each certification has a logo, its name, and a 1-sentence explanation of what it means for the client ("Mitglied der IHK Cottbus — geprüfte Qualifikation und regionaler Wirtschaftsverband")
- Average: Logo without context, or text list with no logos

---

## 4. Project Showcase Patterns — Referenzen / Projekte Section

### Layout Recommendation: Filtered Grid

**Use:** 3-column CSS grid on desktop, 2-column tablet, 1-column mobile.

**Why not masonry:** Masonry (Pinterest-style) creates visual noise and unequal visual weight. For B2B construction, consistent card heights signal professionalism and make scanning faster.

**Why not list:** List view works for case study-heavy content (agencies, consultants) but loses the visual impact that construction projects need.

**Why not carousel:** Carousels hide projects. Users rarely click through. Show 6–9 cards at once with a "Mehr laden" button.

### Filter Options (Priority Order)

1. **Projekttyp** (most important): Wohnbau, Gewerbebau, Industriebau, Hochbau, Tiefbau
2. **Leistungsart**: Projektmanagement, Ausführung, Planung
3. **Status**: Abgeschlossen, Laufend (shows active presence)
4. **Optional:** Location (Berlin, Brandenburg, etc.) if projects are geographically spread

Implementation: JavaScript `data-filter` attribute filtering (no page reload, no server required). Default: show all. Active filter highlighted in `--red`.

### Project Card Design (What to Show)

Each card:
```
[Full-bleed photo, 4:3 ratio]
[Type tag — e.g., "Gewerbebau" — top-left overlay]
[Overlay on hover: dark gradient bottom-up]
  Project Name (bold)
  Location • Year
  [Arrow or "Details" link]
```

- Minimum card info: photo, name, type, location/year
- Card should be clickable as a whole (not just the button)
- Hover state with overlay is premium — reveals text over photo

### Project Detail Page (Individual Referenz)

This is the highest-trust content on the site. Each detail page should contain:

| Element | Purpose |
|---|---|
| Hero photo (full-width) | Visual proof |
| Project name + type + location + year | Quick orientation |
| Key metrics bar: Fläche (m²), Bauzeit, Projektvolumen | Quantified scope |
| Challenge / Herausforderung (2–3 sentences) | Shows competence understanding |
| Solution / Unsere Leistung (3–5 sentences) | Explains what was done |
| Result / Ergebnis | Outcome, on-time/budget if applicable |
| Photo gallery (3–6 photos) | Depth of evidence |
| Client quote (if available) | Social proof |
| Related services / Related projects | Cross-linking, reduces bounce |
| CTA: "Ähnliches Projekt geplant?" + link to contact form | Lead capture |

### What Clients (Bauherren / Institutional Investors) Look For

Based on the research findings, priority order:

1. **Photo quality** — the single biggest differentiator. Blurry or low-res photos = low trust
2. **Scale indicators** — "3.200 m² Nutzfläche", "18 Monate Bauzeit", "2,4 Mio. EUR" — clients self-qualify
3. **Similarity to their project** — filters by type enable this
4. **Evidence of problem-solving** — "challenges overcome" section builds confidence more than "we built it"
5. **Named client or recognizable location** — "Berlin-Neukölln" or company name if permission given
6. **Timeline adherence** — "termintreu abgeschlossen" is a strong claim if stated

### Content Volume Guidance

- Minimum viable: 8–12 projects to seem established
- Target for a growing firm (alanbau scale): 10–15 well-documented projects
- Do not pad with undocumented thumbnail-only entries — better to show 8 strong projects than 20 weak ones

---

## 5. Blog / News for B2B Construction PM

### Does it Drive Leads?

Yes — but only if done consistently and with the right content types. Research shows content marketing generates 3x more leads than traditional marketing and costs 62% less. German construction buyers spend 3–6 months researching before contacting — content must appear during this phase.

However, an empty or rarely updated blog is worse than no blog. It signals neglect.

### Recommended Content Types (Ranked by Lead Value)

| Content Type | Lead Value | Effort | Frequency |
|---|---|---|---|
| Projekt-Fallstudie (Case Study) | Very High | High | 1 per completed project |
| Service deep-dive (e.g., "Was ist BIM-Koordination?") | High | Medium | 2–3x per year |
| Marktupdate / Branchentrend | Medium | Low | 1x per quarter |
| "So läuft ein Projekt bei uns ab" | High | Medium | 1–2x total |
| Pressemitteilung / Auszeichnung | Medium | Low | Event-driven |
| Team-Vorstellung | Low (HR value) | Low | As needed |

### Avoid (Low ROI for this company size)

- Generic news roundups with no original perspective
- "Wir wünschen frohe Weihnachten" posts
- Opinion pieces with no data or project evidence
- Content less than 400 words

### Case Study Format — The Highest-Value Content

A construction PM case study should follow this structure:

```
Headline: [Ergebnis] für [Projekttyp] in [Ort]
Example: "18 Monate, 2.400 m², termintreu — Bürokomplex Berlin-Tempelhof"

1. Das Projekt (100 words)
   Type, location, scope, client context

2. Die Herausforderung (150 words)
   What made it complex: tight timeline, difficult site, 
   complex stakeholders, regulatory requirements

3. Unsere Leistung (200 words)
   Specific PM or construction work done — concrete, named actions

4. Das Ergebnis (100 words)
   On-time? On-budget? Client satisfaction? Any metrics available.

5. Fotos (4–8 real project photos)

6. Zitat des Bauherrn (if permission given)

7. CTA: "Haben Sie ein ähnliches Projekt?"
```

Target length: 600–900 words + photos. Longer is fine if substance warrants it — not for padding.

### Publication Frequency

- Minimum: 1 post per month to stay indexed and signal activity
- Ideal for a company of this size: 1 post per 3–4 weeks (quality over volume)
- A "Aktuelles" section that doubles as news + blog is acceptable and easier to maintain than a separate "Blog" tab

### SEO-Specific Guidance for German Construction

- Target long-tail: "Bauunternehmen Berlin Gewerbebau", "Bau Projektmanagement Berlin", "Generalunternehmer Schönefeld"
- Each case study naturally generates location + type keyword combinations
- Service deep-dives target question-form searches: "Was kostet Bau Projektmanagement Berlin"

---

## 6. Synthesized Prescriptions — What Alanbau.de Should Do

Based on the reference sites and best practices, the highest-priority improvements for alanbau v2.1:

### Must Implement (Table Stakes Gap Closers)

1. **Stats strip** on homepage: Jahre / Projekte / Mitarbeiter — even with modest numbers, it signals established presence
2. **Named contact on Kontakt page** — photo of Mehmet Emre Alan, direct phone, direct email
3. **Project detail pages** (one per Referenz) — current projekte.html is a grid; add individual project pages for the 3–5 strongest
4. **Inline CTA at bottom of each Leistungen section** — "Projekt anfragen" button after each of the 3 service columns
5. **Footer certification bar** — IHK Cottbus + Architektenkammer Berlin logos, greyscale, with one-line descriptions

### Should Implement (Differentiator Additions)

6. **Project filter on projekte.html** — JavaScript data-filter by type (Wohnbau / Gewerbebau / Industriebau)
7. **Client testimonials section** (Unternehmen or homepage) — even 2–3 quotes dramatically raise trust
8. **"Unsere Leistungen" anchor overview** on homepage with 3 service cards linking to leistungen.html anchors
9. **Aktuelles / News section** — even 3–4 case study posts are enough to launch with

### Can Defer

10. Multi-language (DE/EN) — only if international clients are actively being pursued
11. Full blog infrastructure — start with static HTML "news" entries, not a CMS
12. Video testimonials — resource-intensive, only if client video footage exists

---

## Sources

- [25 Best Construction Websites: Examples to Inspire](https://openasset.com/resources/construction-website-examples/) — [CITED]
- [Construction Website Design: Essential Elements for Winning More Projects](https://www.projectmark.com/blog/construction-website-design) — [CITED]
- [10 Best Construction Website Designs](https://azurodigital.com/construction-website-examples/) — [CITED]
- [Construction Content Marketing: 2026 Guide to Leads](https://percepture.com/construction-insights/content-marketing-for-construction/) — [CITED]
- [5 Expert Ways to Highlight Certifications](https://smallbizclub.com/run-and-grow/operations/5-expert-ways-to-highlight-your-businesss-certifications-and-expertise/) — [CITED]
- [Industry Certifications and Awards: Enhancing Construction Reputation](https://www.zimmercontract.com/experience-and-expertise-industry-certifications-and-awards) — [CITED]
- THOST.de homepage and Projekte page — [VERIFIED: live site]
- Drees & Sommer (dreso.com) homepage — [VERIFIED: live site]
- GOLDBECK.de Projekte page — [CITED: goldbeck.de/projekte]
- B2B Marketing Construction Industry patterns — [ASSUMED: training knowledge on B2B construction buyer behavior] — cross-verified with multiple sources
