import React from 'react';
import { Link } from 'react-router-dom';

interface Filiere {
  id: string;
  name: string;
  fullName: string;
  description: string;
  icon: string;
  image: string;
  careers: string[];
}

const FilieresPage: React.FC = () => {
  const filieres: Filiere[] = [
    {
      id: 'iscd',
      name: 'ISCD',
      fullName: 'Information Science and Data',
      description: 'Formation d\'ingénieurs spécialisés dans l\'analyse, le traitement et la valorisation des données massives, avec des compétences en intelligence artificielle et data science.',
      icon: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000',
      careers: [
        'Ingénieur Big Data',
        'Ingénieur Machine Learning et Deep Learning',
        'Ingénieur Business Intelligence',
        'Ingénieur Cloud Computing',
        'Ingénieur Computer Vision',
        'Data Analyst',
        'Data Scientist',
        'Data Architect'
      ]
    },
    {
      id: 'iin',
      name: 'IIN',
      fullName: 'Information and Networks',
      description: 'Formation d\'ingénieurs spécialisés dans la gestion des infrastructures d\'information et des réseaux, avec une expertise en cybersécurité et administration système.',
      icon: 'M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000',
      careers: ['Architecte réseau', 'Ingénieur systèmes et réseaux', 'Ingénieur cybersécurité', 'Administrateur cloud']
    },
    {
      id: 'istd',
      name: 'ISTD',
      fullName: 'Information Science and Technology/Data',
      description: 'Formation d\'ingénieurs avec une double compétence en technologies de l\'information et en science des données, capables de concevoir et implémenter des architectures data-driven.',
      icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000',
      careers: ['Architecte de systèmes d\'information', 'Ingénieur en technologies de l\'information', 'Data Engineer', 'Chef de projet IT']
    },
    {
      id: 'issic',
      name: 'ISSIC',
      fullName: 'Information Science and Information Systems/Communication',
      description: 'Formation d\'ingénieurs spécialisés dans la gestion de l\'information et la communication numérique, experts en knowledge management et stratégies de communication digitale.',
      icon: 'M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000',
      careers: ['Responsable de la gestion de l\'information', 'Chef de projet en communication digitale', 'Digital Content Manager', 'Consultant en knowledge management']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-10">
          <h1 className="text-3xl font-bold text-white">Nos Filières</h1>
          <p className="mt-2 text-indigo-100 max-w-xl">
            Découvrez nos filières d'ingénierie en sciences de l'information
          </p>
        </div>
        
        <div className="p-6 sm:p-8">
          <p className="text-gray-600 mb-8">
            L'ESI propose plusieurs filières d'excellence pour former des ingénieurs spécialisés dans différents domaines des sciences de l'information. Chaque filière est conçue pour répondre aux besoins du marché du travail et aux défis technologiques actuels.
          </p>
          
          {/* Filières grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {filieres.map(filiere => (
              <div key={filiere.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={filiere.image} 
                    alt={filiere.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-indigo-100 p-2 rounded-md mr-3">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-6 h-6 text-indigo-600"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d={filiere.icon} />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{filiere.name}</h2>
                      <p className="text-sm text-gray-600">{filiere.fullName}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{filiere.description}</p>
                  
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Débouchés:</h3>
                  <ul className="text-sm text-gray-600 mb-5 list-disc list-inside space-y-1">
                    {filiere.careers.map((career, index) => (
                      <li key={index}>{career}</li>
                    ))}
                  </ul>
                  
                  <Link 
                    to={`/filieres/${filiere.id}`} 
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    En savoir plus
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Contact section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Besoin de plus d'informations?</h2>
            <p className="mt-2 text-gray-600">
              Nos équipes pédagogiques sont à votre disposition pour répondre à toutes vos questions concernant nos filières de formation.
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
              >
                Contactez-nous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilieresPage; 