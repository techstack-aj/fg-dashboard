// App-MUI.tsx
// Material-UI Version des Fear & Greed Dashboard
// Original App.tsx bleibt unverändert!
//
// Kapitel 1.1: ThemeProvider + CssBaseline Setup
// App aktivieren: In main.tsx → import App from './App-MUI'

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/muiTheme';
import DashboardGrid from './components-mui/DashboardGrid';
import AddIcon from '@mui/icons-material/Add'; // ToDo, soll für Kap.-1.6 implementiert werden

export default function AppMUI() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardGrid onEdit={(id) => console.log('Edit:', id)} />
    </ThemeProvider>
  );
}
