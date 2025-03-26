import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour! Je suis le chatbot ESI 2027. Comment puis-je vous aider?',
      isBot: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      // Simple response logic based on keywords
      const response = generateResponse(input.toLowerCase());
      
      // Add bot response with a small delay to simulate typing
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 100).toString(),
          text: response,
          isBot: true
        };
        
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error in chatbot:', error);
      
      // Add error message
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 100).toString(),
          text: "Je suis désolé, je rencontre un problème technique. Veuillez réessayer plus tard.",
          isBot: true
        };
        
        setMessages((prev) => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const generateResponse = (input: string): string => {
    // Simple keyword-based responses
    if (input.includes('bonjour') || input.includes('salut')) {
      return "Bonjour! Comment puis-je vous aider aujourd'hui?";
    }
    if (input.includes('cours') || input.includes('matière')) {
      return "Vous pouvez trouver tous les cours dans la section 'Ressources'. Je peux vous aider à naviguer vers cette section.";
    }
    if (input.includes('stage') || input.includes('internship')) {
      return "Les offres de stage sont disponibles dans la section 'Stages'. Vous y trouverez toutes les opportunités disponibles.";
    }
    if (input.includes('ressources')) {
      return "Les ressources contiennent des informations utiles sur la vie étudiante, les cours, et plus encore. Vous pouvez les consulter dans la section 'Ressources'.";
    }
    if (input.includes('merci')) {
      return "Je vous en prie! N'hésitez pas si vous avez d'autres questions.";
    }
    if (input.includes('au revoir') || input.includes('bye')) {
      return "Au revoir! N'hésitez pas à revenir si vous avez d'autres questions.";
    }
    
    // Default response for unknown queries
    return "Je ne suis pas sûr de comprendre votre question. Pouvez-vous la reformuler? Je peux vous aider avec les cours, les stages, les ressources, et plus encore.";
  };

  return (
    <div className="fixed bottom-4 right-4 z-10">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-80 md:w-96 flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">Assistant ESI 2027</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto max-h-80 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 flex ${
                  message.isBot ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-xs ${
                    message.isBot
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-3 flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="p-3 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chatbot; 