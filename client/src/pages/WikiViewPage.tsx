import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getWikiPageBySlug, deleteWikiPage, WikiPage } from '../services/wikiService';
import { useAuth } from '../contexts/AuthContext';

const WikiViewPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [wikiPage, setWikiPage] = useState<WikiPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (slug) {
      const fetchWikiPage = async () => {
        try {
          const page = await getWikiPageBySlug(slug);
          setWikiPage(page);
        } catch (err) {
          setError('Erreur lors du chargement de la page');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchWikiPage();
    }
  }, [slug]);
  
  const handleDelete = async () => {
    if (!slug) return;
    
    try {
      setLoading(true);
      await deleteWikiPage(slug);
      navigate('/wiki');
    } catch (err) {
      setError('Erreur lors de la suppression de la page');
      console.error(err);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }
  
  if (!wikiPage) {
    return (
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Page non trouvée</h1>
        <p className="mb-4">La page que vous recherchez n'existe pas.</p>
        <Link to="/wiki" className="text-blue-600 hover:underline">Retour à la liste des pages</Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold">{wikiPage.title}</h1>
        
        {isAuthenticated && (
          <div className="flex space-x-2">
            <Link 
              to={`/wiki/edit/${slug}`}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              Modifier
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="prose max-w-none">
          {/* In a real app, you might use a Markdown renderer here */}
          {wikiPage.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
      
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <div>Dernière modification: {new Date(wikiPage.updatedAt).toLocaleDateString()}</div>
        <div className="mx-2">•</div>
        <div>Créé le: {new Date(wikiPage.createdAt).toLocaleDateString()}</div>
      </div>
      
      {wikiPage.tags && wikiPage.tags.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {wikiPage.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirmer la suppression</h2>
            <p className="mb-6">Êtes-vous sûr de vouloir supprimer cette page? Cette action est irréversible.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WikiViewPage; 