# WP-CS-VISIBILITY: Case Study prominenter verlinken

## Status
- ✅ Zahlenkorrektur in `casestudy.json` (63min, 9, 30)
- ✅ Zahlenkorrektur in `content/casestudy-de.json` (metaDescription + ogDescription)
- ✅ Zahlenkorrektur in `content/casestudy-en.json` (metaDescription + ogDescription)
- ✅ Zahlenkorrektur in `Overview.view.xml` builtWith-Section (63min, 9)
- ✅ PRD-Link in Chapter 2 "Ausgangslage" (casestudy-de.json, casestudy-en.json, casestudy.json)
- ✅ Änderung 1: Ghost-Button im Header
- ✅ Änderung 2: Neue Section "Case Study Teaser"
- ✅ Änderung 3: CaseStudy.view.xml — Chapter 2 Text→FormattedText (PRD-Link klickbar machen)
- ✅ Änderung 4: HTML Case Study Pages neu generieren
- ⬜ UI5 Linter: 0 errors, 0 warnings (noch zu prüfen)

## Verbindliche Zahlen (aus SESSION-LOG-2026-03-25.md)

| Stat | Wert | Quelle |
|------|------|--------|
| Implementierung | 63 min | Welle 1-6 + E2E: 20:30-21:33 |
| Dateien | 30 | Haupt-Commit 308b54a |
| Agenten | 9 | Session-Log Agenten-Tabelle |
| Zeilen Code | 11k (10.834) | Commit |
| Workpackages | 21 | WORKPACKAGES.md |

---

## Änderung 1: Ghost-Button im Header

**Datei:** `app/webapp/view/Overview.view.xml`

Im `<uxap:ObjectPageDynamicHeaderTitle>` → `<uxap:actions>` einen zweiten Button **vor** dem bestehenden Calendly-Button ergänzen.

**Aktueller Zustand (Zeile 24-26):**
```xml
<uxap:actions>
    <Button text="{i18n>hero.cta}" type="Emphasized" press=".onOpenCalendly" />
</uxap:actions>
```

**Neuer Zustand:**
```xml
<uxap:actions>
    <Button text="{i18n>builtWith.caseStudyButton}" type="Ghost" icon="sap-icon://document-text" press=".onNavToCaseStudy" />
    <Button text="{i18n>hero.cta}" type="Emphasized" press=".onOpenCalendly" />
</uxap:actions>
```

- `type="Ghost"` — visuell untergeordnet gegenüber dem Emphasized Calendly-Button
- Icon `document-text` signalisiert Dokumentation/Case Study
- Controller hat `onNavToCaseStudy` bereits (Zeile 86-88) — KEIN Controller-Code nötig
- API-konform: `actions` Aggregation ist `0..n` (verifiziert gegen sap.f.DynamicPageTitle)

**i18n ergänzen (in ALLEN 3 Dateien):**
- `i18n.properties` + `i18n_de.properties`: `builtWith.caseStudyButton=Case Study: So wurde diese App gebaut`
- `i18n_en.properties`: `builtWith.caseStudyButton=Case Study: How This App Was Built`

---

## Änderung 2: Neue Section zwischen "Was mich unterscheidet" und "Kernkompetenzen"

**Datei:** `app/webapp/view/Overview.view.xml`

Neue `ObjectPageSection` einfügen **zwischen** `positioningSection` (Zeile 42-54) und `skillsSection` (Zeile 56-62):

```xml
<uxap:ObjectPageSection title="{i18n>caseStudy.sectionTitle}" id="caseStudyTeaser">
    <uxap:subSections>
        <uxap:ObjectPageSubSection>
            <VBox>
                <HBox justifyContent="SpaceAround" wrap="Wrap" class="sapUiSmallMarginBottom">
                    <GenericTile header="{i18n>builtWith.statsImplementation}" frameType="OneByOne">
                        <TileContent>
                            <NumericContent value="63" scale="min" withMargin="false" />
                        </TileContent>
                    </GenericTile>
                    <GenericTile header="{i18n>builtWith.statsWorkpackages}" frameType="OneByOne">
                        <TileContent>
                            <NumericContent value="21" withMargin="false" />
                        </TileContent>
                    </GenericTile>
                    <GenericTile header="{i18n>builtWith.statsAgents}" frameType="OneByOne">
                        <TileContent>
                            <NumericContent value="9" withMargin="false" />
                        </TileContent>
                    </GenericTile>
                    <GenericTile header="{i18n>builtWith.statsLines}" frameType="OneByOne">
                        <TileContent>
                            <NumericContent value="11k" withMargin="false" />
                        </TileContent>
                    </GenericTile>
                </HBox>
                <FormattedText htmlText="{i18n>caseStudy.teaserText}" class="sapUiSmallMarginBottom" />
                <Button text="{i18n>caseStudy.readMore}" type="Emphasized" press=".onNavToCaseStudy" class="sapUiSmallMarginTop" />
            </VBox>
        </uxap:ObjectPageSubSection>
    </uxap:subSections>
</uxap:ObjectPageSection>
```

**i18n ergänzen (in ALLEN 3 Dateien):**

`i18n.properties` + `i18n_de.properties`:
```
caseStudy.sectionTitle=AI-assisted Build: Die Dokumentation
caseStudy.teaserText=Diese App wurde in einer einzigen Abend-Session mit Claude Code gebaut. 21 Workpackages, 9 spezialisierte AI-Agenten, 63 Minuten reine Implementierung. Die vollstaendige Build-Dokumentation zeigt jeden Schritt -- von der Planung bis zum Deployment.
caseStudy.readMore=Vollstaendige Case Study lesen
```

`i18n_en.properties`:
```
caseStudy.sectionTitle=AI-assisted Build: The Documentation
caseStudy.teaserText=This app was built in a single evening session with Claude Code. 21 workpackages, 9 specialized AI agents, 63 minutes of pure implementation. The full build documentation shows every step -- from planning to deployment.
caseStudy.readMore=Read Full Case Study
```

**Hinweis:** Die bestehenden i18n-Keys `builtWith.statsImplementation`, `builtWith.statsWorkpackages`, `builtWith.statsAgents`, `builtWith.statsLines` werden hier wiederverwendet — keine neuen Stats-Keys nötig.

---

## Änderung 3: CaseStudy.view.xml — Text→FormattedText für Chapter 2

**Problem:** `casestudy.json` Chapter 2 ("Ausgangslage") enthält jetzt einen HTML-Link zum PRD auf GitHub. Die CaseStudy View verwendet aber `<Text>`, das HTML nicht rendert.

**Datei:** `app/webapp/view/CaseStudy.view.xml` (Zeile 68)

**Aktuell:**
```xml
<Text text="{path: 'casestudy>/chapters/1/text', formatter: 'formatter.formatLocalized'}" class="sapUiSmallMarginBottom" />
```

**Neu:**
```xml
<FormattedText htmlText="{path: 'casestudy>/chapters/1/text', formatter: 'formatter.formatLocalized'}" class="sapUiSmallMarginBottom" />
```

**Hinweis:** Nur Chapter 2 (Index 1) umstellen — die anderen Chapters enthalten kein HTML und können `Text` bleiben. `FormattedText` rendert `<a>` Tags korrekt mit `target="_blank"`.

**Verifizierung:** In der SAPUI5-App unter `#/case-study` muss im Abschnitt "Ausgangslage" der Text "PRD (v2.1, 997 Zeilen)" als klickbarer Link zu GitHub erscheinen.

---

## Änderung 4: Statische HTML Case Study Pages neu generieren

Die Content-JSONs (`content/casestudy-de.json` und `content/casestudy-en.json`) sind bereits korrigiert. Die generierten HTML-Dateien müssen noch aktualisiert werden:

```bash
node app/scripts/build-html.js
```

**Verifizierung nach Generierung:**
- `case-study/index.html` Zeile ~7: `<meta name="description">` muss "9 AI-Agenten" enthalten (nicht "10")
- `case-study/en/index.html` Zeile ~7: `<meta name="description">` muss "63 minutes" und "9 AI agents" enthalten (nicht "2.5 hours" / "10")
- `case-study/en/index.html` Zeile ~15: `<meta property="og:description">` muss "63 minutes" und "9 AI agents" enthalten
- Chapter 2 Text muss einen `<a href="https://github.com/bansemir/bansemir.net/blob/main/docs/PRD.md">` Link enthalten (in DE und EN)

---

## Zusammenfassung der zu ändernden Dateien

| # | Datei | Änderung |
|---|-------|----------|
| 1 | `app/webapp/view/Overview.view.xml` | Ghost-Button in Header-Actions + neue caseStudyTeaser Section |
| 2 | `app/webapp/i18n/i18n.properties` | 4 neue Keys (builtWith.caseStudyButton, caseStudy.sectionTitle, caseStudy.teaserText, caseStudy.readMore) |
| 3 | `app/webapp/i18n/i18n_de.properties` | 4 neue Keys (identisch zu i18n.properties) |
| 4 | `app/webapp/i18n/i18n_en.properties` | 4 neue Keys (englische Übersetzungen) |
| 5 | `case-study/index.html` | Neu generiert via build-html.js |
| 6 | `case-study/en/index.html` | Neu generiert via build-html.js |

## Regeln
- KEIN neuer Controller-Code nötig (`onNavToCaseStudy` existiert in Zeile 86-88)
- KEINE neuen Models nötig (Stats hardcoded wie in bestehender builtWith-Section)
- i18n-Änderungen in ALLEN 3 Locales gleichzeitig
- UI5 Linter nach Änderung: 0 errors, 0 warnings
- ALLE Zahlen konsistent: 63 min, 21 WPs, 9 Agenten, 11k Zeilen
- View muss unter 200 Zeilen bleiben (aktuell 184, +25 neue Section = ~209 → ggf. builtWith-Section Stats kürzen, da die Teaser-Section dieselben Tiles enthält)

## Achtung: View-Limit 200 Zeilen
Die Overview.view.xml hat aktuell 184 Zeilen. Mit der neuen Section (+25 Zeilen) wären es ~209. Optionen:
1. **Bevorzugt:** Die Stats-Tiles in der builtWith-Section (Zeile 84-105) entfernen, da die neue caseStudyTeaser-Section dieselben Zahlen bereits zeigt. Das spart ~22 Zeilen → Ergebnis ~187 Zeilen.
2. Alternativ: Die Stats-Tiles in ein Fragment auslagern und in beiden Sections referenzieren.

**Empfehlung: Option 1** — builtWith-Section Stats-Tiles entfernen. Die Zahlen werden durch die neue prominentere Teaser-Section abgedeckt. Die builtWith-Section behält Intro-Text, Beispiel-Panels, GitHub-Link und Case-Study-Button.
