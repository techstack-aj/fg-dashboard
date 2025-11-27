import React from 'react';
// TODO: Importiere Link für den Weg zurück

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Seite nicht gefunden</h1>
      <p>Die gesuchte Seite existiert nicht.</p>
      {/* TODO: Link zur Startseite */}
    </div>
  );
};

export default NotFound;
