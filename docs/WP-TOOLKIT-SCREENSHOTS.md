# WP-TOOLKIT-SCREENSHOTS: Screenshots in Toolkit-Section einbinden

## Kontext
Die Toolkit-Section zeigt 4 Tools in einem IconTabBar. Aktuell nur Beschreibungstext pro Tab. Screenshots der Apps liegen jetzt in `assets/toolkit/` als WebP-Dateien bereit.

## Verfügbare Screenshots

| Tool-ID | Datei | Vorhanden |
|---------|-------|-----------|
| field-change | `assets/toolkit/field-change.webp` | ✅ |
| code-review | `assets/toolkit/review-assistant.webp` | ✅ |
| rap-generator | `assets/toolkit/skeleton-generator.webp` | ✅ |
| ticket-analysis | — | ❌ (wird nachgeliefert) |

## Änderung: ToolkitTab.fragment.xml

**Datei:** `app/webapp/view/fragment/ToolkitTab.fragment.xml`

In jedem `IconTabFilter` ein `Image` vor dem `Text` einfügen. Für ticket-analysis noch keins (kommt später).

**Aktuell (Beispiel field-change, Zeile 33-37):**
```xml
<IconTabFilter text="{i18n>toolkit.fieldChange.title}" key="field-change">
    <VBox class="sapUiSmallMargin">
        <Text text="{i18n>toolkit.fieldChange.description}" />
    </VBox>
</IconTabFilter>
```

**Neu:**
```xml
<IconTabFilter text="{i18n>toolkit.fieldChange.title}" key="field-change">
    <VBox class="sapUiSmallMargin">
        <Image src="assets/toolkit/field-change.webp" alt="{i18n>toolkit.fieldChange.title}" width="100%" class="sapUiSmallMarginBottom" />
        <Text text="{i18n>toolkit.fieldChange.description}" />
    </VBox>
</IconTabFilter>
```

**Alle 3 Tabs analog:**
- field-change: `src="assets/toolkit/field-change.webp"`
- code-review: `src="assets/toolkit/review-assistant.webp"`
- rap-generator: `src="assets/toolkit/skeleton-generator.webp"`
- ticket-analysis: KEIN Bild (noch nicht vorhanden)

## Keine weiteren Änderungen nötig
- KEIN Controller-Code
- KEIN neues Model
- KEINE neuen i18n-Keys (alt-Text nutzt bestehende Titel-Keys)
- UI5 Linter: 0 errors, 0 warnings nach Änderung
- PNGs können nach Verifizierung aus `assets/toolkit/` gelöscht werden (nur .webp behalten)
