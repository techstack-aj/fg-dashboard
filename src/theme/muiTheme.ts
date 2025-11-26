// muiTheme.ts
// Kapitel 1.1 - Material-UI Theme-Konfiguration
//
// Aufgabe:
// - Erstelle ein Custom Theme mit createTheme()
// - Definiere Farbpalette: primary, secondary, error, warning, info, success
// - Konfiguriere Light/Dark Mode Support
// - Passe Typography an (Schriftfamilie, Größen)
//
// Anforderungen:
// 1. Importiere createTheme von '@mui/material/styles'
// 2. Wähle primary Farbe (z.B. #1976d2 oder eigene)
// 3. Exportiere Theme als Default
// 4. Mode: 'light' oder 'dark' in palette
//
// Dokumentation:
// https://mui.com/material-ui/customization/theming/
// https://mui.com/material-ui/customization/palette/
// https://mui.com/material-ui/customization/dark-mode/

// TODO: Implementieren
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