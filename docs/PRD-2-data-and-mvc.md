# PRD Teil 2: Datenarchitektur, MVC & Coding Standards

> Auszug aus PRD v2.1 — Vollversion: `docs/PRD.md`

## Datenarchitektur (SAPUI5 Models)

Alle Daten als clientseitige JSON-Models. Kein Backend, kein OData.

```
model/
├── projects.json        ← 8 Projekte mit DE/EN Beschreibungen
├── skills.json          ← 4 Kategorien, 19 Skills mit Level + Projektbezug
├── toolkit.json         ← 4 Tools mit Beschreibungen, Zahlen, Beispielen
└── formatter.js         ← Reine Formatter-Funktionen (kein State)
```

### i18n (SAPUI5-natives i18n)

```
i18n/
├── i18n.properties          ← Default (Deutsch)
└── i18n_en.properties       ← Englisch
```

Sprachumschaltung via `sap.ui.getCore().getConfiguration().setLanguage()`.

### Datenfluss (SAPUI5 MVC)

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

## MVC-Architektur & SAPUI5 Coding Standards

| Schicht | SAPUI5-Artefakte | Erlaubt | Verboten |
|---------|-----------------|---------|----------|
| **MODEL** | JSON in `model/`, `i18n/*.properties`, `manifest.json` | Alle Daten, Texte, Konfiguration. Single Source of Truth. | Daten NICHT in Controllern oder Views. |
| **VIEW** | XML Views, Fragments | Deklarative UI, Data Binding, `core:require` für Formatter. | KEINE Geschäftslogik, KEINE Datenmanipulation. |
| **CONTROLLER** | `.controller.js`, `formatter.js` | Event-Handling, Model-Zugriff, Navigation. | KEINE UI-Erzeugung, KEINE hartcodierten Daten, KEINE DOM-Zugriffe. |

### Wo MVC und SAPUI5 sich ergänzen (strikt anwenden)

1. **Daten ausschließlich in Models** — JSON in `model/`, deklariert in `manifest.json`
2. **Texte ausschließlich in i18n** — kein sichtbarer String in Views oder Controllern
3. **Views rein deklarativ** — Data Binding verbindet View und Model
4. **Controller orchestrieren, rendern nicht** — keine programmatische Control-Erzeugung
5. **Formatter sind reine Funktionen** — stateless, keine Seiteneffekte
6. **Fragments für Wiederverwendung** — keine Copy-Paste in Views

### Wo SAPUI5-Patterns Vorrang haben

1. **Data Binding Expressions in Views** — `{= ${skills>/level} === 'expert' ? 'Success' : 'None'}` ist deklarativ, kein MVC-Verstoß
2. **`core:require` in XML Views** — offizielle Best Practice
3. **Model-Deklaration in `manifest.json`** — SAPUI5-Konvention, stärkt MVC
4. **Form mit ColumnLayout** — SAPUI5-Guideline, nicht SimpleForm

### Code-Beispiele

**Verboten:**
```javascript
// ❌ Daten im Controller
onInit: function() {
    var aProjects = [{ name: "Zeppelin", period: "2018-2020" }];
    this.getView().setModel(new JSONModel(aProjects), "projects");
}
// ✅ Daten in model/projects.json, deklariert in manifest.json
```

```xml
<!-- ❌ Hartcodierter Text -->
<Title text="Meine Projekte" />
<!-- ✅ Text aus i18n -->
<Title text="{i18n>projects.title}" />
```

```xml
<!-- ✅ Expression Binding (deklarativ, erlaubt) -->
<ObjectStatus text="{skills>/level}"
    state="{= ${skills>/level} === 'expert' ? 'Success' : 'Information'}" />

<!-- ✅ core:require für Formatter (Best Practice) -->
<Text core:require="{ formatter: 'net/bansemir/profile/model/formatter' }"
    text="{ path: 'projects>/period', formatter: 'formatter.formatPeriod' }" />
```

### Kein AI Slop

- KEINE Kommentare die den Code wiederholen
- KEINE globalen `sap.*` — immer `sap.ui.define`
- KEINE `sap.ui.getCore()` — deprecated
- KEINE `jQuery` wo UI5-API existiert
- KEINE hartcodierten Strings/Daten
- KEINE programmatische Control-Erzeugung wo XML View/Fragment reicht
- KEINE unused Dependencies
- KEINE veralteten APIs (UI5 Linter: 0 Errors, 0 Warnings)
- Controller < 150 Zeilen, View < 200 Zeilen
- Formatter = reine Funktionen

## Projektstruktur

```
app/
├── webapp/
│   ├── Component.js
│   ├── manifest.json
│   ├── index.html
│   ├── controller/
│   │   ├── App.controller.js
│   │   ├── Overview.controller.js
│   │   ├── ProjectDetail.controller.js
│   │   └── BaseController.js
│   ├── view/
│   │   ├── App.view.xml
│   │   ├── Overview.view.xml
│   │   ├── ProjectDetail.view.xml
│   │   └── fragment/
│   │       ├── SkillsTable.fragment.xml
│   │       ├── ProjectCard.fragment.xml
│   │       └── ToolkitTab.fragment.xml
│   ├── model/
│   │   ├── projects.json
│   │   ├── skills.json
│   │   ├── toolkit.json
│   │   └── formatter.js
│   ├── i18n/
│   │   ├── i18n.properties
│   │   └── i18n_en.properties
│   ├── css/
│   │   └── style.css
│   └── test/
│       ├── unit/controller/Overview.qunit.js
│       ├── integration/
│       └── testsuite.qunit.js
├── ui5.yaml
├── ui5-dist.yaml
└── package.json
```

## manifest.json (Kern-Konfiguration)

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
      "type": "XML", "id": "app", "async": true
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
        "type": "View", "viewType": "XML",
        "path": "net.bansemir.profile.view",
        "controlId": "app", "controlAggregation": "pages", "async": true
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
