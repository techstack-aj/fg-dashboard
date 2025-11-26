# 🎯 ROADMAP: Material-UI Integration - Kapitel 1

## 📋 Übersicht

Dieses Dokument führt dich Schritt für Schritt durch die Implementierung von Material-UI (MUI) in deinem Fear & Greed Dashboard. Du wirst alle Komponenten aus Kapitel 1 deiner Schulung selbst implementieren.

**Ziel:** Lerne MUI Basics durch praktische Anwendung!

---

## ✅ Vorbereitung (bereits erledigt)

- ✅ MUI Dependencies installiert
- ✅ Ordnerstruktur erstellt (`src/components-mui/`, `src/theme/`)
- ✅ Template-Dateien mit Kommentaren erstellt
- ✅ Original `App.tsx` bleibt unverändert

---

## 🚀 Implementierungs-Schritte

### **Kapitel 1.1: Theme erstellen + Provider einbinden**

📁 **Datei:** `src/theme/muiTheme.ts`

**Aufgaben:**
1. Importiere `createTheme` von `@mui/material/styles`
2. Erstelle ein Theme-Objekt mit:
   - `palette.mode`: `'dark'` (später dynamisch für Light Mode)
   - `palette.primary.main`: z.B. `'#1976d2'` oder eigene Farbe
   - `palette.secondary.main`: z.B. `'#dc004e'`
   - Optional: `typography.fontFamily`
3. Exportiere das Theme als Default

**Dokumentation:**
- [MUI Theming](https://mui.com/material-ui/customization/theming/)
- [Color Palette](https://mui.com/material-ui/customization/palette/)

**Test:**
```tsx
// In App-MUI.tsx (später):
import theme from './theme/muiTheme';
console.log(theme); // Sollte Theme-Objekt ausgeben
```

---

### **Kapitel 1.2: Table für Index-Liste**

📁 **Datei:** `src/components-mui/IndexTable.tsx`

**Aufgaben:**
1. Importiere benötigte MUI Komponenten:
   ```tsx
   import {
     Table,
     TableBody,
     TableCell,
     TableContainer,
     TableHead,
     TableRow,
     Paper,
     IconButton
   } from '@mui/material';
   ```
2. Hole Daten aus Zustand:
   ```tsx
   const { items, removeIndex } = useIndices();
   ```
3. Erstelle Table-Struktur:
   - `<TableContainer component={Paper}>`
   - `<TableHead>` mit Spalten: Name, Kategorie, Wert, Tags, Aktionen
   - `<TableBody>` mit `.map()` über `items`
4. Zeige Daten an:
   - `index.name`, `index.category`, `index.value`
   - Tags: verwende `.join(', ')` oder später `<Chip>` (Kapitel 1.4)
5. Action Buttons (Icons kommen in Kapitel 1.4):
   - Edit Button mit `onClick={() => onEdit(index.id)}`
   - Delete Button mit `onClick={() => removeIndex(index.id)}`

**Dokumentation:**
- [MUI Table](https://mui.com/material-ui/react-table/)
- [Table API](https://mui.com/material-ui/api/table/)

**Test:**
```tsx
// In DashboardGrid.tsx (später):
<IndexTable onEdit={(id) => console.log('Edit:', id)} />
```

---

### **Kapitel 1.3: Grid Layout (Responsive Breakpoints)**

📁 **Datei:** `src/components-mui/DashboardGrid.tsx`

**Aufgaben:**
1. Importiere Grid2:
   ```tsx
   import Grid from '@mui/material/Grid2';
   import { Box, Paper } from '@mui/material';
   ```
2. Erstelle Container Grid:
   ```tsx
   <Box sx={{ flexGrow: 1, p: 2 }}>
     <Grid container spacing={3}>
       {/* Grid Items hier */}
     </Grid>
   </Box>
   ```
3. Füge Grid Items hinzu:
   - **IndexTable:** `<Grid size={{ xs: 12, lg: 8 }}>`
   - **Barometer:** `<Grid size={{ xs: 12, lg: 4 }}>`
   - Optional: Charts, Stats
4. Teste Responsive Verhalten:
   - Mobile (xs): 100% Breite
   - Desktop (lg): 66% / 33% Split

**Dokumentation:**
- [MUI Grid2](https://mui.com/material-ui/react-grid2/)
- [Breakpoints](https://mui.com/material-ui/customization/breakpoints/)

**Breakpoint Referenz:**
- `xs`: 0px+ (Mobile)
- `sm`: 600px+ (Tablet)
- `md`: 900px+ (Small Desktop)
- `lg`: 1200px+ (Desktop)
- `xl`: 1536px+ (Large Desktop)

---

### **Kapitel 1.4: Icons importieren und verwenden**

📁 **Dateien:** `IndexTable.tsx`, `IndexDialog.tsx`, `App-MUI.tsx`

**Aufgaben:**
1. Installiere Icons (bereits erledigt ✅):
   ```bash
   npm install @mui/icons-material
   ```
2. Importiere benötigte Icons:
   ```tsx
   import DeleteIcon from '@mui/icons-material/Delete';
   import EditIcon from '@mui/icons-material/Edit';
   import AddIcon from '@mui/icons-material/Add';
   import SaveIcon from '@mui/icons-material/Save';
   import CancelIcon from '@mui/icons-material/Cancel';
   import Brightness4Icon from '@mui/icons-material/Brightness4';
   import Brightness7Icon from '@mui/icons-material/Brightness7';
   ```
3. Verwende Icons in Buttons:
   ```tsx
   <IconButton onClick={handleEdit}>
     <EditIcon />
   </IconButton>
   
   <Button startIcon={<AddIcon />}>
     Neuer Index
   </Button>
   ```
4. **Bonus:** Ersetze Tag-Strings durch `<Chip>` Komponenten:
   ```tsx
   {index.tags.map(tag => (
     <Chip key={tag} label={tag} size="small" />
   ))}
   ```

**Dokumentation:**
- [MUI Icons](https://mui.com/material-ui/material-icons/)
- [Icon Button](https://mui.com/material-ui/react-button/#icon-button)
- [Chip Component](https://mui.com/material-ui/react-chip/)

**Icon Browser:**
- [Material Icons Suche](https://mui.com/material-ui/material-icons/)

---

### **Kapitel 1.5: Delete-Funktion mit Bestätigungs-Dialog**

📁 **Datei:** `src/components-mui/IndexTable.tsx`

**Aufgaben:**
1. Erstelle State für Bestätigungs-Dialog:
   ```tsx
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
   const [deleteId, setDeleteId] = useState<string | null>(null);
   ```
2. Erstelle Delete Handler:
   ```tsx
   const handleDeleteClick = (id: string) => {
     setDeleteId(id);
     setDeleteDialogOpen(true);
   };
   
   const handleConfirmDelete = () => {
     if (deleteId) removeIndex(deleteId);
     setDeleteDialogOpen(false);
     setDeleteId(null);
   };
   ```
3. Implementiere Bestätigungs-Dialog:
   ```tsx
   <Dialog open={deleteDialogOpen} onClose={...}>
     <DialogTitle>Index löschen?</DialogTitle>
     <DialogContent>
       <DialogContentText>
         Diese Aktion kann nicht rückgängig gemacht werden.
       </DialogContentText>
     </DialogContent>
     <DialogActions>
       <Button onClick={() => setDeleteDialogOpen(false)}>
         Abbrechen
       </Button>
       <Button onClick={handleConfirmDelete} color="error">
         Löschen
       </Button>
     </DialogActions>
   </Dialog>
   ```

**Dokumentation:**
- [MUI Dialog](https://mui.com/material-ui/react-dialog/)
- [Dialog API](https://mui.com/material-ui/api/dialog/)

---

### **Kapitel 1.6: Create-Dialog mit Form**

📁 **Datei:** `src/components-mui/IndexDialog.tsx`

**Aufgaben:**
1. Erstelle Props Interface:
   ```tsx
   interface IndexDialogProps {
     open: boolean;
     onClose: () => void;
     mode: 'create' | 'edit';
     initialData?: Index;
   }
   ```
2. Erstelle State für Form-Felder:
   ```tsx
   const [name, setName] = useState('');
   const [category, setCategory] = useState<Category>('Aktien');
   const [tags, setTags] = useState<string[]>([]);
   ```
3. Erstelle useEffect für Reset beim Öffnen:
   ```tsx
   useEffect(() => {
     if (mode === 'edit' && initialData) {
       setName(initialData.name);
       setCategory(initialData.category);
       setTags(initialData.tags);
     } else {
       setName('');
       setCategory('Aktien');
       setTags([]);
     }
   }, [mode, initialData, open]);
   ```[mode, initialData, open]);
   ```
4. Implementiere Dialog mit Form:
   ```tsx
   <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
     <DialogTitle>Neuen Index erstellen</DialogTitle>
     <DialogContent>
       <TextField
         label="Name"
         value={name}
         onChange={(e) => setName(e.target.value)}
         fullWidth
         margin="normal"
       />
       {/* Weitere Felder... */}
     </DialogContent>
     <DialogActions>
       <Button onClick={onClose}>Abbrechen</Button>
       <Button variant="contained" onClick={handleSubmit}>
         Erstellen
       </Button>
     </DialogActions>
   </Dialog>
   ```
5. Erstelle Submit Handler:
   ```tsx
   const handleSubmit = () => {
     addIndex(name, category, tags);
     onClose();
   };
   ```
6. **Kategorien:** Verwende `<Select>`:
   ```tsx
   import { CATEGORIES } from '../config/categories';
   
   <FormControl fullWidth margin="normal">
     <InputLabel>Kategorie</InputLabel>
     <Select value={category} onChange={(e) => setCategory(e.target.value)}>
       {CATEGORIES.map(cat => (
         <MenuItem key={cat} value={cat}>{cat}</MenuItem>
       ))}
     </Select>
   </FormControl>
   ```
7. **Tags:** Verwende einfaches `<TextField>` mit Komma-Trennung:
   ```tsx
   <TextField
     label="Tags"
     placeholder="Tags mit Komma trennen (z.B. crypto, volatile)"
     value={tags.join(', ')}
     onChange={(e) => {
       const input = e.target.value;
       const tagsArray = input.split(',').map(t => t.trim()).filter(t => t);
       setTags(tagsArray);
     }}
     fullWidth
     margin="normal"
   />
   ```
8. **In App-MUI.tsx einbinden:**
   ```tsx
   const [dialogOpen, setDialogOpen] = useState(false);
   
   <Button startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
     Neuer Index
   </Button>
   
   <IndexDialog 
     open={dialogOpen}
     onClose={() => setDialogOpen(false)}
     mode="create"
   />
   ```

**Dokumentation:**
- [TextField](https://mui.com/material-ui/react-text-field/)
- [Select](https://mui.com/material-ui/react-select/)
- [Autocomplete](https://mui.com/material-ui/react-autocomplete/)

---

### **Kapitel 1.7: Edit-Dialog (Dialog wiederverwenden)**

📁 **Datei:** `src/components-mui/IndexDialog.tsx`

**Aufgaben:**
1. **useEffect ist bereits implementiert** (aus Kapitel 1.6) - resettet State basierend auf `mode`, `initialData` und `open`

2. Implementiere Edit-Logik im Submit Handler:
   ```tsx
   const { removeIndex } = useIndices(); // Zusätzlich zu addIndex
   
   const handleSubmit = () => {
     if (mode === 'create') {
       addIndex(name, category, tags);
     } else if (mode === 'edit' && initialData) {
       // Workaround: Store hat kein updateIndex
       removeIndex(initialData.id);
       addIndex(name, category, tags);
     }
     onClose();
   };
   ```

3. **Dialog Title und Button Text sind bereits dynamisch** (aus Kapitel 1.6):
   - DialogTitle: `{mode === 'create' ? 'Index erstellen' : 'Index bearbeiten'}`
   - Button: `{mode === 'create' ? 'Erstellen' : 'Speichern'}`

4. Implementiere Edit-Handler in `App-MUI.tsx`:
   ```tsx
   const [dialogOpen, setDialogOpen] = useState(false);
   const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
   const [editingIndex, setEditingIndex] = useState<IndexItem | undefined>();
   
   const handleEdit = (id: string) => {
     const index = items.find(i => i.id === id);
     setEditingIndex(index);
     setDialogMode('edit');
     setDialogOpen(true);
   };
   
   <DashboardGrid onEdit={handleEdit} />
   
   <IndexDialog 
     open={dialogOpen}
     onClose={() => setDialogOpen(false)}
     mode={dialogMode}
     initialData={editingIndex}
   />
   ```

**Test Checklist:**
- [ ] Create Dialog öffnet sich mit leeren Feldern
- [ ] Edit Dialog öffnet sich mit vorausgefüllten Feldern
- [ ] Daten werden korrekt gespeichert
- [ ] Dialog schließt nach Submit

---

## 🔄 App zwischen Original und MUI wechseln

📁 **Datei:** `src/main.tsx`

**Standard (Tailwind App):**
```tsx
import App from './App'
```

**MUI Version aktivieren:**
```tsx
import App from './App-MUI'
```

**Tipp:** Nutze Git-Branches für verschiedene Versionen:
```bash
git checkout -b feature/mui-implementation
```

---

## 📚 Wichtige MUI Ressourcen

### Dokumentation
- [Getting Started](https://mui.com/material-ui/getting-started/)
- [Components](https://mui.com/material-ui/all-components/)
- [Customization](https://mui.com/material-ui/customization/how-to-customize/)

### Komponenten-Referenz
- [Button](https://mui.com/material-ui/react-button/)
- [Dialog](https://mui.com/material-ui/react-dialog/)
- [Table](https://mui.com/material-ui/react-table/)
- [Grid2](https://mui.com/material-ui/react-grid2/)
- [TextField](https://mui.com/material-ui/react-text-field/)
- [Select](https://mui.com/material-ui/react-select/)
- [Autocomplete](https://mui.com/material-ui/react-autocomplete/)
- [Icons](https://mui.com/material-ui/material-icons/)

### Theme & Styling
- [Theming](https://mui.com/material-ui/customization/theming/)
- [Dark Mode](https://mui.com/material-ui/customization/dark-mode/)
- [sx Prop](https://mui.com/system/getting-started/the-sx-prop/)

---

## 🎨 Bonus-Aufgaben (Optional)

### Dark Mode Integration
Verbinde MUI Theme mit bestehendem `ThemeContext`:

```tsx
// In App-MUI.tsx:
const { theme: themeMode } = useTheme();

const muiTheme = useMemo(
  () => createTheme({
    palette: {
      mode: themeMode, // 'light' | 'dark'
      primary: { main: '#1976d2' },
      // ...
    },
  }),
  [themeMode]
);

return (
  <ThemeProvider theme={muiTheme}>
    <CssBaseline />
    {/* App Content */}
  </ThemeProvider>
);
```

### CSV Import/Export mit MUI
- Füge `<Button>` für Export hinzu
- Erstelle `<Dialog>` für CSV Import mit File Upload
- Verwende `<LinearProgress>` für Ladebalken

### Snackbar für Benachrichtigungen
```tsx
import { Snackbar, Alert } from '@mui/material';

<Snackbar open={success} autoHideDuration={3000} onClose={...}>
  <Alert severity="success">Index erfolgreich erstellt!</Alert>
</Snackbar>
```

### Sortierung in Table
- Verwende `<TableSortLabel>` in `<TableHead>`
- Implementiere `orderBy` und `order` State
- Sortiere `filteredIndices` dynamisch

---

## ✅ Checkliste: Kapitel 1 abgeschlossen

- [ ] **1.1:** Theme erstellt und exportiert
- [ ] **1.2:** IndexTable zeigt alle Indices an
- [ ] **1.3:** DashboardGrid ist responsive
- [ ] **1.4:** Icons in allen Komponenten verwendet
- [ ] **1.5:** Delete-Bestätigungs-Dialog funktioniert
- [ ] **1.6:** Create-Dialog speichert neue Indices
- [ ] **1.7:** Edit-Dialog lädt und speichert Änderungen
- [ ] **App-MUI:** Komplett funktionsfähig
- [ ] **Test:** Zwischen App.tsx und App-MUI.tsx gewechselt

---

## 🚀 Nächste Schritte

Nach Abschluss von Kapitel 1 kannst du:
1. **Kapitel 2:** Fortgeschrittene Komponenten (DataGrid, Charts)
2. **Kapitel 3:** Forms mit React Hook Form + MUI
3. **Kapitel 4:** State Management mit MUI (Context API)
4. **Kapitel 5:** Performance Optimierung
5. **Kapitel 6:** Testing mit MUI Components

---

## 💡 Tipps für die Implementierung

### 1. Inkrementell arbeiten
Implementiere eine Komponente nach der anderen. Teste jede Komponente einzeln, bevor du zur nächsten übergehst.

### 2. Console Logs nutzen
```tsx
console.log('Theme:', theme);
console.log('Filtered Indices:', filteredIndices);
```

### 3. Browser DevTools
- Rechtsklick → "Untersuchen" auf MUI Komponenten
- Schau dir die generierten CSS-Klassen an
- Teste Responsive Breakpoints mit Device Toolbar

### 4. MUI Playground
Teste MUI Komponenten im Browser:
- [CodeSandbox mit MUI Template](https://codesandbox.io/s/material-ui-playground-forked-t1234)
- Experimentiere mit Props und Styling

### 5. TypeScript Typen
MUI hat hervorragende TypeScript-Unterstützung:
```tsx
import type { ButtonProps } from '@mui/material/Button';
```

---

## 🐛 Häufige Fehler & Lösungen

### Fehler: "Module not found: @mui/material"
**Lösung:** Dependencies nochmal installieren:
```bash
npm install @mui/material @emotion/react @emotion/styled
```

### Fehler: "theme.spacing is not a function"
**Lösung:** Theme korrekt mit `createTheme()` erstellen:
```tsx
import { createTheme } from '@mui/material/styles';
const theme = createTheme({ /* config */ });
```

### Fehler: Dialog schließt nicht
**Lösung:** `onClose` Prop richtig setzen:
```tsx
<Dialog open={open} onClose={() => setOpen(false)}>
```

### Styles werden nicht angewendet
**Lösung:** `<CssBaseline />` im `<ThemeProvider>` verwenden:
```tsx
<ThemeProvider theme={theme}>
  <CssBaseline />
  {/* App */}
</ThemeProvider>
```

---

## 📞 Hilfe & Support

- [MUI GitHub Discussions](https://github.com/mui/material-ui/discussions)
- [Stack Overflow - material-ui tag](https://stackoverflow.com/questions/tagged/material-ui)
- [MUI Discord Community](https://discord.gg/material-ui)

---

**Viel Erfolg bei der Implementierung! 🚀**

Du schaffst das! Arbeite dich Schritt für Schritt durch die Kapitel und teste regelmäßig. Bei Fragen: MUI Dokumentation ist dein bester Freund! 📚
