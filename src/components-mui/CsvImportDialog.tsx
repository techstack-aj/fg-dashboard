// CsvImportDialog.tsx - MUI Dialog für CSV Import
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  LinearProgress,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useIndices } from '../store/indices';

interface CsvImportDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type DuplicateAction = 'skip' | 'import-anyway' | 'replace';

export default function CsvImportDialog({ open, onClose, onSuccess }: CsvImportDialogProps) {
  const { items, addIndex, removeIndex } = useIndices();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [duplicateAction, setDuplicateAction] = useState<DuplicateAction>('skip');
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const [duplicateNames, setDuplicateNames] = useState<string[]>([]);
  const [pendingImport, setPendingImport] = useState<Array<{ name: string; category: any; tags: string[] }>>([]);

  const performImport = () => {
    let imported = 0;
    let skipped = 0;

    for (const item of pendingImport) {
      const existingIndex = items.find(i => i.name.toLowerCase() === item.name.toLowerCase());
      
      if (existingIndex) {
        if (duplicateAction === 'skip') {
          skipped++;
          continue;
        } else if (duplicateAction === 'replace') {
          removeIndex(existingIndex.id);
        }
        // 'import-anyway' fügt einfach hinzu (kann zu Duplikaten führen)
      }
      
      addIndex(item.name, item.category, item.tags);
      imported++;
    }

    setSuccess(`${imported} Indizes importiert${skipped > 0 ? `, ${skipped} übersprungen` : ''}!`);
    onSuccess?.();
    setShowDuplicateDialog(false);
    setPendingImport([]);
    
    setTimeout(() => {
      onClose();
      setSuccess(null);
    }, 2000);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(l => l.trim());
      
      if (lines.length < 2) {
        throw new Error('CSV muss mindestens Header und eine Datenzeile enthalten');
      }

      // Parse CSV mit Anführungszeichen-Support
      const parseCSVLine = (line: string): string[] => {
        const result: string[] = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          
          if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
              current += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        result.push(current.trim());
        return result;
      };

      const toImport: Array<{ name: string; category: any; tags: string[] }> = [];
      const duplicates: string[] = [];

      for (let i = 1; i < lines.length; i++) {
        const parts = parseCSVLine(lines[i]);
        if (parts.length >= 2) {
          const name = parts[0];
          const category = parts[1] as any;
          const tags = parts[2] ? parts[2].split(';').map(t => t.trim()).filter(t => t) : [];
          
          toImport.push({ name, category, tags });
          
          // Prüfe ob Duplikat
          if (items.find(i => i.name.toLowerCase() === name.toLowerCase())) {
            duplicates.push(name);
          }
        }
      }

      setPendingImport(toImport);
      
      if (duplicates.length > 0) {
        setDuplicateNames(duplicates);
        setShowDuplicateDialog(true);
        setLoading(false);
      } else {
        // Keine Duplikate, direkt importieren
        setLoading(false);
        let imported = 0;
        for (const item of toImport) {
          addIndex(item.name, item.category, item.tags);
          imported++;
        }
        setSuccess(`${imported} Indizes erfolgreich importiert!`);
        onSuccess?.();
        setTimeout(() => {
          onClose();
          setSuccess(null);
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Importieren');
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError(null);
      setSuccess(null);
      onClose();
    }
  };

  return (
    <>
      <Dialog open={open && !showDuplicateDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>CSV Import</DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              CSV-Format: name,category,tags (mit Semikolon getrennt)
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            
            <Button
              variant="outlined"
              component="label"
              startIcon={<FileUploadIcon />}
              disabled={loading}
              fullWidth
            >
              CSV Datei auswählen
              <input
                type="file"
                hidden
                accept=".csv"
                onChange={handleFileChange}
              />
            </Button>
            
            {loading && <LinearProgress sx={{ mt: 2 }} />}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Schließen
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showDuplicateDialog} onClose={() => {}} maxWidth="sm" fullWidth>
        <DialogTitle>Duplikate gefunden</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Folgende {duplicateNames.length} Index-Namen existieren bereits:
          </Typography>
          
          <Alert severity="warning" sx={{ mb: 2 }}>
            {duplicateNames.join(', ')}
          </Alert>
          
          <FormControl component="fieldset">
            <FormLabel component="legend">Wie soll verfahren werden?</FormLabel>
            <RadioGroup
              value={duplicateAction}
              onChange={(e) => setDuplicateAction(e.target.value as DuplicateAction)}
            >
              <FormControlLabel 
                value="skip" 
                control={<Radio />} 
                label="Duplikate überspringen (nur neue importieren)" 
              />
              <FormControlLabel 
                value="replace" 
                control={<Radio />} 
                label="Bestehende ersetzen" 
              />
              <FormControlLabel 
                value="import-anyway" 
                control={<Radio />} 
                label="Trotzdem importieren (separate Karten)" 
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setShowDuplicateDialog(false);
            setPendingImport([]);
          }}>
            Abbrechen
          </Button>
          <Button onClick={performImport} variant="contained">
            Importieren
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
