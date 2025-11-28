import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter'
import './i18n/config'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <AppRouter />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
)
