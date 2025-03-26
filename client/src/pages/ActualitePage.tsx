import React from 'react';
import { Link } from 'react-router-dom';

interface NewsItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
}

const ActualitePage: React.FC = () => {
  // Sample news data - in a real app, this would come from an API
  const newsItems: NewsItem[] = [
    {
      id: 'news-1',
      date: '15 Novembre 2023',
      title: 'Conférence internationale sur l\'Intelligence Artificielle et la Science des Données',
      excerpt: 'L\'ESI organisera une conférence internationale sur l\'IA et la Science des Données du 5 au 7 décembre 2023. Des intervenants de renommée mondiale participeront à cet événement majeur.',
      category: 'événements'
    },
    {
      id: 'news-2',
      date: '10 Novembre 2023',
      title: 'Journée portes ouvertes à l\'ESI',
      excerpt: 'L\'ESI ouvre ses portes aux futurs étudiants le 25 novembre 2023. Une occasion unique de découvrir nos filières de formation et nos installations.',
      category: 'campus'
    },
    {
      id: 'news-3',
      date: '5 Novembre 2023',
      title: 'Signature d\'une convention de partenariat avec Microsoft',
      excerpt: 'L\'ESI a signé une convention de partenariat avec Microsoft pour renforcer les compétences des étudiants en matière de technologies cloud et d\'intelligence artificielle.',
      category: 'partenariats'
    },
    {
      id: 'news-4',
      date: '28 Octobre 2023',
      title: 'Hackathon ESI 2023 : Relevez le défi de l\'innovation',
      excerpt: 'Le Hackathon annuel de l\'ESI se tiendra du 15 au 17 décembre 2023. Inscrivez-vous dès maintenant pour participer à cette compétition axée sur les solutions innovantes pour le développement durable.',
      category: 'événements'
    },
    {
      id: 'news-5',
      date: '20 Octobre 2023',
      title: 'Lancement du nouveau laboratoire de recherche en IA',
      excerpt: 'L\'ESI inaugure son nouveau laboratoire de recherche dédié à l\'intelligence artificielle et aux technologies émergentes, offrant aux chercheurs et étudiants un environnement de pointe.',
      category: 'recherche'
    },
    {
      id: 'news-6',
      date: '15 Octobre 2023',
      title: 'Résultats du concours d\'admission au cycle d\'ingénieur',
      excerpt: 'Les résultats du concours d\'admission au cycle d\'ingénieur pour l\'année académique 2023-2024 sont désormais disponibles. Félicitations à tous les candidats admis !',
      category: 'admissions'
    }
  ];

  // Filter options for news categories
  const categories = ['tous', 'événements', 'campus', 'partenariats', 'recherche', 'admissions'];
  const [activeCategory, setActiveCategory] = React.useState('tous');

  const filteredNews = activeCategory === 'tous' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-10">
          <h1 className="text-3xl font-bold text-white">Actualités</h1>
          <p className="mt-2 text-indigo-100 max-w-xl">
            Restez informé des dernières nouvelles et événements de l'ESI 2027
          </p>
        </div>
        
        <div className="p-6 sm:p-8">
          {/* Category filter */}
          <div className="mb-8 border-b border-gray-200">
            <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium capitalize ${
                    activeCategory === category
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* News items */}
          <div className="space-y-8">
            {filteredNews.map(item => (
              <article key={item.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span className="capitalize">{item.category}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  <Link to={`/actualite/${item.id}`} className="hover:text-indigo-600 transition-colors">
                    {item.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <Link 
                  to={`/actualite/${item.id}`} 
                  className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
                >
                  Lire la suite
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-10 flex justify-between items-center border-t border-gray-200 pt-6">
            <button className="btn btn-outline text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              « Précédent
            </button>
            <span className="text-sm text-gray-700">Page 1 sur 1</span>
            <button className="btn btn-outline text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Suivant »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualitePage; 