// muiTheme.ts
// Kapitel 1.1 - Material-UI Theme-Konfiguration
// Custom Theme mit Farbpalette (Dark Mode) und Typography

import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
        error: {
            main: '#d32f2f',
        },
        warning: {
            main: '#ed6c02',
        },
        info: {
            main: '#0288d1',
        },
        success: {
            main: '#2e7d32',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
    },
});

export default muiTheme;