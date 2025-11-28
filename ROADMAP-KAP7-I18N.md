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

### **Schritt 1: Pakete installieren**
```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

### **Schritt 2: i18n-Konfiguration erstellen**

📁 **Neue Datei erstellen:** `src/i18n/config.ts`

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    de: {
        translation: {
            // App Header
            "fear_greed_dashboard": "Fear & Greed Dashboard",
            "switch_light": "⚪ Switch Light",
            "switch_dark": "⚫ Switch Dark",
            "undo": "↶ Undo",
            "redo": "↷ Redo",
            "gauge_svg": "Gauge: SVG",
            "gauge_radial": "Gauge: Radial",
            "all_categories": "ALLE",
            "search_placeholder": "Suchen…",
            
            // Categories
            "category_aktien": "Aktien",
            "category_indizes": "Indizes",
            "category_crypto": "Crypto",
            "category_rohstoffe": "Rohstoffe",
            "category_custom": "Custom",
            
            "7_days": "7 Tage",
            "30_days": "30 Tage",
            "90_days": "90 Tage (Dummy)",
            "recompute": "Neu berechnen",
            "export_csv": "Export CSV",
            "delete_all": "Alle löschen",
            "delete_all_confirm": "Alle Einträge wirklich entfernen?",
            
            // AddIndexDialog
            "new_index": "Neuer Index",
            "add_new_index": "+ Neuer Index",
            "name": "Name",
            "name_placeholder": "z. B. Tesla",
            "category": "Kategorie",
            "tags": "Tags",
            "tags_label": "Tags (Komma-getrennt)",
            "tags_placeholder": "Krypto, Momentum",
            "add": "Hinzufügen",
            "cancel": "Abbrechen",
            
            // IndexCard
            "remove": "Entfernen",
            "show_less": "weniger anzeigen",
        }
    },
    en: {
        translation: {
            // App Header
            "fear_greed_dashboard": "Fear & Greed Dashboard",
            "switch_light": "⚪ Switch Light",
            "switch_dark": "⚫ Switch Dark",
            "undo": "↶ Undo",
            "redo": "↷ Redo",
            "gauge_svg": "Gauge: SVG",
            "gauge_radial": "Gauge: Radial",
            "all_categories": "ALL",
            "search_placeholder": "Search…",
            
            // Categories
            "category_aktien": "Stocks",
            "category_indizes": "Indices",
            "category_crypto": "Crypto",
            "category_rohstoffe": "Commodities",
            "category_custom": "Custom",
            
            "7_days": "7 Days",
            "30_days": "30 Days",
            "90_days": "90 Days (Dummy)",
            "recompute": "Recompute",
            "export_csv": "Export CSV",
            "delete_all": "Delete All",
            "delete_all_confirm": "Really remove all entries?",
            
            // AddIndexDialog
            "new_index": "New Index",
            "add_new_index": "+ New Index",
            "name": "Name",
            "name_placeholder": "e.g. Tesla",
            "category": "Category",
            "tags": "Tags",
            "tags_label": "Tags (comma-separated)",
            "tags_placeholder": "Crypto, Momentum",
            "add": "Add",
            "cancel": "Cancel",
            
            // IndexCard
            "remove": "Remove",
            "show_less": "show less",
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "de",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        },
        debug: true
    });

export default i18n;
```

**Hinweis:** Dies ist ein gekürztes Beispiel. Die komplette config.ts hat über 80 Translation Keys.

### **Schritt 3: In App einbinden**

📁 **Datei:** `src/main.tsx`  
📍 **Zeile 1-5** (ganz oben, vor anderen Imports)

**Hinzufügen:**
```typescript
import './i18n/config';
```

**Vollständiger Kontext:**
```typescript
import './i18n/config';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
```

### **Schritt 4: useTranslation Hook nutzen**

📁 **Datei:** `src/App.tsx`  
📍 **Zeile 11** (bei den Imports)

**Hinzufügen:**
```typescript
import { useTranslation } from "react-i18next";
```

📍 **Zeile 14** (erste Zeile in der Komponente)

**Hinzufügen:**
```typescript
const { t } = useTranslation();
```

**Vollständiger Kontext:**
```typescript
export default function App() {
  const { t } = useTranslation();
  const { items, addIndex, removeIndex, recompute, undo, redo } = useIndices();
  const [query, setQuery] = useState("");
```

### **Schritt 5: Texte übersetzen**

📁 **Datei:** `src/App.tsx`  
📍 **Zeile ~45** (Dashboard-Titel)

**Vorher:**
```tsx
<h1 className="text-2xl font-bold">Fear & Greed Dashboard</h1>
```

**Nachher:**
```tsx
<h1 className="text-2xl font-bold">{t("fear_greed_dashboard")}</h1>
```

📍 **Zeile ~50** (Theme-Button)

**Vorher:**
```tsx
{theme === "dark" ? "⚪ Switch Light" : "⚫ Switch Dark"}
```

**Nachher:**
```tsx
{theme === "dark" ? t("switch_light") : t("switch_dark")}
```

📍 **Zeile ~85** (Kategorie-Select)

**Vorher:**
```tsx
<option value="ALL">ALLE</option>
```

**Nachher:**
```tsx
<option value="ALL">{t("all_categories")}</option>
```

**Hinweis:** Alle weiteren Komponenten (AddIndexDialog, IndexCard, etc.) werden nach dem gleichen Muster übersetzt.

---

## **Kapitel 7.2: Platzhalter verwenden (Interpolation)** ✅ **ABGESCHLOSSEN**

### **Schritt 1: Translation Keys hinzufügen**

📁 **Datei:** `src/i18n/config.ts`  
📍 **Wo:** Im `de: { translation: {` Block, nach den bestehenden Keys

**Einfügen:**
```typescript
"indices_loaded": "{{count}} Indizes geladen",
"indices_filtered": "{{filtered}} von {{total}} Indizes",
"last_updated": "Zuletzt aktualisiert: {{date}}",
"export_success": "{{count}} Indizes exportiert",
"delete_success": "{{count}} Indizes gelöscht",
```

📍 **Wo:** Im `en: { translation: {` Block, nach den bestehenden Keys

**Einfügen:**
```typescript
"indices_loaded": "{{count}} indices loaded",
"indices_filtered": "{{filtered}} of {{total}} indices",
"last_updated": "Last updated: {{date}}",
"export_success": "{{count}} indices exported",
"delete_success": "{{count}} indices deleted",
```

---

### **Schritt 2: i18n zum useTranslation Hook hinzufügen**

📁 **Datei:** `src/App.tsx`  
📍 **Wo:** Zeile 14 (Anfang der Komponente)

**Suche:**
```tsx
const { t } = useTranslation();
```

**Ersetze durch:**
```tsx
const { t, i18n } = useTranslation();
```

---

### **Schritt 3: lastUpdate State hinzufügen**

📁 **Datei:** `src/App.tsx`  
📍 **Wo:** Zeile 20 (nach den anderen useState)

**Suche:**
```tsx
const { theme, setTheme } = useTheme();

const filtered = useMemo(() => {
```

**Einfügen zwischen diesen Zeilen:**
```tsx
const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
```

---

### **Schritt 4: Indizes-Anzahl im Header anzeigen**

📁 **Datei:** `src/App.tsx`  
📍 **Wo:** Zeile 46 (direkt nach `<h1>`)

**Suche:**
```tsx
<h1 className="text-2xl font-bold">{t("fear_greed_dashboard")}</h1>
<button
```

**Einfügen zwischen diesen Zeilen:**
```tsx
<span className="text-sm text-zinc-600 dark:text-zinc-400">
  {category === "ALL" 
    ? t("indices_loaded", { count: items.length })
    : t("indices_filtered", { filtered: filtered.length, total: items.length })
  }
</span>
```

---

### **Schritt 5: Letzte Aktualisierung anzeigen**

📁 **Datei:** `src/App.tsx`  
📍 **Wo:** Zeile 135 (zwischen `</header>` und `<main>`)

**Suche:**
```tsx
    </header>

    <main className="grid md:grid-cols-2 gap-4">
```

**Einfügen zwischen diesen Zeilen:**
```tsx
<div className="text-sm text-zinc-500 dark:text-zinc-400">
  {t("last_updated", { 
    date: lastUpdate.toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  })}
</div>
```

---

### **Schritt 6: setLastUpdate bei recompute hinzufügen**

📁 **Datei:** `src/App.tsx`  
📍 **Wo:** Zeile 107 (recompute Button)

**Suche:**
```tsx
<button
  onClick={() => recompute(undefined)}
  className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
>
```

**Ersetze durch:**
```tsx
<button
  onClick={() => {
    recompute(undefined);
    setLastUpdate(new Date());
  }}
  className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
>
```

---

### **Schritt 7: Export-Bestätigung hinzufügen**

📁 **Datei:** `src/App.tsx`  
📍 **Wo:** Zeile 122 (Export Button)

**Suche:**
```tsx
<button
  onClick={() => exportAllAsCSV(items)}
  className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
>
```

**Ersetze durch:**
```tsx
<button
  onClick={() => {
    exportAllAsCSV(items);
    alert(t("export_success", { count: items.length }));
  }}
  className="px-3 py-2 rounded-xl bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
>
```

---

### **Schritt 8: Delete-Bestätigung hinzufügen**

📁 **Datei:** `src/App.tsx`  
📍 **Wo:** Zeile 32 (handelRemoveAll Funktion)

**Suche:**
```tsx
const handelRemoveAll = () => {
  if (window.confirm(t("delete_all_confirm"))) {
    items.forEach(i => removeIndex(i.id));
  }
}
```

**Ersetze durch:**
```tsx
const handelRemoveAll = () => {
  const count = items.length;
  if (window.confirm(t("delete_all_confirm"))) {
    items.forEach(i => removeIndex(i.id));
    alert(t("delete_success", { count }));
    setLastUpdate(new Date());
  }
}
```

---

### **Test:**
- Sprachwechsel (DE/EN) → alle Zahlen/Daten ändern sich
- Filter setzen → Header zeigt "X von Y Indizes"
- Export klicken → Alert mit Anzahl
- Alle löschen → Alert mit Anzahl

---

## **Kapitel 7.3: Werte formatieren**

### **Schritt 1: i18n in IndexChart importieren**

📁 **Datei:** `src/components/IndexChart.tsx`  
📍 **Wo:** Import-Bereich

**Einfügen:**
```tsx
import { useTranslation } from "react-i18next";
```

---

### **Schritt 2: Custom Tooltip mit Datums-Formatierung**

📁 **Datei:** `src/components/IndexChart.tsx`  
📍 **Wo:** In der Komponente

**Hinzufügen:**
```tsx
export default function IndexChart({ data, height = 220 }: Props) {
  const { i18n } = useTranslation();

  const formatDate = React.useCallback((dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, [i18n.language]);

  const CustomTooltip = React.useCallback(({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload as IndexPoint;
      return (
        <div style={{
          background: "#18181b",
          border: "1px solid #27272a",
          padding: "8px 12px",
          borderRadius: "6px",
          color: "#fafafa"
        }}>
          <div style={{ fontSize: "12px", marginBottom: "4px" }}>
            {formatDate(point.date)}
          </div>
          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
            {point.value}
          </div>
        </div>
      );
    }
    return null;
  }, [formatDate]);
```

---

### **Schritt 3: dataKey korrigieren**

📁 **Datei:** `src/components/IndexChart.tsx`  
📍 **Wo:** In LineChart

**Vorher:**
```tsx
<XAxis dataKey="t" hide tick={{ fontSize: 12 }} />
<Line type="monotone" dataKey="v" dot={false} strokeWidth={2} />
```

**Nachher:**
```tsx
<XAxis dataKey="date" hide tick={{ fontSize: 12 }} />
<Tooltip content={<CustomTooltip />} />
<Line type="monotone" dataKey="value" dot={false} strokeWidth={2} />
```

---

### **Test:**
- Hover über Chart-Punkt
- Sprachwechsel DE → EN
- DE: "5. Nov. 2025", EN: "Nov 5, 2025"

---

## **Kapitel 7.4: Singular und Plural**

### **Schritt 1: Plural Translation Keys hinzufügen**

📁 **Datei:** `src/i18n/config.ts`  
📍 **Wo:** Im `de: { translation: {` Block

**Einfügen:**
```typescript
"indices_found_zero": "Keine Indizes gefunden",
"indices_found_one": "{{count}} Index gefunden",
"indices_found_other": "{{count}} Indizes gefunden",
```

📍 **Wo:** Im `en: { translation: {` Block

**Einfügen:**
```typescript
"indices_found_zero": "No indices found",
"indices_found_one": "{{count}} index found",
"indices_found_other": "{{count}} indices found",
```

---

### **Schritt 2: indices_loaded zu indices_found ersetzen**

📁 **Datei:** `src/App.tsx`  
📍 **Wo:** Zeile ~52 (Header-Bereich)

**Suche:**
```tsx
{category === "ALL" 
  ? t("indices_loaded", { count: items.length })
  : t("indices_filtered", { filtered: filtered.length, total: items.length })
}
```

**Ersetze durch:**
```tsx
{category === "ALL" 
  ? t("indices_found", { count: items.length })
  : t("indices_filtered", { filtered: filtered.length, total: items.length })
}
```

---

### **Schritt 3: Plural-Anzeige implementieren**

📁 **Datei:** `src/App.tsx`  
📍 **Wo:** Zeile ~157 (direkt nach `<main className="grid md:grid-cols-2 gap-4">`)

**Suche:**
```tsx
<main className="grid md:grid-cols-2 gap-4">
  {filtered.map((i) => (
```

**Einfügen zwischen diesen Zeilen:**
```tsx
<div className="col-span-full text-sm text-zinc-500 dark:text-zinc-400">
  {t("indices_found", { count: filtered.length })}
</div>
```

---

### **Test:**
- Bei 0 Indizes: "Keine Indizes gefunden"
- Bei 1 Index: "1 Index gefunden"
- Bei 5 Indizes: "5 Indizes gefunden"
- Sprachwechsel: Englische Pluralformen

---

## **Checkliste Kapitel 7**

- [x] 7.1: i18next installiert, 80+ Keys, LanguageSwitcher
- [x] 7.2: Interpolation (count, date, filtered/total)
- [x] 7.3: Datum-Formatierung in Chart-Tooltip (toLocaleDateString)
- [x] 7.4: Pluralisierung (indices_found mit _zero/_one/_other)
