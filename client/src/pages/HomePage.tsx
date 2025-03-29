import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { searchWikiPages, WikiPage } from '../services/wikiService';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<WikiPage[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setSearchError('');
    try {
      const results = await searchWikiPages(searchTerm);
      setSearchResults(results);
    } catch (error) {
      setSearchError('Une erreur est survenue lors de la recherche');
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Content */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Wiki ESI 2027
          </h1>
          <h2 className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
            Votre platform collaborative
          </h2>
          <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-8">
            Trouvez rapidement les ressources, cours et documents dont vous avez besoin.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher des ressources, cours, documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-6 py-4 text-xl font-medium border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-indigo-600 dark:bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Search Results */}
          {isSearching && (
            <div className="mt-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}

          {searchError && (
            <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
              {searchError}
            </div>
          )}

          {!isSearching && searchResults.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Résultats de la recherche</h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
                {searchResults.map((result) => (
                  <Link
                    key={result._id}
                    to={`/ressources/view/${result.slug}`}
                    className="block p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{result.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{result.content}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {result.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!isSearching && searchTerm && searchResults.length === 0 && (
            <div className="mt-8 text-center text-gray-600 dark:text-gray-300">
              Aucun résultat trouvé pour "{searchTerm}"
            </div>
          )}
        </div>

        {/* Hero Section with Gradient */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 dark:from-indigo-600 dark:to-blue-700 rounded-2xl overflow-hidden mb-16">
          <div className="px-8 py-16 text-center text-white">
            <h2 className="text-5xl font-extrabold mb-8">
              Bienvenue sur le Wiki ESI 2027
            </h2>
            <p className="text-2xl font-bold mb-10 max-w-4xl mx-auto">
              Une plateforme collaborative pour partager des connaissances, des astuces et des ressources.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/filieres" className="text-lg font-bold bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 px-8 py-4 rounded-lg transition-colors">
                Découvrir les filières
              </Link>
              <Link to="/actualite" className="text-lg font-bold bg-indigo-700 dark:bg-indigo-600 text-white hover:bg-indigo-800 dark:hover:bg-indigo-700 px-8 py-4 rounded-lg transition-colors">
                Actualités
              </Link>
              <Link to="/retour-experience" className="text-lg font-bold bg-blue-700 dark:bg-blue-600 text-white hover:bg-blue-800 dark:hover:bg-blue-700 px-8 py-4 rounded-lg transition-colors">
                Retours d'expérience
              </Link>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Recent Pages */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-500 dark:text-indigo-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Pages récentes
            </h3>
            <ul className="space-y-4">
              <li className="border-l-4 border-indigo-200 dark:border-indigo-700 pl-4 py-3 transition hover:border-indigo-500 dark:hover:border-indigo-400">
                <Link to="/ressources/view/introduction-programmation" className="text-xl font-bold text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Introduction à la programmation
                </Link>
                <p className="text-base font-medium text-gray-500 dark:text-gray-400 mt-1">Concepts fondamentaux pour les débutants</p>
              </li>
              <li className="border-l-4 border-indigo-200 dark:border-indigo-700 pl-4 py-3 transition hover:border-indigo-500 dark:hover:border-indigo-400">
                <Link to="/ressources/view/structures-donnees" className="text-xl font-bold text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Structures de données
                </Link>
                <p className="text-base font-medium text-gray-500 dark:text-gray-400 mt-1">Arrays, listes, arbres et graphes expliqués</p>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-500 dark:text-indigo-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Besoin d'aide?
            </h3>
            <div className="space-y-4">
              <div className="bg-indigo-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-indigo-800 dark:text-indigo-300">Assistant virtuel</h4>
                    <p className="mt-2 text-base font-medium text-indigo-700 dark:text-indigo-200">
                      Notre assistant est disponible 24/7 pour répondre à vos questions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-indigo-800 dark:text-indigo-300">FAQ</h4>
                    <p className="mt-2 text-base font-medium text-indigo-700 dark:text-indigo-200">
                      Consultez notre <Link to="/faq" className="text-indigo-900 dark:text-indigo-300 font-bold hover:underline">FAQ</Link> pour trouver des réponses aux questions fréquentes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 