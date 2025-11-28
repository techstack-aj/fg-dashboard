// IndexDialog.tsx - Dialog für Create/Edit Index
// Wiederverwendbarer Dialog für Erstellen und Bearbeiten von Indices

import React, { useState, useEffect } from 'react';
import type { IndexItem } from '../types';
import type { Category } from '../config/categories';
import { Dialog, DialogTitle, DialogContent, TextField,
  DialogActions, Button, MenuItem, Select, InputLabel,
  FormControl } from '@mui/material';
import { useIndices } from '../store/indices';
import { CATEGORIES, getCategoryTranslationKey } from '../config/categories';
import { useTranslation } from 'react-i18next';

interface IndexDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: IndexItem;
  onSuccess?: (action: 'create' | 'edit') => void;
}

export default function IndexDialog({ open, onClose, mode, initialData, onSuccess }: IndexDialogProps) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Aktien');
  const [value, setValue] = useState(50);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState(''); // Raw-Input für TextField

  const { addIndex, removeIndex } = useIndices();

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setValue(initialData.value);
      setTags(initialData.tags);
      setTagInput(initialData.tags.join(', ')); // Setze auch Raw-Input
    } else {
      setName('');
      setCategory('Aktien');
      setValue(50);
      setTags([]);
      setTagInput(''); // Reset Raw-Input
    }
  }, [mode, initialData, open]);

  const handleSubmit = () => {
    if (mode === 'create') {
      addIndex(name, category, tags);
      onSuccess?.('create');
    } else if (mode === 'edit' && initialData) {
      removeIndex(initialData.id);
      addIndex(name, category, tags);
      onSuccess?.('edit');
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{mode === 'create' ? t("create_index") : t("edit_index")}</DialogTitle>
        <DialogContent>
          <TextField
            label={t("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">{t("category")}</InputLabel>
            <Select labelId="category-label" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.filter(c => c !== "Alle Kategorien").map((cat) => (
                <MenuItem key={cat} value={cat}>{t(getCategoryTranslationKey(cat))}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label={t("tags_input_label")}
            placeholder={t("tags_input_placeholder")}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onBlur={() => {
              // Beim Verlassen des Feldes: Split und Update
              const tagsArray = tagInput.split(',').map(t => t.trim()).filter(t => t);
              setTags(tagsArray);
            }}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("cancel")}</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {mode === 'create' ? t("create") : t("save")}
          </Button>
        </DialogActions>
      </Dialog>
  );
}
