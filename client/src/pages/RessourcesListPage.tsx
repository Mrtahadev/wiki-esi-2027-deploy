import React from 'react';
import { Link } from 'react-router-dom';

const RessourcesListPage: React.FC = () => {
  const departments = [
    {
      name: 'ICSD',
      color: 'from-blue-500 to-blue-700',
      hoverColor: 'group-hover:from-blue-600 group-hover:to-blue-800',
      options: [
        { name: 'Cours', path: '/ressources/icsd/cours' },
        { name: 'TPs', path: '/ressources/icsd/tps' },
        { name: 'Projets', path: '/ressources/icsd/projets' },
        { name: 'Documentation', path: '/ressources/icsd/docs' },
      ],
    },
    {
      name: 'ISSIC',
      color: 'from-purple-500 to-purple-700',
      hoverColor: 'group-hover:from-purple-600 group-hover:to-purple-800',
      options: [
        { name: 'Cours', path: '/ressources/issic/cours' },
        { name: 'TPs', path: '/ressources/issic/tps' },
        { name: 'Projets', path: '/ressources/issic/projets' },
        { name: 'Documentation', path: '/ressources/issic/docs' },
      ],
    },
    {
      name: 'IIN',
      color: 'from-green-500 to-green-700',
      hoverColor: 'group-hover:from-green-600 group-hover:to-green-800',
      options: [
        { name: 'Cours', path: '/ressources/iin/cours' },
        { name: 'TPs', path: '/ressources/iin/tps' },
        { name: 'Projets', path: '/ressources/iin/projets' },
        { name: 'Documentation', path: '/ressources/iin/docs' },
      ],
    },
    {
      name: 'ISITD',
      color: 'from-red-500 to-red-700',
      hoverColor: 'group-hover:from-red-600 group-hover:to-red-800',
      options: [
        { name: 'Cours', path: '/ressources/isitd/cours' },
        { name: 'TPs', path: '/ressources/isitd/tps' },
        { name: 'Projets', path: '/ressources/isitd/projets' },
        { name: 'Documentation', path: '/ressources/isitd/docs' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Ressources par Filière
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {departments.map((dept) => (
            <div key={dept.name} className="group relative h-64 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105">
              {/* Main Department Card */}
              <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} ${dept.hoverColor} transition-all duration-300`}>
                <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                  <h2 className="text-5xl font-bold text-white">{dept.name}</h2>
                </div>
              </div>
              
              {/* Options Grid on Hover */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {dept.options.map((option) => (
                  <Link
                    key={option.path}
                    to={option.path}
                    className="flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-xl shadow-md hover:bg-opacity-100 dark:hover:bg-opacity-100 transition-all duration-200 transform hover:scale-105"
                  >
                    <span className="text-xl font-semibold text-gray-900 dark:text-white">
                      {option.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RessourcesListPage; 