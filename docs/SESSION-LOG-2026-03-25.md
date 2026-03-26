# Session Log — bansemir.net Phase 1

> **Datum:** 25. März 2026, 19:30 – 26. März 2026, 00:45
> **Dauer:** ~5 Stunden (inkl. Planung, Implementierung, E2E Tests, Deployment, Bugfixes)
> **Model:** Claude Opus 4.6 (1M context)
> **Projekt:** Freelancer-Profilwebsite bansemir.net (SAPUI5 + statische Landing Pages)

---

## 1. Projektstart & Planung (19:30 – 20:30)

### PRD gelesen
- Vollversion `docs/PRD.md` (997 Zeilen) + 3 Teildokumente (`PRD-1-spec.md`, `PRD-2-data-and-mvc.md`, `PRD-3-agents-and-requirements.md`)
- Hybrid-Architektur: Statische Landing Page (SEO) + SAPUI5 SPA (Showcase)
- App-Namespace: `net.bansemir.profile`
- SAPUI5 1.136 LTS, JavaScript ES6+, striktes MVC

### Offene Fragen geklaert
- Calendly: `calendly.com/carsten-bansemir`
- Foto: `assets/portrait.jpg` vorhanden (175KB)
- Toolkit-Screenshots: Platzhalter, werden nachgeliefert
- Plausible: Noch kein Account (spaeter erstellt)
- Git: Lokal erstellen, Username `bansemir`
- SAPUI5 Version: 1.136 LTS (nicht 1.460 — Update in spaeterer Phase)
- Custom Theme: Standard Fiori Theme (Custom Farbpalette in spaeterer Phase)
- Keine CSS Overrides in Phase 1

### Entscheidungen in Memory gespeichert
- `memory/project_decisions_phase1.md`
- `memory/feedback_no_deploy_without_ask.md` (spaeter hinzugefuegt)

### Workpackage-Plan erstellt
- **Project Planner Agent** hat PRD in 21 Workpackages aufgeteilt
- 6 Ausfuehrungswellen definiert
- Plan gespeichert als `docs/WORKPACKAGES.md`

---

## 2. Implementierung (20:30 – 21:25)

### Welle 1: Foundation (20:30 – 20:40)
**WP-01 + WP-02 — SAP Modern Fullstack Developer Agent**
- Git-Repository initialisiert (user: bansemir)
- SAPUI5 App Skeleton: Component.js, manifest.json, Routing, index.html
- UI5 Tooling: @ui5/cli, ui5-middleware-livereload
- Content-Dateien aus `content/` nach `app/webapp/model/` kopiert
- UI5 Linter: 0/0
- Initialer Commit: `d867be6`

### Welle 2: Infrastruktur (20:40 – 20:55) — 4 Agenten parallel
- **WP-03** (SAP Modern Fullstack Developer): Daten-Migration, Sprachmechanik dokumentiert, config.json hinzugefuegt
- **WP-04** (SAP Frontend Developer): BaseController (53 LOC) + Formatter (33 LOC), `sap/base/i18n/Localization` API bestaetigt fuer 1.136
- **WP-14** (Frontend Developer): Landing Pages DE + EN (je ~8KB), semantic HTML, hreflang, Open Graph
- **WP-16** (Frontend Developer): Impressum (TMG/MStV) + Datenschutz (DSGVO), Plausible, Calendly, SAP CDN erwaehnt

### Welle 3: App Shell (20:55 – 21:00)
**WP-05 — SAP Frontend Developer Agent**
- ShellBar mit Sprachwechsler + GitHub-Button
- ObjectPageLayout mit 6 Placeholder-Sections
- `sap.f` als Library-Dependency hinzugefuegt
- Design-Entscheidung: `OverflowToolbarButton` fuer GitHub (implementiert `IShellBar`)

### Welle 4: Features (21:00 – 21:08) — 7 Agenten parallel
- **WP-06** (Hero & Positionierung): 3 SubSections mit FormattedText
- **WP-07** (Skills-Matrix): sap.ui.table.Table, Flatten-Logik, Search, Expression Bindings fuer Level, `sap.ui.table` als Dependency
- **WP-08** (Projekterfahrung): ProjectCard Fragment + ProjectDetail View, Navigation, formatLocalized fuer DE/EN
- **WP-09** (Toolkit Showcase): 4 GenericTiles + IconTabBar, Daten aus toolkit-Model
- **WP-10** (Built with AI): 4 expandable Panels + GitHub-Link
- **WP-11** (Kontakt & Calendly): Form mit ColumnLayout, CSP-konformer Button statt Calendly-Embed
- **WP-12** (Footer): OverflowToolbar in App.view.xml footer-Aggregation

### Welle 5: Polish (21:08 – 21:18) — 3 Agenten parallel
- **WP-13** (i18n-Review): 3 EN-Textkorrekturen ("Proprietary" → "Custom-built")
- **WP-15** (SEO): sitemap.xml, robots.txt, JSON-LD Person-Schema, Twitter Cards
- **WP-17** (Responsive): 6 Fixes mit SAPUI5-Bordmitteln (OverflowToolbar, FlexBox wrap, Auto RowMode, responsive ObjectHeader)

### Welle 6: Quality Gates (21:18 – 21:25)
- **WP-18** (Code Review): 3 MAJOR Findings gefixed (hartcodierte Strings → config-Model)
- **WP-19** (Accessibility Audit): 7 Fixes (Avatar tooltip, Skip-Links, Kontraste, focus-visible)
- **WP-20** (README): 10 Sektionen, gegen Projektstruktur verifiziert
- **WP-21** (Pre-Launch Audit): 10/10 Checks bestanden → READY FOR LAUNCH

### Haupt-Commit
- `308b54a` — 30 Dateien, 10.834 Zeilen

---

## 3. E2E Tests (21:25 – 21:33)

### Testplan
- 11 Tests geplant (T1-T8 SAPUI5 App, T9-T11 Landing Pages + Legal)
- Dev Server via `preview_start` auf Port 8080
- `.claude/launch.json` erstellt

### Erster Testlauf: 8/8 FAIL
**Blocker:** manifest.json `viewName` deprecated in manifest v2 → `name` verwenden

### Gefundene & gefixte Bugs (6 Stueck)
1. `viewName` deprecated in manifest v2 → `name` statt `viewName` in routing targets
2. `viewLevel` deprecated in manifest v2 → `level` statt `viewLevel` (Linter autofix)
3. `accessibleName` nicht in SAPUI5 1.136 → `tooltip` statt `accessibleName` auf Select
4. `attachEventOnce` null-Error → `getOwnerComponent().getModel()` + null-Check
5. Portrait 404 → Bild nach `app/webapp/assets/` kopiert, Pfad korrigiert
6. i18n Fallback zu EN statt DE → `supportedLocales` + `fallbackLocale` + `i18n_de.properties`

### Zweiter Testlauf: 11/11 PASS
- Commit: `dee01bc`

---

## 4. Deployment & Go-Live (21:33 – 21:45)

### Erste Schritte
- Plausible Analytics aktiviert: `c54ec60`
- `content/` zu .gitignore: `e730e37`
- Git Tag `v1.0.0` erstellt

### IONOS Deployment
- `lftp` installiert via Homebrew
- SFTP-Upload aller 44 Dateien (604KB)
- `.env` mit IONOS-Credentials (in .gitignore)

### Berechtigungsproblem
- JSON-Dateien hatten `600` statt `644` → 403 Forbidden
- Fix: `chmod 644` auf alle JSON/Manifest-Dateien nach jedem Deploy

---

## 5. Post-Launch Fixes (21:45 – 23:15)

### Sprachwechsler UX (3 Iterationen)
1. Select-Dropdown zeigte aktuelle Sprache statt Zielsprache
2. Geaendert zu `DE | EN` Pattern (aktiv fett, andere als Link)
3. SAPUI5 App: `sap.m.Select` → `OverflowToolbarButton` mit Globe-Icon
4. Sprachwechsel via `?sap-language=` URL-Parameter (statt `Localization.setLanguage` das nach Reload verloren ging)

### Theme Toggle
1. `sap_horizon` Theme eingefuehrt → CSS fehlerhaft auf 1.136 LTS
2. Zurueck auf `sap_fiori_3` / `sap_fiori_3_dark`
3. localStorage-Validierung: ungueltige Theme-Eintraege (z.B. `sap_horizon`) werden automatisch bereinigt
4. Landing Page: CSS Custom Properties + Dark Mode Toggle via JavaScript + `prefers-color-scheme`

### ShellBar Unsichtbarkeit (groesstes Problem)
1. `sap_fiori_3` Theme rendert ShellBar weiss auf weiss
2. CSS Override mit `!important` fuer Hintergrund (#354a5f) und Textfarbe
3. ShellBar Buttons im `additionalContent` nicht sichtbar auf Production
4. Buttons als separate Toolbar → zwei Leisten (unerwuenscht)
5. Buttons zurueck in ShellBar, aber ShellBar als Content der Page → `top: -55px` (abgeschnitten!)
6. **Finale Loesung:** ShellBar als `customHeader` der `sap.m.Page` statt als Content

### Cache-Busting
1. SAP Application Cache Buster untersucht → nicht kompatibel mit statischem Hosting
2. `.htaccess` mit `Cache-Control: max-age=300` fuer JS/JSON/XML (5 Minuten)
3. Build-Script generiert `sap-ui-cachebuster-info.json` fuer zukuenftige Nutzung

### Theme/Sprache Synchronisierung
- Shared localStorage Keys: `bansemir.theme` ("dark"/"light"), `bansemir.lang` ("de"/"en")
- Landing Pages setzen beide Keys
- SAPUI5 App liest beide Keys beim Start
- Root `index.html` leitet basierend auf `bansemir.lang` weiter

---

## 6. Content-Extraktion (23:15 – 00:00)

### Sensible Daten aus Git entfernt
- `app/webapp/model/config.json` → .gitignore (E-Mail, Telefon, Adresse)
- Generierte HTML-Dateien → .gitignore

### Template-System
- HTML-Dateien in Templates konvertiert (`.template.html`)
- Platzhalter: `{{NAME}}`, `{{EMAIL}}`, `{{PHONE}}`, `{{CALENDLY_URL}}`, `{{L.heroSubline}}`, etc.
- Build-Script: `app/scripts/build-html.js` — liest `config.json` + `landing-de.json` / `landing-en.json`
- Content vollstaendig aus Code extrahiert

### Hartcodierte URLs in SAPUI5 App bereinigt
- GitHub, LinkedIn, Calendly URLs → `{config>/social/*}` und `{config>/services/*}` Bindings
- Keine hartcodierten URLs mehr in Views oder Controllern

### Content-Dateien (in .gitignore, nur lokal)
- `content/landing-de.json` — alle deutschen Landing-Page-Texte
- `content/landing-en.json` — alle englischen Landing-Page-Texte
- `app/webapp/model/config.json` — persoenliche Daten, URLs

---

## 7. Content-Update (00:00 – 00:45)

### Vom User eingearbeitete Aenderungen
- 12+ Jahre SAP (statt 17+)
- 19 Jahre Softwarearchitektur
- Stats: 12+ Jahre, 4 Branchen, 85k Zeilen, 200+ Pruefregeln
- Kundenreferenzen: Schwarz IT/Lidl, Zeppelin, ARYZTA
- Diplom-Informatiker (KI) — FAU Erlangen-Nuernberg
- Built with AI Beispiel 4: Caching-Problem (statt Iteration)
- GULP-Profil-Link hinzugefuegt (Landing Pages, SAPUI5 Footer, Kontakt-Sektion)

### Inline-Script Bug
- Inline JavaScript in Landing Pages hatte Syntax-Error in manchen Browsern
- Fix: Script in externe Datei `assets/landing.js` ausgelagert
- `node -c` Validierung bestanden

---

## Commit-Historie (19 Commits)

```
d867be6 2026-03-25 20:30 feat(setup): SAPUI5 app skeleton with project structure
308b54a 2026-03-25 21:08 feat(phase1): complete SAPUI5 profile app + landing pages
dee01bc 2026-03-25 21:32 fix(e2e): resolve 6 runtime bugs found during E2E testing
c54ec60 2026-03-25 21:38 feat(analytics): activate Plausible Analytics on landing pages
e730e37 2026-03-25 21:41 chore: add content/ to gitignore
07c5924 2026-03-25 22:13 fix(ux): language toggle shows target language, remove .htaccess files
e5e788c 2026-03-25 22:19 fix(ux): language switch shows current language with toggle
a3c6410 2026-03-25 22:26 feat(theme): add dark mode toggle for SAPUI5 app and landing pages
3da53df 2026-03-25 22:39 feat(cache): add Cache-Control headers via .htaccess for IONOS
734ecda 2026-03-25 22:44 fix(theme): revert to sap_fiori_3 — sap_horizon incompatible with 1.136 LTS
383950c 2026-03-25 22:47 fix(theme): validate saved theme before applying, clear invalid entries
3d3d850 2026-03-25 23:03 fix(shell): single ShellBar with visible buttons and working language switch
1434b73 2026-03-25 23:11 fix(shell): ShellBar as customHeader — fixes invisible header on production
3d6d43d 2026-03-25 23:15 chore: cleanup unused Localization import and xmlns:core
bc1abed 2026-03-25 23:22 feat(sync): synchronize theme and language between landing pages and SAPUI5 app
74dbc2b 2026-03-25 23:34 chore: add config.json and dev artifacts to gitignore
217928e 2026-03-25 23:50 feat(content): extract all content from HTML into JSON + templates
4185181 2026-03-26 00:19 feat(content-update): updated profile content + GULP link + skills fix
f223c1b 2026-03-26 00:35 fix(landing): move theme/lang script to external file — fixes syntax error
```

---

## Eingesetzte Agenten

### Implementierung (Welle 1-4)
| Agent | Workpackages |
|-------|-------------|
| SAP Modern Fullstack Developer | WP-01, WP-02, WP-03 |
| SAP Frontend Developer | WP-04, WP-05, WP-06, WP-07, WP-08, WP-09, WP-10, WP-11, WP-12, WP-17 |
| Frontend Developer | WP-14, WP-16 |

### Quality & Polish (Welle 5-6)
| Agent | Workpackages |
|-------|-------------|
| SAP CV/Profile Optimizer DACH | WP-13 (i18n-Review) |
| SEO Specialist | WP-15 |
| Senior Developer | WP-18 (Code Review), WP-21 (Pre-Launch Audit) |
| Accessibility Auditor | WP-19 |
| Technical Writer | WP-20 (README) |

### Planung
| Agent | Aufgabe |
|-------|---------|
| Project Planner | Workpackage-Plan aus PRD |

---

## Technische Entscheidungen & Lessons Learned

### SAPUI5-spezifisch
1. **manifest.json v2.0.0**: `viewName` → `name`, `viewLevel` → `level` in routing targets
2. **`sap/base/i18n/Localization`**: Verfuegbar seit 1.118, ersetzt deprecated `sap.ui.getCore().getConfiguration()`
3. **i18n Fallback**: `supportedLocales` + `fallbackLocale` in manifest.json noetig, plus explizite `i18n_de.properties`
4. **`sap_horizon` Theme**: Nicht kompatibel mit 1.136 LTS — CSS-Dateien laden fehlerhaft
5. **ShellBar `additionalContent`**: Rendert Buttons nicht sichtbar in `sap_fiori_3` — Workaround: `customHeader` der Page
6. **`sap.ui.table.Table`**: `visibleRowCount` deprecated → `rowmodes:Auto`, `toolbar` deprecated → `extension`

### Deployment (IONOS)
1. **JSON-Dateien 403**: Berechtigungen `600` statt `644` — muss nach jedem Deploy per `chmod` gefixt werden
2. **Browser-Cache**: `.htaccess` mit `max-age=300` loest das Problem fuer zukuenftige Deploys, nicht fuer bereits gecachte Dateien
3. **Application Cache Buster**: Nicht kompatibel mit statischem Hosting (braucht ABAP Server)

### Content-Architektur
1. **Doppelte Sprachmechanik**: JSON-Models haben `{de, en}` Objekte, i18n hat Properties-Dateien — `formatLocalized` Formatter loest die JSON-Daten auf
2. **Template-System**: Einfache `{{Platzhalter}}`-Ersetzung reicht fuer statische Seiten — keine Template-Engine noetig
3. **Inline JavaScript Syntax**: Minifiziertes JavaScript in HTML-Dateien kann Browser-Parser-Probleme verursachen — externe Datei ist zuverlaessiger

---

## Dateien im Projekt

### In Git (37 Dateien)
```
.gitignore
README.md
package.json
index.html (Root Redirect)
sitemap.xml
robots.txt
assets/portrait.jpg
assets/landing.js
de/index.template.html
en/index.template.html
legal/impressum.template.html
legal/datenschutz.template.html
app/package.json
app/package-lock.json
app/ui5.yaml
app/ui5-dist.yaml
app/scripts/build-html.js
app/scripts/generate-cachebuster-info.js
app/webapp/index.html
app/webapp/Component.js
app/webapp/manifest.json
app/webapp/css/style.css
app/webapp/controller/App.controller.js
app/webapp/controller/BaseController.js
app/webapp/controller/Overview.controller.js
app/webapp/controller/ProjectDetail.controller.js
app/webapp/model/formatter.js
app/webapp/model/projects.json
app/webapp/model/skills.json
app/webapp/model/toolkit.json
app/webapp/view/App.view.xml
app/webapp/view/Overview.view.xml
app/webapp/view/ProjectDetail.view.xml
app/webapp/view/fragment/SkillsTable.fragment.xml
app/webapp/view/fragment/ProjectCard.fragment.xml
app/webapp/view/fragment/ToolkitTab.fragment.xml
app/webapp/i18n/i18n.properties
app/webapp/i18n/i18n_de.properties
app/webapp/i18n/i18n_en.properties
docs/*
```

### Nur lokal (.gitignore)
```
.env (IONOS Credentials)
content/ (v1 Quelldaten + Landing Page JSON)
app/webapp/model/config.json (persoenliche Daten)
de/index.html (generiert)
en/index.html (generiert)
legal/impressum.html (generiert)
legal/datenschutz.html (generiert)
dist/ (Build-Output)
node_modules/
.claude/launch.json
.playwright-mcp/
```

---

## Zeitaufwand

| Phase | Dauer |
|-------|-------|
| PRD lesen, Fragen klaeren, Workpackage-Plan | ~60 min |
| Welle 1-4: Setup bis alle Features | 38 min |
| Welle 5-6: Polish + Quality Gates | 17 min |
| E2E Tests + 6 Bugfixes | 8 min |
| Deployment + Plausible + Git Tag | 12 min |
| Post-Launch Fixes (ShellBar, Theme, Language, Cache) | ~90 min |
| Content-Extraktion + Templates | ~45 min |
| Content-Update + GULP + Script-Fix | ~45 min |
| **Gesamt** | **~5 Stunden** |

PRD hatte 4-5 Wochen geschaetzt.

---

## Tags

- `v1.0.0` — Phase 1 Initial Release (nach E2E Tests)
- `v1.0.1` — Post-launch fixes + content extraction
