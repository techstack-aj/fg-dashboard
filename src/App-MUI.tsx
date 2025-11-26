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
import AddIcon from '@mui/icons-material/Add';

export default function AppMUI() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Button 
          startIcon={<AddIcon />} 
          onClick={() => setDialogOpen(true)}
          variant="contained"
          sx={{ mb: 2 }}
        >
          Neuer Index
        </Button>
        <DashboardGrid onEdit={(id) => console.log('Edit:', id)} />
      </Box>
      
      <IndexDialog 
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        mode="create"
      />
    </ThemeProvider>
  );
}
