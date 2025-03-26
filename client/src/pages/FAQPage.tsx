import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-5 px-4 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div className="pb-5 px-4">
          <div className="text-base text-gray-600">{answer}</div>
        </div>
      )}
    </div>
  );
};

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: React.ReactNode;
}

const FAQPage: React.FC = () => {
  const categories = [
    { id: 'general', name: 'Général' },
    { id: 'wiki', name: 'Ressources' },
    { id: 'internships', name: 'Stages' },
    { id: 'account', name: 'Compte' },
    { id: 'technical', name: 'Technique' },
  ];

  const [openItems, setOpenItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('general');

  const toggleItem = (id: string) => {
    setOpenItems(prevOpenItems =>
      prevOpenItems.includes(id)
        ? prevOpenItems.filter(item => item !== id)
        : [...prevOpenItems, id]
    );
  };

  const faqData: FAQItem[] = [
    {
      id: 'general-1',
      category: 'general',
      question: "Qu'est-ce que le Wiki ESI 2027 ?",
      answer: (
        <p>
          Le Wiki ESI 2027 est une plateforme collaborative dédiée aux étudiants de la promotion 2027 
          de l'École Supérieure d'Informatique. Il permet de partager des connaissances, des astuces, 
          des ressources et des informations sur les stages.
        </p>
      ),
    },
    {
      id: 'general-2',
      category: 'general',
      question: "Comment puis-je contribuer au contenu du wiki ?",
      answer: (
        <p>
          Vous pouvez contribuer en vous connectant à votre compte et en utilisant l'éditeur de pages.
          Vous pouvez créer de nouvelles pages, modifier des pages existantes ou ajouter des commentaires.
          Toutes les contributions sont modérées pour assurer la qualité du contenu.
        </p>
      ),
    },
    {
      id: 'general-3',
      category: 'general',
      question: "Combien coûte l'utilisation de cette plateforme ?",
      answer: (
        <p>
          L'utilisation du Wiki ESI 2027 est entièrement gratuite pour tous les étudiants de la promotion.
          Le site est financé par l'association des étudiants et des dons d'anciens élèves.
        </p>
      ),
    },
    {
      id: 'wiki-1',
      category: 'wiki',
      question: "Comment rechercher des informations spécifiques ?",
      answer: (
        <p>
          Vous pouvez utiliser la barre de recherche située en haut de chaque page pour trouver des informations spécifiques.
          Vous pouvez également naviguer par catégories ou consulter les tags pour trouver du contenu pertinent.
        </p>
      ),
    },
    {
      id: 'wiki-2',
      category: 'wiki',
      question: "Comment sont organisées les informations sur le wiki ?",
      answer: (
        <p>
          Le contenu est organisé par catégories (cours, projets, ressources, etc.) et par tags.
          Chaque page peut appartenir à plusieurs catégories et avoir plusieurs tags pour faciliter la navigation.
        </p>
      ),
    },
    {
      id: 'wiki-3',
      category: 'wiki',
      question: "Puis-je télécharger des documents sur le wiki ?",
      answer: (
        <p>
          Oui, vous pouvez télécharger des documents utiles (PDF, DOC, etc.) en lien avec vos cours ou projets.
          Veuillez noter que seuls les documents libres de droits ou dont vous possédez les droits peuvent être partagés.
        </p>
      ),
    },
    {
      id: 'internships-1',
      category: 'internships',
      question: "Comment puis-je postuler à un stage affiché sur la plateforme ?",
      answer: (
        <p>
          Pour postuler à un stage, cliquez sur le bouton "Postuler" sur la page du stage qui vous intéresse.
          Vous serez invité à fournir votre CV et une lettre de motivation. Certaines entreprises peuvent
          demander des informations supplémentaires spécifiques à leur processus de recrutement.
        </p>
      ),
    },
    {
      id: 'internships-2',
      category: 'internships',
      question: "Puis-je ajouter une offre de stage que j'ai trouvée ailleurs ?",
      answer: (
        <p>
          Oui, vous pouvez soumettre des offres de stage que vous avez trouvées ailleurs en utilisant le formulaire
          "Soumettre une offre". L'équipe de modération vérifiera l'offre avant de la publier sur la plateforme
          pour s'assurer qu'elle est pertinente pour les étudiants de l'ESI.
        </p>
      ),
    },
    {
      id: 'account-1',
      category: 'account',
      question: "Comment puis-je réinitialiser mon mot de passe ?",
      answer: (
        <p>
          Pour réinitialiser votre mot de passe, cliquez sur "Mot de passe oublié" sur la page de connexion.
          Vous recevrez un email avec un lien pour réinitialiser votre mot de passe.
          Assurez-vous de vérifier votre dossier de spam si vous ne trouvez pas l'email.
        </p>
      ),
    },
    {
      id: 'account-2',
      category: 'account',
      question: "Comment modifier mon profil utilisateur ?",
      answer: (
        <p>
          Vous pouvez modifier votre profil en vous connectant à votre compte, puis en cliquant sur votre nom
          d'utilisateur dans le coin supérieur droit et en sélectionnant "Modifier le profil".
          Vous pourrez alors mettre à jour vos informations personnelles, votre avatar et vos préférences.
        </p>
      ),
    },
    {
      id: 'technical-1',
      category: 'technical',
      question: "Quels navigateurs sont pris en charge par le Wiki ESI 2027 ?",
      answer: (
        <p>
          Le Wiki ESI 2027 est compatible avec les versions récentes de Chrome, Firefox, Safari et Edge.
          Pour une expérience optimale, nous recommandons d'utiliser la dernière version de ces navigateurs.
        </p>
      ),
    },
    {
      id: 'technical-2',
      category: 'technical',
      question: "L'application est-elle accessible sur mobile ?",
      answer: (
        <p>
          Oui, le Wiki ESI 2027 est entièrement responsive et peut être utilisé sur des appareils mobiles.
          Nous avons optimisé l'interface pour qu'elle soit facile à utiliser sur des écrans de toutes tailles.
        </p>
      ),
    },
  ];

  const filteredFAQs = faqData.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-10">
          <h1 className="text-3xl font-bold text-white">Foire Aux Questions</h1>
          <p className="mt-2 text-indigo-100 max-w-xl">
            Trouvez des réponses aux questions les plus fréquemment posées à propos du Wiki ESI 2027.
          </p>
        </div>
        
        <div className="p-6 sm:p-8">
          {/* Category tabs */}
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
          
          {/* FAQ items */}
          <div className="divide-y divide-gray-200 rounded-lg bg-gray-50">
            {filteredFAQs.map(item => (
              <FAQItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openItems.includes(item.id)}
                onClick={() => toggleItem(item.id)}
              />
            ))}
          </div>
          
          {/* Still have questions section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Vous avez encore des questions?</h2>
            <p className="mt-2 text-gray-600">
              Si vous ne trouvez pas la réponse que vous cherchez, n'hésitez pas à nous contacter directement.
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

export default FAQPage; 