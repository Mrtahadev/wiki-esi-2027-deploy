import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Non Trouvée</h2>
      <p className="text-gray-600 mb-8">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md"
      >
        Retourner à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage; 