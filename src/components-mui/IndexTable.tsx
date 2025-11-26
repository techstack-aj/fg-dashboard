// IndexTable.tsx - MUI Table Komponente für Index-Liste
// Zeigt alle Indices in einer Tabelle mit Edit/Delete Buttons

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent,
  Button, DialogActions, DialogContentText } from '@mui/material';
import { useIndices } from '../store/indices';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface IndexTableProps {
  onEdit?: (id: string) => void;
}

export default function IndexTable({ onEdit }: IndexTableProps) {
  const { items, removeIndex } = useIndices();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      removeIndex(deleteId);
    }
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Kategorie</TableCell>
              <TableCell>Wert</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Aktionen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((index) => (
              <TableRow key={index.id}>
                <TableCell>{index.name}</TableCell>
                <TableCell>{index.category}</TableCell>
                <TableCell>{index.value}</TableCell>
                <TableCell>{index.tags.join(', ')}</TableCell>
                <TableCell>
                  <IconButton onClick={() => { if (onEdit) onEdit(index.id); }}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDeleteClick(index.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Index löschen?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Möchten Sie diesen Index wirklich löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Abbrechen</Button>
          <Button onClick={handleConfirmDelete} color="error">Löschen</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
