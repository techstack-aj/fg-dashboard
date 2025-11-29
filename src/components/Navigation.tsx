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
    justifyContent: 'center',
    gap: '1rem',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
    letterSpacing: '0px'
  };

  const getLinkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
    textDecoration: isActive ? 'underline' : 'none',
    color: isActive ? '#1976d2' : '#666',
    fontWeight: '500',
    cursor: 'pointer'
  });

  return (
    <nav style={navStyle}>
      <NavLink to="/" style={getLinkStyle}>{t("original_dashboard")}</NavLink>
      <span style={{ color: '#ccc' }}>|</span>
      <NavLink to="/mui" style={getLinkStyle}>{t("mui_dashboard")}</NavLink>
      <span style={{ color: '#ccc' }}>|</span>
      <NavLink to="/virtual" style={getLinkStyle}>{t("virtualized_list")}</NavLink>
    </nav>
  );
};

export default React.memo(Navigation);
