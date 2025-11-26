// IndexDialog.tsx - Dialog für Create/Edit Index
// Wiederverwendbarer Dialog für Erstellen und Bearbeiten von Indices

import React, { useState, useEffect } from 'react';
import type { IndexItem } from '../types';

// sollen später verwendet werden
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
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
