// IndexDialog.tsx
// Kapitel 1.6 & 1.7 - Dialog für Create/Edit Index
//
// Aufgabe:
// - Wiederverwendbarer Dialog für Create UND Edit
// - Formular mit TextField, Select/Autocomplete
// - Submit-Logik für beide Modi
//
// Benötigte MUI Komponenten:
// - Dialog, DialogTitle, DialogContent, DialogActions
// - TextField, Select, MenuItem, FormControl, InputLabel
// - Autocomplete (für Tags mit Mehrfachauswahl)
// - Button, IconButton
//
// Props:
// - open: boolean
// - onClose: () => void
// - mode: 'create' | 'edit'
// - initialData?: Index (für Edit Mode)
//
// State Management:
// - Lokaler State für Formular-Felder (name, category, currentValue, tags)
// - useIndices() für addIndex/updateIndex
//
// Icons (Kapitel 1.4):
// - SaveIcon, CancelIcon
//
// Datenquelle:
// - CATEGORIES aus '../config/categories'
//
// Dokumentation:
// https://mui.com/material-ui/react-dialog/
// https://mui.com/material-ui/react-text-field/
// https://mui.com/material-ui/react-select/
// https://mui.com/material-ui/react-autocomplete/

import React from 'react';

interface IndexDialogProps {
  // TODO: Props definieren
}

export default function IndexDialog() {
  // TODO: Implementieren
  return (
    <div>
      <p>TODO: IndexDialog implementieren (Kapitel 1.6 & 1.7)</p>
    </div>
  );
}
