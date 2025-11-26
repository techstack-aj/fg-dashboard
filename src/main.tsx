import React from 'react'
import ReactDOM from 'react-dom/client'
import AppOriginal from './App'
import AppMUI from './App-MUI'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'

// Lade Dashboard-Präferenz aus LocalStorage
const useMUI = localStorage.getItem('dashboard-version') === 'mui';
const App = useMUI ? AppMUI : AppOriginal;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
)
