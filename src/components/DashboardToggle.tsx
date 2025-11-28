// DashboardToggle.tsx - Wechsel zwischen Original und MUI Dashboard
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function DashboardToggle() {
  const { t } = useTranslation();
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
      title={isMUI ? t("switch_to_original_title") : t("switch_to_mui_title")}
    >
      {isMUI ? t("switch_to_original") : t("switch_to_mui")}
    </button>
  );
}
