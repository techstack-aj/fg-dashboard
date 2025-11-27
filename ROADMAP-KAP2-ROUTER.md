# 🎯 ROADMAP: React Router Integration - Kapitel 2

## 📋 Übersicht

In diesem Kapitel wirst du das Routing in deine Applikation integrieren. Wir ersetzen den manuellen "Reload-Toggle" durch echtes Client-Side Routing.

**Ziel:** Nahtlose Navigation zwischen Dashboard-Versionen und Detailansichten ohne Neuladen der Seite.

---

## ✅ Vorbereitung

- [ ] `react-router-dom` installieren
- [ ] Neue Dateien anlegen (siehe unten)
- [ ] `main.tsx` vorbereiten

---

## 🚀 Implementierungs-Schritte

### **Kapitel 2.1: Installation & Setup**

📁 **Datei:** `src/main.tsx`

**Aufgaben:**
1. Installiere das Paket: `npm install react-router-dom`
2. Importiere `BrowserRouter` in `main.tsx`.
3. Umschließe die Applikation mit dem `<BrowserRouter>`.
4. Entferne die alte LocalStorage-Logik für den App-Switch (wir machen das jetzt über Routen).

**Dokumentation:**
- [React Router Installation](https://reactrouter.com/en/main/start/tutorial)

---

### **Kapitel 2.2: Routing-Struktur & Navigation**

Wir brauchen eine zentrale Stelle, die entscheidet, welche Komponente bei welcher URL angezeigt wird.

📁 **Datei:** `src/AppRouter.tsx` (Neu erstellen)

**Aufgaben:**
1. Erstelle die Komponente `AppRouter`.
2. Definiere `Routes` und `Route`.
3. Pfad `/` -> Zeigt `App` (Original Dashboard).
4. Pfad `/mui` -> Zeigt `AppMUI` (MUI Dashboard).
5. Binde `AppRouter` in `main.tsx` ein (statt `App` oder `AppMUI`).

📁 **Datei:** `src/components/Navigation.tsx` (Neu erstellen)

**Aufgaben:**
1. Erstelle eine Navigationsleiste.
2. Nutze `<Link>` oder `<NavLink>` Komponenten für die Navigation.
3. Links zu: "Original Dashboard" (`/`) und "MUI Dashboard" (`/mui`).
4. Füge diese Navigation in beide Apps ein (oder in ein Layout).

**Wichtige Konzepte:**
- `Routes` vs `Route`
- `Link` vs `a` Tag (verhindert Reload)

---

### **Kapitel 2.3: Detailansicht (Dynamische Routen)**

Wir wollen auf eine Detailseite klicken können, um mehr Infos zu einem Index zu sehen.

📁 **Datei:** `src/pages/IndexDetail.tsx` (Neu erstellen)

**Aufgaben:**
1. Erstelle eine Komponente, die Details anzeigt.
2. Nutze den Hook `useParams`, um die ID aus der URL zu lesen (z.B. `/index/bitcoin`).
3. Suche den passenden Index aus dem Zustand Store anhand der ID.
4. Zeige "Index nicht gefunden" an, wenn die ID ungültig ist.
5. Füge einen "Zurück"-Button ein (`useNavigate`).

📁 **Datei:** `src/AppRouter.tsx`

**Aufgaben:**
1. Füge eine neue Route hinzu: `/index/:id`.
2. Verknüpfe sie mit `IndexDetail`.

**Test:**
- Rufe `/index/test-id` auf und prüfe, ob die ID in der Komponente ankommt.

---

### **Kapitel 2.4: Navigation in den Dashboards**

Die Index-Karten müssen jetzt klickbar sein.

📁 **Datei:** `src/components/IndexCard.tsx` (Original) & `src/components-mui/IndexTable.tsx` (MUI)

**Aufgaben:**
1. Mache den Titel oder die ganze Karte zum Link.
2. Ziel: `/index/{id}`.

---

### **Kapitel 2.5: 404 & Redirects (Optional)**

📁 **Datei:** `src/pages/NotFound.tsx` (Neu erstellen)

**Aufgaben:**
1. Erstelle eine einfache Fehlerseite ("Seite nicht gefunden").
2. Füge eine "Catch-all" Route (`*`) in `AppRouter.tsx` hinzu, die auf diese Seite führt.

---

## 🧪 Test-Checkliste

- [ ] Startseite `/` lädt das Original Dashboard.
- [ ] `/mui` lädt das MUI Dashboard.
- [ ] Klick auf Navigation wechselt ohne Browser-Reload (erkennbar am Favicon/Ladebalken).
- [ ] Klick auf einen Index öffnet die Detailansicht `/index/:id`.
- [ ] Detailansicht zeigt die korrekte ID/Daten an.
- [ ] Zurück-Button funktioniert.
- [ ] Unbekannte URL zeigt 404 Seite.

## 📚 Ressourcen

- [React Router v6 Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [useParams Hook](https://reactrouter.com/en/main/hooks/use-params)
- [useNavigate Hook](https://reactrouter.com/en/main/hooks/use-navigate)
