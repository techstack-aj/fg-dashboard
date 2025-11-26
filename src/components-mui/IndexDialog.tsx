// IndexDialog.tsx
// Kapitel 1.6 & 1.7 - Dialog für Create/Edit Index
//
// KONZEPT:
// Ein modaler Dialog für ZWEI Zwecke:
// - CREATE: Leeres Formular zum Erstellen
// - EDIT: Vorausgefülltes Formular zum Bearbeiten
// Der 'mode' prop entscheidet!
//
// STRUKTUR:
// Dialog
//  ├─ DialogTitle (Überschrift)
//  ├─ DialogContent (Formular)
//  │   ├─ TextField (Name)
//  │   ├─ Select (Kategorie aus CATEGORIES)
//  │   ├─ TextField (Wert, type="number")
//  │   └─ Autocomplete (Tags, multiple + freeSolo)
//  └─ DialogActions (Buttons)
//      ├─ Button Abbrechen
//      └─ Button Speichern
//
// PROPS:
// - open: boolean
// - onClose: () => void
// - mode: 'create' | 'edit'
// - initialData?: IndexItem
//
// STATE (lokaler State für Formular):
// - name, category, value, tags
// Mit useState für jedes Feld
//
// INITIALISIERUNG:
// useEffect(() => { ... }, [mode, initialData, open])
// Bei Edit: State mit initialData füllen
// Bei Create: State zurücksetzen
//
// STORE:
// const { addIndex } = useIndices();
// WICHTIG: Store hat KEIN updateIndex!
// Für Edit: removeIndex + addIndex nutzen
//
// SUBMIT:
// - Create: addIndex(name, category, tags)
// - Edit: removeIndex(initialData.id) + addIndex(...)
// - Dann: onClose()
//
// WICHTIGE MUI KOMPONENTEN:
// - Dialog: open={open} onClose={onClose}
// - TextField: label, value, onChange, fullWidth
// - Select: In FormControl mit InputLabel
// - Autocomplete: multiple, freeSolo, renderInput
// - Button: variant="contained" für Primary
//
// KATEGORIEN:
// import { CATEGORIES } from '../config/categories';
//
// Dokumentation:
// https://mui.com/material-ui/react-dialog/
// https://mui.com/material-ui/react-text-field/
// https://mui.com/material-ui/react-select/
// https://mui.com/material-ui/react-autocomplete/

import React, { useState, useEffect } from 'react';
import type { IndexItem } from '../types';
// TODO: MUI Komponenten importieren
// TODO: useIndices importieren
// TODO: CATEGORIES importieren

interface IndexDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: IndexItem;
}

export default function IndexDialog({ open, onClose, mode, initialData }: IndexDialogProps) {
  // TODO: State für Formular-Felder (name, category, value, tags)
  // TODO: useIndices für addIndex
  // TODO: useEffect für Initialisierung (State mit initialData füllen bei Edit)
  // TODO: handleSubmit Funktion (Create oder Edit-Logik)
  
  return (
    <div>
      <p>TODO: IndexDialog implementieren (Kapitel 1.6 & 1.7)</p>
    </div>
  );
}
