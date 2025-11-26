// App-MUI.tsx
// Material-UI Version des Fear & Greed Dashboard
// Original App.tsx bleibt unverändert!
//
// Kapitel 1.1: ThemeProvider + CssBaseline Setup
// App aktivieren: In main.tsx → import App from './App-MUI'

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/muiTheme';

export default function AppMUI() {
  // TODO: Weitere Komponenten in späteren Kapiteln hinzufügen

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1>TODO: App-MUI implementieren</h1>
        <p>Aktiviere diese App in main.tsx:</p>
        <pre>import App from './App-MUI'</pre>
      </div>
    </ThemeProvider>
  );
}
