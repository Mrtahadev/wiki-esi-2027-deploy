import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import axios from 'axios';

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  applicationUrl: string;
  postedDate: string;
  deadline: string;
}

const InternshipDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await axios.get(`${API_URL}/api/internships/${id}`);
        // setInternship(response.data);
        
        // Mock data for now
        setInternship({
          id: id || '1',
          title: 'Stage en Développement Web',
          company: 'TechMaroc',
          location: 'Casablanca, Maroc',
          description: 'Notre entreprise recherche un stagiaire en développement web pour participer à la création d\'applications web modernes. Le candidat idéal aura une bonne connaissance de HTML, CSS et JavaScript, et sera intéressé par l\'apprentissage de nouvelles technologies.\n\nDurée du stage: 2 mois.\nPossibilité d\'embauche à la fin du stage.',
          requirements: ['HTML/CSS', 'JavaScript', 'React (un plus)', 'Node.js (un plus)'],
          applicationUrl: 'https://example.com/apply',
          postedDate: new Date().toISOString(),
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching internship:', err);
        setError('Impossible de charger les détails du stage.');
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-6"></div>
          <div className="h-32 bg-gray-200 rounded-md mb-6"></div>
          <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-6"></div>
          <div className="h-10 bg-gray-200 rounded-md w-40"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Retour
        </button>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Stage non trouvé.
        </div>
        <Link
          to="/internships"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Voir tous les stages
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{internship.title}</h1>
          <div className="flex flex-wrap text-sm text-gray-600 mb-4">
            <span className="mr-4">
              <strong>Entreprise:</strong> {internship.company}
            </span>
            <span className="mr-4">
              <strong>Lieu:</strong> {internship.location}
            </span>
            <span>
              <strong>Date limite:</strong>{' '}
              {new Date(internship.deadline).toLocaleDateString()}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {internship.description}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Compétences requises</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {internship.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={internship.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
            >
              Postuler maintenant
            </a>
            
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
            >
              Retour
            </button>
          </div>
        </div>
        
        <div className="bg-gray-100 px-6 py-3 text-sm text-gray-600">
          <p>
            Posté le {new Date(internship.postedDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetailPage; 