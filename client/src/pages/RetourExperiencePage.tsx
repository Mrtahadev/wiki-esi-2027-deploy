import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Testimonial {
  id: string;
  name: string;
  promotion: string;
  position: string;
  company: string;
  photo: string;
  content: string;
  category: string;
}

const RetourExperiencePage: React.FC = () => {
  // Sample testimonial data
  const testimonials: Testimonial[] = [
    {
      id: 'testimonial-1',
      name: 'Ahmed Nouri',
      promotion: 'Promotion 2020',
      position: 'Data Scientist',
      company: 'Maroc Telecom',
      photo: '/default-avatar.png',
      content: 'Ma formation à l\'ESI m\'a fourni une base solide en science des données et en intelligence artificielle. Les projets pratiques et les stages m\'ont permis d\'acquérir une expérience précieuse qui a facilité mon insertion professionnelle. Aujourd\'hui, j\'applique quotidiennement les connaissances acquises à l\'ESI dans mon travail de Data Scientist.',
      category: 'alumni'
    },
    {
      id: 'testimonial-2',
      name: 'Fatima Zahra Benali',
      promotion: 'Promotion 2019',
      position: 'Chef de Projet Digital',
      company: 'OCP Group',
      photo: '/default-avatar.png',
      content: 'Les compétences en gestion de l\'information et en communication acquises à l\'ESI sont inestimables dans mon travail quotidien. La diversité des enseignements nous prépare à affronter des défis variés dans le monde professionnel. J\'ai particulièrement apprécié l\'approche par projets qui m\'a appris à travailler en équipe et à gérer des projets complexes.',
      category: 'alumni'
    },
    {
      id: 'testimonial-3',
      name: 'Karim Idrissi',
      promotion: 'Promotion 2021',
      position: 'Ingénieur en Cybersécurité',
      company: 'Tanger Med',
      photo: '/default-avatar.png',
      content: 'L\'ESI m\'a ouvert les portes du domaine passionnant de la cybersécurité. Grâce à des enseignants qualifiés et à des laboratoires bien équipés, j\'ai pu développer une expertise recherchée sur le marché du travail. Mon stage de fin d\'études s\'est transformé en une opportunité d\'emploi, et je suis reconnaissant envers l\'ESI pour cette transition réussie vers la vie professionnelle.',
      category: 'alumni'
    },
    {
      id: 'testimonial-4',
      name: 'Groupe CBI',
      promotion: '',
      position: 'Partenaire Entreprise',
      company: 'CBI',
      photo: '/default-avatar.png',
      content: 'Notre collaboration avec l\'ESI nous a permis de recruter des talents exceptionnels. Les diplômés de l\'ESI se distinguent par leur solide formation technique et leur capacité d\'adaptation rapide aux exigences du monde professionnel. Nous apprécions particulièrement leur maîtrise des nouvelles technologies et leur approche innovante de la résolution de problèmes.',
      category: 'companies'
    },
    {
      id: 'testimonial-5',
      name: 'Safae El Alami',
      promotion: 'Promotion 2022',
      position: 'Stagiaire en Data Engineering',
      company: 'IBM Maroc',
      photo: '/default-avatar.png',
      content: 'Mon stage chez IBM a été une expérience transformative qui m\'a permis d\'appliquer mes connaissances théoriques à des projets réels. J\'ai travaillé sur la mise en place d\'une architecture de données pour un grand client du secteur financier. L\'ESI m\'a très bien préparé aux défis techniques que j\'ai rencontrés pendant ce stage.',
      category: 'internships'
    },
    {
      id: 'testimonial-6',
      name: 'Youssef Benjelloun',
      promotion: 'Promotion 2020',
      position: 'Fondateur',
      company: 'DataMind',
      photo: '/default-avatar.png',
      content: 'L\'esprit entrepreneurial cultivé à l\'ESI m\'a encouragé à lancer ma propre startup spécialisée dans l\'analyse de données. Les connaissances techniques et les compétences en gestion de projet acquises pendant ma formation ont été essentielles pour développer mon entreprise. Je reviens régulièrement à l\'ESI pour partager mon expérience avec les étudiants actuels.',
      category: 'alumni'
    }
  ];

  // Filter options for testimonial categories
  const categories = [
    { id: 'all', name: 'Tous les témoignages' },
    { id: 'alumni', name: 'Anciens Étudiants' },
    { id: 'companies', name: 'Entreprises Partenaires' },
    { id: 'internships', name: 'Stages' }
  ];
  
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-10">
          <h1 className="text-3xl font-bold text-white">Retours d'Expérience</h1>
          <p className="mt-2 text-indigo-100 max-w-xl">
            Découvrez les témoignages de nos anciens étudiants et de nos partenaires
          </p>
        </div>
        
        <div className="p-6 sm:p-8">
          {/* Category filter */}
          <div className="mb-8 border-b border-gray-200">
            <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                    activeCategory === category.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="space-y-8">
            {filteredTestimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg 
                      className="w-8 h-8 text-gray-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <div className="text-sm text-gray-600">
                      {testimonial.promotion && (
                        <span className="block">{testimonial.promotion}</span>
                      )}
                      <span className="block">{testimonial.position} - {testimonial.company}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Share your experience section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Partagez votre expérience</h2>
            <p className="mt-2 text-gray-600">
              Vous êtes un ancien étudiant ou un partenaire de l'ESI? Nous serions ravis de connaître votre expérience.
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
              >
                Soumettre un témoignage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetourExperiencePage; 