import React from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const CourseMaterialPage: React.FC = () => {
  const { department, courseId } = useParams<{ department: string; courseId: string }>();
  const { isDarkMode } = useTheme();

  const getCourseInfo = (id: string) => {
    const courses = {
      '1.1': { name: 'Architecture des ordinateurs', code: '1.1' },
      '1.2': { name: 'Système d\'exploitation', code: '1.2' },
      '2.1': { name: 'Algèbre matricielle', code: '2.1' },
      '2.2': { name: 'Analyse', code: '2.2' },
      '3.1': { name: 'Algorithmique', code: '3.1' },
      '3.2': { name: 'Programmation Python', code: '3.2' },
      '4.1': { name: 'Gestion électronique des documents', code: '4.1' },
      '4.2': { name: 'Documents structurés', code: '4.2' },
      '5.1': { name: 'Initiation aux réseaux informatiques', code: '5.1' },
      '5.2': { name: 'Réseaux sans fils et mobiles', code: '5.2' },
      '6.1': { name: 'Théorie des graphes', code: '6.1' },
      '6.2': { name: 'Optimisation', code: '6.2' },
      '7.1': { name: 'Économie générale', code: '7.1' },
      '7.2': { name: 'Micro et Macro-économie', code: '7.2' },
      '8.1': { name: 'Techniques d\'expression et de communication', code: '8.1' },
      '8.2': { name: 'English for General Purposes 1', code: '8.2' }
    };
    return courses[id as keyof typeof courses] || { name: 'Cours non trouvé', code: '' };
  };

  const courseInfo = getCourseInfo(courseId || '');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {courseInfo.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {department?.toUpperCase()} - Semestre 1
          </p>
        </div>

        {/* Course Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Materials */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Supports de cours
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Les supports de cours seront bientôt disponibles.
              </p>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ressources complémentaires
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Les ressources complémentaires seront bientôt disponibles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseMaterialPage; 