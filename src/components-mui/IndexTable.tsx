// IndexTable.tsx - MUI Table Komponente für Index-Liste
// Zeigt alle Indices in einer Tabelle mit Edit/Delete Buttons

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { useIndices } from '../store/indices';

interface IndexTableProps {
  onEdit?: (id: string) => void;
}

export default function IndexTable({ onEdit }: IndexTableProps) {
  const { items, removeIndex } = useIndices();

  return (
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
                <IconButton onClick={() => { if (onEdit) onEdit(index.id); }}>✏️</IconButton>
                <IconButton onClick={() => removeIndex(index.id)}>🗑️</IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
