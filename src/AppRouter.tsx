import React from 'react';
import { Routes, Route } from 'react-router-dom';
// TODO: Importiere deine Komponenten (IndexDetail, NotFound)
import AppMUI from './App-MUI';
import App from './App';
import Navigation from './components/Navigation';

const AppRouter: React.FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mui" element={<AppMUI />} />
      </Routes>
    </>
  );
};

export default AppRouter;
