# Workpackage-Plan Phase 1 -- bansemir.net

> Erstellt: 2026-03-25 | Status: Geplant | Modus: Standard
> Basis: PRD v2.1 (PRD-1, PRD-2, PRD-3) + geklarte Entscheidungen

## Uebersicht

| ID | Name | Agent | Abhaengigkeiten | Groesse |
|----|------|-------|-----------------|---------|
| WP-01 | Projekt-Setup & Git Init | sap-modern-fullstack-developer | -- | S |
| WP-02 | SAPUI5 App Skeleton | sap-modern-fullstack-developer | WP-01 | M |
| WP-03 | Daten-Migration & Models | sap-modern-fullstack-developer | WP-02 | S |
| WP-04 | BaseController & Formatter | sap-frontend-developer | WP-02 | S |
| WP-05 | App Shell & Navigation (F1) | sap-frontend-developer | WP-03, WP-04 | M |
| WP-06 | Hero & Positionierung (F2, F3) | sap-frontend-developer | WP-05 | M |
| WP-07 | Skills-Matrix (F4) | sap-frontend-developer | WP-05 | M |
| WP-08 | Projekterfahrung & Detail (F5) | sap-frontend-developer | WP-05 | L |
| WP-09 | Toolkit Showcase (F6) | sap-frontend-developer | WP-05 | M |
| WP-10 | Built with Claude Code (F7) | sap-frontend-developer | WP-05 | S |
| WP-11 | Kontakt & Calendly (F8) | sap-frontend-developer | WP-05 | S |
| WP-12 | Footer (F9) | sap-frontend-developer | WP-05 | S |
| WP-13 | i18n-Review & Profil-Optimierung | sap-cv-profile-optimizer-dach | WP-06 bis WP-12 | M |
| WP-14 | Statische Landing Page (DE + EN) | engineering-frontend-developer | WP-01 | M |
| WP-15 | SEO: Meta-Tags, JSON-LD, Sitemap | marketing-seo-specialist | WP-14, WP-12 | M |
| WP-16 | Impressum & Datenschutz | engineering-frontend-developer | WP-01 | S |
| WP-17 | Responsive Feinschliff | sap-frontend-developer | WP-06 bis WP-12 | M |
| WP-18 | Code Review (alle Artefakte) | engineering-senior-developer | WP-13, WP-17 | M |
| WP-19 | Accessibility Audit | testing-accessibility-auditor | WP-18 | M |
| WP-20 | README & Dokumentation | engineering-technical-writer | WP-18 | S |
| WP-21 | Pre-Launch Full Audit | engineering-senior-developer | WP-19, WP-20 | M |

---

## Abhaengigkeitsgraph

```
WP-01 Projekt-Setup
 ├── WP-02 SAPUI5 Skeleton
 │    ├── WP-03 Daten-Migration
 │    │    └─┐
 │    └── WP-04 BaseController/Formatter
 │         └─┐
 │           WP-05 App Shell (F1)
 │            ├── WP-06 Hero/Positionierung (F2, F3)
 │            ├── WP-07 Skills-Matrix (F4)
 │            ├── WP-08 Projekte/Detail (F5)
 │            ├── WP-09 Toolkit (F6)
 │            ├── WP-10 Built with AI (F7)
 │            ├── WP-11 Kontakt (F8)
 │            └── WP-12 Footer (F9)
 │                 └── WP-13 i18n-Review ──┐
 │                     WP-17 Responsive ───┤
 │                                         WP-18 Code Review
 │                                          └── WP-19 Accessibility
 │                                          └── WP-20 README
 │                                               └── WP-21 Pre-Launch
 ├── WP-14 Landing Page
 │    └── WP-15 SEO (auch abh. von WP-12)
 └── WP-16 Impressum/Datenschutz
```

WP-06 bis WP-12 sind untereinander unabhaengig und koennen parallel bearbeitet werden.

---

## Workpackage-Details

### WP-01: Projekt-Setup & Git Init

**Agent:** sap-modern-fullstack-developer
**Abhaengigkeiten:** keine
**Groesse:** S

**Beschreibung:**
Git-Repository initialisieren, .gitignore erstellen, Grundstruktur der Verzeichnisse anlegen.
Calendly-URL in site-config.json eintragen: `calendly.com/carsten-bansemir`.

**Lieferobjekte:**
- `.gitignore` (node_modules, dist, .DS_Store)
- Verzeichnisstruktur laut PRD-1 (app/, assets/, legal/)
- `package.json` (Root) mit Projekt-Metadaten
- Initialer Git-Commit

**Akzeptanzkriterien:**
- [ ] `git log` zeigt initialen Commit
- [ ] Verzeichnisstruktur entspricht PRD-1
- [ ] `.gitignore` enthaelt node_modules, dist, .DS_Store, .env

---

### WP-02: SAPUI5 App Skeleton

**Agent:** sap-modern-fullstack-developer
**Abhaengigkeiten:** WP-01
**Groesse:** M

**Beschreibung:**
SAPUI5-App-Grundstruktur unter `app/webapp/` aufsetzen. Component.js, manifest.json, index.html,
App.view.xml, App.controller.js. Routing-Konfiguration fuer Overview und ProjectDetail.
UI5-Tooling via `@ui5/cli` einrichten.

**Lieferobjekte:**
- `app/webapp/Component.js` -- Root Component mit manifest.json-Referenz
- `app/webapp/manifest.json` -- wie in PRD-2 spezifiziert (Models, Routing, i18n)
- `app/webapp/index.html` -- UI5 Bootstrap von `https://ui5.sap.com/1.136.15/`
- `app/webapp/view/App.view.xml` -- Shell mit `sap.m.App` als Router-Container
- `app/webapp/controller/App.controller.js` -- minimaler App-Controller
- `app/ui5.yaml` -- @ui5/cli Konfiguration mit livereload-Middleware
- `app/package.json` -- ui5-Abhaengigkeiten (@ui5/cli, ui5-middleware-livereload)

**Technische Entscheidungen:**
- App-Namespace: `net.bansemir.profile`
- SAPUI5 Version: 1.136 LTS (CDN)
- Theme: `sap_fiori_3` (Standard Fiori Theme, kein Custom Theme in Phase 1)
- Kein `css/style.css` in Phase 1 (keine CSS Overrides)
- Router: `sap.m.routing.Router`

**Akzeptanzkriterien:**
- [ ] `npx ui5 serve` startet ohne Fehler
- [ ] Browser zeigt leere App-Shell mit Fiori-3-Theme
- [ ] UI5 Linter: 0 Errors, 0 Warnings
- [ ] manifest.json validiert (run_manifest_validation)
- [ ] Alle JSON-Models (projects, skills, toolkit) deklariert in manifest.json

---

### WP-03: Daten-Migration & Models

**Agent:** sap-modern-fullstack-developer
**Abhaengigkeiten:** WP-02
**Groesse:** S

**Beschreibung:**
Content-Dateien aus `content/` nach `app/webapp/model/` und `app/webapp/i18n/` kopieren und
bei Bedarf an SAPUI5-Konventionen anpassen. Die JSON-Dateien in `content/` verwenden
DE/EN-Objekte -- fuer SAPUI5 muessen sprachunabhaengige Felder ggf. angepasst werden,
da die Sprachumschaltung ueber i18n laeuft, nicht ueber JSON-Properties.

**Analyse der bestehenden Daten:**
- `content/projects.json`: Enthaelt `role`, `client`, `description` mit `{de, en}` Objekten.
  Diese bleiben als JSON-Model. Die Sprachumschaltung muss im Formatter oder via
  Expression Binding auf die aktuelle Locale pruefen.
- `content/skills.json`: `category.label` hat `{de, en}`. Rest ist sprachunabhaengig.
- `content/toolkit.json`: `title`, `description` haben `{de, en}`.
- `content/i18n/i18n.properties` und `i18n_en.properties`: Direkt uebernehmbar.
- `content/site-config.json`: Wird als eigenes JSON-Model `config` in manifest.json deklariert,
  oder Teile werden in bestehende Models integriert.

**Lieferobjekte:**
- `app/webapp/model/projects.json` -- kopiert, ggf. Struktur angepasst
- `app/webapp/model/skills.json` -- kopiert
- `app/webapp/model/toolkit.json` -- kopiert
- `app/webapp/i18n/i18n.properties` -- kopiert aus content
- `app/webapp/i18n/i18n_en.properties` -- kopiert aus content
- Entscheidung dokumentiert: Wie DE/EN in JSON-Models gehandhabt wird

**Sprachmechanik-Entscheidung (dokumentiert 2026-03-25):**
JSON-Models (projects, skills, toolkit) behalten ihre verschachtelte `{de, en}` Struktur.
Die Sprachauswahl erfolgt NICHT ueber i18n ResourceBundle, sondern ueber einen Formatter
`formatLocalized(oValue)`, der zur Laufzeit `sap.ui.getCore().getConfiguration().getLanguage()`
prueft und den passenden Wert zurueckgibt. Expression Binding in Views:
`{= ${formatter>.formatLocalized(${projects>role})} }` oder via `core:require` + Formatter.
i18n bleibt fuer alle statischen UI-Texte (Labels, Buttons, Headings) zustaendig.
Implementierung des Formatters erfolgt in WP-04 (BaseController & Formatter).

**Akzeptanzkriterien:**
- [x] Alle Models laden fehlerfrei beim App-Start (4 Models + i18n in manifest.json)
- [x] i18n-Texte sind in DE und EN verfuegbar (109 Schluessel synchron)
- [x] Keine Datenverluste gegenueber content/-Originalen (byte-identisch)
- [x] manifest.json referenziert alle Model-URIs korrekt (validiert via MCP Server)
- [x] manifest.json Schema-Validierung: 0 errors (flexEnabled + target.name korrigiert)

---

### WP-04: BaseController & Formatter

**Agent:** sap-frontend-developer
**Abhaengigkeiten:** WP-02
**Groesse:** S

**Beschreibung:**
BaseController als Basisklasse fuer alle Controller. Enthaelt Convenience-Methoden
fuer Routing, Model-Zugriff und i18n. Formatter-Modul mit reinen Funktionen.

**Lieferobjekte:**
- `app/webapp/controller/BaseController.js`
  - `getRouter()` -- Router-Zugriff
  - `getModel(sName)` -- Named Model
  - `getResourceBundle()` -- i18n ResourceBundle
  - `navTo(sRoute, oParams)` -- Navigation-Shortcut
  - `getLocalizedText(oData, sField)` -- Sprachspezifischen Text aus {de,en}-Objekt lesen
- `app/webapp/model/formatter.js`
  - `formatPeriod(sPeriod)` -- Zeitraum-Anzeige
  - `formatLevel(sLevel)` -- Level-Key zu i18n-Text
  - `formatLevelState(sLevel)` -- Level zu ObjectStatus-State
  - `formatYears(iYears)` -- "X Jahre" / "X years"
  - `formatLocalized(oData)` -- DE/EN-Objekt nach aktueller Sprache aufloesen

**Akzeptanzkriterien:**
- [ ] BaseController < 80 Zeilen
- [ ] Formatter: reine Funktionen, keine Seiteneffekte
- [ ] UI5 Linter: 0 Errors, 0 Warnings
- [ ] Alle Dependencies via `sap.ui.define`, keine globalen `sap.*`

---

### WP-05: App Shell & Navigation (F1)

**Agent:** sap-frontend-developer
**Abhaengigkeiten:** WP-03, WP-04
**Groesse:** M

**Beschreibung:**
App.view.xml mit `sap.f.ShellBar`, Sektions-Navigation, Sprachwechsler und GitHub-Button.
Overview.view.xml als `sap.uxap.ObjectPageLayout`-Container (noch ohne Sektions-Inhalt).
Overview.controller.js mit Navigation und Sprachwechsel-Logik.

**Lieferobjekte:**
- `app/webapp/view/App.view.xml` -- ShellBar + sap.m.App
- `app/webapp/view/Overview.view.xml` -- ObjectPageLayout-Grundstruktur mit leeren Sektionen
- `app/webapp/controller/Overview.controller.js` -- Sprachwechsel, Scroll-zu-Sektion

**Technische Entscheidungen:**
- ShellBar: `sap.f.ShellBar` mit Title, Notifications=false, ShowSearch=false
- Sprachwechsler: `sap.m.Select` im ShellBar (additionalContent)
- Sektions-Navigation: Anchor-Navigation via ObjectPageLayout (eingebaut)
- GitHub-Button: `sap.m.Button` (icon: sap-icon://source-code) im ShellBar

**Akzeptanzkriterien:**
- [ ] ShellBar zeigt "Carsten Bansemir" als Title (aus i18n)
- [ ] Sprachwechsler schaltet zwischen DE und EN
- [ ] Overview-Seite laedt mit leerem ObjectPageLayout
- [ ] Routing funktioniert: `/` zeigt Overview, `/project/{id}` zeigt ProjectDetail (leer)
- [ ] Deep-Links funktionieren (direkter URL-Aufruf)
- [ ] UI5 Linter: 0 Errors, 0 Warnings
- [ ] Alle sichtbaren Texte aus i18n

---

### WP-06: Hero & Positionierung (F2, F3)

**Agent:** sap-frontend-developer
**Abhaengigkeiten:** WP-05
**Groesse:** M

**Beschreibung:**
ObjectPageLayout-Header mit Foto, Name, Rolle, Status, Key Facts, CTA.
Positionierungs-Sektion mit drei SubSections (SAP-Tiefe, Architektur-Breite, AI-Praxis).

**Lieferobjekte:**
- Header-Bereich in `Overview.view.xml`:
  - `sap.uxap.ObjectPageHeader` mit Title, Subtitle, ObjectImageURI (portrait.jpg)
  - `sap.m.ObjectAttribute` fuer Key Facts (17+ Jahre, 8 Projekte, etc.)
  - `sap.m.Button` (Emphasized) als CTA zu Calendly
- Positionierungs-Section in `Overview.view.xml`:
  - `sap.uxap.ObjectPageSection` "Positionierung"
  - 3 `ObjectPageSubSection` mit Text-Content aus i18n

**Akzeptanzkriterien:**
- [ ] Foto (Avatar) wird angezeigt
- [ ] Alle Texte aus i18n (DE + EN)
- [ ] CTA-Button oeffnet Calendly-URL (aus config oder hardcoded als Platzhalter)
- [ ] Responsive: Desktop, Tablet, Phone
- [ ] View < 200 Zeilen

---

### WP-07: Skills-Matrix (F4)

**Agent:** sap-frontend-developer
**Abhaengigkeiten:** WP-05
**Groesse:** M

**Beschreibung:**
Skills-Tabelle mit Filter, Sortierung und Gruppierung nach Kategorie.
Daten aus `skills`-Model.

**Lieferobjekte:**
- `app/webapp/view/fragment/SkillsTable.fragment.xml`
  - `sap.ui.table.Table` mit Spalten: Skill, Kategorie, Jahre, Level, Projekte
  - Toolbar mit Filter-Dropdown (Kategorie), Suchfeld
  - Sortierung per Klick auf Spaltenheader
  - Gruppierung nach Kategorie
- Skills-Section in `Overview.view.xml` mit Fragment-Einbindung
- Event-Handler in `Overview.controller.js` fuer Filter/Suche

**Technische Hinweise:**
- `sap.ui.table.Table` (nicht `sap.m.Table`) laut PRD fuer Desktop-Fokus
- Level als `sap.m.ObjectStatus` mit Expression Binding fuer State/Farbe
- Skills-JSON hat verschachtelte Struktur (categories > skills) -- ggf. Flattening im Model
  oder via Formatter

**Akzeptanzkriterien:**
- [ ] Alle 19 Skills aus skills.json werden angezeigt
- [ ] Filter nach Kategorie funktioniert
- [ ] Suche nach Skill-Name funktioniert
- [ ] Sortierung nach Jahre/Level funktioniert
- [ ] Level-Farben: expert=Success, advanced=Information, intermediate=None
- [ ] Fragment < 200 Zeilen, Controller < 150 Zeilen
- [ ] UI5 Linter: 0 Errors, 0 Warnings

---

### WP-08: Projekterfahrung & Detail (F5)

**Agent:** sap-frontend-developer
**Abhaengigkeiten:** WP-05
**Groesse:** L

**Beschreibung:**
Projektliste als Cards/Timeline in der Overview. Navigation zu ProjectDetail-View
mit Vollansicht. Filter nach Technologie und Zeitraum.

**Lieferobjekte:**
- `app/webapp/view/fragment/ProjectCard.fragment.xml`
  - Card-Darstellung pro Projekt (Zeitraum, Rolle, Kunde, Technologies als Token)
- Projekte-Section in `Overview.view.xml`
  - `sap.f.GridList` mit ProjectCard-Fragment oder `sap.m.List` mit Custom-ListItem
  - Filter-Toolbar (Technologie, Zeitraum)
- `app/webapp/view/ProjectDetail.view.xml`
  - Vollstaendige Projektansicht mit allen Feldern
  - Zurueck-Navigation
- `app/webapp/controller/ProjectDetail.controller.js`
  - `onInit`: Route-Matched-Handler
  - Projekt-Daten per ID aus Model binden

**Technische Hinweise:**
- `projects.json` hat DE/EN in `role`, `client`, `description` -- `getLocalizedText()`
  aus BaseController oder Expression Binding nutzen
- `clientPublic: false` -- "vertraulich" aus i18n anzeigen
- Navigation: `navTo("projectDetail", {projectId: sId})`

**Akzeptanzkriterien:**
- [ ] Alle 8 Projekte werden angezeigt, sortiert nach sortOrder
- [ ] Technologies als Tokens/Tags sichtbar
- [ ] Navigation zu Detail und zurueck funktioniert
- [ ] Vertrauliche Kunden zeigen i18n-Text "vertraulich"
- [ ] DE/EN-Texte schalten korrekt um
- [ ] Filter nach Technologie funktioniert
- [ ] UI5 Linter: 0 Errors, 0 Warnings

---

### WP-09: Toolkit Showcase (F6)

**Agent:** sap-frontend-developer
**Abhaengigkeiten:** WP-05
**Groesse:** M

**Beschreibung:**
IconTabBar mit 4 Tabs fuer die Toolkit-Tools. Pro Tab: GenericTile mit Kernzahlen,
Beschreibung, CTA.

**Lieferobjekte:**
- `app/webapp/view/fragment/ToolkitTab.fragment.xml`
  - `sap.m.IconTabBar` mit 4 `IconTabFilter`
  - Pro Tab: `sap.m.GenericTile` mit `sap.m.NumericContent` fuer Stats
  - Beschreibungstext aus i18n
  - CTA-Button zu Calendly
- Toolkit-Section in `Overview.view.xml`
- Aggregat-Kennzahlen (85.000 Zeilen, 200+ Regeln, etc.) als Tiles ueber dem TabBar

**Technische Hinweise:**
- Toolkit-Screenshots sind Platzhalter (werden nachgeliefert)
- Daten aus `toolkit`-Model
- Aggregat-Stats aus `toolkit>/toolkit` Pfad

**Akzeptanzkriterien:**
- [ ] 4 Tabs mit korrekten Tool-Namen
- [ ] Kennzahlen (Stats) pro Tool sichtbar
- [ ] Aggregat-Kennzahlen sichtbar
- [ ] CTA zu Calendly funktioniert
- [ ] DE/EN-Texte korrekt
- [ ] UI5 Linter: 0 Errors, 0 Warnings

---

### WP-10: Built with Claude Code (F7)

**Agent:** sap-frontend-developer
**Abhaengigkeiten:** WP-05
**Groesse:** S

**Beschreibung:**
AI-Transparenz-Sektion mit klappbaren Panels fuer Beispiele des AI-assisted
Development-Prozesses. Link zum GitHub-Repo.

**Lieferobjekte:**
- Section in `Overview.view.xml`:
  - 4 `sap.m.Panel` (expandable): Skeleton Generation, MCP Linting, Code Review, Iteration
  - Texte aus i18n
  - `sap.m.Link` zu GitHub-Repo

**Akzeptanzkriterien:**
- [ ] 4 klappbare Panels mit Titeln und Texten aus i18n
- [ ] GitHub-Link korrekt (github.com/bansemir/bansemir.net)
- [ ] Ehrliche Tonalitaet (kein Marketing-Sprech)
- [ ] DE/EN korrekt
- [ ] View-Beitrag < 50 Zeilen

---

### WP-11: Kontakt & Calendly (F8)

**Agent:** sap-frontend-developer
**Abhaengigkeiten:** WP-05
**Groesse:** S

**Beschreibung:**
Kontakt-Sektion mit Form (ColumnLayout), Verfuegbarkeitsstatus, Arbeitsmodell,
E-Mail, LinkedIn, Calendly-Embed.

**Lieferobjekte:**
- Section in `Overview.view.xml`:
  - `sap.ui.layout.form.Form` mit `ColumnLayout`
  - Felder: Status, Arbeitsmodell, Stundensatz, E-Mail, LinkedIn
  - `sap.ui.core.HTML` fuer Calendly-Embed (calendly.com/carsten-bansemir)
- Daten aus `config`-Model oder direkt aus i18n

**Akzeptanzkriterien:**
- [ ] Form mit ColumnLayout (NICHT SimpleForm)
- [ ] Calendly-Embed laedt korrekt
- [ ] E-Mail als mailto-Link, LinkedIn als externer Link
- [ ] Alle Texte aus i18n
- [ ] UI5 Linter: 0 Errors, 0 Warnings

---

### WP-12: Footer (F9)

**Agent:** sap-frontend-developer
**Abhaengigkeiten:** WP-05
**Groesse:** S

**Beschreibung:**
Footer mit Impressum-Link, Datenschutz-Link, Social Links (GitHub, LinkedIn, GULP),
Copyright mit "Built with SAPUI5 + Claude Code".

**Lieferobjekte:**
- Footer-Bereich in `App.view.xml` oder `Overview.view.xml`:
  - `sap.m.Bar` oder `sap.m.Toolbar` als Footer
  - Links zu `/legal/impressum.html`, `/legal/datenschutz.html`
  - Social Links (GitHub, LinkedIn, GULP)
  - Copyright-Text aus i18n

**Akzeptanzkriterien:**
- [ ] Alle Links funktionieren (oder zeigen auf Platzhalter)
- [ ] Copyright-Text korrekt
- [ ] Texte aus i18n
- [ ] UI5 Linter: 0 Errors, 0 Warnings

---

### WP-13: i18n-Review & Profil-Optimierung

**Agent:** sap-cv-profile-optimizer-dach
**Abhaengigkeiten:** WP-06, WP-07, WP-08, WP-09, WP-10, WP-11, WP-12
**Groesse:** M

**Beschreibung:**
Review aller i18n-Texte durch den Profil-Optimierer. Fokus auf:
- DACH-Markt-gerechte Positionierung
- Konsistente Tonalitaet (professionell, nicht uebertrieben)
- Korrekte Fachbegriffe (SAP-Welt)
- Vollstaendigkeit DE und EN

**Lieferobjekte:**
- Ueberarbeitete `app/webapp/i18n/i18n.properties`
- Ueberarbeitete `app/webapp/i18n/i18n_en.properties`
- Ggf. Anpassungen in Landing-Page-Texten (Koordination mit WP-14)

**Akzeptanzkriterien:**
- [ ] Alle i18n-Keys in DE und EN vorhanden (keine fehlenden Keys)
- [ ] Profil-Positionierung fuer DACH-Zielgruppe optimiert
- [ ] Fachlich korrekte SAP-Terminologie
- [ ] Konsistente Anrede/Tonalitaet

---

### WP-14: Statische Landing Page (DE + EN)

**Agent:** engineering-frontend-developer
**Abhaengigkeiten:** WP-01
**Groesse:** M

**Beschreibung:**
Statische HTML-Landing-Pages fuer SEO. Kein Framework, reines HTML + CSS.
Zwei Versionen: `/de/index.html` (Deutsch), `/en/index.html` (Englisch).
Root `index.html` leitet auf `/de/` weiter (oder erkennt Browser-Sprache).

**Lieferobjekte:**
- `index.html` -- Redirect zu `/de/` (oder Sprach-Erkennung)
- `de/index.html` -- Deutsche Landing Page
- `en/index.html` -- Englische Landing Page
- Inhalte:
  - Above the fold: Name, Rolle, Foto, Headline, Subline, CTA Primary (Calendly), CTA Secondary (/app/)
  - Below the fold: Kurzprofil, Kernzahlen, Kontakt-Links
- CSS inline oder als `<style>` (minimaler Footprint)
- Meta-Tags, Open Graph, hreflang-Tags
- Plausible-Script als Platzhalter (auskommentiert bis Account existiert)

**Technische Vorgaben:**
- < 50KB pro Seite (HTML + CSS + inline)
- Kein JavaScript (ausser Plausible)
- Kein Framework, kein Bundler
- Responsive (CSS Grid/Flexbox)
- Semantic HTML5 (header, main, section, footer)
- Foto als optimiertes JPEG (portrait.jpg aus assets/)

**Akzeptanzkriterien:**
- [ ] Lighthouse Performance >= 98
- [ ] Lighthouse Accessibility >= 98
- [ ] < 50KB pro Seite
- [ ] hreflang korrekt zwischen DE und EN
- [ ] CTA "Verfuegbarkeit pruefen" verlinkt zu Calendly
- [ ] CTA "Interaktives Profil" verlinkt zu `/app/`
- [ ] Semantic HTML, keine div-Suppe
- [ ] Kein Cookie-Banner, kein Google Analytics

---

### WP-15: SEO: Meta-Tags, JSON-LD, Sitemap

**Agent:** marketing-seo-specialist
**Abhaengigkeiten:** WP-14, WP-12
**Groesse:** M

**Beschreibung:**
SEO-Optimierung fuer Landing Pages und SAPUI5-App.

**Lieferobjekte:**
- JSON-LD Structured Data in Landing Pages:
  - `Person` Schema (Name, Rolle, URL, Social Links)
  - `ProfessionalService` Schema
- `sitemap.xml` im Root
- `robots.txt`
- Open-Graph-Tags in Landing Pages (Titel, Beschreibung, Bild)
- Twitter/X Card Tags
- Canonical URLs

**Akzeptanzkriterien:**
- [ ] JSON-LD validiert (schema.org Validator)
- [ ] sitemap.xml enthaelt alle oeffentlichen URLs
- [ ] Open-Graph-Tags in DE und EN Landing Pages
- [ ] robots.txt erlaubt Crawling, blockiert /app/ (SPA nicht indexierbar)
- [ ] hreflang konsistent zwischen Landing Pages

---

### WP-16: Impressum & Datenschutz

**Agent:** engineering-frontend-developer
**Abhaengigkeiten:** WP-01
**Groesse:** S

**Beschreibung:**
Statische HTML-Seiten fuer Impressum und Datenschutzerklaerung (DSGVO).

**Lieferobjekte:**
- `legal/impressum.html` -- Angaben gemaess Telemediengesetz
- `legal/datenschutz.html` -- DSGVO-konforme Erklaerung
  - Plausible Analytics (cookieless, kein Tracking-Consent noetig)
  - Calendly-Embed Hinweis
  - SAP CDN Hinweis (externe Ressource)
  - Kontaktdaten

**Akzeptanzkriterien:**
- [ ] TMG-konforme Angaben im Impressum
- [ ] DSGVO-konform: Plausible, Calendly, SAP CDN erwaehnt
- [ ] Responsive, konsistentes Design mit Landing Page
- [ ] Von Footer der App und Landing Page aus erreichbar

---

### WP-17: Responsive Feinschliff

**Agent:** sap-frontend-developer
**Abhaengigkeiten:** WP-06, WP-07, WP-08, WP-09, WP-10, WP-11, WP-12
**Groesse:** M

**Beschreibung:**
Alle SAPUI5-Views auf Desktop, Tablet und Phone testen und anpassen.
SAPUI5-eigene Responsive-Features nutzen (keine CSS Overrides in Phase 1).

**Lieferobjekte:**
- Anpassungen in Views fuer responsive Verhalten:
  - ObjectPageLayout: HeaderContentPinnable, Sections
  - sap.ui.table.Table: VisibleRowCountMode="Auto"
  - GridList: Spaltenanzahl per ScreenSize
  - GenericTile: TileContent responsive
- Keine neuen Dateien, nur Anpassungen bestehender Views

**Akzeptanzkriterien:**
- [ ] Desktop (1440px): Volle Darstellung
- [ ] Tablet (768px): Lesbar, navigierbar
- [ ] Phone (375px): Alle Inhalte erreichbar, keine Ueberlappungen
- [ ] Keine CSS Overrides (nur SAPUI5-Bordmittel)

---

### WP-18: Code Review (alle Artefakte)

**Agent:** engineering-senior-developer
**QA:** @ui5/mcp-server (run_ui5_linter), SAPsolve Review Assistant
**Abhaengigkeiten:** WP-13, WP-17
**Groesse:** M

**Beschreibung:**
Vollstaendiger Code Review aller Artefakte. MVC-Regeln, Coding Standards,
Clean Code, Performance, Sicherheit.

**Pruefpunkte:**
- UI5 Linter: 0 Errors, 0 Warnings
- manifest.json Validierung
- MVC-Einhaltung: Keine Daten in Controllern, keine Logik in Views
- Kein AI Slop (siehe CLAUDE.md)
- Controller < 150 Zeilen, View < 200 Zeilen
- Formatter = reine Funktionen
- Alle Dependencies via `sap.ui.define`
- Keine deprecated APIs
- CSP-Konformitaet (keine Inline-Scripts)
- Landing Page: Semantic HTML, Performance

**Akzeptanzkriterien:**
- [ ] UI5 Linter: 0 Errors, 0 Warnings
- [ ] SAPsolve Review: Keine kritischen Findings
- [ ] Alle MVC-Regeln eingehalten
- [ ] Kein hartcodierter Text ausserhalb i18n
- [ ] Review-Findings dokumentiert und behoben

---

### WP-19: Accessibility Audit

**Agent:** testing-accessibility-auditor
**Abhaengigkeiten:** WP-18
**Groesse:** M

**Beschreibung:**
WCAG 2.1 AA Audit fuer SAPUI5-App und Landing Pages.

**Pruefpunkte:**
- Farbkontraste (4.5:1 fuer Text, 3:1 fuer grosse Texte)
- Tastatur-Navigation (Tab-Reihenfolge, Focus-Management)
- Screen-Reader-Kompatibilitaet (ARIA-Labels, Landmarks)
- Alt-Texte fuer Bilder
- Formulare: Labels, Error-Handling
- Sprach-Attribut (lang="de" / lang="en")

**Akzeptanzkriterien:**
- [ ] WCAG 2.1 AA konform
- [ ] Lighthouse Accessibility: Landing Page >= 98, SAPUI5-App >= 90
- [ ] Tastatur-Navigation durch alle Sektionen moeglich
- [ ] Screen-Reader: Sinnvolle Reihenfolge und Labels
- [ ] Findings dokumentiert und behoben

---

### WP-20: README & Dokumentation

**Agent:** engineering-technical-writer
**Abhaengigkeiten:** WP-18
**Groesse:** S

**Beschreibung:**
README.md fuer das GitHub-Repository. Showcase-Charakter:
"Diese Website wurde AI-assisted mit Claude Code entwickelt."

**Lieferobjekte:**
- `README.md` im Root:
  - Projektbeschreibung
  - Tech Stack (SAPUI5 1.136 LTS, reines JavaScript)
  - Architektur-Ueberblick (Hybrid: Static + SAPUI5)
  - Lokale Entwicklung (`npx ui5 serve`)
  - AI-assisted Development Prozess
  - Screenshots (Platzhalter)
  - Lizenz

**Akzeptanzkriterien:**
- [ ] README erklaert Projekt und Tech Stack
- [ ] Lokale Setup-Anleitung funktioniert
- [ ] AI-assisted Aspekt prominent aber ehrlich
- [ ] Keine Fake-Badges oder uebertriebene Claims

---

### WP-21: Pre-Launch Full Audit

**Agent:** engineering-senior-developer (Koordination)
**QA:** testing-accessibility-auditor, testing-performance-benchmarker, marketing-seo-specialist
**Abhaengigkeiten:** WP-19, WP-20
**Groesse:** M

**Beschreibung:**
Finaler Durchlauf aller Qualitaets-Gates vor dem Go-Live.

**Pruefpunkte:**
- [ ] UI5 Linter: 0 Errors, 0 Warnings
- [ ] manifest.json Validierung: bestanden
- [ ] Lighthouse Landing Page: Performance >= 98, Accessibility >= 98
- [ ] Lighthouse SAPUI5-App: Performance >= 70, Accessibility >= 90
- [ ] WCAG 2.1 AA: bestanden
- [ ] SEO: JSON-LD valide, sitemap.xml korrekt
- [ ] Responsive: Desktop, Tablet, Phone getestet
- [ ] i18n: DE + EN vollstaendig, keine fehlenden Keys
- [ ] Links: Alle externen Links funktionieren
- [ ] Calendly-Embed: Laedt korrekt
- [ ] CSP: Keine Inline-Scripts
- [ ] Git: Saubere Commit-History

**Akzeptanzkriterien:**
- [ ] Alle oben genannten Punkte bestanden
- [ ] Keine offenen kritischen Findings
- [ ] Freigabe fuer Go-Live

---

## Ausfuehrungsreihenfolge (empfohlen)

### Welle 1: Foundation (sequenziell)
1. **WP-01** Projekt-Setup
2. **WP-02** SAPUI5 Skeleton

### Welle 2: Infrastruktur (parallel)
3. **WP-03** Daten-Migration | **WP-04** BaseController/Formatter | **WP-14** Landing Page | **WP-16** Impressum/Datenschutz

### Welle 3: App Shell
4. **WP-05** App Shell & Navigation

### Welle 4: Features (parallel, groesster Block)
5. **WP-06** Hero/Positionierung | **WP-07** Skills-Matrix | **WP-08** Projekte | **WP-09** Toolkit | **WP-10** Built with AI | **WP-11** Kontakt | **WP-12** Footer

### Welle 5: Polish (parallel)
6. **WP-13** i18n-Review | **WP-17** Responsive | **WP-15** SEO

### Welle 6: Quality Gates (sequenziell)
7. **WP-18** Code Review
8. **WP-19** Accessibility Audit | **WP-20** README
9. **WP-21** Pre-Launch Audit

---

## Risiken und offene Punkte

| Risiko | Auswirkung | Mitigation |
|--------|------------|------------|
| DE/EN in JSON-Models vs. i18n | Doppelte Sprachmechanik (JSON {de,en} + i18n Properties) | WP-03 muss Entscheidung treffen und dokumentieren. Empfehlung: JSON-Models belassen, Formatter/Expression Binding fuer Sprachauswahl nutzen. |
| sap.ui.table.Table auf Mobile | Desktop-Table auf Phone schlecht nutzbar | WP-17: Responsive-Alternative pruefen (sap.m.Table als Fallback oder responsive Column) |
| Plausible Account fehlt | Analytics-Code nur Platzhalter | Platzhalter auskommentiert, spaeter aktivieren |
| Toolkit-Screenshots fehlen | Platzhalter-Bilder noetig | Icon-basierte Darstellung als Fallback, Screenshots nachliefern |
| SAPUI5 1.136 ist alt | Einige sap.f Controls ggf. eingeschraenkt | Vor WP-05 API-Referenz pruefen: ShellBar, GridList in 1.136 verfuegbar? |

---

## Nicht in Phase 1

Die folgenden Punkte sind bewusst ausgeschlossen:

- Custom SAP Theme / Farbpalette (Standard Fiori Theme in Phase 1)
- CSS Overrides
- TypeScript
- QUnit / OPA Tests (verschoben -- Aufwand/Nutzen in Phase 1 zu gering)
- ToolkitDetail.view.xml (kein separater Detail-View fuer Toolkit-Tools)
- Dark Mode
- Blog
- Clean Core Check
- OData / Backend
- Deployment / IONOS (separate Phase)
- LinkedIn-Launch-Post (nach Go-Live)
