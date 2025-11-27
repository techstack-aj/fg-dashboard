// DashboardToggle.tsx - Wechsel zwischen Original und MUI Dashboard
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DashboardToggle() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Prüfen, ob wir auf der MUI-Seite sind (Pfad beginnt mit /mui)
  const isMUI = location.pathname.startsWith('/mui');

  const toggleDashboard = () => {
    if (isMUI) {
      navigate('/');
    } else {
      navigate('/mui');
    }
  };

  // Feste Styles für Konsistenz
  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    backgroundColor: '#2563eb', // Tailwind blue-600
    color: 'white',
    fontWeight: 500,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    zIndex: 50,
    fontFamily: 'Arial, sans-serif', // Gleiche Schrift wie Navigation
    fontSize: '16px'
  };

  return (
    <button
      onClick={toggleDashboard}
      style={buttonStyle}
      title={`Wechsel zu ${isMUI ? 'Original' : 'MUI'} Dashboard`}
    >
      {isMUI ? '🎨 → Original' : '🎨 → MUI'}
    </button>
  );
}
