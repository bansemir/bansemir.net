# PRD Teil 1: Architektur & Features

> Auszug aus PRD v2.1 — Vollversion: `docs/PRD.md`
> Weitere Teile: `PRD-2-data-and-mvc.md`, `PRD-3-agents-and-requirements.md`

## Hybrid-Architektur (Statisch + SAPUI5)

```
bansemir.net/
├── index.html              ← Statische Landing Page (SEO, < 50KB)
├── de/index.html            ← Deutsche Version
├── en/index.html            ← Englische Version
├── app/                     ← SAPUI5-Anwendung
│   ├── index.html           ← UI5 Bootstrap
│   ├── Component.js         ← Root Component (sap.ui.define)
│   ├── manifest.json        ← App Descriptor
│   ├── controller/          ← Controller (JavaScript ES6+)
│   ├── view/                ← XML Views
│   ├── model/               ← JSON Models (Daten)
│   ├── i18n/                ← i18n Properties (DE/EN)
│   ├── css/                 ← Custom Theme / Styles
│   └── test/                ← QUnit + OPA Tests
├── assets/                  ← Bilder, Fonts
├── legal/                   ← Impressum, Datenschutz
└── sitemap.xml
```

**Warum Hybrid:**
- Statische Landing Page löst SEO-Problem (SAPUI5 = SPA, schwer indexierbar)
- Landing Page < 500ms, SAPUI5-App 2-3s (Framework-Overhead)
- Google indexiert Landing Page, nicht SPA

## Teil A: Statische Landing Page

Schlankes HTML/CSS. Kein Framework. Max Performance, max SEO.

**Above the fold:**
- Name, Rolle, professionelles Foto
- Headline: "Software Architect — SAP & AI-assisted Development"
- Subline: "17+ Jahre SAP. 85.000 Zeilen AI-Toolkit. Sofort verfügbar."
- CTA Primary: "Verfügbarkeit prüfen" → Calendly
- CTA Secondary: "Interaktives SAPUI5-Profil →" → `/app/`

**Below the fold:**
- Kurzprofil (3 Absätze)
- Kernzahlen: 17+ Jahre | 8 Projekte | 85.000 Zeilen Toolkit | 4.500+ Tests
- Kontakt: E-Mail, LinkedIn, GitHub

**Technisch:** Reines HTML+CSS, < 50KB, Lighthouse ≥ 98, Meta-Tags, Open Graph, JSON-LD, hreflang

## Teil B: SAPUI5 Profil-App

App-Namespace: `net.bansemir.profile`

### Seitenstruktur

```
views/
├── App.view.xml                  ← Shell + Router
├── Overview.view.xml             ← Hauptseite (DynamicPage)
│   ├── Section: Hero             ← ObjectPageHeader
│   ├── Section: Positioning      ← ObjectPageSection
│   ├── Section: Skills           ← sap.ui.table.Table mit Filtern
│   ├── Section: Projects         ← sap.f.cards / Timeline
│   ├── Section: Toolkit          ← IconTabBar mit 4 Tools
│   ├── Section: AI-Transparency  ← "Built with Claude Code"
│   └── Section: Contact          ← Form + Calendly
├── ProjectDetail.view.xml        ← Projekt-Detailseite
└── ToolkitDetail.view.xml        ← Toolkit-Tool-Detailseite
```

### F1: App Shell & Navigation
- `sap.f.ShellBar`: Logo "Carsten Bansemir", Sektions-Links, Sprachwechsler (`sap.m.Select`), GitHub-Button
- `sap.f.FlexibleColumnLayout` oder `sap.uxap.ObjectPageLayout`
- `sap.ui.core.routing.Router` für Deep Links

### F2: Hero / ObjectPage Header
- `sap.uxap.ObjectPageLayout` mit headerTitle (Name, Rolle, Status) und headerContent (Foto als `sap.m.Avatar`, Key Facts als `sap.m.ObjectAttribute`)
- CTA: `sap.m.Button` (Emphasized) → Calendly

### F3: Positionierung
- 3 `ObjectPageSubSection`: SAP-Tiefe, Architektur-Breite, AI-Praxis
- Texte aus i18n-Model

### F4: Skills-Matrix
- `sap.ui.table.Table` (responsive): Skill, Kategorie, Jahre, Level, Projekte
- Filterbar, Sortierbar, Gruppierbar nach Kategorie
- Daten aus `model/skills.json`

### F5: Projekterfahrung
- `sap.f.GridList` mit `sap.f.Card` oder `sap.m.Timeline`
- Zeitraum, Rolle, Kunde, Technologies als `sap.m.Token`, Beschreibung
- Navigation zu ProjectDetail, Filter nach Technologie/Zeitraum
- Daten aus `model/projects.json`

### F6: SAP Accelerator Toolkit Showcase
- `sap.m.IconTabBar` mit 4 Tabs (Field-Change, Code Review, RAP/Fiori Generator, Ticket-to-Solution)
- Kernzahlen als `sap.m.NumericContent` in `sap.m.GenericTile`
- CTA → Calendly

### F7: "Built with Claude Code" — AI-Transparenz
- 3-4 `sap.m.Panel` (klappbar): Skeleton Generation, MCP Linting, Code Review, Iteration
- Link zum GitHub-Repo
- Ehrliche Tonalität

### F8: Verfügbarkeit & Kontakt
- `sap.ui.layout.form.Form` mit `ColumnLayout`
- Status, Arbeitsmodell, Stundensatz "Auf Anfrage", E-Mail, LinkedIn
- Calendly-Embed als `sap.ui.core.HTML`

### F9: Footer
- Impressum, Datenschutz, GitHub, LinkedIn, GULP
- "© 2026 Carsten Bansemir — Built with SAPUI5 + Claude Code"
