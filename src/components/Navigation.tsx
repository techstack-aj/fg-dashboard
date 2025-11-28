import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navigation: React.FC = () => {
  const { t } = useTranslation();
  // Wir nutzen explizite Styles, um Konflikte zwischen Tailwind und MUI zu vermeiden
  const navStyle: React.CSSProperties = {
    padding: '1rem',
    borderBottom: '1px solid #ccc',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'center', // Zentriert die Links
    gap: '1rem',              // Abstand zwischen Links
    fontFamily: 'Arial, sans-serif',  // Einheitliche Schriftart erzwingen
    fontSize: '16px',         // Einheitliche Schriftgröße
    lineHeight: '1.5',        // Einheitliche Zeilenhöhe
    letterSpacing: '0px'      // Einheitliche Laufweite
  };

  const getLinkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
    textDecoration: isActive ? 'underline' : 'none',
    color: isActive ? '#1976d2' : '#666',
    fontWeight: '500', // Immer gleiches Gewicht
    cursor: 'pointer'
  });

  return (
    <nav style={navStyle}>
      <NavLink to="/" style={getLinkStyle}>{t("original_dashboard")}</NavLink>
      <span style={{ color: '#ccc' }}>|</span>
      <NavLink to="/mui" style={getLinkStyle}>{t("mui_dashboard")}</NavLink>
    </nav>
  );
};

export default Navigation;
