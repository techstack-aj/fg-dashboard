# 🎯 ROADMAP: React Router Integration - Kapitel 2

## 📋 Übersicht

In diesem Kapitel wirst du das Routing in deine Applikation integrieren. Wir ersetzen den manuellen "Reload-Toggle" durch echtes Client-Side Routing.

**Ziel:** Nahtlose Navigation zwischen Dashboard-Versionen und Detailansichten ohne Neuladen der Seite.

---

## ✅ Vorbereitung

- [x] `react-router-dom` installieren
- [x] Neue Dateien anlegen
- [x] `main.tsx` vorbereiten

---

## 🚀 Implementierungs-Schritte

### **Kapitel 2.1: Installation & Setup** (✅ Erledigt)

📁 **Datei:** `src/main.tsx`

**Aufgaben:**
1. Installiere das Paket: `npm install react-router-dom`
2. Importiere `BrowserRouter` in `main.tsx`.
3. Umschließe die Applikation mit dem `<BrowserRouter>`.
4. Entferne die alte LocalStorage-Logik für den App-Switch (wir machen das jetzt über Routen).

**Snippet:**
```tsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

**Dokumentation:**
- [React Router Installation](https://reactrouter.com/en/main/start/tutorial)

---

### **Kapitel 2.2: Routing-Struktur & Navigation** (✅ Erledigt)

Wir brauchen eine zentrale Stelle, die entscheidet, welche Komponente bei welcher URL angezeigt wird.

📁 **Datei:** `src/AppRouter.tsx` (Neu erstellen)

**Aufgaben:**
1. Erstelle die Komponente `AppRouter`.
2. Definiere `Routes` und `Route`.
3. Pfad `/` -> Zeigt `App` (Original Dashboard).
4. Pfad `/mui` -> Zeigt `AppMUI` (MUI Dashboard).
5. Binde `AppRouter` in `main.tsx` ein (statt `App` oder `AppMUI`).

**Snippet (AppRouter):**
```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

📁 **Datei:** `src/components/Navigation.tsx` (Neu erstellen)

**Aufgaben:**
1. Erstelle eine Navigationsleiste.
2. Nutze `<Link>` oder `<NavLink>` Komponenten für die Navigation.
3. Links zu: "Original Dashboard" (`/`) und "MUI Dashboard" (`/mui`).
4. Füge diese Navigation in beide Apps ein (oder in ein Layout).

**Snippet (Navigation):**
```tsx
<nav>
  <Link to="/">Home</Link>
  <NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink>
</nav>
```

**Wichtige Konzepte:**
- `Routes` vs `Route`
- `Link` vs `a` Tag (verhindert Reload)

---

### **Kapitel 2.3: Testen des Routings**

*Hierfür ist kein eigener Branch notwendig. Prüfe einfach folgende Punkte:*

**Checkliste:**
- [ ] Klick auf "Original Dashboard" -> URL ist `/`.
- [ ] Klick auf "MUI Dashboard" -> URL ist `/mui`.
- [ ] Browser "Zurück"-Button funktioniert korrekt.
- [ ] Direkte Eingabe von `http://localhost:5173/mui` funktioniert.
- [ ] Kein Seiten-Reload beim Wechseln (erkennbar am Favicon).

---

### **Kapitel 2.4: Bedingte Umleitungen & 404**

Wir kümmern uns um ungültige URLs und Umleitungen.

📁 **Datei:** `src/pages/NotFound.tsx`
**Aufgaben:**
1. Gestalte die 404-Seite (Text, Styling, Link zur Startseite).

📁 **Datei:** `src/AppRouter.tsx`
**Aufgaben:**
1. Importiere `NotFound`.
2. Füge eine "Catch-all" Route hinzu: `path="*"` -> zeigt `NotFound`.
3. **Redirect:** Füge eine Route `/old` hinzu, die automatisch auf `/` umleitet (nutze `<Navigate to="/" replace />`).

**Snippet (Redirect & 404):**
```tsx
<Routes>
  {/* ... andere Routen ... */}
  <Route path="/alt" element={<Navigate to="/neu" replace />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

**Wichtige Konzepte:**
- `path="*"` (Wildcard)
- `<Navigate>` Komponente für Redirects

---

### **Kapitel 2.5: Dynamische Routen (Detailansicht)**

Hier implementieren wir die Detailseite und die Verlinkung dorthin.

📁 **Datei:** `src/AppRouter.tsx`
**Aufgaben:**
1. Füge Route hinzu: `/index/:id` -> zeigt `IndexDetail`.

**Snippet (Route mit Parameter):**
```tsx
<Route path="/user/:userId" element={<UserProfile />} />
```

📁 **Datei:** `src/pages/IndexDetail.tsx`
**Aufgaben:**
1. Nutze `useParams`, um die `:id` aus der URL zu lesen.
2. Suche den Index im Store (`useIndices`).
3. Zeige Daten an (Name, Wert, Chart, etc.).
4. Behandle den Fall, dass die ID nicht gefunden wird (z.B. Redirect zu 404 oder Fehlermeldung).

**Snippet (useParams):**
```tsx
const { userId } = useParams();
// userId ist jetzt der Wert aus der URL (z.B. "123")
```

📁 **Datei:** `src/components/IndexCard.tsx` (Original) & `src/components-mui/IndexTable.tsx` (MUI)
**Aufgaben:**
1. Mache die Karten/Zeilen klickbar.
2. Nutze `Link` oder `useNavigate`, um zu `/index/{id}` zu navigieren.

**Snippet (Navigation per Code):**
```tsx
const navigate = useNavigate();
// ...
<div onClick={() => navigate('/user/123')}>Klick mich</div>
```

**Wichtige Konzepte:**
- URL Parameter (`:id`)
- `useParams` Hook

---

## 🧪 Test-Checkliste (Gesamt)

- [ ] Navigation zwischen Dashboards funktioniert.
- [ ] Unbekannte URL (z.B. `/blabla`) zeigt 404-Seite.
- [ ] URL `/old` leitet auf `/` um.
- [ ] Klick auf Index öffnet Detailansicht.
- [ ] Detailansicht zeigt korrekte Daten für die ID.
- [ ] Zurück-Button auf Detailansicht führt zurück zum Dashboard.

## 📚 Ressourcen

- [React Router v6 Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [useParams Hook](https://reactrouter.com/en/main/hooks/use-params)
- [Navigate Component](https://reactrouter.com/en/main/components/navigate)
