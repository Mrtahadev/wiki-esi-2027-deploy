import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  options: {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
  }[];
}

const departments: Department[] = [
  {
    id: 'informatique',
    name: 'ICSD',
    description: 'Ingénierie des Connaissances et Science des Données',
    icon: '',
    color: 'from-blue-600 via-indigo-500 to-purple-600',
    options: [
      {
        id: 'cours',
        name: 'Cours',
        description: 'Accédez aux cours magistraux',
        icon: '📚',
        color: 'from-blue-500 to-indigo-600'
      },
      {
        id: 'sommaire',
        name: 'Sommaire',
        description: 'Consultez les sommaires des cours',
        icon: '📑',
        color: 'from-green-500 to-emerald-600'
      },
      {
        id: 'td-tp',
        name: 'TD & TP',
        description: 'Travaux dirigés et pratiques',
        icon: '✍️',
        color: 'from-purple-500 to-pink-600'
      },
      {
        id: 'examens',
        name: 'Examens',
        description: 'Accédez aux examens des années précédentes',
        icon: '📝',
        color: 'from-red-500 to-rose-600'
      }
    ]
  },
  {
    id: 'civil',
    name: 'ISITD',
    description: 'Ingénierie des Systèmes d\'Information et de la Transformation Digitale',
    icon: '',
    color: 'from-emerald-500 via-teal-500 to-cyan-600',
    options: [
      {
        id: 'cours',
        name: 'Cours',
        description: 'Accédez aux cours magistraux',
        icon: '📚',
        color: 'from-blue-500 to-indigo-600'
      },
      {
        id: 'sommaire',
        name: 'Sommaire',
        description: 'Consultez les sommaires des cours',
        icon: '📑',
        color: 'from-green-500 to-emerald-600'
      },
      {
        id: 'td-tp',
        name: 'TD & TP',
        description: 'Travaux dirigés et pratiques',
        icon: '✍️',
        color: 'from-purple-500 to-pink-600'
      },
      {
        id: 'examens',
        name: 'Examens',
        description: 'Accédez aux examens des années précédentes',
        icon: '📝',
        color: 'from-red-500 to-rose-600'
      }
    ]
  },
  {
    id: 'electrique',
    name: 'ISSIC',
    description: 'Ingénierie de la Sécurité des Systèmes d\'Information et Cyberdéfense',
    icon: '',
    color: 'from-amber-500 via-orange-500 to-red-600',
    options: [
      {
        id: 'cours',
        name: 'Cours',
        description: 'Accédez aux cours magistraux',
        icon: '📚',
        color: 'from-blue-500 to-indigo-600'
      },
      {
        id: 'sommaire',
        name: 'Sommaire',
        description: 'Consultez les sommaires des cours',
        icon: '📑',
        color: 'from-green-500 to-emerald-600'
      },
      {
        id: 'td-tp',
        name: 'TD & TP',
        description: 'Travaux dirigés et pratiques',
        icon: '✍️',
        color: 'from-purple-500 to-pink-600'
      },
      {
        id: 'examens',
        name: 'Examens',
        description: 'Accédez aux examens des années précédentes',
        icon: '📝',
        color: 'from-red-500 to-rose-600'
      }
    ]
  },
  {
    id: 'industriel',
    name: 'IIN',
    description: 'Ingénierie de l\'Information Numérique',
    icon: '',
    color: 'from-violet-500 via-purple-500 to-fuchsia-600',
    options: [
      {
        id: 'cours',
        name: 'Cours',
        description: 'Accédez aux cours magistraux',
        icon: '📚',
        color: 'from-blue-500 to-indigo-600'
      },
      {
        id: 'sommaire',
        name: 'Sommaire',
        description: 'Consultez les sommaires des cours',
        icon: '📑',
        color: 'from-green-500 to-emerald-600'
      },
      {
        id: 'td-tp',
        name: 'TD & TP',
        description: 'Travaux dirigés et pratiques',
        icon: '✍️',
        color: 'from-purple-500 to-pink-600'
      },
      {
        id: 'examens',
        name: 'Examens',
        description: 'Accédez aux examens des années précédentes',
        icon: '📝',
        color: 'from-red-500 to-rose-600'
      }
    ]
  }
];

const WikiListPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleDepartmentClick = (departmentId: string, optionId: string) => {
    navigate(`/ressources/${departmentId}/${optionId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Ressources par filière
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Accédez aux ressources de votre filière
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {departments.map((department) => (
            <div
              key={department.id}
              className="relative h-[400px] group cursor-pointer"
              onClick={() => handleDepartmentClick(department.id, department.options[0].id)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${department.color} rounded-2xl shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl`}>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-2xl" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <h2 className="text-4xl font-bold text-white mb-4 transform transition-transform duration-300 group-hover:scale-105">{department.name}</h2>
                  <p className="text-white text-opacity-90 max-w-md text-lg">{department.description}</p>
                </div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4 p-6">
                    {department.options.map((option) => (
                      <div
                        key={option.id}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDepartmentClick(department.id, option.id);
                        }}
                      >
                        <div className="text-2xl mb-2">{option.icon}</div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{option.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{option.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WikiListPage; 