import React from 'react'
import ReactDOM from 'react-dom/client'
// import AppOriginal from './App'
// import AppMUI from './App-MUI'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
// TODO: Importiere BrowserRouter von 'react-router-dom'
// TODO: Importiere AppRouter (den du erstellt hast)

// ALTE LOGIK (Entfernen oder Auskommentieren):
// const useMUI = localStorage.getItem('dashboard-version') === 'mui';
// const App = useMUI ? AppMUI : AppOriginal;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            {/* TODO: Umschließe alles mit <BrowserRouter> */}
            {/* TODO: Rendere <AppRouter /> statt <App /> */}
            {/* <App />  <-- Das hier ersetzen */}
            <div>Bitte main.tsx für Router konfigurieren (siehe Kommentare)</div>
        </ThemeProvider>
    </React.StrictMode>,
)
