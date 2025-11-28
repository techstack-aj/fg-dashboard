// App-MUI.tsx
// Material-UI Version des Fear & Greed Dashboard
// Original App.tsx bleibt unverändert!
//
// Kapitel 1.1: ThemeProvider + CssBaseline Setup
// Bonus: Dark Mode Integration mit ThemeContext

import React from 'react';
import { ThemeProvider, CssBaseline, Button, Box, IconButton, Snackbar, Alert } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import DashboardGrid from './components-mui/DashboardGrid';
import IndexDialog from './components-mui/IndexDialog';
import CsvImportDialog from './components-mui/CsvImportDialog';
import { useIndices } from './store/indices';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DashboardToggle from './components/DashboardToggle';
import { useTheme } from './context/ThemeContext';
import { exportAllAsCSV } from './utils/export';
import { useTranslation } from 'react-i18next';

export default function AppMUI() {
  const { t } = useTranslation();
  const { items } = useIndices();
  const { theme: themeMode, setTheme } = useTheme();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<'create' | 'edit'>('create');
  const [editIndexId, setEditIndexId] = React.useState<string | null>(null);
  const [snackbar, setSnackbar] = React.useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const [csvImportOpen, setCsvImportOpen] = React.useState(false);

  // Dynamisches Theme basierend auf ThemeContext
  const muiTheme = React.useMemo(
    () => createTheme({
      palette: {
        mode: themeMode,
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
      },
    }),
    [themeMode]
  );

  const handleEdit = (id: string) => {
    setEditIndexId(id);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleExport = () => {
    exportAllAsCSV(items);
    setSnackbar({
      open: true,
      message: t("csv_export_success"),
      severity: 'success'
    });
  };

  const editingIndex = editIndexId ? items.find(i => i.id === editIndexId) : undefined;

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button 
            startIcon={<AddIcon />} 
            onClick={() => {
              setDialogMode('create');
              setEditIndexId(null);
              setDialogOpen(true);
            }}
            variant="contained"
          >
            {t("add_new_index")}
          </Button>
          
          <Button 
            startIcon={<FileDownloadIcon />} 
            onClick={handleExport}
            variant="outlined"
          >
            {t("export_csv")}
          </Button>
          
          <Button 
            startIcon={<FileUploadIcon />} 
            onClick={() => setCsvImportOpen(true)}
            variant="outlined"
          >
            {t("import_csv")}
          </Button>
          
          <IconButton 
            onClick={() => setTheme(themeMode === 'dark' ? 'light' : 'dark')}
            color="inherit"
            sx={{ ml: 'auto' }}
          >
            {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        
        <DashboardGrid onEdit={handleEdit} />
      </Box>
      
      <IndexDialog 
        open={dialogOpen}
        onClose={handleDialogClose}
        mode={dialogMode}
        initialData={editingIndex}
        onSuccess={(action) => {
          setSnackbar({
            open: true,
            message: action === 'create' ? t("index_created_success") : t("index_updated_success"),
            severity: 'success'
          });
        }}
      />
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      
      <CsvImportDialog 
        open={csvImportOpen} 
        onClose={() => setCsvImportOpen(false)}
        onSuccess={() => {
          setSnackbar({
            open: true,
            message: t("csv_import_success_short"),
            severity: 'success'
          });
        }}
      />
      
      <DashboardToggle />
    </ThemeProvider>
  );
}
