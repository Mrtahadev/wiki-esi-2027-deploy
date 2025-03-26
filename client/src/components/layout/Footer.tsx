import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Wiki ESI 2027</h3>
            <p className="text-gray-400 mt-1">
              Plateforme collaborative pour les étudiants de l'ESI
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-4 md:mb-0">
              <h4 className="font-semibold mb-2">Liens</h4>
              <ul className="space-y-1">
                <li><a href="/" className="text-gray-400 hover:text-white">Accueil</a></li>
                <li><a href="/wiki" className="text-gray-400 hover:text-white">Wiki</a></li>
                <li><a href="/internships" className="text-gray-400 hover:text-white">Stages</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <ul className="space-y-1">
                <li className="text-gray-400">contact@esi2027.ma</li>
                <li className="text-gray-400">Rabat, Maroc</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Wiki ESI 2027. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 