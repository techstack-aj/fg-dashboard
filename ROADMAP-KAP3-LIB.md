# Roadmap: Kapitel 3 - Eigene React-Bibliotheken erzeugen

In diesem Kapitel lernst du, wie man wiederverwendbare Code-Teile in eine eigene Bibliothek auslagert. Das ist essenziell für große Projekte oder wenn du Komponenten in mehreren Apps nutzen möchtest.

Wir werden eine kleine UI-Library namens `simple-ui-lib` erstellen, die unsere Basiskomponenten (z.B. Buttons oder das Barometer) enthält.

---

## **Kapitel 3.1: Eine eigene Komponentenbibliothek erzeugen**

Wir erstellen ein separates "Mini-Projekt" innerhalb unseres Ordners, das nur für die Bibliothek zuständig ist.

### **Schritt 1: Projekt-Struktur anlegen**
Wir nutzen Vite im "Library Mode".

1.  Erstelle einen neuen Ordner `packages/simple-ui-lib` im Hauptverzeichnis.
2.  Initialisiere dort eine `package.json`.
3.  Konfiguriere Vite für den Library-Build.

**Dateistruktur Ziel:**
```text
Dashboard/
├── packages/
│   └── simple-ui-lib/
│       ├── package.json
│       ├── vite.config.ts
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       └── src/
│           ├── index.ts        (Export-Datei)
│           └── components/
│               └── MyButton.tsx
├── src/
└── ...
```

### **Schritt 2: TypeScript Konfiguration (Wichtig!)**
Da wir uns in einem Unterordner befinden, müssen wir TypeScript explizit konfigurieren, sonst versucht der Compiler, die Haupt-App mitzukompilieren, was zu Fehlern führt.

**1. Erstelle `packages/simple-ui-lib/tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**2. Erstelle `packages/simple-ui-lib/tsconfig.node.json`:**
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### **Schritt 3: Erste Komponente erstellen**
Erstelle eine einfache Komponente zum Testen, z.B. `MyButton.tsx` in der Lib.

**Snippet (MyButton.tsx):**
```tsx
export const MyButton = ({ label, onClick }: { label: string, onClick: () => void }) => {
  return (
    <button 
      onClick={onClick}
      style={{ padding: '10px 20px', background: 'blue', color: 'white', borderRadius: '5px' }}
    >
      {label}
    </button>
  );
};
```

### **Schritt 4: Export definieren**
In `src/index.ts` (in der Lib) müssen wir alles exportieren, was von außen sichtbar sein soll.

```typescript
export { MyButton } from './components/MyButton';
```

---

## **Kapitel 3.2: Einbinden der Bibliothek**

Damit wir die Bibliothek in unserer Haupt-App (`Dashboard`) nutzen können, müssen wir sie bauen und verknüpfen.

### **Schritt 1: Build-Konfiguration (vite.config.ts)**
Wir müssen Vite sagen, dass es kein HTML bauen soll, sondern eine JS-Datei für andere Entwickler.

**Snippet (vite.config.ts für Lib):**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts'; // Optional für Typen

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SimpleUILib',
      fileName: (format) => `simple-ui-lib.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // React nicht mitbündeln!
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

### **Schritt 2: Build ausführen**
Führe `npm install` und `npm run build` im Lib-Ordner aus. Es sollte ein `dist` Ordner entstehen.

**Wichtig:** Überprüfe nach dem Build, welche Dateinamen Vite tatsächlich erzeugt hat (z.B. `simple-ui-lib.es.js` statt `simple-ui-lib.js`). Die `package.json` muss exakt auf diese Dateien zeigen:

```json
{
  "main": "dist/simple-ui-lib.umd.js",
  "module": "dist/simple-ui-lib.es.js",
  "types": "dist/index.d.ts"
}
```

Falls die Dateinamen nicht passen, korrigiere die Pfade in der `package.json` entsprechend.

### **Schritt 3: In der Haupt-App installieren**
Wir installieren die lokale Bibliothek in `Dashboard`.

**Befehl (im Hauptordner):**
```bash
npm install ./packages/simple-ui-lib
```

---

## **Kapitel 3.3: Testen der Bibliothek**

Jetzt nutzen wir unsere eigene Library in der Haupt-App.

### **Schritt 1: Verwenden im Dialog**
Ersetze den "Hinzufügen"-Button im `AddIndexDialog` durch unseren neuen Button aus der Library.

1.  Öffne `src/components/AddIndexDialog.tsx`.
2.  Importiere den Button: `import { MyButton } from 'simple-ui-lib';`.
3.  Ersetze den `<button>Hinzufügen</button>` durch:
    ```tsx
    <MyButton label="Hinzufügen" onClick={submit} />
    ```
4.  Teste die App: Der Button im Dialog sollte jetzt blau sein (unser Library-Style) und funktionieren.

### **Schritt 2: Erweiterung (Komplexere Komponenten) - Optional**
Das Verschieben komplexerer Komponenten wie `Barometer` in die Library ist optional und vor allem für Lernzwecke interessant.

**Herausforderung:**
Das `Barometer` nutzt aktuell `useTheme` aus dem `ThemeContext` der App. Die Library kennt diesen Context aber nicht!

**Lösung: Refactoring zu "Pure Component"**
1.  Ändere `Barometer.tsx` so, dass es `theme` als Prop empfängt, statt den Hook zu nutzen.
2.  Verschiebe die Datei dann in `packages/simple-ui-lib/src/components/`.
3.  Exportiere sie in `index.ts`.
4.  Baue die Lib neu (`npm run build`).
5.  In der App: Übergib das Theme von außen: `<Barometer value={50} theme={theme} />`.

**Hinweis:** Dieser Schritt kann übersprungen werden, wenn du Kapitel 3 hier abschließen möchtest.

---

## **Checkliste für Kapitel 3**

- [x] Ordner `packages/simple-ui-lib` erstellt.
- [x] `package.json` und `vite.config.ts` konfiguriert.
- [x] **WICHTIG:** `tsconfig.json` und `tsconfig.node.json` in der Lib erstellt.
- [x] `MyButton` Komponente erstellt und exportiert.
- [x] Library gebaut (`npm run build`).
- [x] `package.json` Pfade überprüft und ggf. korrigiert (z.B. `.es.js` statt `.js`).
- [x] Library in Haupt-App installiert (`npm install ...`).
- [x] `MyButton` in Haupt-App erfolgreich verwendet.
- [ ] (Optional) `Barometer` refactored und in Lib verschoben.

---

## **Notizen zur Umsetzung**

**Nachträgliche Ergänzungen während der Umsetzung:**
- **Kapitel 3.1, Schritt 2:** Die TypeScript-Konfiguration (`tsconfig.json` und `tsconfig.node.json`) fehlte in der ursprünglichen Anleitung und wurde nachträglich ergänzt. Ohne diese Dateien versuchte der TypeScript-Compiler, die gesamte Haupt-App mitzukompilieren, was zu Build-Fehlern führte.
- **Kapitel 3.2, Schritt 2:** Nach dem Build musste die `package.json` der Library korrigiert werden, da der `module`-Pfad auf `dist/simple-ui-lib.js` zeigte, die tatsächliche Datei aber `dist/simple-ui-lib.es.js` hieß.

**Testergebnis:**
- ✅ Der `MyButton` aus der Library wurde erfolgreich im `AddIndexDialog` der Haupt-App verwendet.
- ✅ Die App läuft ohne Fehler (`npm run dev`).
- ✅ Der Button ist funktional und übernimmt die Library-Styles (blauer Button).
