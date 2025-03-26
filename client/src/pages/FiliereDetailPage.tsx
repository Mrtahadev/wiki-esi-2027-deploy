import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';

interface Filiere {
  id: string;
  name: string;
  fullName: string;
  description: string;
  icon: string;
  image: string;
  careers: string[];
  program?: {
    semester1: string[];
    semester2: string[];
    semester3: string[];
    semester4: string[];
    semester5: string[];
    semester6: string[];
  };
  details?: string;
}

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
    ],
    program: {
      semester1: [
        'Architecture des ordinateurs et Systèmes d\'exploitation',
        'Mathématique pour l\'Ingénieur',
        'Algorithmique et Programmation',
        'Gestion électronique des documents et Documents structurés',
        'Réseaux informatiques',
        'Recherche Opérationnelle',
        'Économie de l\'Entreprise',
        'Anglais et TEC 1'
      ],
      semester2: [
        'Analyse et Conception des Bases de Données',
        'Probabilités et statistiques',
        'Programmation et Technologies Web',
        'Algorithmique et Programmation Avancées',
        'E-services et gestion de contenu d\'entreprise',
        'Gestion du capital immatériel',
        'Management pour l\'ingénieur',
        'Anglais et TEC 2'
      ],
      semester3: [
        'Analyse et Conduite de Projets',
        'Programmation Orientée Objet',
        'Statistiques Inférentielles et Processus Stochastiques',
        'Théorie de l\'Information et Traitement du Signal',
        'Fondements des systèmes intelligents',
        'Recherche Opérationnelle Avancée',
        'Data Acquisition and Analysis',
        'Project Management et Entrepreneuriat'
      ],
      semester4: [
        'Programmation avancée et mobile',
        'Bases de Données Avancées',
        'Modèles de régression et séries chronologiques',
        'Machine Learning',
        'Systèmes Répartis et Virtualisation',
        'Cryptocurrency Technologies',
        'Management Stratégique',
        'Anglais et TEC Professionnels'
      ],
      semester5: [
        'Business Intelligence',
        'Data Architecture',
        'Analyse et Conduite de Projet',
        'Systèmes ubiquitaires',
        'Computer Vision and Pattern Recognition',
        'Text and Graph Analysis',
        'Gestion des Risques et Innovation',
        'Méthodologie de recherche'
      ],
      semester6: [
        'Stage et Projet de Fin d\'Etude (PFE)'
      ]
    },
    details: 'La filière Information Science and Data (ISCD) forme des ingénieurs spécialisés dans l\'analyse, le traitement et la valorisation des données. Dans un monde où les données sont devenues un actif stratégique, nos diplômés acquièrent les compétences nécessaires pour transformer les données en informations pertinentes et exploitables.\n\nCette formation combine des fondamentaux solides en informatique et en mathématiques avec des compétences spécialisées en science des données, en intelligence artificielle et en apprentissage automatique. Les étudiants apprennent à concevoir et à mettre en œuvre des solutions innovantes pour extraire de la valeur à partir de grandes quantités de données structurées et non structurées.'
  },
  {
    id: 'iin',
    name: 'IIN',
    fullName: 'Information and Networks',
    description: 'Formation d\'ingénieurs spécialisés dans la gestion des infrastructures d\'information et des réseaux, avec une expertise en cybersécurité et administration système.',
    icon: 'M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000',
    careers: [
      'Ingénieur des Systèmes d\'Information',
      'Ingénieur développement web',
      'Consultant en technologies et services de l\'information',
      'Ingénieur en archivage numérique et dématérialisation',
      'Consultant en gestion de projets documentaires',
      'Responsable veille et intelligence compétitive',
      'Consultant en transformation digitale'
    ],
    program: {
      semester1: [
        'Architecture des ordinateurs et Systèmes d\'exploitation',
        'Mathématique pour l\'Ingénieur',
        'Algorithmique et Programmation',
        'Gestion électronique des documents et Documents structurés',
        'Réseaux informatiques',
        'Recherche Opérationnelle',
        'Économie de l\'Entreprise',
        'Anglais et TEC 1'
      ],
      semester2: [
        'Analyse et Conception des Bases de Données',
        'Probabilités et statistiques',
        'Programmation et Technologies Web',
        'Algorithmique et Programmation Avancées',
        'E-services et gestion de contenu d\'entreprise',
        'Gestion du capital immatériel',
        'Management pour l\'ingénieur',
        'Anglais et TEC 2'
      ],
      semester3: [
        'Conception et Programmation Orienté Objet',
        'Bases de Données avancés et administration des BD',
        'Fondements des systèmes intelligents',
        'Administration des systèmes',
        'Technologies de recherche d\'information',
        'Mathématique pour les sciences de données',
        'Project Management et Entrepreneuriat',
        'Anglais et TEC 3'
      ],
      semester4: [
        'Ontologies et web sémantique',
        'Ingénierie documentaire',
        'Traitement et indexation automatiques des documents',
        'Conception et gestion des contenus multimédia',
        'Ingénierie des connaissances',
        'Confiance numérique',
        'Gouvernance et mangement des Systèmes d\'Information',
        'Méthodologie de recherche'
      ],
      semester5: [
        'Technologies de données massives',
        'Business Intelligence',
        'Intelligence compétitive',
        'Analyse et extraction de connaissances',
        'Data and information governance',
        'Systèmes ubiquitaires',
        'Qualité et Audit des Systèmes d\'Information',
        'Développement personnel'
      ],
      semester6: [
        'Stage et Projet de Fin d\'Etude (PFE)'
      ]
    },
    details: 'La filière Information and Networks (IIN) forme des ingénieurs spécialisés dans la gestion des infrastructures d\'information et des réseaux. Dans un contexte de transformation numérique, cette filière prépare les étudiants à concevoir, déployer et sécuriser les systèmes d\'information et les réseaux de communication.\n\nLes étudiants développent une expertise dans la conception et l\'administration des infrastructures réseau, la cybersécurité, le cloud computing et les technologies émergentes comme l\'IoT. La formation met l\'accent sur la pratique à travers des projets concrets, des travaux pratiques en laboratoire et des stages en entreprise.'
  },
  {
    id: 'istd',
    name: 'ISTD',
    fullName: 'Information Science and Technology/Data',
    description: 'Formation d\'ingénieurs avec une double compétence en technologies de l\'information et en science des données, capables de concevoir et implémenter des architectures data-driven.',
    icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000',
    careers: [
      'Ingénieur des Systèmes d\'Information',
      'Ingénieur développement logiciel',
      'Consultant intégrateur de progiciel',
      'Urbaniste – architecte fonctionnel du S.I',
      'Développeur web et mobile',
      'Développeur full stack'
    ],
    program: {
      semester1: [
        'Architecture des ordinateurs et Systèmes d\'exploitation',
        'Mathématique pour l\'Ingénieur',
        'Algorithmique et Programmation',
        'Gestion électronique des documents et Documents structurés',
        'Réseaux informatiques',
        'Recherche Opérationnelle',
        'Économie de l\'Entreprise',
        'Anglais et TEC 1'
      ],
      semester2: [
        'Analyse et Conception des Bases de Données',
        'Probabilités et statistiques',
        'Programmation et Technologies Web',
        'Algorithmique et Programmation Avancées',
        'E-services et gestion de contenu d\'entreprise',
        'Gestion du capital immatériel',
        'Management pour l\'ingénieur',
        'Anglais et TEC 2'
      ],
      semester3: [
        'Conception et Programmation Orienté Objet',
        'Bases de Données avancés et administration des BD',
        'Fondements des systèmes intelligents',
        'Administration des systèmes',
        'Fondements pour les sciences de données',
        'Mathématique pour les sciences de données',
        'Project Management et Entrepreneuriat',
        'Anglais et TEC 3'
      ],
      semester4: [
        'Développement avancé',
        'Développement logiciel JEE',
        'Génie logiciel',
        'Développement web et mobile',
        'Ingénierie des connaissances',
        'Confiance numérique',
        'Gouvernance et mangement des Systèmes d\'Information',
        'Méthodologie de recherche'
      ],
      semester5: [
        'Technologies de données massives',
        'Business Intelligence',
        'Systèmes embarqués',
        'Transformation digitale et technologiques innovantes',
        'Urbanisation et intégration des Systèmes d\'Information',
        'Systèmes ubiquitaires',
        'Qualité et Audit des Systèmes d\'Information',
        'Développement personnel'
      ],
      semester6: [
        'Stage et Projet de Fin d\'Etude (PFE)'
      ]
    },
    details: 'La filière Information Science and Technology/Data (ISTD) forme des ingénieurs avec une double compétence en technologies de l\'information et en science des données. Cette filière répond aux besoins croissants des organisations en matière de gestion technique des données et d\'infrastructure technologique.\n\nLes étudiants développent des compétences en ingénierie des systèmes d\'information, en architecture de données et en développement de solutions informatiques. La formation intègre également des aspects de gouvernance des systèmes d\'information et de gestion de projet pour préparer les diplômés à des rôles de leadership dans la transformation numérique des organisations.'
  },
  {
    id: 'issic',
    name: 'ISSIC',
    fullName: 'Information Science and Information Systems/Communication',
    description: 'Formation d\'ingénieurs spécialisés dans la gestion de l\'information et la communication numérique, experts en knowledge management et stratégies de communication digitale.',
    icon: 'M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000',
    careers: [
      'Responsable de Sécurité des Systèmes d\'Information (RSSI)',
      'Ingénieur sécurité des systèmes d\'information',
      'Auditeur de sécurité des systèmes d\'information',
      'Gestionnaire des risques de sécurité des systèmes d\'information',
      'Chef de projet sécurité des systèmes d\'information',
      'Consultant en cybersécurité',
      'Intégrateur de solutions de sécurité des systèmes d\'information',
      'Architecte en sécurité des systèmes d\'information'
    ],
    program: {
      semester1: [
        'Architecture des ordinateurs et Systèmes d\'exploitation',
        'Mathématique pour l\'Ingénieur',
        'Algorithmique et Programmation',
        'Gestion électronique des documents et Documents structurés',
        'Réseaux informatiques',
        'Recherche Opérationnelle',
        'Économie de l\'Entreprise',
        'Anglais et TEC 1'
      ],
      semester2: [
        'Analyse et Conception des Bases de Données',
        'Probabilités et statistiques',
        'Programmation et Technologies Web',
        'Algorithmique et Programmation Avancées',
        'E-services et gestion de contenu d\'entreprise',
        'Gestion du capital immatériel',
        'Management pour l\'ingénieur',
        'Anglais et TEC 2'
      ],
      semester3: [
        'Analyse des systèmes et Conduite de Projet',
        'Programmation Orientée Objet',
        'Statistiques Inférentielles et Processus Stochastiques',
        'Fondements de la cyberdéfense',
        'Théorie de l\'Information et Traitement du Signal',
        'Administration réseau et Qos',
        'Project Management et Entrepreneuriat',
        'Anglais et TEC 3'
      ],
      semester4: [
        'Programmation avancée et mobile',
        'Sécurité des services et applications',
        'Mathématiques pour la sécurité',
        'Machine Learning',
        'Systèmes Répartis et Virtualisation',
        'Ingénierie de la cryptographie',
        'Gestion des identités et accès',
        'Management de la sécurité'
      ],
      semester5: [
        'Ethical hacking',
        'Systèmes embarqués et intelligents',
        'Sécurité réseaux et mobile',
        'Systèmes ubiquitaires',
        'Biometric Systems and Security',
        'Sécurité des systèmes distribués',
        'Gouvernance & Audit de la sécurité des Systèmes d\'Information',
        'Méthodologie de recherche'
      ],
      semester6: [
        'Stage et Projet de Fin d\'Etude (PFE)'
      ]
    },
    details: 'La filière Information Science and Information Systems/Communication (ISSIC) forme des ingénieurs spécialisés dans la gestion de l\'information et la communication numérique. Cette filière prépare les étudiants à concevoir et mettre en œuvre des stratégies de gestion de l\'information et de communication digitale au sein des organisations.\n\nLes étudiants acquièrent des compétences en organisation et structuration de l\'information, en knowledge management, en communication digitale et en veille stratégique. La formation intègre également des aspects juridiques et éthiques liés à la gestion de l\'information pour former des professionnels responsables et conscients des enjeux de leur domaine.'
  }
];

const FiliereDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const filiere = filieres.find(f => f.id === id);
  
  if (!filiere) {
    return <Navigate to="/filieres" />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header with gradient background */}
        <div className="relative h-60">
          <img 
            src={filiere.image} 
            alt={filiere.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-blue-700 opacity-75"></div>
          <div className="relative flex items-center h-full px-6 py-10">
            <div>
              <div className="bg-white p-2 rounded-lg inline-flex items-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-8 h-8 text-indigo-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={filiere.icon} />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white">{filiere.name}</h1>
              <p className="mt-2 text-xl text-indigo-100">{filiere.fullName}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 sm:p-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Présentation</h2>
            <div className="text-gray-700 whitespace-pre-line">
              {filiere.details}
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Programme</h2>
            
            {filiere.program && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-3">Semestre 1</h3>
                  <ul className="space-y-2">
                    {filiere.program.semester1.map((course, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-3">Semestre 2</h3>
                  <ul className="space-y-2">
                    {filiere.program.semester2.map((course, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-3">Semestre 3</h3>
                  <ul className="space-y-2">
                    {filiere.program.semester3.map((course, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-3">Semestre 4</h3>
                  <ul className="space-y-2">
                    {filiere.program.semester4.map((course, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-3">Semestre 5</h3>
                  <ul className="space-y-2">
                    {filiere.program.semester5.map((course, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-3">Semestre 6</h3>
                  <ul className="space-y-2">
                    {filiere.program.semester6.map((course, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Débouchés</h2>
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filiere.careers.map((career, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-indigo-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-800 font-medium">{career}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <Link 
              to="/filieres" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Retour aux filières
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
            >
              Demander des informations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiliereDetailPage; 