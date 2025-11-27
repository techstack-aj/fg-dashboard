// IndexTable.tsx - MUI Table Komponente für Index-Liste
// Zeigt alle Indices in einer Tabelle mit Edit/Delete Buttons + Sortierung

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Dialog, DialogTitle, DialogContent,
  Button, DialogActions, DialogContentText, TableSortLabel } from '@mui/material';
import { useIndices } from '../store/indices';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface IndexTableProps {
  onEdit?: (id: string) => void;
}

type Order = 'asc' | 'desc';
type OrderBy = 'name' | 'category' | 'value';

export default function IndexTable({ onEdit }: IndexTableProps) {
  const { items, removeIndex } = useIndices();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('name');

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

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedItems = React.useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      let aValue: string | number = a[orderBy];
      let bValue: string | number = b[orderBy];
      
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [items, order, orderBy]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'category'}
                  direction={orderBy === 'category' ? order : 'asc'}
                  onClick={() => handleRequestSort('category')}
                >
                  Kategorie
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'value'}
                  direction={orderBy === 'value' ? order : 'asc'}
                  onClick={() => handleRequestSort('value')}
                >
                  Wert
                </TableSortLabel>
              </TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Aktionen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedItems.map((index) => (
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
