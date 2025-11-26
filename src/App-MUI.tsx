// App-MUI.tsx
// Material-UI Version des Fear & Greed Dashboard
// Original App.tsx bleibt unverändert!
//
// Kapitel 1.1: ThemeProvider + CssBaseline Setup
// App aktivieren: In main.tsx → import App from './App-MUI'

import React from 'react';
import { ThemeProvider, CssBaseline, Button, Box } from '@mui/material';
import theme from './theme/muiTheme';
import DashboardGrid from './components-mui/DashboardGrid';
import IndexDialog from './components-mui/IndexDialog';
import { useIndices } from './store/indices';
import AddIcon from '@mui/icons-material/Add';
import DashboardToggle from './components/DashboardToggle';

export default function AppMUI() {
  const { items } = useIndices();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'create' | 'edit'>('create');
  const [editIndexId, setEditIndexId] = React.useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditIndexId(id);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const editingIndex = editIndexId ? items.find(i => i.id === editIndexId) : undefined;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Button 
          startIcon={<AddIcon />} 
          onClick={() => {
            setDialogMode('create');
            setEditIndexId(null);
            setDialogOpen(true);
          }}
          variant="contained"
          sx={{ mb: 2 }}
        >
          Neuer Index
        </Button>
        <DashboardGrid onEdit={handleEdit} />
      </Box>
      
      <IndexDialog 
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        mode={dialogMode}
        initialData={editingIndex}
      />
      
      <DashboardToggle />
    </ThemeProvider>
  );
}
