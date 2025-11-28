import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    de: {
        translation: {
            // App Header
            "fear_greed_dashboard": "Fear & Greed Dashboard",
            "switch_light": "⚪ Switch Light",
            "switch_dark": "⚫ Switch Dark",
            "undo": "↶ Undo",
            "redo": "↷ Redo",
            "gauge_svg": "Gauge: SVG",
            "gauge_radial": "Gauge: Radial",
            "all_categories": "ALLE",
            "search_placeholder": "Suchen…",
            
            // Categories
            "category_aktien": "Aktien",
            "category_indizes": "Indizes",
            "category_crypto": "Crypto",
            "category_rohstoffe": "Rohstoffe",
            "category_custom": "Custom",
            "7_days": "7 Tage",
            "30_days": "30 Tage",
            "90_days": "90 Tage (Dummy)",
            "1_year": "1 Jahr",
            "recompute": "Neu berechnen",
            "export_csv": "Export CSV",
            "delete_all": "Alle löschen",
            "delete_all_confirm": "Alle Einträge wirklich entfernen?",
            
            // AddIndexDialog
            "new_index": "Neuer Index",
            "add_new_index": "+ Neuer Index",
            "name": "Name",
            "name_placeholder": "z. B. Tesla",
            "category": "Kategorie",
            "tags": "Tags",
            "tags_label": "Tags (Komma-getrennt)",
            "tags_placeholder": "Krypto, Momentum",
            "add": "Hinzufügen",
            "cancel": "Abbrechen",
            
            // IndexCard
            "remove": "Entfernen",
            "show_less": "weniger anzeigen",
            
            // Navigation
            "original_dashboard": "Original Dashboard",
            "mui_dashboard": "MUI Dashboard",
            
            // DashboardToggle
            "switch_to_original": "🎨 → Original",
            "switch_to_mui": "🎨 → MUI",
            "switch_to_original_title": "Wechsel zu Original Dashboard",
            "switch_to_mui_title": "Wechsel zu MUI Dashboard",
            
            // CsvImport
            "import_csv": "Import CSV",
            "importing": "Importiere…",
            "append": "Anfügen",
            "replace": "Ersetzen",
            "import_mode": "Import-Modus",
            "import_success": "Import erfolgreich: {{count}} Einträge ({{mode}}).",
            "import_error": "Import-Fehler: {{message}}",
            "file_read_error": "Datei konnte nicht gelesen werden.",
            "append_mode": "anhängen",
            "replace_mode": "ersetzen",
            
            // MUI IndexDialog
            "create_index": "Index erstellen",
            "edit_index": "Index bearbeiten",
            "tags_input_label": "Tags",
            "tags_input_placeholder": "Tags mit Komma trennen (z.B. crypto, volatile)",
            "create": "Erstellen",
            "save": "Speichern",
            
            // MUI IndexTable
            "name_column": "Name",
            "category_column": "Kategorie",
            "value_column": "Wert",
            "tags_column": "Tags",
            "actions_column": "Aktionen",
            "delete_index": "Index löschen?",
            "delete_index_confirm": "Möchten Sie diesen Index wirklich löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.",
            "delete": "Löschen",
            
            // MUI CsvImportDialog
            "csv_import_title": "CSV Import",
            "csv_import_description": "CSV-Datei mit Indizes importieren",
            "upload_file": "Datei hochladen",
            "duplicate_handling": "Umgang mit Duplikaten",
            "skip_duplicates": "Duplikate überspringen",
            "import_anyway": "Trotzdem importieren (Duplikate erlauben)",
            "replace_duplicates": "Bestehende ersetzen",
            "indices_imported": "{{count}} Indizes importiert{{skipped}}!",
            "indices_skipped": ", {{count}} übersprungen",
            "csv_min_lines_error": "CSV muss mindestens Header und eine Datenzeile enthalten",
            "close": "Schließen",
            
            // Success Messages
            "index_created_success": "Index erfolgreich erstellt!",
            "index_updated_success": "Index erfolgreich aktualisiert!",
            "csv_export_success": "CSV Export erfolgreich!",
            "csv_import_success_short": "CSV Import erfolgreich!",
            
            // MUI DashboardGrid
            "show_less_tags": "weniger",
            "show_more_tags": "mehr",
            
            // Pages
            "not_found": "404 - Seite nicht gefunden",
            "back_to_dashboard": "Zurück zum Dashboard",
            "index_detail": "Index Details",
            "current_value": "Aktueller Wert",
            "history": "Verlauf",
            "no_history": "Keine History-Daten verfügbar"
        }
    },
    en: {
        translation: {
            // App Header
            "fear_greed_dashboard": "Fear & Greed Dashboard",
            "switch_light": "⚪ Switch Light",
            "switch_dark": "⚫ Switch Dark",
            "undo": "↶ Undo",
            "redo": "↷ Redo",
            "gauge_svg": "Gauge: SVG",
            "gauge_radial": "Gauge: Radial",
            "all_categories": "ALL",
            "search_placeholder": "Search…",
            
            // Categories
            "category_aktien": "Stocks",
            "category_indizes": "Indices",
            "category_crypto": "Crypto",
            "category_rohstoffe": "Commodities",
            "category_custom": "Custom",
            "7_days": "7 Days",
            "30_days": "30 Days",
            "90_days": "90 Days (Dummy)",
            "1_year": "1 Year",
            "recompute": "Recompute",
            "export_csv": "Export CSV",
            "delete_all": "Delete All",
            "delete_all_confirm": "Really remove all entries?",
            
            // AddIndexDialog
            "new_index": "New Index",
            "add_new_index": "+ New Index",
            "name": "Name",
            "name_placeholder": "e.g. Tesla",
            "category": "Category",
            "tags": "Tags",
            "tags_label": "Tags (comma-separated)",
            "tags_placeholder": "Crypto, Momentum",
            "add": "Add",
            "cancel": "Cancel",
            
            // IndexCard
            "remove": "Remove",
            "show_less": "show less",
            
            // Navigation
            "original_dashboard": "Original Dashboard",
            "mui_dashboard": "MUI Dashboard",
            
            // DashboardToggle
            "switch_to_original": "🎨 → Original",
            "switch_to_mui": "🎨 → MUI",
            "switch_to_original_title": "Switch to Original Dashboard",
            "switch_to_mui_title": "Switch to MUI Dashboard",
            
            // CsvImport
            "import_csv": "Import CSV",
            "importing": "Importing…",
            "append": "Append",
            "replace": "Replace",
            "import_mode": "Import Mode",
            "import_success": "Import successful: {{count}} entries ({{mode}}).",
            "import_error": "Import error: {{message}}",
            "file_read_error": "File could not be read.",
            "append_mode": "append",
            "replace_mode": "replace",
            
            // MUI IndexDialog
            "create_index": "Create Index",
            "edit_index": "Edit Index",
            "tags_input_label": "Tags",
            "tags_input_placeholder": "Separate tags with comma (e.g. crypto, volatile)",
            "create": "Create",
            "save": "Save",
            
            // MUI IndexTable
            "name_column": "Name",
            "category_column": "Category",
            "value_column": "Value",
            "tags_column": "Tags",
            "actions_column": "Actions",
            "delete_index": "Delete Index?",
            "delete_index_confirm": "Do you really want to delete this index? This action cannot be undone.",
            "delete": "Delete",
            
            // MUI CsvImportDialog
            "csv_import_title": "CSV Import",
            "csv_import_description": "Import indices from CSV file",
            "upload_file": "Upload File",
            "duplicate_handling": "Duplicate Handling",
            "skip_duplicates": "Skip duplicates",
            "import_anyway": "Import anyway (allow duplicates)",
            "replace_duplicates": "Replace existing",
            "indices_imported": "{{count}} indices imported{{skipped}}!",
            "indices_skipped": ", {{count}} skipped",
            "csv_min_lines_error": "CSV must contain at least header and one data line",
            "close": "Close",
            
            // Success Messages
            "index_created_success": "Index successfully created!",
            "index_updated_success": "Index successfully updated!",
            "csv_export_success": "CSV export successful!",
            "csv_import_success_short": "CSV import successful!",
            
            // MUI DashboardGrid
            "show_less_tags": "less",
            "show_more_tags": "more",
            
            // Pages
            "not_found": "404 - Page Not Found",
            "back_to_dashboard": "Back to Dashboard",
            "index_detail": "Index Details",
            "current_value": "Current Value",
            "history": "History",
            "no_history": "No history data available"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "de",
        fallbackLng: "en",
        interpolation: { escapeValue: false },
        debug: true
    });

export default i18n;