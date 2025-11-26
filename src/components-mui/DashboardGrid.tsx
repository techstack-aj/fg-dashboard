// DashboardGrid.tsx - Responsive Grid Layout für Dashboard-Komponenten
// Zeigt IndexTable im responsive Grid

import React from 'react';
import { Box, Paper, Grid } from '@mui/material';
import IndexTable from './IndexTable';

interface DashboardGridProps {
  onEdit?: (id: string) => void;
}

export default function DashboardGrid({ onEdit }: DashboardGridProps) {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <IndexTable onEdit={onEdit} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
