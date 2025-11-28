# Roadmap: Kapitel 7 - Internationalisierung (i18n)

In diesem Kapitel lernst du, wie du deine React-App mehrsprachig machst. Internationalisierung (kurz i18n - "i" + 18 Buchstaben + "n") ermöglicht es, Texte in verschiedenen Sprachen anzuzeigen und kulturspezifische Formatierungen (Zahlen, Daten, Währungen) anzuwenden.

Wir nutzen **react-i18next**, die populärste i18n-Lösung für React, die auf dem Framework **i18next** basiert.

---

## **Was ist i18next?**

**i18next** ist ein mächtiges Internationalisierungs-Framework für JavaScript. Es bietet:
- **Übersetzungen in JSON-Dateien** organisiert nach Sprachen
- **Automatische Spracherkennung** aus Browser-Einstellungen
- **Platzhalter/Interpolation** (z.B. "Hallo {{name}}")
- **Pluralisierung** (unterschiedliche Texte für 1 Item vs. mehrere Items)
- **Formatierung** von Zahlen, Währungen und Datumsangaben
- **Namespace-Support** für große Apps (Aufteilung in Module)

**react-i18next** ist der React-spezifische Wrapper mit Hooks (`useTranslation`) und HOCs.

---

## **Kapitel 7.1: Einsatz von react-i18next** ✅ **ABGESCHLOSSEN**

In diesem Schritt richten wir die grundlegende i18n-Infrastruktur ein.

### **Schritt 1: Pakete installieren** ✅
```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

**Erklärung der Pakete:**
- `i18next`: Core-Framework für Internationalisierung
- `react-i18next`: React-Integration mit Hooks
- `i18next-browser-languagedetector`: Erkennt automatisch die Browser-Sprache

### **Schritt 2: i18n-Konfiguration erstellen** ✅

**Datei:** `src/i18n/config.ts`

Die Konfiguration wurde erstellt mit:
- Über 80 Translation Keys (deutsch/englisch)
- Language Detector aktiviert
- Default-Sprache: Deutsch (`lng: "de"`)
- Fallback-Sprache: Englisch (`fallbackLng: "en"`)
- Debug-Modus aktiviert für Entwicklung

**Wichtige Config-Optionen:**
- `resources`: Objekt mit allen Übersetzungen pro Sprache
- `lng`: Standard-Sprache (z.B. "de")
- `fallbackLng`: Fallback, wenn Übersetzung fehlt
- `interpolation.escapeValue`: Bei React immer `false` (XSS-Schutz bereits vorhanden)

### **Schritt 3: Übersetzungsstruktur** ✅

**Implementierung:** Übersetzungen direkt in `config.ts` als JavaScript-Objekt eingebettet.

Die Translation Keys sind nach Bereichen organisiert:
- App Header (Dashboard, Buttons, Controls)
- Dialoge (AddIndexDialog, IndexDialog)
- Komponenten (IndexCard, Navigation, CsvImport)
- MUI-Komponenten (IndexTable, CsvImportDialog)
- Pages (NotFound, IndexDetail)
- **Kategorien** (Aktien → Stocks, Indizes → Indices, etc.)

### **Schritt 4: i18n in die App einbinden** ✅

In `src/main.tsx`:
```tsx
import './i18n/config';
```

Nach dem Import ist i18next global verfügbar.

### **Schritt 5: Texte übersetzen** ✅

**Alle Komponenten wurden übersetzt:**
- ✅ App.tsx - Header, alle Buttons, Selects, Placeholders
- ✅ AddIndexDialog.tsx - vollständig übersetzt
- ✅ IndexCard.tsx - inklusive Kategorien
- ✅ CsvImport.tsx - Status, Modi, Fehlermeldungen
- ✅ Navigation.tsx - Dashboard-Links
- ✅ DashboardToggle.tsx - Switch-Buttons
- ✅ App-MUI.tsx - MUI-Dashboard
- ✅ IndexDialog.tsx - Create/Edit Dialog
- ✅ IndexTable.tsx - Table mit übersetzten Kategorien
- ✅ CsvImportDialog.tsx - Import Dialog
- ✅ NotFound.tsx - 404-Seite
- ✅ IndexDetail.tsx - Detail-Ansicht

**Bonus: LanguageSwitcher-Komponente erstellt:**
```tsx
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();
// Sprachwechsel: i18n.changeLanguage('en')
```

Der LanguageSwitcher ist oben rechts integriert (🇩🇪 DE / 🇬🇧 EN) und ermöglicht Live-Sprachwechsel.

**Test:** Klicke auf den Switcher - alle Texte (inkl. Kategorien) wechseln sofort! ✅

---

## **Kapitel 7.2: Platzhalter verwenden (Interpolation)**

Oft benötigst du dynamische Werte in Übersetzungen, z.B. Benutzernamen oder Zahlen.

### **Konzept: Interpolation**

In der Übersetzung:
```json
{
  "greeting": "Hallo {{name}}, du hast {{count}} neue Nachrichten"
}
```

Im Code:
```tsx
t('greeting', { name: 'Max', count: 5 })
// Output: "Hallo Max, du hast 5 neue Nachrichten"
```

### **Anwendungsfälle:**
- Benutzernamen in Willkommensnachrichten
- Dynamische Zahlen (z.B. Anzahl der Indizes)
- Variablen Datumswerte

### **Aufgabe:**
- Übersetze den "Index hinzufügen"-Dialog
- Nutze Platzhalter für die Anzahl der angezeigten Indizes
- Teste mit verschiedenen Werten

---

## **Kapitel 7.3: Werte formatieren**

Zahlen, Währungen und Daten werden je nach Sprache unterschiedlich dargestellt:
- **Deutsch:** `1.234,56 €`
- **Englisch:** `€1,234.56`

### **i18next Formatting**

i18next bietet eingebautes Formatting über Intl-API:

**In der Übersetzung:**
```json
{
  "price": "Preis: {{value, currency(EUR)}}"
}
```

**Im Code:**
```tsx
t('price', { value: 1234.56 })
// Output DE: "Preis: 1.234,56 €"
// Output EN: "Price: €1,234.56"
```

### **Format-Typen:**
- `number`: Zahlen mit Tausender-Trennzeichen
- `currency(EUR)`: Währung mit Symbol
- `datetime`: Datum/Zeit formatieren

### **Alternative: Intl.NumberFormat direkt nutzen**

Für komplexere Fälle kannst du auch direkt die Browser-API nutzen:
```tsx
const formatter = new Intl.NumberFormat(i18n.language, {
  style: 'currency',
  currency: 'EUR'
});
formatter.format(1234.56);
```

### **Aufgabe:**
- Formatiere FGI-Werte (0-100) mit max. 1 Dezimalstelle
- Formatiere Datumsangaben im Dashboard
- Teste mit DE und EN Locale

---

## **Kapitel 7.4: Singular und Plural**

Texte ändern sich je nach Anzahl:
- **1 Index** vs. **5 Indizes**
- **1 day ago** vs. **3 days ago**

### **i18next Pluralisierung**

i18next unterstützt automatische Plural-Formen.

**In der Übersetzung (Deutsch):**
```json
{
  "index_count_one": "{{count}} Index",
  "index_count_other": "{{count}} Indizes"
}
```

**In der Übersetzung (Englisch):**
```json
{
  "index_count_one": "{{count}} index",
  "index_count_other": "{{count}} indices"
}
```

**Im Code:**
```tsx
t('index_count', { count: 1 })  // "1 Index"
t('index_count', { count: 5 })  // "5 Indizes"
```

**Wichtig:** i18next fügt automatisch `_one`, `_other`, `_zero` etc. hinzu, je nach Sprache.

### **Sprach-spezifische Plural-Regeln**

Verschiedene Sprachen haben unterschiedliche Plural-Formen:
- **Englisch:** 2 Formen (one, other)
- **Deutsch:** 2 Formen (one, other)
- **Polnisch:** 3 Formen (one, few, many)
- **Arabisch:** 6 Formen!

i18next behandelt das automatisch basierend auf der gewählten Sprache.

### **Aufgabe:**
- Übersetze "X Indizes gefunden"
- Übersetze "vor X Tagen aktualisiert"
- Teste mit count: 0, 1, 2, 5
- Prüfe sowohl deutsche als auch englische Ausgabe

---

## **Sprachumschalter erstellen**

Damit Benutzer die Sprache manuell wechseln können:

```tsx
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  return (
    <select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
      <option value="de">Deutsch</option>
      <option value="en">English</option>
    </select>
  );
};
```

**Hinweis:** Die gewählte Sprache wird automatisch im LocalStorage gespeichert (durch Language Detector).

---

## **Best Practices**

1. **Namespaces nutzen:** Für große Apps Übersetzungen nach Features aufteilen
   ```tsx
   t('dashboard:welcome')  // dashboard-Namespace
   t('settings:title')     // settings-Namespace
   ```

2. **Keine hartcodierten Texte:** Alle UI-Texte durch `t()` ersetzen

3. **Sinnvolle Keys:** 
   - ✅ `nav.dashboard`, `form.submit`, `error.network`
   - ❌ `text1`, `label2`, `button3`

4. **Fallback-Texte:** Immer eine Default-Sprache definieren

5. **Kontext beachten:** 
   - "Close" kann "Schließen" (Tür) oder "Beenden" (App) bedeuten
   - Nutze sprechende Keys: `modal.close` vs. `app.exit`

---

## **Checkliste für Kapitel 7**

- [ ] **7.1:** react-i18next installiert und konfiguriert
- [ ] **7.1:** Übersetzungsdateien (de/en) angelegt
- [ ] **7.1:** Erste Komponente übersetzt (z.B. Navigation)
- [ ] **7.1:** Sprachumschalter funktioniert
- [ ] **7.2:** Platzhalter (Interpolation) in Übersetzungen genutzt
- [ ] **7.2:** Dynamische Werte korrekt angezeigt
- [ ] **7.3:** Zahlen formatiert (Tausender-Trennzeichen)
- [ ] **7.3:** Währungen formatiert (€ Symbol)
- [ ] **7.3:** Datumsangaben lokalisiert
- [ ] **7.4:** Pluralisierung für mind. eine Komponente implementiert
- [ ] **7.4:** Plural-Formen in DE und EN getestet

---

## **Zusatz-Ressourcen**

- **Offizielle Docs:** https://react.i18next.com/
- **i18next Playground:** https://www.i18next.com/overview/getting-started
- **Plural-Regeln:** https://www.unicode.org/cldr/charts/43/supplemental/language_plural_rules.html

---

## **Nächste Schritte nach Kapitel 7**

Nach der Internationalisierung kannst du:
- **Testing:** Tests für übersetzte Komponenten schreiben
- **SEO:** Server-Side Rendering mit i18n
- **CI/CD:** Übersetzungen automatisch validieren
- **Externe Services:** Übersetzungen mit Lokalise/Crowdin verwalten
