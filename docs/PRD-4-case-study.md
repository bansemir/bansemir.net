# PRD Teil 4: Case Study Subpage — "How This Site Was Built"

> Ergänzung zu PRD v2.1 — Teile: `PRD-1-spec.md`, `PRD-2-data-and-mvc.md`, `PRD-3-agents-and-requirements.md`
> Konzeptdokument: Siehe `../Freelance/case-study-konzept.md` für Story-Arc-Details und kuratierte Screenshot-Liste

## Überblick

Neue Unterseite dokumentiert den AI-assisted Build-Prozess von bansemir.net. Dient als Beweisstück für die "AI in der Praxis"-Positionierung.

**Umsetzung: Hybrid (Option C)**
- Statische HTML-Seite `/case-study/` (DE) + `/case-study/en/` (EN) für SEO + Social Sharing
- SAPUI5-Route `#/case-study` für interaktive Version innerhalb der App
- Geteilte Datenquelle: `model/casestudy.json`

## Statische Seite: `/case-study/`

### Architektur

```
case-study/
├── index.template.html     ← DE Template (wie Landing Page)
├── en/
│   └── index.template.html ← EN Template
└── (generiert via build-html.js)

content/
└── casestudy-de.json       ← Texte + Bildpfade
└── casestudy-en.json       ← Texte + Bildpfade (EN)

assets/case-study/
├── 01-cowork-content.webp   ← Kuratierte Screenshots (WebP, max 1200px)
├── 02-decisions.webp
├── 03-workpackages.webp
├── ...
└── 13-goodnight.webp
```

### Technisch

- Gleicher Stil wie Landing Page (`de/index.html`, `en/index.html`)
- Template-System: `{{Platzhalter}}` via `build-html.js` (existiert bereits)
- Bilder: WebP, max 1200px breit, Lazy Loading (`loading="lazy"`)
- Responsive: CSS Grid/Flexbox, Mobile-first
- SEO: eigene Meta-Tags, JSON-LD Article Schema, Open Graph Image
- hreflang zwischen DE und EN Version
- Kein JavaScript-Framework, kein SAPUI5-Overhead

### Seitenstruktur (8 Kapitel)

1. **Hook** — Hero mit Key Stats (Zahlen, kein Bild)
   - "2,5h statt 4-5 Wochen", 21 Workpackages, 34 Dateien, 10 Agenten
2. **Ausgangslage** — Content-Vorbereitung in Cowork (1 Screenshot)
3. **Planung** — PRD → Workpackages → Agenten-Zuweisung (2 Screenshots)
4. **Implementierung** — Parallele Wellen, 63 Minuten (2 Screenshots)
5. **Qualitätssicherung** — E2E Tests, Code Review, A11y (2 Screenshots)
6. **Problem-Lösung** — ShellBar, Theme, i18n Bugs + iterative Fixes (2 Screenshots)
7. **Go-Live** — Deployment auf IONOS (1 Screenshot)
8. **Ergebnis** — Zeittabelle, Lessons Learned, Abschluss (2 Screenshots)

Zwischen Kapiteln: kurze Verbindungstexte (2-3 Sätze). Kein Blog-Stil, sondern faktenbasierte Dokumentation.

### Screenshots (aufbereitet, liegen in `assets/case-study/`)

Status: **ERLEDIGT** — 13 WebP-Dateien, max 1200px breit, gesamt 804 KB.

| Datei | Kapitel | Zeigt | Alt-Text (DE) | Alt-Text (EN) |
|-------|---------|-------|---------------|---------------|
| `01-cowork-content.webp` | 2 – Ausgangslage | Cowork-Session: alle Content-Dateien verifiziert | Content-Vorbereitung in der Cowork-Session | Content preparation in the Cowork session |
| `02-decisions.webp` | 3 – Planung | Entscheidungstabelle: offene Punkte geklärt | Klärung offener Entscheidungen vor Implementierung | Resolving open decisions before implementation |
| `03-workpackages.webp` | 3 – Planung | 21 Workpackages in 6 Wellen mit Agenten-Zuweisung | Workpackage-Plan: 21 Pakete in 6 Ausführungswellen | Workpackage plan: 21 packages across 6 execution waves |
| `04-wave-plan.webp` | 4 – Implementierung | Wellenübersicht mit parallelen/sequenziellen Modi | Ausführungswellen mit parallelen und sequenziellen Agenten | Execution waves with parallel and sequential agents |
| `05-parallel-agents.webp` | 4 – Implementierung | 4 Agenten werden gleichzeitig gestartet (Welle 2) | Vier AI-Agenten arbeiten parallel an Infrastruktur-Aufgaben | Four AI agents working in parallel on infrastructure tasks |
| `06-e2e-testplan.webp` | 5 – QA | Strukturierter E2E-Testplan mit 11 Tests | End-to-End-Testplan für alle Seiten und Funktionen | End-to-end test plan covering all pages and features |
| `07-bugfix-splitview.webp` | 5 – QA | Split-View: Bugfixes im Code, fertige App im Browser | Paralleles Debugging: Code-Fixes links, Live-Vorschau rechts | Parallel debugging: code fixes on the left, live preview on the right |
| `08-shellbar-debug.webp` | 6 – Problem-Lösung | ShellBar-CSS-Problem: DOM-Analyse und strukturelle Lösung | Analyse des ShellBar-Rendering-Problems in sap_fiori_3 | Analyzing the ShellBar rendering issue in sap_fiori_3 |
| `09-language-bugfix.webp` | 6 – Problem-Lösung | Sprachwechsel-Bug: Analyse und Fix mit JSON-Model | Iterative Lösung des Sprachwechsler-Bugs | Iterative fix for the language switcher bug |
| `10-app-live.webp` | 5 – QA | Fertige App: Skills-Tabelle und Projekterfahrung | Vollständige SAPUI5-App mit Skills-Matrix und Projektliste | Complete SAPUI5 app with skills matrix and project list |
| `11-timeline.webp` | 8 – Ergebnis | Zeittabelle: jede Phase mit Dauer, gesamt 63 Minuten | Implementierungs-Timeline: 63 Minuten für die komplette App | Implementation timeline: 63 minutes for the complete app |
| `12-deployment.webp` | 7 – Go-Live | Phase 1 komplett, Phasen-Roadmap, Deployment-Start | Deployment-Übersicht und Phasen-Roadmap | Deployment overview and phase roadmap |
| `13-goodnight.webp` | 8 – Ergebnis | Session-Log erstellt, Memory gespeichert, Abschluss | Session-Abschluss: Log geschrieben, Kontext gespeichert | Session wrap-up: log written, context saved |

## SAPUI5-App: Route `#/case-study`

### Neue Artefakte

```
app/webapp/
├── view/
│   └── CaseStudy.view.xml          ← Neue View
├── controller/
│   └── CaseStudy.controller.js     ← Neuer Controller
├── view/fragment/
│   └── CaseStudyChapter.fragment.xml ← Fragment für ein Kapitel
└── model/
    └── casestudy.json               ← Kapitel-Daten + Bildpfade
```

### manifest.json Ergänzungen

Neues Model:
```json
"casestudy": {
    "type": "sap.ui.model.json.JSONModel",
    "uri": "model/casestudy.json"
}
```

Neue Route + Target:
```json
{
    "name": "caseStudy",
    "pattern": "case-study",
    "target": "caseStudy"
}
```
```json
"caseStudy": {
    "name": "CaseStudy",
    "level": 1
}
```

### CaseStudy.view.xml — Struktur

`sap.uxap.ObjectPageLayout` (konsistent mit Overview):
- **Header:** Titel "How This Site Was Built", Untertitel mit Key Stats
- **Section pro Kapitel:** `ObjectPageSection` mit `ObjectPageSubSection`
  - Kapiteltext aus `casestudy>chapters/X/text` (i18n-Binding)
  - Screenshots als `sap.m.Image` mit `sap.m.LightBox` für Zoom
  - Captions unter Bildern via `sap.m.Label`
- **Navigation:** Tab-Leiste mit Kapitel-Titeln (automatisch durch ObjectPage)
- **Footer-Link:** Zurück zur Overview via Router

### casestudy.json — Datenstruktur

```json
{
    "title": { "de": "So wurde diese Website gebaut", "en": "How This Site Was Built" },
    "subtitle": { "de": "AI-assisted Development mit Claude Code", "en": "AI-assisted Development with Claude Code" },
    "stats": [
        { "value": "2,5h", "label": { "de": "Implementierung", "en": "Implementation" } },
        { "value": "21", "label": { "de": "Workpackages", "en": "Workpackages" } },
        { "value": "10", "label": { "de": "AI-Agenten", "en": "AI Agents" } },
        { "value": "11k", "label": { "de": "Zeilen Code", "en": "Lines of Code" } }
    ],
    "chapters": [
        {
            "id": "hook",
            "title": { "de": "2,5 Stunden statt 4-5 Wochen", "en": "2.5 Hours Instead of 4-5 Weeks" },
            "text": { "de": "...", "en": "..." },
            "images": []
        },
        {
            "id": "preparation",
            "title": { "de": "Ausgangslage", "en": "Starting Point" },
            "text": { "de": "...", "en": "..." },
            "images": [
                { "src": "assets/case-study/01-cowork-content.webp", "alt": { "de": "...", "en": "..." }, "caption": { "de": "...", "en": "..." } }
            ]
        }
    ]
}
```

### CaseStudy.controller.js

- `onInit`: Sprache aus URL-Parameter lesen, `formatLocalized` Formatter für DE/EN Texte
- `onNavBack`: Navigation zurück zur Overview
- `onImagePress`: `sap.m.LightBox` öffnen (Zoom-Ansicht)
- Max 150 Zeilen (CLAUDE.md-Regel)

### i18n-Ergänzungen

```properties
# Case Study
casestudy.pageTitle=So wurde diese Website gebaut
casestudy.subtitle=AI-assisted Development mit Claude Code
casestudy.backToOverview=Zur\u00fcck zur \u00dcbersicht
casestudy.imageZoom=Bild vergr\u00f6\u00dfern
```

## Änderungen am bestehenden "Built with Claude Code"-Tab

### Aktuell (Overview.view.xml, Section F7)

4 klappbare Panels: Skeleton Generation, MCP Linting, Code Review, Caching-Problem

### Neu

1. **Hero-Zahlen oben** — 4 `sap.m.NumericContent` in `sap.m.GenericTile` (wie Toolkit-Sektion):
   - 2,5h Implementierung | 21 Workpackages | 10 Agenten | 11.000 Zeilen
2. **4 bestehende Panels bleiben** (unverändert)
3. **Neuer CTA-Button unten** — `sap.m.Button` (Emphasized):
   - Text: `{i18n>builtWith.caseStudyLink}` → "Vollständige Build-Dokumentation →"
   - Press-Event: Navigation zu `#/case-study`
4. Optional: 1 Teaser-Bild (Zeittabelle-Screenshot) als Vorschau

### i18n für Teaser

```properties
builtWith.caseStudyLink=Vollst\u00e4ndige Build-Dokumentation ansehen
builtWith.statsImplementation=Implementierung
builtWith.statsWorkpackages=Workpackages
builtWith.statsAgents=AI-Agenten
builtWith.statsLines=Zeilen Code
```

## Workpackage-Vorschlag

| ID | Name | Agent | Abhängigkeiten | Größe |
|----|------|-------|----------------|-------|
| WP-CS-01 | Screenshot-Aufbereitung | Manuell (User) | — | M |
| WP-CS-02 | casestudy.json Daten + Texte DE/EN | sap-cv-profile-optimizer-dach | WP-CS-01 | M |
| WP-CS-03 | Statische Case Study Seite (DE + EN) | engineering-frontend-developer | WP-CS-01, WP-CS-02 | M |
| WP-CS-04 | SEO: Meta-Tags, JSON-LD Article, OG Image | marketing-seo-specialist | WP-CS-03 | S |
| WP-CS-05 | SAPUI5: CaseStudy View + Controller + Fragment | sap-frontend-developer | WP-CS-02 | L |
| WP-CS-06 | SAPUI5: manifest.json Route + Model | sap-modern-fullstack-developer | WP-CS-05 | S |
| WP-CS-07 | Overview F7 Teaser-Umbau | sap-frontend-developer | WP-CS-06 | S |
| WP-CS-08 | i18n: Alle neuen Texte DE + EN | sap-cv-profile-optimizer-dach | WP-CS-07 | S |
| WP-CS-09 | Code Review + Accessibility Audit | engineering-senior-developer + testing-accessibility-auditor | WP-CS-08 | M |
| WP-CS-10 | E2E Test Case Study Seiten | testing-reality-checker | WP-CS-09 | S |

### Ausführungswellen

```
Welle 0 (Manuell): WP-CS-01 Screenshot-Aufbereitung
Welle 1 (parallel): WP-CS-02 Daten + WP-CS-03 Statische Seite
Welle 2 (sequenziell): WP-CS-04 SEO → WP-CS-05 SAPUI5 View
Welle 3 (sequenziell): WP-CS-06 Routing → WP-CS-07 Teaser
Welle 4 (parallel): WP-CS-08 i18n + WP-CS-09 QA
Welle 5: WP-CS-10 E2E Tests
```

## MVC-Regeln (gelten unverändert)

- Alle Texte in `casestudy.json` (Daten) oder `i18n` (UI-Labels)
- View rein deklarativ mit Data Binding
- Controller: nur Event-Handler + Navigation, max 150 Zeilen
- `formatLocalized` Formatter für DE/EN JSON-Texte (existiert bereits)
- Bilder als statische Assets, Pfade in casestudy.json
- UI5 Linter: 0 Errors, 0 Warnings vor Commit

## Commit-Format

```
feat(case-study): kurze beschreibung

- Was geändert wurde
- UI5 Linter: 0 errors, 0 warnings
- Implemented by: [agent]
- Reviewed by: engineering-senior-developer (X findings → fixed)
- Reviewed by: testing-accessibility-auditor (AA compliant)

Co-Authored-By: Claude Code <noreply@anthropic.com>
```

## Abhängigkeiten

- **WP-CS-01 ist Blocker:** Screenshots müssen manuell aufbereitet werden bevor Implementierung startet
- **Kein neues Framework:** Statische Seite nutzt bestehendes Template-System (`build-html.js`)
- **Kein neues Model-Pattern:** casestudy.json folgt dem Muster von projects.json/toolkit.json
- **Landing Page-Link:** Statische Landing Pages (DE/EN) brauchen optional einen Link zur Case Study im Footer oder Kontaktbereich
