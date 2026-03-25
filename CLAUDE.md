# CLAUDE.md — bansemir.net

## Projekt

Freelancer-Profilwebsite für Carsten Bansemir (SAP Software Architect).
Hybrid: Statische Landing Page + SAPUI5-App. JavaScript ES6+. IONOS Hosting.
Public GitHub Repo als AI-assisted Development Showcase.

## Tech Stack

- **SAPUI5 1.136 LTS** (von SAP CDN)
- **JavaScript ES6+** mit `sap.ui.define` Modulsystem (kein TypeScript)
- **@ui5/cli** für Build und Dev-Server
- **ui5-middleware-livereload** für Entwicklung
- **IONOS Webhosting** (statische Dateien via SFTP)
- **Plausible** Analytics (DSGVO-konform, kein Cookie-Banner)
- **Calendly** Embed (Free Tier)

## Architektur

```
bansemir.net/
├── index.html              ← Statische Landing Page (SEO, < 50KB)
├── app/                    ← SAPUI5-Anwendung
│   └── webapp/
│       ├── Component.js    ← Root Component
│       ├── manifest.json   ← App Descriptor + Model-Deklarationen
│       ├── controller/     ← CONTROLLER: Event-Handler, Navigation
│       ├── view/           ← VIEW: XML Views + Fragments (deklarativ)
│       ├── model/          ← MODEL: JSON-Dateien + formatter.js
│       └── i18n/           ← MODEL: Properties-Dateien (DE/EN)
├── assets/                 ← Bilder, Fonts
└── legal/                  ← Impressum, Datenschutz
```

## MVC-Regeln

SAPUI5 ist ein MVC-Framework. Diese Regeln verschärfen das:

**MODEL** (`model/`, `i18n/`, `manifest.json`):
- Alle Daten in JSON-Dateien, alle Texte in `i18n.properties`
- Models werden in `manifest.json` deklariert, nicht im Controller erzeugt

**VIEW** (`view/`, `fragment/`):
- Rein deklarative XML Views mit Data Binding
- Expression Bindings und `core:require` für Formatter sind erlaubt (SAPUI5-Pattern)
- KEINE Geschäftslogik, KEINE hartcodierten Strings

**CONTROLLER** (`controller/`):
- Event-Handler, Model-Zugriff via `this.getView().getModel()`, Navigation
- KEINE UI-Erzeugung (dafür XML Views/Fragments)
- KEINE hartcodierten Daten (dafür JSON-Models)

**Formatter** (`model/formatter.js`):
- Reine Funktionen: Model-Wert → Display-Wert
- Keine Seiteneffekte, kein Model-Zugriff

## SAPUI5 Coding Guidelines

1. NIEMALS globale `sap.*` Zugriffe — alle Dependencies via `sap.ui.define`
2. IMMER `sap/ui/core/ComponentSupport` in `index.html`
3. IMMER Data Binding in Views — keine DOM-Manipulation
4. IMMER Built-in Data Types bevorzugen, Formatter nur für Business-Logik
5. IMMER i18n-Änderungen in ALLEN Locales gleichzeitig
6. NIEMALS Inline-Scripts in HTML (CSP)
7. IMMER `sap.ui.layout.form.Form` mit `ColumnLayout` (nicht SimpleForm)
8. IMMER `run_ui5_linter` via MCP Server vor jedem Commit

## Kein AI Slop

- KEINE Kommentare die den Code wiederholen
- KEINE globalen `sap.*` — immer `sap.ui.define`
- KEINE `sap.ui.getCore()` — deprecated
- KEINE `jQuery` wo UI5-API existiert
- KEINE hartcodierten Strings — alles aus i18n oder Model
- KEINE programmatische Control-Erzeugung wo XML View/Fragment reicht
- KEINE unused Dependencies
- KEINE veralteten APIs (UI5 Linter: 0 Errors, 0 Warnings)
- Jeder Controller unter 150 Zeilen, jeder View unter 200 Zeilen
- Jeder Formatter ist eine reine Funktion

## Agenten-Orchestrierung

Alle Agenten aus `~/.claude/agents/`. Der `project-planner` teilt Arbeit in Workpackages auf.

**SAPUI5-Implementierung → SAP-Agenten (PFLICHT):**
- `sap/sap-frontend-developer.md` → Views, Controller, Fragments, Data Binding
- `sap/sap-modern-fullstack-developer.md` → Component.js, manifest.json, Routing
- `sap/specialized-sap-agents-orchestrator-merged.md` → Orchestriert SAP-Agenten + Quality Gates

**QA-Agenten:**
- `engineering/engineering-senior-developer.md` → Code Review
- `testing/testing-accessibility-auditor.md` → WCAG 2.1 AA
- `testing/testing-performance-benchmarker.md` → Lighthouse

**SAP MCP Server (von SAP-Agenten genutzt):**
- `@ui5/mcp-server`: `get_guidelines`, `run_ui5_linter`, `run_manifest_validation`, `get_api_reference`
- `@sap-ux/fiori-mcp-server`: `search_docs`, `list_functionality`
- SAPsolve Toolkit (alle Projekte unter `/Library/Vibes/toolkit`, Repos im Git-Account):
  - Field-Change-Analyse (Port 9001): `/Library/Vibes/toolkit/field-change`
  - Review Assistant (Port 9002, 201 Regeln): `/Library/Vibes/toolkit/code-review`
  - Skeleton Generator (Port 9003): `/Library/Vibes/toolkit/rap-generator`
  - Ticket-Bewertung (Port 9004): `/Library/Vibes/toolkit/ticket-analysis`
- **Claude Code startet die Toolkit-Server selbständig.** Bei Fehlern nachfragen statt abbrechen.

## Commit-Format

```
feat(section): kurze beschreibung

- Was geändert wurde
- UI5 Linter: 0 errors, 0 warnings
- Implemented by: sap-frontend-developer
- Reviewed by: engineering-senior-developer (X findings → fixed)
- Reviewed by: testing-accessibility-auditor (AA compliant)

Co-Authored-By: Claude Code <noreply@anthropic.com>
```

## i18n

- Default: Deutsch (`i18n.properties`)
- Englisch: `i18n_en.properties`
- Sprachumschaltung via `?sap-language=en` oder UI-Control
- Landing Page: separate HTML-Dateien pro Sprache

## Datenquellen

- `model/projects.json` — 8 Projekte mit DE/EN Beschreibungen
- `model/skills.json` — Skills nach Kategorie mit Jahren, Level, Projektbezug
- `model/toolkit.json` — 4 Tools mit Beschreibungen und Zahlen
- `i18n/i18n.properties` / `i18n_en.properties` — Alle UI-Texte
- `manifest.json` — App-Config, Model-Deklarationen, Routing

## Was NICHT zu tun ist

- Kein TypeScript (Phase 1 — bewusste Entscheidung)
- Kein Backend / keine API / keine Datenbank / kein OData
- Kein SSR — statische Dateien + SAPUI5 SPA
- Kein Google Analytics — nur Plausible
- Kein Cookie-Banner
- Kein Dark Mode (out of scope Phase 1)
- Kein Blog (Phase 3)
- Kein Clean Core Check (Phase 2)
- Keine `SimpleForm` — nur `Form` mit `ColumnLayout`
- Keine generischen Engineering-Agenten für SAPUI5-Code — nur SAP-Agenten
