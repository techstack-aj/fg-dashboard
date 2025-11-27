import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Seite nicht gefunden</h1>
      <p className="mb-6">Die gesuchte Seite existiert nicht.</p>
      <Link 
        to="/" 
        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Zur Startseite
      </Link>
    </div>
  );
};

export default NotFound;
