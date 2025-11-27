import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// TODO: Importiere deine Komponenten (IndexDetail)
import AppMUI from './App-MUI';
import App from './App';
import Navigation from './components/Navigation';
import NotFound from './pages/NotFound';

const AppRouter: React.FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mui" element={<AppMUI />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
