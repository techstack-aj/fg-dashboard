import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{t("not_found")}</h1>
      <p className="mb-6">{t("not_found")}</p>
      <Link 
        to="/" 
        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        {t("back_to_dashboard")}
      </Link>
    </div>
  );
};

export default NotFound;
