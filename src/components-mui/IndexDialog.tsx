// IndexDialog.tsx - Dialog für Create/Edit Index
// Wiederverwendbarer Dialog für Erstellen und Bearbeiten von Indices

import React, { useState, useEffect } from 'react';
import type { IndexItem } from '../types';
import type { Category } from '../config/categories';
import { Dialog, DialogTitle, DialogContent, TextField,
  DialogActions, Button, MenuItem, Select, InputLabel,
  FormControl } from '@mui/material';
import { useIndices } from '../store/indices';
import { CATEGORIES } from '../config/categories';

interface IndexDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: IndexItem;
}

export default function IndexDialog({ open, onClose, mode, initialData }: IndexDialogProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Aktien');
  const [value, setValue] = useState(50);
  const [tags, setTags] = useState<string[]>([]);

  const { addIndex } = useIndices();

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setValue(initialData.value);
      setTags(initialData.tags);
    } else {
      setName('');
      setCategory('Aktien');
      setValue(50);
      setTags([]);
    }
  }, [mode, initialData, open]);

  const handleSubmit = () => {
    if (mode === 'create') {
      addIndex(name, category, tags);
    } else if (mode === 'edit' && initialData) {
      // Edit: Store hat kein updateIndex - wird in Kapitel 1.7 gelöst
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{mode === 'create' ? 'Index erstellen' : 'Index bearbeiten'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Kategorie</InputLabel>
            <Select labelId="category-label" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

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
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Abbrechen</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {mode === 'create' ? 'Erstellen' : 'Speichern'}
          </Button>
        </DialogActions>
      </Dialog>
  );
}
