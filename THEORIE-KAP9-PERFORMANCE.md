# Theorie: Kapitel 9 - Performance-Optimierung

## **Was ist Performance-Optimierung in React?**

Performance-Optimierung bedeutet, die App schneller und reaktionsschneller zu machen. React ist von Haus aus schnell, aber bei größeren Apps können unnötige Re-Renders die Performance beeinträchtigen.

---

## **9.1 Der Callback-Hook (useCallback)**

### **Was ist useCallback?**

`useCallback` ist ein React Hook, der eine **memoized Funktion** zurückgibt. Die Funktion wird nur neu erstellt, wenn sich ihre Abhängigkeiten ändern.

### **Warum wichtig?**

Ohne `useCallback` wird bei jedem Re-Render eine neue Funktionsreferenz erstellt. Wenn diese Funktion als Prop an Child-Komponenten weitergegeben wird, denkt das Child, die Prop hat sich geändert → unnötiger Re-Render.

### **Syntax:**

```tsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]); // Nur neu erstellen wenn a oder b sich ändern
```

### **Beispiel:**

```tsx
// ❌ Ohne useCallback - neue Funktion bei jedem Render
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    console.log("Clicked");
  };
  
  return <Child onClick={handleClick} />; // Child re-rendert immer
}

// ✅ Mit useCallback - gleiche Funktionsreferenz
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []); // Keine Dependencies = nie neu erstellt
  
  return <Child onClick={handleClick} />; // Child re-rendert nur bei echter Änderung
}
```

### **Wann verwenden?**

- Event-Handler, die an Child-Komponenten weitergegeben werden
- Funktionen in Dependencies von `useEffect`, `useMemo`
- Bei großen Listen mit vielen Items

---

## **9.2 Pure Components (React.memo)**

### **Was ist React.memo?**

`React.memo` ist ein Higher-Order Component (HOC), der eine Komponente "memoized". Die Komponente rendert nur neu, wenn sich ihre Props ändern.

### **Warum wichtig?**

Standardmäßig re-rendert eine React-Komponente, wenn ihr Parent re-rendert - selbst wenn sich ihre Props nicht geändert haben. `React.memo` verhindert unnötige Re-Renders.

### **Syntax:**

```tsx
const MemoizedComponent = React.memo(function MyComponent(props) {
  // Komponente rendert nur neu wenn props sich ändern
  return <div>{props.value}</div>;
});
```

### **Beispiel:**

```tsx
// ❌ Ohne React.memo - re-rendert bei jedem Parent-Render
function ExpensiveChild({ data }) {
  console.log("Child rendered");
  return <div>{data}</div>;
}

// ✅ Mit React.memo - re-rendert nur wenn data sich ändert
const ExpensiveChild = React.memo(function ExpensiveChild({ data }) {
  console.log("Child rendered");
  return <div>{data}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const data = "Static data";
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild data={data} /> {/* Re-rendert NICHT mehr */}
    </>
  );
}
```

### **Custom Comparison Function:**

```tsx
const MyComponent = React.memo(
  function MyComponent({ user }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true = NICHT re-rendern
    // Return false = re-rendern
    return prevProps.user.id === nextProps.user.id;
  }
);
```

### **Wann verwenden?**

- Komponenten, die oft re-rendern, obwohl Props gleich bleiben
- Listen-Items (z.B. IndexCard in großen Listen)
- "Teure" Komponenten mit komplexen Berechnungen

---

## **9.3 React.lazy (Code Splitting)**

### **Was ist React.lazy?**

`React.lazy` ermöglicht **lazy loading** von Komponenten. Die Komponente wird erst geladen, wenn sie tatsächlich gerendert wird → kleineres initiiales Bundle, schnellerer Seitenaufbau.

### **Warum wichtig?**

Große Apps haben viel JavaScript-Code. Ohne Code Splitting muss der Browser alles auf einmal laden. Mit `React.lazy` werden nur die aktuell benötigten Teile geladen.

### **Syntax:**

```tsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### **Wichtig:**

- **Muss mit `<Suspense>` umwickelt werden**
- `fallback` ist der Ladezustand (Spinner, Skeleton, etc.)
- Nur für **default exports**: `export default MyComponent`

### **Beispiel mit React Router:**

```tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### **Wann verwenden?**

- Routen (Pages), die nicht sofort benötigt werden
- Große Komponenten (z.B. Charts, Editoren)
- Modals/Dialoge, die selten geöffnet werden
- Admin-Bereiche oder Einstellungen

### **Was NICHT lazy laden:**

- Kleine Komponenten (<10 KB)
- Komponenten, die sofort sichtbar sind
- Häufig verwendete Komponenten

---

## **9.4 Virtuelle Tabellen (Virtualization)**

### **Was ist Virtualization?**

Virtualization bedeutet, dass nur die **sichtbaren Elemente** einer langen Liste gerendert werden. Elemente außerhalb des Viewports existieren nicht im DOM.

### **Warum wichtig?**

Ohne Virtualization: 10.000 Liste-Items = 10.000 DOM-Nodes = langsam und speicherintensiv.

Mit Virtualization: Nur ~20 sichtbare Items im DOM = extrem schnell.

### **Populäre Libraries:**

1. **react-window** (leichtgewichtig, empfohlen)
2. **react-virtualized** (feature-reich, aber größer)
3. **TanStack Virtual** (modern, TypeScript-first)

### **react-window Beispiel:**

```tsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      Item {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={600}        // Container-Höhe
      itemCount={items.length}  // Anzahl Items
      itemSize={50}       // Höhe pro Item
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

### **TanStack Virtual (react-virtual) Beispiel:**

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

function VirtualList({ items }) {
  const parentRef = useRef();

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Geschätzte Höhe pro Item
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {items[virtualItem.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### **Wann verwenden?**

- Listen mit >100 Items
- Tabellen mit vielen Zeilen
- Infinite Scrolling
- Chat-Nachrichten, Logs, Feeds

### **TanStack Virtual vs. react-window:**

| Feature | react-window | TanStack Virtual |
|---------|--------------|------------------|
| Bundle-Größe | Klein (~7 KB) | Mittel (~14 KB) |
| TypeScript | ✅ | ✅✅ (besser) |
| Dynamische Höhen | ⚠️ Komplex | ✅ Einfach |
| API | Komponenten-basiert | Hook-basiert |
| Flexibilität | Mittel | Hoch |
| Dokumentation | Gut | Sehr gut |

**Empfehlung:** TanStack Virtual für neue Projekte (moderne API, bessere TypeScript-Unterstützung)

---

## **Performance-Optimierungs-Checkliste**

### **Wann was verwenden?**

| Problem | Lösung | Tool |
|---------|--------|------|
| Event-Handler verursachen Re-Renders | Funktionsreferenz memoizen | `useCallback` |
| Child re-rendert unnötig | Komponente memoizen | `React.memo` |
| Initiales Bundle zu groß | Code aufteilen | `React.lazy` |
| Lange Listen sind langsam | Nur sichtbare Items rendern | `react-virtual` |

### **Debugging-Tools:**

1. **React DevTools Profiler** - Zeigt welche Komponenten wie oft re-rendern
2. **Chrome Performance Tab** - Analysiert JavaScript-Execution
3. **Lighthouse** - Misst Performance-Score
4. **why-did-you-render** - Library die unnötige Re-Renders loggt

---

## **Best Practices**

### **1. Optimiere nur was nötig ist**

> "Premature optimization is the root of all evil" - Donald Knuth

Erst messen, dann optimieren. Nicht jede Komponente braucht `React.memo`.

### **2. Messbare Verbesserung**

Nutze React DevTools Profiler VOR und NACH der Optimierung. Wenn kein Unterschied → keine Optimierung nötig.

### **3. Dependency Arrays richtig nutzen**

```tsx
// ❌ Falsch - leeres Array trotz Dependencies
useCallback(() => {
  doSomething(value);
}, []); // value fehlt!

// ✅ Richtig
useCallback(() => {
  doSomething(value);
}, [value]);
```

### **4. Kombination nutzen**

```tsx
// React.memo + useCallback zusammen
const ExpensiveChild = React.memo(function ExpensiveChild({ onClick }) {
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);
  
  return <ExpensiveChild onClick={handleClick} />;
}
```

---

## **Zusammenfassung**

- **useCallback:** Memoize Funktionen → verhindert unnötige Re-Renders bei Child-Komponenten
- **React.memo:** Memoize Komponenten → re-rendert nur bei Props-Änderung
- **React.lazy:** Lazy Loading → kleineres Bundle, schnellerer Seitenaufbau
- **Virtualization:** Nur sichtbare Items rendern → extrem schnell bei langen Listen

**Golden Rule:** Erst profilen, dann optimieren. Nicht jede App braucht alle Optimierungen!
