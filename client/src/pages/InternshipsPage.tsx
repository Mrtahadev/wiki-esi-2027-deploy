import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import axios from 'axios';

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  deadline: string;
}

const InternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await axios.get(`${API_URL}/api/internships`);
        // setInternships(response.data);
        
        // Mock data for now
        setInternships([
          {
            id: '1',
            title: 'Stage en Développement Web',
            company: 'TechMaroc',
            location: 'Casablanca, Maroc',
            postedDate: new Date().toISOString(),
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            title: 'Stage en Intelligence Artificielle',
            company: 'DataScience Maroc',
            location: 'Rabat, Maroc',
            postedDate: new Date().toISOString(),
            deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '3',
            title: 'Stage en Cybersécurité',
            company: 'SecuriTech',
            location: 'Tanger, Maroc',
            postedDate: new Date().toISOString(),
            deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
          }
        ]);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching internships:', err);
        setError('Impossible de charger les stages disponibles.');
        setLoading(false);
      }
    };
    
    fetchInternships();
  }, []);
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Stages disponibles</h1>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white shadow-md rounded-md p-4">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Stages disponibles</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Stages disponibles</h1>
      
      {internships.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Aucun stage disponible pour le moment.
        </div>
      ) : (
        <div className="space-y-4">
          {internships.map((internship) => (
            <div key={internship.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  <Link to={`/internships/${internship.id}`} className="text-blue-600 hover:text-blue-800">
                    {internship.title}
                  </Link>
                </h2>
                <div className="flex flex-wrap text-sm text-gray-600 mb-3">
                  <span className="mr-4">
                    <strong>Entreprise:</strong> {internship.company}
                  </span>
                  <span>
                    <strong>Lieu:</strong> {internship.location}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Date limite:</strong>{' '}
                    {new Date(internship.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/internships/${internship.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm"
                  >
                    Voir détails
                  </Link>
                </div>
              </div>
              <div className="bg-gray-100 px-6 py-2 text-xs text-gray-600">
                Posté le {new Date(internship.postedDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InternshipsPage; 