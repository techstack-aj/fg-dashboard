import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppMUI from './App-MUI';
import App from './App';
import AppVirtual from './App-Virtual';
import Navigation from './components/Navigation';

const IndexDetail = lazy(() => import('./pages/IndexDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppRouter: React.FC = () => {
  return (
    <>
      <Navigation />
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/mui" element={<AppMUI />} />
          <Route path="/virtual" element={<AppVirtual />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/index/:id" element={<IndexDetail />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRouter;
