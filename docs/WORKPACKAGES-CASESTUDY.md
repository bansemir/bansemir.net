# Workpackages: Case Study Feature

> Basierend auf: `docs/PRD-4-case-study.md`
> Erstellt: 2026-03-26 | Planning Mode: Standard
> WP-CS-01 (Screenshots): ERLEDIGT — 13 WebP-Dateien in `assets/case-study/`

## Problem

Die Website braucht eine Case Study, die den AI-assisted Build-Prozess dokumentiert. Sie dient als Beweisstueck fuer die "AI in der Praxis"-Positionierung. Zwei Ausspielungen: statische HTML-Seite (SEO, Social Sharing) und SAPUI5-Route (interaktive Version in der App).

## Bestandsaufnahme

### Vorhanden

| Artefakt | Status | Pfad |
|----------|--------|------|
| Screenshots (13 WebP) | Fertig | `assets/case-study/*.webp` |
| Template-Build-System | Produktiv | `app/scripts/build-html.js` |
| Content-JSON-Muster | Produktiv | `content/landing-de.json`, `content/landing-en.json` |
| Landing Page Templates | Produktiv | `de/index.template.html`, `en/index.template.html` |
| `landing.js` (Theme/Lang Toggle) | Produktiv | `assets/landing.js` |
| BaseController mit `getLocalizedText` | Produktiv | `app/webapp/controller/BaseController.js` |
| `formatLocalized` Formatter | Produktiv | `app/webapp/model/formatter.js` |
| Overview F7 "Built with Claude Code" | Produktiv | `app/webapp/view/Overview.view.xml` (Zeile 80-103) |
| manifest.json Routing | Produktiv | `app/webapp/manifest.json` — 2 Routes, 2 Targets |
| i18n (3 Locales) | Produktiv | `i18n.properties`, `i18n_de.properties`, `i18n_en.properties` |

### Zu erstellen

| Artefakt | Typ |
|----------|-----|
| `content/casestudy-de.json` | Content-Daten (statische Seite) |
| `content/casestudy-en.json` | Content-Daten (statische Seite) |
| `case-study/index.template.html` | Template DE |
| `case-study/en/index.template.html` | Template EN |
| `app/webapp/model/casestudy.json` | SAPUI5 Model-Daten |
| `app/webapp/view/CaseStudy.view.xml` | SAPUI5 View |
| `app/webapp/controller/CaseStudy.controller.js` | SAPUI5 Controller |
| `app/webapp/view/fragment/CaseStudyChapter.fragment.xml` | SAPUI5 Fragment |

### Zu aendern

| Artefakt | Aenderung |
|----------|-----------|
| `app/scripts/build-html.js` | 2 neue Template-Eintraege |
| `app/webapp/manifest.json` | 1 Model, 1 Route, 1 Target |
| `app/webapp/view/Overview.view.xml` | F7 Teaser-Umbau (Hero-Zahlen + CTA) |
| `i18n.properties` (alle 3 Locales) | Neue Keys fuer Case Study + Teaser |

## Architektur-Entscheidungen

### Content-Daten: Zwei separate JSON-Strukturen

Die statische Seite und die SAPUI5-App brauchen unterschiedliche JSON-Formate:

- **Statisch** (`content/casestudy-de.json`, `content/casestudy-en.json`): Flat Keys fuer `{{L.xxx}}` Template-Ersetzung. Pro Sprache eine Datei. Folgt dem Muster von `content/landing-de.json`.
- **SAPUI5** (`app/webapp/model/casestudy.json`): Verschachtelte Struktur mit `{de/en}` Objekten. `formatLocalized` Formatter loest die Sprache auf. Folgt dem Muster von `model/projects.json`.

Grund: Das bestehende `build-html.js` arbeitet mit flachen Keys und `flattenContent()`. Die SAPUI5-App arbeitet mit verschachtelten DE/EN-Objekten und `formatLocalized`. Zwei Formate sind konsistent mit den bestehenden Mustern. Dopplung der Texte ist akzeptabel, da die Inhalte stabil sind (keine haeufigen Aenderungen).

### Case Study Template: Eigenes CSS, kein Framework

Die statische Seite nutzt denselben Inline-CSS-Ansatz wie die Landing Page. Kein SAPUI5, kein CSS-Framework. Die CSS-Variablen und Klassen aus `de/index.template.html` werden wiederverwendet und um case-study-spezifische Klassen erweitert (Kapitel-Layout, Bild-Grid, Caption-Styling).

### SAPUI5 View: ObjectPageLayout

Konsistent mit Overview: `sap.uxap.ObjectPageLayout` mit einer `ObjectPageSection` pro Kapitel. Bilder als `sap.m.Image` mit `sap.m.LightBox` fuer Zoom. Navigation per Tab-Leiste (automatisch durch ObjectPage).

## Workpackages

---

### WP-CS-01: Screenshot-Aufbereitung [ERLEDIGT]

**Agent:** Manuell (User)
**Status:** Abgeschlossen
**Ergebnis:** 13 WebP-Dateien in `assets/case-study/`, max 1200px, gesamt 804 KB

---

### WP-CS-02: Content-Daten erstellen (casestudy.json + Content-JSONs)

**Agent:** `sap-cv-profile-optimizer-dach`
**Abhaengigkeiten:** WP-CS-01 (erledigt)
**Groesse:** M
**Geschaetzter Aufwand:** 20-30 Min

**Scope:**
1. `app/webapp/model/casestudy.json` — SAPUI5-Datenmodell mit verschachtelter DE/EN-Struktur
   - `title`, `subtitle` als `{de, en}` Objekte
   - `stats[]` Array mit 4 Eintraegen (2.5h, 21 WPs, 10 Agenten, 11k Zeilen)
   - `chapters[]` Array mit 8 Kapiteln, jeweils: `id`, `title`, `text`, `images[]`
   - Bildpfade relativ: `assets/case-study/01-cowork-content.webp`
   - Alt-Texte und Captions als `{de, en}` Objekte (aus PRD-4 Tabelle)
2. `content/casestudy-de.json` — Flat Keys fuer statische DE-Seite
3. `content/casestudy-en.json` — Flat Keys fuer statische EN-Seite

**Datenstruktur casestudy.json** (Vorlage aus PRD-4, Zeile 137-162):
```json
{
    "title": { "de": "...", "en": "..." },
    "subtitle": { "de": "...", "en": "..." },
    "stats": [...],
    "chapters": [
        {
            "id": "hook",
            "title": { "de": "...", "en": "..." },
            "text": { "de": "...", "en": "..." },
            "images": [
                { "src": "...", "alt": { "de": "...", "en": "..." }, "caption": { "de": "...", "en": "..." } }
            ]
        }
    ]
}
```

**Datenstruktur content/casestudy-de.json** (Flat, analog zu `content/landing-de.json`):
```json
{
    "metaDescription": "...",
    "ogDescription": "...",
    "pageTitle": "...",
    "heroHeadline": "...",
    "chapter0Title": "...",
    "chapter0Text": "...",
    "chapter0Img0Src": "...",
    "chapter0Img0Alt": "..."
}
```

**Texte:** Faktenbasierte Dokumentation, kein Blog-Stil. 8 Kapitel wie in PRD-4 definiert (Hook, Ausgangslage, Planung, Implementierung, QA, Problem-Loesung, Go-Live, Ergebnis).

**Akzeptanzkriterien:**
- Alle 13 Bilder korrekt referenziert mit Alt-Texten und Captions
- Alle 8 Kapitel mit sinnvollem DE und EN Text
- JSON valide, keine Syntaxfehler
- Bildpfade stimmen mit `assets/case-study/*.webp` ueberein

---

### WP-CS-03: Statische Case Study Seite (DE + EN Templates)

**Agent:** `engineering-frontend-developer`
**Abhaengigkeiten:** WP-CS-02
**Groesse:** M
**Geschaetzter Aufwand:** 30-40 Min

**Scope:**
1. `case-study/index.template.html` — DE Template
2. `case-study/en/index.template.html` — EN Template
3. `app/scripts/build-html.js` erweitern — 2 neue Template-Eintraege

**Template-Anforderungen:**
- Gleicher Grundstil wie `de/index.template.html` (CSS-Variablen, Layout, Header, Footer)
- Nutzt `{{Platzhalter}}` fuer config-Daten und `{{L.xxx}}` fuer Content
- Seitenstruktur: Header -> Hero mit Stats -> 8 Kapitel -> Footer
- Bilder: `<img>` mit `loading="lazy"`, `width`/`height` Attribute, `alt`-Text
- Responsive: Mobile-first, Bilder max 100% Breite
- hreflang zwischen `/case-study/` (DE) und `/case-study/en/` (EN)
- Theme Toggle + Language Switch (via `assets/landing.js`)
- Link zurueck zur Landing Page und zur SAPUI5-App

**Neue CSS-Klassen** (Inline im Template, analog zur Landing Page):
- `.chapter` — Kapitel-Container mit Padding und Border
- `.chapter-title` — Kapitelueberschrift
- `.chapter-text` — Fliesstext
- `.chapter-images` — Bild-Grid (1-2 Spalten)
- `.chapter-img` — Bild mit Border-Radius und Caption
- `.caption` — Bildunterschrift

**build-html.js Aenderung:**
```javascript
// Zwei neue Eintraege im templates-Array:
{ tpl: "case-study/index.template.html", content: "content/casestudy-de.json", lang: "de" },
{ tpl: "case-study/en/index.template.html", content: "content/casestudy-en.json", lang: "en" }
```

**Hinweis zu `flattenContent()`:** Die bestehende Funktion transformiert Arrays mit einem Muster wie `stats[0].value -> stat0Value`. Fuer die Case Study Kapitel mit verschachtelten Bildern muss die Content-JSON-Struktur so designed werden, dass `flattenContent()` entweder direkt funktioniert oder die Funktion erweitert wird. Empfehlung: Flat Keys in `casestudy-de/en.json` verwenden (kein verschachteltes Array), damit `flattenContent()` nicht geaendert werden muss. Die 8 Kapitel und max 2 Bilder pro Kapitel sind ueberschaubar.

**Akzeptanzkriterien:**
- `node app/scripts/build-html.js` generiert `case-study/index.html` und `case-study/en/index.html`
- Alle Platzhalter ersetzt, keine `{{...}}` im Output
- Responsive auf Mobile (< 48rem) und Desktop
- Alle 13 Bilder laden korrekt
- Theme Toggle und Language Switch funktionieren
- hreflang korrekt gesetzt
- Kein JavaScript ausser `landing.js`

---

### WP-CS-04: SEO fuer statische Seite

**Agent:** `marketing-seo-specialist`
**Abhaengigkeiten:** WP-CS-03
**Groesse:** S
**Geschaetzter Aufwand:** 15-20 Min

**Scope:**
1. Meta-Tags in beiden Templates pruefen/ergaenzen
2. JSON-LD Article Schema hinzufuegen
3. Open Graph Tags (og:title, og:description, og:image, og:type=article)
4. Twitter Card Tags
5. Canonical URLs
6. Content-JSONs um SEO-Felder ergaenzen falls noetig

**JSON-LD Schema** (in Template):
```json
{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{{L.pageTitle}}",
    "author": { "@type": "Person", "name": "{{NAME}}" },
    "datePublished": "2026-03-26",
    "image": "https://{{DOMAIN}}/assets/case-study/11-timeline.webp",
    "publisher": { "@type": "Person", "name": "{{NAME}}" }
}
```

**OG Image:** `assets/case-study/11-timeline.webp` (Zeittabelle — staerkstes Visual fuer Social Sharing)

**Akzeptanzkriterien:**
- Strukturierte Daten valide (schema.org Validator)
- OG/Twitter Tags vollstaendig
- Canonical URLs korrekt
- hreflang konsistent mit Landing Page

---

### WP-CS-05: SAPUI5 CaseStudy View + Controller + Fragment

**Agent:** `sap-frontend-developer`
**Abhaengigkeiten:** WP-CS-02
**Groesse:** L
**Geschaetzter Aufwand:** 40-50 Min

**Scope:**
1. `app/webapp/view/CaseStudy.view.xml` — Neue View
2. `app/webapp/controller/CaseStudy.controller.js` — Neuer Controller
3. `app/webapp/view/fragment/CaseStudyChapter.fragment.xml` — Kapitel-Fragment

**CaseStudy.view.xml:**
- `sap.uxap.ObjectPageLayout` (konsistent mit Overview)
- Header: Titel + Untertitel via `casestudy>` Model Binding + `formatLocalized`
- Stats als `sap.m.HBox` mit `sap.m.ObjectNumber` oder `sap.m.NumericContent`
- Pro Kapitel: `ObjectPageSection` gebunden an `casestudy>/chapters`
- Da ObjectPageSections nicht per Aggregation Binding erzeugt werden koennen: entweder 8 statische Sections mit Index-Binding (`casestudy>/chapters/0/title`) oder ein alternatives Layout
- Empfehlung: 8 statische Sections (Kapitelzahl ist fix, kein dynamisches Rendering noetig)
- Bilder: `sap.m.Image` mit `press` Event fuer LightBox
- NavBack-Button im Header

**CaseStudy.controller.js** (max 150 Zeilen):
- Extends `BaseController`
- `onInit`: Route matched Handler registrieren
- `onNavBack`: Zurueck zur Overview
- `onImagePress`: LightBox oeffnen (Fragment oder programmatisch — LightBox ist ein Sonderfall wo programmatische Erzeugung akzeptabel ist, da es ein Overlay ist)
- `formatLocalized` via `core:require` im View einbinden (bestehendes Pattern)

**CaseStudyChapter.fragment.xml:**
- VBox mit Kapiteltext (`FormattedText` mit `formatLocalized`)
- FlexBox/HBox fuer Bilder (1-2 pro Kapitel)
- `sap.m.Image` mit `densityAware="false"`, `width="100%"`
- `sap.m.Label` fuer Caption unter jedem Bild

**Wichtig — ObjectPageSection Limitation:**
`ObjectPageSection` unterstuetzt kein Aggregation Binding. Die 8 Kapitel muessen als 8 statische Sections im View definiert werden. Das ist akzeptabel weil:
- Kapitelzahl ist fix (8)
- View bleibt unter 200 Zeilen (8 Sections x ~15 Zeilen + Header = ~140 Zeilen)
- Alternative waere ein `ScrollContainer` mit `items` Binding, aber das verliert die ObjectPage-Tab-Navigation

**Akzeptanzkriterien:**
- View unter 200 Zeilen, Controller unter 150 Zeilen
- Alle Texte via Data Binding + `formatLocalized` (keine Hardcoded Strings)
- Bilder laden und LightBox funktioniert
- ObjectPage Tab-Navigation zeigt Kapitel-Titel
- UI5 Linter: 0 Errors, 0 Warnings
- Keine `sap.ui.getCore()`, keine globalen `sap.*`

---

### WP-CS-06: manifest.json Route + Model

**Agent:** `sap-modern-fullstack-developer`
**Abhaengigkeiten:** WP-CS-05
**Groesse:** S
**Geschaetzter Aufwand:** 10-15 Min

**Scope:**
1. Neues Model `casestudy` in `sap.ui5.models`
2. Neue Route `caseStudy` mit Pattern `case-study`
3. Neues Target `caseStudy`

**Aenderungen an `app/webapp/manifest.json`:**

Models (nach `config`):
```json
"casestudy": {
    "type": "sap.ui.model.json.JSONModel",
    "uri": "model/casestudy.json"
}
```

Routes (nach `projectDetail`):
```json
{
    "name": "caseStudy",
    "pattern": "case-study",
    "target": "caseStudy"
}
```

Targets (nach `projectDetail`):
```json
"caseStudy": {
    "name": "CaseStudy",
    "level": 2
}
```

**Hinweis:** `level: 2` (nicht 1) weil die Case Study eine Detail-Seite ist, nicht die Hauptseite. Konsistent mit `projectDetail`.

**Akzeptanzkriterien:**
- `#/case-study` navigiert zur CaseStudy View
- Zurueck-Navigation funktioniert (Browser Back + NavBack Button)
- `casestudy` Model ist in der View verfuegbar
- `run_manifest_validation` ohne Fehler

---

### WP-CS-07: Overview F7 Teaser-Umbau

**Agent:** `sap-frontend-developer`
**Abhaengigkeiten:** WP-CS-06
**Groesse:** S
**Geschaetzter Aufwand:** 15-20 Min

**Scope:**
Umbau der "Built with Claude Code" Section in `app/webapp/view/Overview.view.xml` (Zeile 80-103).

**Aenderungen:**
1. **Hero-Zahlen hinzufuegen** (vor den Panels):
   - 4 `sap.m.NumericContent` in `sap.m.GenericTile` oder alternativ `sap.m.ObjectNumber` in einer HBox
   - Werte: 2.5h | 21 | 10 | 11k (aus i18n, nicht hardcoded)
2. **Bestehende 4 Panels bleiben** (Zeile 86-97 unveraendert)
3. **CTA-Button hinzufuegen** (nach dem GitHub-Link):
   - `sap.m.Button` type="Emphasized"
   - Text: `{i18n>builtWith.caseStudyLink}`
   - Press-Event: `.onNavigateToCaseStudy`
4. Optional: Teaser-Bild (Timeline Screenshot)

**Controller-Aenderung** (`Overview.controller.js`):
- Neuer Event-Handler `onNavigateToCaseStudy`: `this.navTo("caseStudy")`

**Akzeptanzkriterien:**
- Hero-Zahlen sichtbar oberhalb der Panels
- CTA-Button navigiert zu `#/case-study`
- Bestehende Panels funktionieren weiterhin
- View bleibt unter 200 Zeilen
- UI5 Linter: 0 Errors, 0 Warnings

---

### WP-CS-08: i18n Texte DE + EN

**Agent:** `sap-cv-profile-optimizer-dach`
**Abhaengigkeiten:** WP-CS-07
**Groesse:** S
**Geschaetzter Aufwand:** 10-15 Min

**Scope:**
Neue i18n Keys in allen 3 Locale-Dateien gleichzeitig:
- `app/webapp/i18n/i18n.properties` (Default = DE)
- `app/webapp/i18n/i18n_de.properties`
- `app/webapp/i18n/i18n_en.properties`

**Neue Keys:**

```properties
# Case Study Page
casestudy.pageTitle=So wurde diese Website gebaut
casestudy.subtitle=AI-assisted Development mit Claude Code
casestudy.backToOverview=Zur\u00fcck zur \u00dcbersicht
casestudy.imageZoom=Bild vergr\u00f6\u00dfern

# Built With Teaser (F7 Umbau)
builtWith.caseStudyLink=Vollst\u00e4ndige Build-Dokumentation ansehen
builtWith.statsImplementation=Implementierung
builtWith.statsWorkpackages=Workpackages
builtWith.statsAgents=AI-Agenten
builtWith.statsLines=Zeilen Code
builtWith.statsImplementationValue=2,5h
builtWith.statsWorkpackagesValue=21
builtWith.statsAgentsValue=10
builtWith.statsLinesValue=11.000
```

**Hinweis:** Zahlenwerte wie "2,5h" als i18n Keys, da DE Komma und EN Punkt verwendet ("2.5h"). Nicht hardcoden.

**Akzeptanzkriterien:**
- Alle 3 Locale-Dateien haben identische Key-Sets
- DE und EN Texte sind sinnvoll (nicht nur uebersetzt, sondern lokalisiert)
- Keine verwaisten Keys
- i18n-Dateien syntaktisch korrekt

---

### WP-CS-09: Code Review + Accessibility Audit

**Agent:** `engineering-senior-developer` + `testing-accessibility-auditor`
**Abhaengigkeiten:** WP-CS-08
**Groesse:** M
**Geschaetzter Aufwand:** 20-30 Min

**Scope:**

**Code Review** (`engineering-senior-developer`):
- Alle neuen/geaenderten Dateien pruefen
- MVC-Regeln einhalten (CLAUDE.md)
- Keine AI-Slop-Patterns
- Controller unter 150 Zeilen, Views unter 200 Zeilen
- Keine unused Dependencies
- `run_ui5_linter`: 0 Errors, 0 Warnings
- `run_manifest_validation`: keine Fehler
- JSON-Dateien valide
- Template-Platzhalter vollstaendig ersetzt

**Accessibility Audit** (`testing-accessibility-auditor`):
- WCAG 2.1 AA Compliance
- Alle Bilder haben Alt-Texte
- Farbkontraste (auch Dark Mode der statischen Seite)
- Keyboard-Navigation in SAPUI5 View (Tab durch Sections, Enter auf Bilder)
- Skip-Link auf statischer Seite
- `aria-label` auf Sections
- LightBox erreichbar per Keyboard
- Sprachattribute (`lang="de"`, `lang="en"`) korrekt

**Akzeptanzkriterien:**
- Alle Findings dokumentiert und behoben
- UI5 Linter: 0 Errors, 0 Warnings
- WCAG 2.1 AA compliant
- Kein Finding mit Severity "High" offen

---

### WP-CS-10: E2E Test Case Study Seiten

**Agent:** `testing-reality-checker`
**Abhaengigkeiten:** WP-CS-09
**Groesse:** S
**Geschaetzter Aufwand:** 15-20 Min

**Scope:**
Manuelle E2E-Testausfuehrung (kein Test-Framework, konsistent mit Phase 1):

**Statische Seite:**
1. `/case-study/` laedt ohne Fehler (DE)
2. `/case-study/en/` laedt ohne Fehler (EN)
3. Alle 13 Bilder laden (Network Tab pruefen)
4. Lazy Loading aktiv (Bilder laden erst beim Scrollen)
5. Language Switch funktioniert (DE <-> EN)
6. Theme Toggle funktioniert (Light <-> Dark)
7. Responsive: Mobile-Ansicht (< 48rem) korrekt
8. Alle Links funktionieren (Landing Page, SAPUI5 App, Footer)
9. hreflang korrekt in Page Source

**SAPUI5 App:**
10. `#/case-study` laedt CaseStudy View
11. ObjectPage Tab-Navigation zeigt 8 Kapitel
12. Bilder laden und LightBox oeffnet bei Klick
13. NavBack fuehrt zur Overview
14. Browser Back funktioniert
15. Sprachwechsel (`?sap-language=en`) zeigt EN Texte
16. Overview F7: Hero-Zahlen sichtbar
17. Overview F7: CTA-Button navigiert zu `#/case-study`

**Akzeptanzkriterien:**
- Alle 17 Tests bestanden
- Keine Console-Errors
- Keine 404s im Network Tab
- Ergebnis dokumentiert im Commit

---

## Ausfuehrungswellen

```
Welle 0 [ERLEDIGT]
  WP-CS-01  Screenshot-Aufbereitung (manuell)

Welle 1 [sequenziell]
  WP-CS-02  Content-Daten erstellen
            Grund: WP-CS-03 und WP-CS-05 brauchen beide die JSON-Daten

Welle 2 [parallel]
  WP-CS-03  Statische Seite (DE + EN)        ──┐ beide abhaengig von WP-CS-02
  WP-CS-05  SAPUI5 View + Controller         ──┘ aber unabhaengig voneinander

Welle 3 [parallel]
  WP-CS-04  SEO (abhaengig von WP-CS-03)     ──┐ unabhaengig voneinander
  WP-CS-06  manifest.json Route (abh. CS-05) ──┘

Welle 4 [sequenziell]
  WP-CS-07  Overview F7 Teaser-Umbau (abhaengig von WP-CS-06)
  WP-CS-08  i18n Texte (abhaengig von WP-CS-07, da Keys bekannt sein muessen)

Welle 5 [sequenziell]
  WP-CS-09  Code Review + Accessibility Audit (alles muss fertig sein)

Welle 6 [sequenziell]
  WP-CS-10  E2E Test (nach Review-Fixes)
```

## Abhaengigkeitsgraph

```
CS-01 (erledigt)
  |
  v
CS-02 (Content-Daten)
  |         \
  v          v
CS-03        CS-05
(Statisch)   (SAPUI5 View)
  |            |
  v            v
CS-04        CS-06
(SEO)        (Routing)
  |            |
  |            v
  |          CS-07
  |          (Teaser)
  |            |
  |            v
  |          CS-08
  |          (i18n)
  |          /
  v        v
  CS-09 (Review + A11y)
     |
     v
  CS-10 (E2E Test)
```

## Risiken und Offene Punkte

### Risiken

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| `flattenContent()` reicht nicht fuer Kapitel-Arrays mit Bildern | Mittel | Blockiert CS-03 | Content-JSONs flach halten, keine verschachtelten Arrays. Alternativ `flattenContent()` erweitern. |
| CaseStudy View ueberschreitet 200-Zeilen-Limit bei 8 statischen Sections | Mittel | Refactor noetig | Kapitel-Inhalt in Fragment auslagern, Section-Struktur minimal halten |
| LightBox programmatisch erzeugen vs. XML Fragment | Niedrig | Code-Style-Frage | LightBox ist Overlay — programmatische Erzeugung ist akzeptabler Sonderfall |
| Bildpfade unterschiedlich zwischen statischer Seite und SAPUI5 App | Mittel | Bilder 404 | Statisch: relative Pfade (`../assets/case-study/...`), SAPUI5: vom App-Root (`assets/case-study/...`). In WP-CS-02 beide Varianten dokumentieren. |

### Offene Punkte

1. **Landing Page Link:** Sollen die bestehenden Landing Pages (`de/index.html`, `en/index.html`) einen Link zur Case Study im Footer bekommen? PRD-4 erwaehnt das als optional. Empfehlung: Ja, als separates Mini-WP oder in WP-CS-03 integrieren.

2. **OG Image:** PRD-4 schlaegt `11-timeline.webp` vor. Pruefen ob das Format (1200px WebP) fuer Social Sharing optimal ist oder ob ein separates OG-Bild (1200x630px) erstellt werden sollte.

3. **Content-Texte:** WP-CS-02 erstellt die Texte, aber der User muss sie inhaltlich pruefen. Soll ein expliziter Review-Schritt eingeplant werden?

## Zusammenfassung

| Metrik | Wert |
|--------|------|
| Workpackages gesamt | 10 (1 erledigt, 9 offen) |
| Neue Dateien | 8 |
| Geaenderte Dateien | 4 |
| Ausfuehrungswellen | 6 (Welle 0 erledigt) |
| Beteiligte Agenten | 6 |
| Geschaetzter Gesamtaufwand | 2.5-3.5 Stunden |
| Kritischer Pfad | CS-02 -> CS-05 -> CS-06 -> CS-07 -> CS-08 -> CS-09 -> CS-10 |
