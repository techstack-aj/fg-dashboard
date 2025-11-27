import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
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
      <NavLink to="/" style={getLinkStyle}>Original Dashboard</NavLink>
      <span style={{ color: '#ccc' }}>|</span>
      <NavLink to="/mui" style={getLinkStyle}>MUI Dashboard</NavLink>
    </nav>
  );
};

export default Navigation;
