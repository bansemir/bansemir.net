# PRD Teil 3: Agenten, Anforderungen & Zeitplan

> Auszug aus PRD v2.1 — Vollversion: `docs/PRD.md`

## Agenten-Orchestrierung

> Alle Agenten aus `~/.claude/agents/`. Der `project-planner` teilt in Workpackages auf.
> Für SAPUI5-Implementierung ausschließlich SAP-Agenten.

### Orchestrierung & Planung

| Agent | Pfad | Rolle |
|-------|------|-------|
| **Project Planner** | `project-management/project-planner.md` | Zerlegt PRD in Workpackages, weist an Agenten zu |
| **SAP Agents Orchestrator** | `sap/specialized-sap-agents-orchestrator-merged.md` | Orchestriert SAP-Workpackages, Quality Gates, Retry-Logik |

### SAP-Agenten (PFLICHT für SAPUI5)

| Agent | Pfad | Aufgaben |
|-------|------|----------|
| **SAP Frontend Developer** | `sap/sap-frontend-developer.md` | Views, Controller, Fragments, Data Binding, i18n, Theme |
| **SAP Modern Fullstack Developer** | `sap/sap-modern-fullstack-developer.md` | Component.js, manifest.json, Routing, JSON-Models |
| **SAP CV/Profile Optimizer DACH** | `sap/sap-cv-profile-optimizer-dach.md` | Profil-Texte, Positionierung, Skills-Darstellung |

### QA-Agenten

| Agent | Pfad | Aufgaben |
|-------|------|----------|
| **Senior Developer** | `engineering/engineering-senior-developer.md` | Code Review, Clean Code, MVC |
| **Frontend Developer** | `engineering/engineering-frontend-developer.md` | Landing Page HTML/CSS |
| **Security Engineer** | `engineering/engineering-security-engineer.md` | CSP, sichere Config |
| **Technical Writer** | `engineering/engineering-technical-writer.md` | README, Commit-History |
| **DevOps Automator** | `engineering/engineering-devops-automator.md` | Build, IONOS-Deployment |
| **Accessibility Auditor** | `testing/testing-accessibility-auditor.md` | WCAG 2.1 AA |
| **Performance Benchmarker** | `testing/testing-performance-benchmarker.md` | Lighthouse |
| **Reality Checker** | `testing/testing-reality-checker.md` | End-to-End Validierung |

### Design & Marketing

| Agent | Pfad | Aufgaben |
|-------|------|----------|
| **UX Architect** | `design/design-ux-architect.md` | Informationsarchitektur |
| **UI Designer** | `design/design-ui-designer.md` | Custom Theme, Farben |
| **Brand Guardian** | `design/design-brand-guardian.md` | Konsistente Positionierung |
| **SEO Specialist** | `marketing/marketing-seo-specialist.md` | Meta-Tags, JSON-LD, sitemap |
| **Content Creator** | `marketing/marketing-content-creator.md` | LinkedIn-Launch-Post |

### Quality Loop (pro Feature)

```
SAP Frontend Dev → @ui5/mcp-server: run_ui5_linter (0 Errors)
    → SAPsolve Review Assistant: 201 Regeln
    → Senior Developer: Code Review
    → Accessibility Auditor: WCAG 2.1 AA
    → ✅ Alle bestanden → Commit
    → ❌ Findings → Zurück zu SAP Frontend Dev (max 3 Retries)
```

## Nicht-Funktionale Anforderungen

### Performance

| Metrik | Landing Page | SAPUI5-App |
|--------|-------------|------------|
| FCP | < 0.8s | < 3s |
| LCP | < 1.5s | < 4s |
| Total Weight | < 50KB | ~2MB (Framework) |
| Lighthouse Performance | ≥ 98 | ≥ 70 |
| Lighthouse Accessibility | ≥ 98 | ≥ 90 |

**Optimierung:** Component Preload, SAP CDN (`https://ui5.sap.com/1.136.15/`), Lazy Loading Detail-Views.

### Design-Richtung

**Vibe: SAP Professional — mit Persönlichkeit**

- Custom SAP Theme (Theme Designer oder CSS)
- SAP Fiori Design Language als Basis
- Farbpalette: Brand #1a365d, Highlight #0d9488, Accent #d97706
- `sap.f.*` Controls für Fiori 3.0 Look
- Enterprise-Optik ist gewollt — Zielgruppe = SAP-Welt

## MVP Scope Phase 1

**In Scope:**
- Statische Landing Page (DE + EN, SEO)
- SAPUI5-App mit Sektionen F1-F9
- JavaScript ES6+, 0 Linter Errors, striktes MVC
- i18n DE/EN, Responsive, WCAG 2.1 AA
- Impressum + Datenschutz, Calendly
- GitHub Repo (public), "Built with Claude Code"-Sektion
- Custom SAP Theme, QUnit-Tests

**Out of Scope:** Clean Core Check (Phase 2), TypeScript (optional Phase 2), Blog (Phase 3), Dark Mode, OData

## Zeitplan Phase 1

| Woche | Aufgabe | Agent |
|-------|---------|-------|
| **1** D1 | Skeleton Generator → App-Grundstruktur | sap-modern-fullstack-developer |
| **1** D2 | manifest.json, Component.js, Router, JSON-Models | sap-modern-fullstack-developer |
| **1** D3 | BaseController, formatter, Model-Dateien | sap-frontend-developer |
| **1** D4 | Custom Theme + App Shell | design-ui-designer + sap-frontend-developer |
| **1** D5 | Statische Landing Page (DE + EN) | engineering-frontend-developer |
| **2** D6-7 | Overview: Hero + Positionierung + Kontakt | sap-frontend-developer |
| **2** D8-9 | Skills-Matrix: Table mit Filtern | sap-frontend-developer |
| **2** D10 | i18n komplett | sap-cv-profile-optimizer-dach |
| **3** D11-12 | Projekt-Timeline/Cards + ProjectDetail | sap-frontend-developer |
| **3** D13-14 | Toolkit Showcase (IconTabBar, GenericTiles) | sap-frontend-developer |
| **3** D15 | "Built with Claude Code" Sektion | engineering-technical-writer |
| **4** D16 | QUnit-Tests | sap-frontend-developer |
| **4** D17 | Responsive Feinschliff | sap-frontend-developer |
| **4** D18 | SEO: Meta-Tags, JSON-LD, sitemap | marketing-seo-specialist |
| **4** D19 | Impressum + Datenschutz | engineering-frontend-developer |
| **4** D20 | Pre-Launch Full Audit | alle Agenten |
| **5** D21 | GitHub-Repo, README | engineering-technical-writer |
| **5** D22 | DNS → Go-Live | engineering-devops-automator |
| **5** D23 | LinkedIn-Launch-Post | marketing-content-creator |

## Deployment (IONOS)

```bash
# Build (kein Transpile nötig — reines JavaScript)
cd app && npx ui5 build --all --dest ../dist/app
# Landing Page kopieren
cp -r landing/* dist/
# Deploy via SFTP (manuell oder GitHub Action)
```

## Verbleibende Punkte (vor Implementierung)

1. Calendly-Account erstellen + URL
2. Foto als `portrait.jpg`
3. Toolkit-Screenshots (4 Stück)
4. Plausible-Account + Site-ID
5. GitHub-Repo `bansemir/bansemir.net`
6. IONOS SFTP-Zugangsdaten
7. SAP CDN URL verifizieren: `https://ui5.sap.com/1.136.15/`
8. Eigenes SAP Theme via Theme Designer oder Custom CSS?
