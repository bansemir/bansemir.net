# PRD: bansemir.net v2 — SAPUI5 Freelancer-Profil & Toolkit-Showcase

> **Level:** Science-Fair | **Version:** 2.1 | **Stand:** 25. März 2026
> **Autor:** Carsten Bansemir + Claude (IdeaRalph)
> **Entwicklung:** Claude Code + SAP MCP Server + SAPsolve Skeleton Generator
> **Einschränkung:** Freiberufler ohne Gewerbe — nur Dienstleistungen
> **Ralph Score:** 9.3/10 (v1: 9.0)
>
> ### Alle Entscheidungen (fixiert)
> - **Foto:** Professionelles Foto vorhanden ✅
> - **Domain:** bansemir.net bei IONOS registriert, DNS-Zugang vorhanden ✅
> - **Hosting:** IONOS Webhosting (statische Dateien, gleicher Account wie Domain) ✅
> - **Sprache:** Deutsch + Englisch (zweisprachig von Anfang an) ✅
> - **Toolkit-Transparenz:** Alles zeigbar — Architektur, Code-Snippets, Screenshots, Demo-Output ✅
> - **GitHub:** Public Repo (kommentierte Commit-History als AI-Showcase) ✅
> - **Stundensatz:** "Auf Anfrage" (nicht öffentlich auf der Website) ✅
> - **Analytics:** Plausible (hosted, €9/Monat, DSGVO-konform) ✅
> - **Calendly:** Noch zu erstellen (Free Tier) ✅
> - **Impressum:** Privatadresse Coburg ✅
> - **Tech-Pivot:** SAPUI5 statt Astro+Tailwind ✅ (NEU in v2)
> - **Sprache:** JavaScript (kein TypeScript) ✅ (NEU in v2.1)
> - **Architektur:** Striktes MVC wo kompatibel mit SAPUI5-Guidelines ✅ (NEU in v2.1)

---

## 1. Problem Statement

SAP-Freelancer präsentieren sich über austauschbare Plattform-Profile (GULP, freelancermap, LinkedIn). Kein Profil zeigt *wie* jemand arbeitet — nur *was* er gemacht hat. In einer Zeit, in der AI-assisted Development zum Differenzierungsmerkmal wird, fehlt ein Format, das SAP-Kompetenz UND AI-Fähigkeiten gleichzeitig demonstriert.

**Verschärfung in v2:** Selbst eine gut gemachte Website mit Astro oder React *erzählt* nur von SAP-Kompetenz. Sie *beweist* nichts. Ein SAP-Teamleiter, der einen SAPUI5-Experten sucht, kann die technische Qualität einer Astro-Site nicht beurteilen. Aber er kann eine SAPUI5-App beurteilen.

## 2. Solution Overview

bansemir.net wird als **vollständige SAPUI5-Anwendung** umgesetzt — das Beraterprofil selbst ist in der Technologie gebaut, die es bewirbt. Der Buildprozess nutzt dabei Carstens eigenes SAPsolve Accelerator Toolkit (Skeleton Generator) und SAP MCP Server, orchestriert durch Claude Code.

**Die Beweiskette:**
1. Die Website ist eine SAPUI5-App → beweist SAPUI5-Expertise
2. Der Code folgt penibel den SAP Coding Guidelines → beweist Qualitätsbewusstsein
3. Der Skeleton Generator hat die Grundstruktur erzeugt → beweist, dass das Toolkit funktioniert
4. SAP MCP Server wurden für Linting und Guidelines genutzt → beweist AI-Toolchain-Kompetenz
5. Das Public GitHub Repo dokumentiert den gesamten Workflow → beweist Transparenz

**Hybrid-Architektur:** Eine schlanke statische Landing Page (`bansemir.net`) für SEO + die interaktive SAPUI5-App (`bansemir.net/app/`) als Showroom.

## 3. Target Users

### Persona 1: Thomas — SAP-Teamleiter (Primär)
- 42, leitet ein 8-köpfiges SAP-Entwicklerteam bei einem Mittelständler
- Sucht einen Senior Architect für ein Fiori-Migrationsprojekt
- Will jemanden, der nicht nur ABAP kann, sondern auch "die moderne Welt" versteht
- **v2-Vorteil:** Kann F12 drücken und den SAPUI5-Code der Website inspizieren. Sieht sofort: saubere MVC-Struktur, korrekte Data Binding, Guidelines-konform. Das ist überzeugender als jede Bullet-Liste.
- **Trigger:** Google-Suche "SAP Fiori Architect Freelancer", LinkedIn, GULP-Link zu bansemir.net

### Persona 2: Sabine — Einkauf/Projektleitung (Sekundär)
- 38, beschafft externe SAP-Berater für ein S/4HANA-Migrationsprojekt
- Hat wenig Zeit, will schnell einschätzen ob jemand passt
- **v2-Vorteil:** Die statische Landing Page gibt ihr in 30 Sekunden den Überblick. Sie muss die SAPUI5-App nicht verstehen — aber kann sie Thomas weiterleiten, der es beurteilen kann.
- **Trigger:** Link in E-Mail von Thomas ("schau dir den mal an")

### Persona 3: Markus — SAP-Entwickler (Tertiär, ab Phase 2)
- 29, Junior-Entwickler, will wissen wie AI-ready sein Code ist
- **v2-Vorteil:** Kann das GitHub-Repo als Referenz für saubere SAPUI5-Entwicklung mit striktem MVC nutzen
- **Trigger:** LinkedIn-Post "Ich habe mein Portfolio in SAPUI5 gebaut", DSAG-Vortrag

---

## 4. Phasenübersicht

| Phase | Inhalt | Aufwand | Wert |
|-------|--------|---------|------|
| **1** | **Landing Page + SAPUI5 Profil-App** | 4-5 Wochen | Professionelle Präsenz, dreifacher Kompetenz-Beweis |
| **2** | Clean Core Readiness Check (als sap.m.Wizard) | 2 Wochen | Lead-Generation, Toolkit-Demo |
| **3** | Blog + Newsletter | 1-2 Wochen | SEO-Traffic, Thought Leadership |
| **4** | Benchmark + Community | fortlaufend | Daten-Moat, Markt-Authority |

---

## 5. Phase 1: Landing Page + SAPUI5 Profil-App (PRIORITÄT)

### 5.1 Ziel

Eine zweiteilige Web-Präsenz: (1) eine SEO-optimierte statische Landing Page, die in 30 Sekunden überzeugt, und (2) eine vollständige SAPUI5-Anwendung als interaktives Portfolio — gebaut mit dem eigenen Toolkit und AI-Unterstützung. JavaScript ES6+ mit striktem MVC. Die Website *ist* das Portfolio. Der Code *ist* der Beweis.

### 5.2 Kernprinzip

> **"The medium is the message."**
> Statt SAPUI5-Expertise zu behaupten, wird sie durch die Website selbst bewiesen. Statt zu beschreiben, was das Toolkit kann, zeigt die Commit-History, wie es eingesetzt wurde. Jede Zeile Code im Public Repo ist ein Beweisstück.

### 5.3 Architektur: Hybrid (Statisch + SAPUI5)

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
- Die statische Landing Page löst das SEO-Problem (SAPUI5 ist eine SPA, schwer indexierbar)
- Die Landing Page lädt sofort (< 500ms), die SAPUI5-App braucht 2-3s (Framework-Overhead)
- Sabine (Einkauf) sieht die Landing Page, Thomas (Teamleiter) klickt weiter zur SAPUI5-App
- Google indexiert die Landing Page, nicht die SPA

### 5.4 Teil A: Statische Landing Page

Schlankes, handgeschriebenes HTML/CSS. Kein Framework. Maximale Performance, maximales SEO.

#### Inhalt (above the fold)
- Name, Rolle, professionelles Foto
- Headline: "Software Architect — SAP & AI-assisted Development"
- Subline: "17+ Jahre SAP. 85.000 Zeilen AI-Toolkit. Sofort verfügbar."
- CTA Primary: "Verfügbarkeit prüfen" → Calendly
- CTA Secondary: "Interaktives SAPUI5-Profil →" → `/app/`
- Dezenter Badge: "🔧 Diese Seite hat ein Geheimnis: Mein interaktives Profil ist eine SAPUI5-App"

#### Inhalt (below the fold)
- Kurzprofil (3 Absätze: SAP-Tiefe, Architektur-Breite, AI-Praxis)
- Kernzahlen: 17+ Jahre | 8 Projekte | 85.000 Zeilen Toolkit | 4.500+ Tests
- Kontakt: E-Mail, LinkedIn, GitHub

#### Technische Anforderungen
- Reines HTML + CSS, kein JavaScript (außer Plausible)
- < 50KB total (ohne Foto)
- Lighthouse Score ≥ 98 alle Kategorien
- Vollständige Meta-Tags, Open Graph, JSON-LD (Person, Occupation)
- hreflang-Tags (de/en)
- `sitemap.xml` mit allen statischen und App-URLs

### 5.5 Teil B: SAPUI5 Profil-App

Die eigentliche Showcase-Anwendung. Eine vollwertige SAPUI5-App in JavaScript ES6+ mit striktem MVC, gebaut nach allen SAP Coding Guidelines.

#### SAPUI5 Version & Stack

| Schicht | Technologie | Version |
|---------|------------|---------|
| Framework | **SAPUI5** | 1.136 LTS (Long-Term Support) |
| Sprache | **JavaScript** (ES6+, `sap.ui.define`) | SAPUI5-natives Modulsystem |
| Tooling | **@ui5/cli** | 4.x |
| Linting | **ui5-linter** (via MCP Server) | aktuell |
| Testing | **QUnit** + **OPA5** | via SAPUI5 |

**Warum JavaScript statt TypeScript:**
TypeScript bringt bei dieser App-Komplexität (JSON-Models, kein OData, keine komplexe Business-Logik) mehr Setup-Overhead als Nutzen: `tsconfig.json`, `ui5-tooling-transpile`, `@sapui5/types`, Cast-Patterns für jeden `byId()`-Aufruf. Dazu kommt: Die meisten SAP-Teamleiter, die den Code im GitHub-Repo inspizieren, verstehen klassisches `sap.ui.define`-JavaScript sofort. Der Showcase-Effekt kommt aus der sauberen MVC-Struktur und den korrekten SAP Coding Guidelines — nicht aus Type-Annotations. TypeScript bleibt eine Option für Phase 2 (Clean Core Checker), wo die Komplexität es rechtfertigt.

#### App-Namespace
```
net.bansemir.profile
```

#### Seitenstruktur (SAPUI5 Views)

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

#### F1: App Shell & Navigation

- `sap.f.ShellBar` als App-Header mit:
  - Logo/Name: "Carsten Bansemir"
  - Navigation: Sektions-Links (Anchor-Navigation innerhalb Overview)
  - Sprachwechsler (DE/EN) als `sap.m.Select`
  - "View Source on GitHub" Button
- `sap.f.FlexibleColumnLayout` oder `sap.uxap.ObjectPageLayout` als Basis
- `sap.ui.core.routing.Router` für Deep Links

#### F2: Hero / ObjectPage Header

- `sap.uxap.ObjectPageLayout` mit:
  - `headerTitle`: Name, Rolle, Verfügbarkeit-Status
  - `headerContent`: Foto (`sap.m.Avatar`), Key Facts als `sap.m.ObjectAttribute`
  - Attribute: "17+ Jahre SAP", "DACH-weit", "Sofort verfügbar", "Remote/Hybrid"
- CTA: `sap.m.Button` (Emphasized) → Calendly

#### F3: Positionierung (ObjectPageSection)

- `sap.uxap.ObjectPageSection` mit 3 `ObjectPageSubSection`:
  1. SAP-Tiefe — Narrative (sap.m.FormattedText)
  2. Architektur-Breite — Narrative
  3. AI-Praxis — Narrative mit Toolkit-Verweis
- Texte aus i18n-Model

#### F4: Skills-Matrix

- `sap.ui.table.Table` (responsive) mit:
  - Spalten: Skill, Kategorie, Erfahrung (Jahre), Level, Projekte
  - Filterbar: `sap.ui.table.Column` mit Filter-Menü
  - Sortierbar: nach Jahren, Level, Kategorie
  - Gruppierbar: nach Kategorie (SAP Core, SAP Modern, AI & Automation, Architektur)
- Daten aus JSON-Model (`model/skills.json`)
- **AI-Showcase:** Fußnote "Dieses Table-Layout wurde mit dem SAPUI5 Skeleton Generator erzeugt und folgt den SAP Fiori Design Guidelines."

#### F5: Projekterfahrung

- `sap.f.GridList` mit `sap.f.Card` pro Projekt ODER
- `sap.m.Timeline` (chronologisch, neueste zuerst)
- Jede Karte/Eintrag:
  - Zeitraum, Rolle, Kunde (oder "Vertraulich")
  - Key Technologies als `sap.m.Token` Tags
  - 2-3 Sätze Beschreibung
  - "Details →" Navigation zu ProjectDetail.view.xml
- Daten aus JSON-Model (`model/projects.json`)
- Filter: nach Technologie, nach Zeitraum

#### F6: SAP Accelerator Toolkit Showcase

- `sap.m.IconTabBar` mit 4 Tabs:
  1. **Field-Change Accelerator** — Beschreibung + Beispiel-Output
  2. **Code Review Assistant** — Beschreibung + Beispiel-Finding
  3. **RAP/Fiori Generator** — Beschreibung + generiertes Skeleton-Snippet
  4. **Ticket-to-Solution** — Beschreibung + Beispiel-Analyse
- Kernzahlen als `sap.m.NumericContent` in `sap.m.GenericTile`:
  - 85.000+ Zeilen | 200+ Prüfregeln | 4.500+ Tests | 10 SAP-Domänen
- "30–50% schnellere Entwicklungszyklen bei höherer Qualität"
- CTA: "Interessiert? Sprechen wir darüber." → Calendly

#### F7: "Built with Claude Code" — AI-Transparenz

- `sap.uxap.ObjectPageSection` mit besonderem Inhalt:
- Überschrift: "Diese App wurde AI-assisted entwickelt. So sah das aus."
- 3-4 Beispiele als `sap.m.Panel` (klappbar):
  1. **Skeleton Generation** — "Der SAPUI5 Skeleton Generator hat die Projektstruktur in 12 Sekunden erstellt"
  2. **MCP Server Linting** — "Der UI5 MCP Server hat bei jedem Commit die Coding Guidelines geprüft"
  3. **Code Review** — "Der Review Assistant hat 201 Regeln auf jeden View/Controller angewandt"
  4. **Iteration** — "Wie ein Accessibility-Finding in 30 Sekunden gefixt wurde"
- Jedes Beispiel mit: Was passiert ist, Zeitaufwand, Ergebnis
- Link zum GitHub-Repo
- Tonalität: ehrlich. "AI schreibt nicht magisch perfekten Code. Aber mit dem richtigen Toolkit wird es ein effizienterer, qualitätsgesicherter Prozess."

#### F8: Verfügbarkeit & Kontakt

- `sap.ui.layout.form.Form` mit `sap.ui.layout.form.ColumnLayout`:
  - Status: `sap.m.ObjectStatus` (ValueState: Success) "Verfügbar ab sofort — 100%"
  - Arbeitsmodell: Remote / Hybrid, DACH-weit
  - Stundensatz: "Auf Anfrage"
  - E-Mail: carsten@bansemir.net
  - LinkedIn-Button (`sap.m.Link`)
- Calendly-Embed als `sap.ui.core.HTML` Control (eingebettetes iframe)

#### F9: Footer

- `sap.m.Bar` oder Custom Footer:
  - Impressum-Link, Datenschutz-Link
  - GitHub, LinkedIn, GULP
  - "© 2026 Carsten Bansemir — Built with SAPUI5 + Claude Code"

### 5.6 Datenarchitektur (SAPUI5 Models)

Alle Daten als clientseitige JSON-Models. Kein Backend, kein OData-Service.

```
model/
├── projects.json        ← 8 Projekte mit DE/EN Beschreibungen
├── skills.json          ← 4 Kategorien, 19 Skills mit Level + Projektbezug
├── toolkit.json         ← 4 Tools mit Beschreibungen, Zahlen, Beispielen
└── formatter.js         ← Reine Formatter-Funktionen (kein State)
```

#### i18n (SAPUI5-natives i18n)

```
i18n/
├── i18n.properties          ← Default (Deutsch)
├── i18n_de.properties       ← Deutsch (explizit)
└── i18n_en.properties       ← Englisch
```

Sprachumschaltung via `sap.ui.getCore().getConfiguration().setLanguage()` — nativer SAPUI5-Mechanismus, keine Custom-Lösung.

#### Datenfluss (SAPUI5 MVC)

```
model/projects.json                    ← MODEL: Strukturierte Daten
        ↓
manifest.json                          ← MODEL: Deklariert JSON-Model "projects"
        ↓ (automatisch geladen)
Component.js                           ← Erstellt Models aus manifest.json
        ↓
controller/Overview.controller.js      ← CONTROLLER: Event-Handler, Navigation
        ↓ (Data Binding, NICHT manuell)
view/Overview.view.xml                 ← VIEW: {projects>/items} Binding
```

**Verboten (MVC-Verstoß):**
```javascript
// ❌ FALSCH: Daten im Controller definieren
onInit: function() {
    var aProjects = [
        { name: "Zeppelin", period: "2018-2020" }  // Hardcoded!
    ];
    this.getView().setModel(new JSONModel(aProjects), "projects");
}

// ✅ RICHTIG: Daten in model/projects.json, deklariert in manifest.json
// Controller greift nur lesend zu:
onInit: function() {
    var oModel = this.getOwnerComponent().getModel("projects");
    // Model ist bereits da — manifest.json hat es geladen
}
```

**Verboten (MVC-Verstoß):**
```xml
<!-- ❌ FALSCH: Hartcodierter Text in View -->
<Title text="Meine Projekte" />

<!-- ✅ RICHTIG: Text aus i18n Model -->
<Title text="{i18n>projects.title}" />
```

**Erlaubt (SAPUI5-konformes Data Binding in View):**
```xml
<!-- ✅ OK: Expression Binding ist deklarativ, keine Logik -->
<ObjectStatus
    text="{skills>/level}"
    state="{= ${skills>/level} === 'expert' ? 'Success' : 'Information'}" />

<!-- ✅ OK: core:require für Formatter ist SAPUI5 Best Practice -->
<Text
    core:require="{ formatter: 'net/bansemir/profile/model/formatter' }"
    text="{ path: 'projects>/period', formatter: 'formatter.formatPeriod' }" />
```

### 5.7 MVC-Architektur & SAPUI5 Coding Standards

> **Diese Website demonstriert SAPUI5-Expertise. Jede Abweichung von den SAP Coding Guidelines
> untergräbt die Glaubwürdigkeit. Der Code muss besser sein als das, was ein durchschnittlicher
> SAP-Entwickler schreibt — weil genau das bewiesen werden soll.**
>
> **Zusätzlich gilt ein striktes MVC-Prinzip — überall dort, wo es sich nicht mit SAPUI5-Patterns beißt.**

#### MVC in SAPUI5 — Abgrenzung & Regeln

SAPUI5 ist von Haus aus ein MVC-Framework. Die folgende Tabelle definiert, was in welcher Schicht erlaubt ist und was nicht:

| Schicht | SAPUI5-Artefakte | Erlaubt | Verboten |
|---------|-----------------|---------|----------|
| **MODEL** | JSON-Dateien in `model/`, `i18n/*.properties`, `manifest.json` (Model-Deklaration) | Alle Daten, Texte, Konfiguration. Single Source of Truth. | Daten dürfen NICHT in Controllern oder Views definiert werden. |
| **VIEW** | XML Views (`.view.xml`), Fragments (`.fragment.xml`) | Deklarative UI-Struktur, Data Binding Expressions (`{modelName>/path}`), `core:require` für Formatter/Types. | KEINE Geschäftslogik, KEINE Datenmanipulation, KEINE Controller-Aufrufe außer Event-Handler. |
| **CONTROLLER** | Controller-Klassen (`.controller.js`), `formatter.js` | Event-Handling, Model-Zugriff via `this.getView().getModel()`, Navigation, View-Orchestrierung. | KEINE UI-Erzeugung (Controls gehören in Views/Fragments), KEINE hartcodierten Daten, KEINE direkten DOM-Zugriffe. |

#### Wo MVC und SAPUI5-Guidelines sich ergänzen (strikt anwenden)

1. **Daten ausschließlich in Models:** Projektdaten, Skills, Toolkit-Infos leben als JSON-Dateien in `model/`. Werden im `manifest.json` als Named Models deklariert. Controller und Views greifen nur via Data Binding oder `getModel()` darauf zu — niemals über lokale Variablen oder Konstanten.

2. **Texte ausschließlich in i18n:** Kein einziger sichtbarer String in Views oder Controllern. Alles aus `i18n.properties` via `{i18n>key}` Binding oder `this.getView().getModel("i18n").getResourceBundle().getText()`.

3. **Views sind rein deklarativ:** XML Views beschreiben *was* angezeigt wird, nicht *wie* oder *woher*. Data Binding verbindet View und Model. Controller-Methoden werden nur als Event-Handler referenziert (`.press="onNavToProject"`).

4. **Controller orchestrieren, rendern nicht:** Controller reagieren auf Events, manipulieren Models, und triggern Navigation. Sie erzeugen KEINE Controls programmatisch (dafür gibt es Fragments).

5. **Formatter sind reine Funktionen:** `formatter.js` enthält stateless Funktionen die einen Model-Wert in einen Display-Wert transformieren. Keine Seiteneffekte, kein Model-Zugriff.

6. **Fragments für Wiederverwendung:** Wiederkehrende UI-Blöcke (ProjectCard, ToolkitTab) als Fragments — nicht als Copy-Paste in verschiedenen Views.

#### Wo SAPUI5-Patterns Vorrang haben (MVC-Prinzip weicht)

1. **Data Binding Expressions in Views:** SAPUI5-Views enthalten Binding-Ausdrücke wie `{projects>/items}` oder Expression Bindings wie `{= ${skills>/level} === 'expert' ? 'Success' : 'None'}`. Das ist kein Verstoß gegen MVC — es ist deklarative Datenbindung, keine Logik.

2. **`core:require` in XML Views:** SAPUI5 erlaubt das Laden von Formattern und Types direkt in Views via `core:require`. Das ist die offizielle Best Practice und kein MVC-Verstoß, weil es deklarativ ist.

3. **Model-Deklaration in `manifest.json`:** Models werden zentral im App Descriptor deklariert, nicht im Controller. Das ist SAPUI5-Konvention und stärkt MVC sogar.

4. **Form mit ColumnLayout:** SAPUI5-Guideline verlangt `sap.ui.layout.form.Form` mit `ColumnLayout`, nicht `SimpleForm`. Das ist eine View-Entscheidung, kein MVC-Thema.

#### SAPUI5 Coding Guidelines (aus SAP MCP Server)

1. **NIEMALS** globale `sap.*` Zugriffe. Alle Dependencies via `sap.ui.define` deklarieren.
2. **IMMER** `sap/ui/core/ComponentSupport` für App-Initialisierung in `index.html`.
3. **IMMER** Data Binding in Views — keine manuelle DOM-Manipulation.
4. **IMMER** Built-in Data Types mit Format Options bevorzugen. Custom Formatter nur für echte Business-Logik die kein Built-in Type abdeckt.
5. **IMMER** i18n-Änderungen in ALLEN Locales gleichzeitig (`i18n.properties` + `i18n_en.properties`).
6. **NIEMALS** Inline-Scripts in HTML (CSP-konform).
7. **IMMER** `sap.ui.layout.form.Form` mit `ColumnLayout` (nicht SimpleForm).
8. **IMMER** `run_ui5_linter` via MCP Server vor jedem Commit.
9. **IMMER** `get_api_reference` via MCP Server bei API-Fragen statt zu raten.

#### Kein AI Slop (verschärft für SAPUI5)

- KEINE Kommentare die den Code wiederholen
- KEINE globalen `sap.*` Zugriffe — immer `sap.ui.define` Dependencies
- KEINE `sap.ui.getCore()` Aufrufe — deprecated Pattern
- KEINE `jQuery`-Aufrufe wo UI5-API existiert
- KEINE hartcodierten Strings in Views — alles aus i18n
- KEINE hartcodierten Daten in Controllern — alles aus JSON-Model
- KEINE programmatische Control-Erzeugung wo ein XML View oder Fragment reicht
- KEINE unused Dependencies in `sap.ui.define` oder `manifest.json`
- KEINE veralteten API-Aufrufe (UI5 Linter muss 0 Errors, 0 Warnings zeigen)
- Jeder Controller unter 150 Zeilen
- Jeder View unter 200 Zeilen
- Jeder Formatter ist eine reine Funktion ohne Seiteneffekte

### 5.8 Agenten-Orchestrierung & Toolchain

> **Alle Agenten werden aus `~/.claude/agents/` geladen.**
> Der `project-planner` Agent teilt das Gesamtprojekt in Workpackages auf,
> die jeweils dem passenden Spezial-Agenten zugewiesen werden.
> Für alle SAPUI5-Implementierungsarbeiten werden ausschließlich SAP-Agenten eingesetzt.

#### Agenten-Verzeichnis: `~/.claude/agents/`

##### Orchestrierung & Planung

| Agent | Pfad | Rolle im Projekt |
|-------|------|-----------------|
| **Project Planner** | `project-management/project-planner.md` | **Einstiegspunkt.** Zerlegt das PRD in Workpackages, definiert Abhängigkeiten, weist Packages an Spezial-Agenten zu. Erstellt den Gesamtplan vor Implementierungsbeginn. |
| **SAP Agents Orchestrator** | `sap/specialized-sap-agents-orchestrator-merged.md` | Orchestriert die SAP-spezifischen Workpackages. Koordiniert Handoffs zwischen SAP-Agenten, erzwingt Quality Gates pro Task, managed Retry-Logik bei Findings. |

##### SAP-Agenten (für SAPUI5-Implementierung — PFLICHT)

| Agent | Pfad | Workpackages |
|-------|------|-------------|
| **SAP Frontend Developer** | `sap/sap-frontend-developer.md` | SAPUI5-App-Entwicklung: Views, Controller, Fragments, Data Binding, i18n, Custom Theme, Responsive Design. **Haupt-Implementierungs-Agent für die SAPUI5-App.** |
| **SAP Modern Fullstack Developer** | `sap/sap-modern-fullstack-developer.md` | Component.js, manifest.json, Routing, JSON-Models, App-Architektur, MVC-Durchsetzung |
| **SAP CV/Profile Optimizer DACH** | `sap/sap-cv-profile-optimizer-dach.md` | Inhaltliche Optimierung der Profil-Texte, Positionierung, Skills-Darstellung für DACH-Markt |

##### Engineering-Agenten (für Quality Assurance)

| Agent | Pfad | Workpackages |
|-------|------|-------------|
| **Senior Developer** | `engineering/engineering-senior-developer.md` | Code Review: Clean Code, keine AI Slop, MVC-Konformität |
| **Frontend Developer** | `engineering/engineering-frontend-developer.md` | Landing Page (statisches HTML/CSS), Responsive Feinschliff |
| **Security Engineer** | `engineering/engineering-security-engineer.md` | CSP-Konformität, keine Inline-Scripts, sichere Konfiguration |
| **Technical Writer** | `engineering/engineering-technical-writer.md` | README, GitHub-Repo-Dokumentation, Commit-History-Aufbereitung |
| **DevOps Automator** | `engineering/engineering-devops-automator.md` | Build-Pipeline, IONOS-Deployment, GitHub Actions |

##### Testing-Agenten

| Agent | Pfad | Workpackages |
|-------|------|-------------|
| **Accessibility Auditor** | `testing/testing-accessibility-auditor.md` | WCAG 2.1 AA Audit nach jedem UI-Feature |
| **Performance Benchmarker** | `testing/testing-performance-benchmarker.md` | Lighthouse Scores, Ladezeit-Optimierung |
| **Reality Checker** | `testing/testing-reality-checker.md` | End-to-End Validierung: Funktioniert alles wie im PRD beschrieben? |

##### Design-Agenten

| Agent | Pfad | Workpackages |
|-------|------|-------------|
| **UX Architect** | `design/design-ux-architect.md` | Informationsarchitektur, Sektions-Anordnung, Navigation |
| **UI Designer** | `design/design-ui-designer.md` | Custom Theme, Farbpalette, visuelle Konsistenz |
| **Brand Guardian** | `design/design-brand-guardian.md` | Konsistente Positionierung über alle Texte und Sprachen |

##### Marketing-Agenten (Launch-Phase)

| Agent | Pfad | Workpackages |
|-------|------|-------------|
| **SEO Specialist** | `marketing/marketing-seo-specialist.md` | Landing Page SEO, Meta-Tags, JSON-LD, sitemap.xml |
| **Content Creator** | `marketing/marketing-content-creator.md` | LinkedIn-Launch-Post, "Built with SAPUI5"-Story |

#### SAP MCP Server (ergänzend zu SAP-Agenten)

| MCP Server | Tools | Wann |
|------------|-------|------|
| **@ui5/mcp-server** | `get_guidelines`, `run_ui5_linter`, `run_manifest_validation`, `get_api_reference` | SAP Frontend Developer nutzt diese bei jedem Feature |
| **@sap-ux/fiori-mcp-server** | `search_docs`, `list_functionality` | SAP Frontend Developer nutzt diese für Fiori Best Practices |
| **SAPsolve Skeleton Generator** (Port 9003) | App-Skeleton generieren | SAP Modern Fullstack Developer nutzt diesen beim Projektstart |
| **SAPsolve Review Assistant** (Port 9002) | 201 Review-Regeln | SAP Agents Orchestrator nutzt diesen als Quality Gate |

#### Orchestrierungs-Ablauf

```
┌─────────────────────────────────────────────────────────┐
│  1. PROJECT PLANNER                                      │
│     Liest PRD → Zerlegt in Workpackages → Weist zu       │
│                                                           │
│     Workpackage 1: "Landing Page"        → Frontend Dev   │
│     Workpackage 2: "SAPUI5 App Skeleton" → SAP Fullstack  │
│     Workpackage 3: "SAPUI5 Views/Ctrl"   → SAP Frontend   │
│     Workpackage 4: "Profil-Content"      → SAP CV Optim.  │
│     Workpackage 5: "Custom Theme"        → UI Designer     │
│     Workpackage 6: "Testing & QA"        → Test-Agenten   │
│     Workpackage 7: "SEO & Launch"        → Marketing       │
│     ...                                                    │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│  2. SAP AGENTS ORCHESTRATOR                              │
│     Übernimmt alle SAPUI5-Workpackages (2, 3, 5)         │
│     Orchestriert SAP-Agenten mit Quality Loops:           │
│                                                           │
│     Für jedes Feature:                                    │
│     ┌──────────────────────────────────────────────┐      │
│     │  SAP Frontend Dev: Implementiert              │      │
│     │       ↓                                       │      │
│     │  @ui5/mcp-server: run_ui5_linter (0 Errors)  │      │
│     │       ↓                                       │      │
│     │  SAPsolve Review Assistant: 201 Regeln        │      │
│     │       ↓                                       │      │
│     │  Senior Developer: Code Review (Clean Code)   │      │
│     │       ↓                                       │      │
│     │  Accessibility Auditor: WCAG 2.1 AA           │      │
│     │       ↓                                       │      │
│     │  ✅ Alle bestanden → Commit                    │      │
│     │  ❌ Findings → Zurück zu SAP Frontend Dev     │      │
│     └──────────────────────────────────────────────┘      │
│                                                           │
│     Max 3 Retries pro Task → dann Eskalation              │
└─────────────────────────────────────────────────────────┘
```

#### Warum SAP-Agenten für SAPUI5-Implementierung?

Der generische `engineering-frontend-developer` Agent kennt React, Vue, Angular — aber nicht die SAP-spezifischen Patterns: `sap.ui.define`-Modulsystem, manifest.json App Descriptor, XML View Templating, SAP Data Binding Syntax, OData-Model-Patterns, Fiori Design Guidelines. Der `sap-frontend-developer` Agent ist darauf spezialisiert und liefert Code, der sofort UI5-Linter-konform ist. Der `sap-modern-fullstack-developer` kennt die Component-Lifecycle und App-Architektur-Patterns.

Die SAP MCP Server (`@ui5/mcp-server`, `@sap-ux/fiori-mcp-server`) werden von den SAP-Agenten als Werkzeuge genutzt — nicht als Ersatz. Der Agent entscheidet *was* gebaut wird, der MCP Server validiert *ob* es korrekt ist.

#### Commit-Konvention

```
feat(skills-matrix): implement filterable skills table with category grouping

- view/Overview.view.xml: sap.ui.table.Table with column filters
- controller/Overview.controller.js: table binding + filter logic
- model/skills.json: structured data with levels and project references
- UI5 Linter: 0 errors, 0 warnings
- SAPsolve Review Assistant: 201 rules passed (0 findings)
- Implemented by: sap-frontend-developer agent
- Reviewed by: engineering-senior-developer agent (0 findings)
- Reviewed by: testing-accessibility-auditor agent (AA compliant)
- Orchestrated by: sap-agents-orchestrator

Co-Authored-By: Claude Code <noreply@anthropic.com>
```

### 5.9 Nicht-Funktionale Anforderungen

#### Performance

| Metrik | Landing Page | SAPUI5-App |
|--------|-------------|------------|
| First Contentful Paint | < 0.8s | < 3s |
| Largest Contentful Paint | < 1.5s | < 4s |
| Total Weight | < 50KB | ~2MB (SAPUI5 Framework) |
| Lighthouse Performance | ≥ 98 | ≥ 70 (realistisch für SAPUI5) |
| Lighthouse Accessibility | ≥ 98 | ≥ 90 |
| Lighthouse Best Practices | ≥ 98 | ≥ 85 |
| Lighthouse SEO | ≥ 98 | n/a (SPA) |

**Performance-Optimierung SAPUI5-App:**
- Component Preload aktivieren (`manifest.json` → `sap.ui5.componentUsages`)
- SAPUI5 von SAP CDN laden (`https://ui5.sap.com/1.136.15/`)
- Lazy Loading für Detail-Views (ProjectDetail, ToolkitDetail)
- JSON-Model-Daten inline im Component statt separate HTTP-Requests

#### SEO (über Landing Page gelöst)

- Vollständige Meta-Tags für: "SAP Architect Freelancer", "SAP Fiori Developer DACH", "AI-assisted SAP Development"
- Open Graph Tags für LinkedIn/XING-Sharing
- JSON-LD: Person, Occupation, Skills
- `sitemap.xml` + `robots.txt`
- hreflang-Tags (de/en)
- Die SAPUI5-App wird NICHT für SEO optimiert — das übernimmt die Landing Page

#### i18n

- SAPUI5-natives i18n über `i18n.properties` / `i18n_en.properties`
- Sprachwechsel via URL-Parameter (`?sap-language=en`) oder UI-Control
- Landing Page: separate HTML-Dateien pro Sprache (`de/index.html`, `en/index.html`)
- Alle UI-Texte in Properties-Dateien, KEINE hartcodierten Strings

#### Responsive Design

- SAPUI5 responsive Controls (sap.m.*, sap.f.*) sind mobile-ready by design
- `sap.uxap.ObjectPageLayout` ist responsive
- `sap.f.GridList` passt sich automatisch an
- Breakpoints über SAPUI5 Device API, nicht Custom CSS

#### Accessibility

- WCAG 2.1 AA Compliance
- SAPUI5 Controls sind von Haus aus accessible (ARIA-Roles, Keyboard-Navigation)
- Accessibility Agent prüft zusätzlich bei jedem UI-Feature
- Custom Controls (falls nötig) müssen ARIA-konform sein
- Kontrastverhältnis ≥ 4.5:1

#### Rechtlich (DE)

- Impressum nach §5 TMG (statische HTML-Seite)
- Datenschutzerklärung nach DSGVO (statische HTML-Seite)
- Kein Cookie-Banner (Plausible braucht keins)
- Kein Google Analytics

### 5.10 Design-Richtung

**Vibe: SAP Professional — aber mit Persönlichkeit**

Die SAPUI5-App soll nicht nach Standard-Fiori-Launchpad aussehen, sondern nach einer bewusst gestalteten Anwendung, die SAP-Patterns respektiert und gleichzeitig zeigt, was möglich ist.

**Ansatz:**
- Custom SAP Theme (via Theme Designer oder eigenes CSS)
- SAP Fiori Design Language als Basis (nicht dagegen arbeiten)
- Eigene Farbpalette innerhalb des SAP-Theming-Systems:
  - Brand Color: Deep Blue (#1a365d)
  - Highlight: Teal (#0d9488)
  - Accent: Amber (#d97706)
- `sap.f.*` Controls für modernes Fiori 3.0 Look & Feel
- Professionelles Foto als `sap.m.Avatar` (Größe XL)

**Die Enterprise-Optik ist kein Bug, sie ist ein Feature.** Ein SAP-Teamleiter fühlt sich sofort zuhause. Die App spricht seine Sprache.

### 5.11 Projektstruktur (SAPUI5 App)

```
app/
├── webapp/
│   ├── Component.js                     ← Root Component (sap.ui.define)
│   ├── manifest.json                    ← App Descriptor (MODEL: Model-Deklarationen)
│   ├── index.html                       ← UI5 Bootstrap (ComponentSupport)
│   ├── controller/                      ← CONTROLLER-Schicht
│   │   ├── App.controller.js            ← Shell Controller
│   │   ├── Overview.controller.js       ← Hauptseite
│   │   ├── ProjectDetail.controller.js  ← Projekt-Detail
│   │   └── BaseController.js            ← Shared Logic (getRouter, getModel, etc.)
│   ├── view/                            ← VIEW-Schicht
│   │   ├── App.view.xml                 ← Shell + Router
│   │   ├── Overview.view.xml            ← Hauptseite (ObjectPageLayout)
│   │   ├── ProjectDetail.view.xml       ← Projekt-Detail
│   │   └── fragment/                    ← Wiederverwendbare View-Teile
│   │       ├── SkillsTable.fragment.xml
│   │       ├── ProjectCard.fragment.xml
│   │       └── ToolkitTab.fragment.xml
│   ├── model/                           ← MODEL-Schicht
│   │   ├── projects.json                ← Projektdaten (Single Source of Truth)
│   │   ├── skills.json                  ← Skills nach Kategorie
│   │   ├── toolkit.json                 ← Toolkit-Beschreibungen + Zahlen
│   │   └── formatter.js                 ← Reine Formatter-Funktionen (kein State)
│   ├── i18n/                            ← MODEL-Schicht (Texte)
│   │   ├── i18n.properties              ← Deutsch (Default)
│   │   └── i18n_en.properties           ← Englisch
│   ├── css/
│   │   └── style.css                    ← Custom Theme Overrides
│   └── test/
│       ├── unit/
│       │   └── controller/
│       │       └── Overview.qunit.js
│       ├── integration/
│       │   ├── pages/
│       │   │   └── OverviewPage.js
│       │   └── OverviewJourney.js
│       └── testsuite.qunit.js
├── ui5.yaml                             ← UI5 Tooling Config
├── ui5-dist.yaml                        ← Build Config
└── package.json
```

**MVC-Zuordnung im Dateisystem:**
- `model/` + `i18n/` + `manifest.json` (Models) = **MODEL** — Alle Daten und Texte
- `view/` + `fragment/` = **VIEW** — Rein deklarative UI-Struktur
- `controller/` = **CONTROLLER** — Event-Handling und Orchestrierung
- `formatter.js` sitzt in `model/` weil er Daten transformiert (Model → Display), nicht orchestriert

### 5.12 manifest.json (Kern-Konfiguration)

```json
{
  "sap.app": {
    "id": "net.bansemir.profile",
    "type": "application",
    "applicationVersion": { "version": "1.0.0" },
    "title": "{{appTitle}}",
    "description": "{{appDescription}}",
    "i18n": "i18n/i18n.properties"
  },
  "sap.ui": {
    "technology": "UI5",
    "deviceTypes": { "desktop": true, "tablet": true, "phone": true }
  },
  "sap.ui5": {
    "rootView": {
      "viewName": "net.bansemir.profile.view.App",
      "type": "XML",
      "id": "app",
      "async": true
    },
    "models": {
      "i18n": {
        "type": "sap.ui.model.resource.ResourceModel",
        "settings": { "bundleName": "net.bansemir.profile.i18n.i18n" }
      },
      "projects": {
        "type": "sap.ui.model.json.JSONModel",
        "uri": "model/projects.json"
      },
      "skills": {
        "type": "sap.ui.model.json.JSONModel",
        "uri": "model/skills.json"
      },
      "toolkit": {
        "type": "sap.ui.model.json.JSONModel",
        "uri": "model/toolkit.json"
      }
    },
    "routing": {
      "config": {
        "routerClass": "sap.m.routing.Router",
        "type": "View",
        "viewType": "XML",
        "path": "net.bansemir.profile.view",
        "controlId": "app",
        "controlAggregation": "pages",
        "async": true
      },
      "routes": [
        { "name": "overview", "pattern": "", "target": "overview" },
        { "name": "projectDetail", "pattern": "project/{projectId}", "target": "projectDetail" }
      ],
      "targets": {
        "overview": { "viewName": "Overview", "viewLevel": 1 },
        "projectDetail": { "viewName": "ProjectDetail", "viewLevel": 2 }
      }
    }
  }
}
```

### 5.13 MVP Scope

**In Scope (Phase 1):**
- [x] Statische Landing Page (DE + EN, SEO-optimiert)
- [x] SAPUI5-App mit allen Sektionen (F1-F9)
- [x] JavaScript ES6+ mit sap.ui.define, 0 Linter Errors
- [x] SAPUI5 Coding Guidelines 100% eingehalten
- [x] Striktes MVC: Daten in Models, UI in Views, Logik in Controllern
- [x] i18n (DE/EN) via natives SAPUI5 i18n
- [x] Responsive Design via SAPUI5 responsive Controls
- [x] Impressum + Datenschutz (statische Seiten)
- [x] Calendly-Integration
- [x] GitHub-Repo (public, kommentierte Commit-History)
- [x] "Built with Claude Code"-Sektion mit echten Beispielen aus dem Build
- [x] Agent-gestützter Workflow dokumentiert in Commits
- [x] UI5 Linter: 0 Errors, 0 Warnings (dokumentiert)
- [x] Review Assistant: 201 Regeln bestanden (dokumentiert)
- [x] Custom SAP Theme mit eigener Farbpalette
- [x] QUnit-Tests für Controller-Logik

**Out of Scope (spätere Phasen):**
- [ ] Clean Core Readiness Check als sap.m.Wizard (Phase 2)
- [ ] TypeScript-Migration (optional Phase 2, wenn Komplexität es rechtfertigt)
- [ ] Blog (Phase 3 — separate statische Seiten oder Astro)
- [ ] Newsletter (Phase 3)
- [ ] Benchmark-Dashboard (Phase 4)
- [ ] OPA Integration Tests (nice-to-have Phase 1, Pflicht Phase 2)
- [ ] Dark Mode / Quartz Theme Toggle
- [ ] OData V4 Service (kein Backend nötig, JSON-Models reichen)

### 5.14 Success Metrics (Phase 1)

| Metrik | Ziel (3 Monate) | Messung |
|--------|-----------------|---------|
| Unique Visitors / Monat | 200+ | Plausible |
| Calendly-Buchungen / Monat | 3-5 | Calendly Dashboard |
| Avg. Time on Site | > 3 Min (SAPUI5-App lädt zum Erkunden ein) | Plausible |
| GitHub Repo Stars | 10+ | GitHub |
| LinkedIn-Post "SAPUI5 Portfolio" Impressions | 5.000+ | LinkedIn Analytics |
| UI5 Linter Errors | 0 | CI/CD |
| Anfragen via E-Mail | 2-3 / Monat | Inbox |

### 5.15 Zeitplan Phase 1 (mit Agenten-Zuordnung)

> **Schritt 0:** Der `project-planner` Agent liest dieses PRD und erstellt Workpackages
> mit Abhängigkeiten und Agenten-Zuordnung. Der folgende Zeitplan ist der Rahmen —
> der Project Planner verfeinert ihn in konkrete Tasks pro Agent.

| Woche | Tag | Aufgabe | Zuständiger Agent | QA-Agenten |
|-------|-----|---------|-------------------|------------|
| **0** | 0 | PRD → Workpackages aufteilen | `project-planner` | — |
| **1** | 1 | Skeleton Generator → App-Grundstruktur | `sap-modern-fullstack-developer` | `sap-agents-orchestrator` |
| | 2 | manifest.json, Component.js, Router, JSON-Models | `sap-modern-fullstack-developer` | `run_manifest_validation`, `architecture` |
| | 3 | BaseController.js, formatter.js, Model-Dateien | `sap-frontend-developer` | `run_ui5_linter`, `engineering-senior-developer` |
| | 4 | Custom Theme (Farben, Fonts) + App Shell | `design-ui-designer` + `sap-frontend-developer` | `design-brand-guardian` |
| | 5 | Statische Landing Page (DE + EN) | `engineering-frontend-developer` | `marketing-seo-specialist`, `testing-accessibility-auditor` |
| | | **🔍 Milestone-Check #1** | `project-planner` | **Strukturaudit aller bisherigen Workpackages** |
| **2** | 6-7 | Overview.view.xml: Hero + Positionierung + Kontakt | `sap-frontend-developer` | `run_ui5_linter`, `engineering-senior-developer` |
| | 8-9 | Skills-Matrix: sap.ui.table.Table mit Filtern | `sap-frontend-developer` | `run_ui5_linter`, `testing-accessibility-auditor` |
| | 10 | i18n komplett (DE + EN) | `sap-cv-profile-optimizer-dach` | `design-brand-guardian` |
| | | **🔍 Milestone-Check #2** | `sap-agents-orchestrator` | **Quality Gate: UI5 Linter + Review Assistant** |
| **3** | 11-12 | Projekt-Timeline/Cards + ProjectDetail View | `sap-frontend-developer` | `run_ui5_linter`, `design-ux-architect` |
| | 13-14 | Toolkit Showcase (IconTabBar, 4 Tabs, GenericTiles) | `sap-frontend-developer` | `run_ui5_linter`, `engineering-senior-developer` |
| | 15 | "Built with Claude Code" Sektion | `engineering-technical-writer` | `design-brand-guardian` |
| | | **🔍 Milestone-Check #3** | `sap-agents-orchestrator` | **Gesamtaudit: 201 Regeln, MVC-Check** |
| **4** | 16 | QUnit-Tests für Controller-Logik | `sap-frontend-developer` | `testing-reality-checker` |
| | 17 | Responsive Feinschliff | `sap-frontend-developer` | `testing-accessibility-auditor` (alle Breakpoints) |
| | 18 | SEO Landing Page: Meta-Tags, JSON-LD, sitemap | `marketing-seo-specialist` | `testing-performance-benchmarker` |
| | 19 | Impressum + Datenschutz | `engineering-frontend-developer` | `engineering-security-engineer` |
| | 20 | **Pre-Launch: Full Audit** | **Alle Agenten parallel** | `sap-agents-orchestrator` koordiniert |
| **5** | 21 | GitHub-Repo aufräumen, README | `engineering-technical-writer` | `engineering-senior-developer` |
| | 22 | DNS bei IONOS → Go-Live | `engineering-devops-automator` | `testing-reality-checker` |
| | 23 | LinkedIn-Launch-Post | `marketing-content-creator` | `design-brand-guardian` |

---

## 6. Phase 2: Clean Core Readiness Check (Woche 6-7)

### Konzept
- `sap.m.Wizard` mit 15 Schritten zu Clean Core Readiness
- Clientseitige Score-Berechnung via JSON-Model (kein Backend)
- Ergebnis: Score (0-100) + `sap.suite.ui.microchart.RadialMicroChart` + 3 Top-Empfehlungen
- Teilbare Score Card (Open Graph-optimiert)
- CTA: "Ergebnis besprechen?" → Calendly

### SAPUI5-spezifische Umsetzung
- Wizard-Pattern ist natives SAPUI5 → kein Custom-Code nötig
- Scoring-Logik als reine JavaScript-Funktionen in `model/scoring.js`
- 5 von 200+ Toolkit-Regeln clientseitig anwendbar (Code-Snippet-Paste)
- Score-Badge als `sap.m.GenericTile` mit `sap.suite.ui.microchart`

### Dienstleistungspakete (nach Check)
1. **Spot Check** (2h, €220) — 3 Code-Objekte analysiert
2. **Code Health Check** (1 Tag, €880) — Toolkit auf Kundencode
3. **Clean Core Assessment** (3 Tage, €2.640) — Vollanalyse + Migrationsstrategie
4. **Accelerator Workshop** (2 Tage, €1.760) — Team lernt AI-assisted Development

---

## 7. Phase 3: Blog + Newsletter (Monat 3)

Blog wird als separate statische Seiten (nicht SAPUI5) umgesetzt — SEO-Gründe.

### Startartikel
1. "Warum mein Beraterprofil eine SAPUI5-App ist — und was das über AI-assisted Development zeigt"
2. "SAPUI5 + Claude Code + SAP MCP Server: Ein Erfahrungsbericht"
3. "SAP Clean Core: Was es wirklich bedeutet (mit Daten aus dem Toolkit)"
4. "Die SAP MCP Server im Praxiseinsatz"

---

## 8. Phase 4: Benchmark + Community (Monat 4+)

Unverändert zu v1.

---

## 9. Risiken & Mitigations

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| SAPUI5-Ladezeit zu hoch | Mittel | Mittel | CDN, Preload, Lazy Loading. Landing Page fängt ab. |
| SAPUI5-App wirkt "zu Enterprise" für Portfolio | Niedrig | Mittel | Custom Theme + bewusste Design-Entscheidung. Enterprise-Look ist gewollt — Zielgruppe ist SAP-Welt. |
| SEO-Nachteile durch SPA | Hoch | Hoch | Hybrid-Ansatz: Landing Page für SEO, SAPUI5-App dahinter. Vollständig mitigiert. |
| Entwicklungsaufwand höher als Astro | Hoch | Mittel | 4-5 Wochen statt 2. Aber: Beweiswert massiv höher. ROI stimmt. |
| "Built with AI" wirkt unseriös | Niedrig | Mittel | Ehrliche Tonalität. Code spricht für sich. |
| SAPUI5-Patterns ungewohnt für Portfolio-Kontext | Niedrig | Niedrig | Bewusste Designentscheidung. Custom Theme + SAP-affine Zielgruppe. |

---

## 10. Erfolgskriterien Go/No-Go

### Phase 1 → Phase 2 (nach 5 Wochen):
- ✅ Landing Page + SAPUI5-App live auf bansemir.net
- ✅ UI5 Linter: 0 Errors, 0 Warnings
- ✅ Review Assistant: 201 Regeln bestanden
- ✅ Mindestens 1 Calendly-Buchung
- ✅ Positives Feedback von 3+ SAP-Kontakten
- ✅ LinkedIn-Post > 1.000 Impressions

### Phase 2 → Phase 3 (nach 7 Wochen):
- ✅ Clean Core Check live
- ✅ 20+ Check-Durchläufe
- ✅ 2+ Dienstleistungsbuchungen über die Website

---

## 11. Geklärte Entscheidungen

| Frage | Entscheidung |
|-------|-------------|
| Tech-Stack | ✅ SAPUI5 1.136 LTS + JavaScript ES6+ (statt Astro+Tailwind) |
| SEO-Strategie | ✅ Hybrid: statische Landing Page + SAPUI5-App |
| SAPUI5-Version | ✅ 1.136 LTS (Long-Term Support, stabil) |
| JavaScript | ✅ ES6+ mit sap.ui.define (TypeScript optional ab Phase 2) |
| MVC | ✅ Strikt wo kompatibel mit SAPUI5-Guidelines |
| Foto | ✅ Professionelles Foto vorhanden |
| Domain | ✅ bansemir.net bei IONOS, DNS-Zugang vorhanden |
| GitHub | ✅ Public Repo, kommentierte Commits als Showcase |
| Stundensatz | ✅ "Auf Anfrage" — nicht öffentlich |
| Sprache | ✅ Deutsch + Englisch (DE default) |
| Toolkit-Transparenz | ✅ Alles zeigbar: Code, Architektur, Screenshots, Demo-Output |

## 12. Verbleibende Punkte (vor Implementierung)

1. **Calendly-Account erstellen** und URL bereitstellen
2. **Foto bereitstellen** als `portrait.jpg`
3. **Toolkit-Screenshots** bereitstellen (4 Stück, je eines pro Tool)
4. **Plausible-Account erstellen** und Site-ID bereitstellen
5. **GitHub-Repo erstellen** (`bansemir/bansemir.net`)
6. **IONOS SFTP-Zugangsdaten** bereithalten
7. **SAP CDN URL verifizieren** — `https://ui5.sap.com/1.136.15/` erreichbar?
8. **Entscheidung:** Eigenes SAP Theme via Theme Designer oder nur Custom CSS Overrides?
9. ~~**TypeScript-Setup**~~ Entfällt — JavaScript ES6+ mit sap.ui.define

---

## Anhang A: Vorbereitete Content-Dateien

Alle Content-Dateien aus v1 sind vorhanden und müssen für SAPUI5 konvertiert werden:

| v1 (Astro) | v2 (SAPUI5) | Konvertierung |
|-------------|-------------|---------------|
| `content/site-config.json` | `webapp/model/site-config.json` | Direkt übernehmen |
| `content/skills.json` | `webapp/model/skills.json` | Direkt übernehmen |
| `content/projects/*.md` | `webapp/model/projects.json` | Markdown → JSON konvertieren |
| `content/i18n/de.json` | `webapp/i18n/i18n.properties` | JSON → Properties konvertieren |
| `content/i18n/en.json` | `webapp/i18n/i18n_en.properties` | JSON → Properties konvertieren |

### A.1 Konvertierungsbeispiel i18n

**Vorher (JSON):**
```json
{ "hero": { "headline": "Software Architect — SAP & AI-assisted Development" } }
```

**Nachher (Properties):**
```properties
hero.headline=Software Architect \u2014 SAP & AI-assisted Development
```

### A.2 Konvertierungsbeispiel Projekte

**Vorher (Markdown Frontmatter):**
```yaml
---
id: schwarz-yard-mgmt
period: "Okt 2022 – Sep 2024"
role: { de: "SAP Software Architect", en: "SAP Software Architect" }
---
```

**Nachher (JSON):**
```json
{
  "id": "schwarz-yard-mgmt",
  "period": "Okt 2022 – Sep 2024",
  "role": { "de": "SAP Software Architect", "en": "SAP Software Architect" },
  "description": { "de": "...", "en": "..." }
}
```

---

## Anhang B: Deployment (IONOS)

```bash
# Build SAPUI5 App (kein Transpile-Schritt nötig — reines JavaScript)
cd app && npx ui5 build --all --dest ../dist/app

# Landing Page ist bereits statisches HTML
cp -r landing/* dist/

# Deploy zu IONOS via SFTP
# Option 1: Manuell mit FileZilla/Cyberduck
# Option 2: GitHub Action mit SFTP-Upload
#   Secrets: IONOS_SFTP_HOST, IONOS_SFTP_USER, IONOS_SFTP_PASSWORD
```

**Vorteil JavaScript:** Kein Build-Transpile-Schritt nötig. `ui5 build` bündelt und optimiert, aber der Quellcode ist direkt lauffähig. Das vereinfacht Debugging und macht den Code im GitHub-Repo unmittelbar lesbar.

---

## Anhang C: Warum SAPUI5 statt Astro (Entscheidungsdokumentation)

| Kriterium | Astro+Tailwind | SAPUI5+JavaScript | Entscheidung |
|-----------|---------------|-------------------|--------------|
| Beweiskraft SAPUI5-Expertise | 0 | **10** | SAPUI5 |
| Beweiskraft Toolkit funktioniert | Indirekt | **Direkt** | SAPUI5 |
| Viraler Gesprächswert | Gering | **Enorm** | SAPUI5 |
| Nachahmbarkeit | Hoch | **Sehr niedrig** | SAPUI5 |
| Zielgruppen-Resonanz | Normal | **Maximal** | SAPUI5 |
| Ladezeit | ✅ Besser | ❌ Langsamer | Astro (mitigiert durch Hybrid) |
| SEO | ✅ Besser | ❌ SPA-Problem | Astro (mitigiert durch Landing Page) |
| Entwicklungsaufwand | ✅ 2 Wochen | ❌ 4-5 Wochen | Astro |

**Fazit:** SAPUI5 gewinnt in allen strategisch relevanten Dimensionen. Die technischen Nachteile (Ladezeit, SEO) sind durch den Hybrid-Ansatz vollständig mitigiert. Der Mehraufwand (3 Wochen) wird durch den massiv höheren Beweiswert und viralen Gesprächswert mehr als kompensiert.
