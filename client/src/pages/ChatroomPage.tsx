import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

const ChatroomPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bienvenue dans le salon de discussion ESI 2027!',
      sender: 'Système',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add the new message to the list
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: user?.name || 'Anonyme',
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // In a real app, you would send this message to your backend
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Salon de discussion ESI 2027</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.sender === (user?.name || 'Anonyme')
                  ? 'items-end'
                  : 'items-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md ${
                  message.sender === (user?.name || 'Anonyme')
                    ? 'bg-blue-500 text-white'
                    : message.sender === 'Système'
                    ? 'bg-gray-300 text-gray-800'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p>{message.text}</p>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                <span className="font-medium">{message.sender}</span> •{' '}
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écrivez un message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
      
      <div className="mt-6 bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-md">
        <p>
          <strong>Note:</strong> Ce salon de discussion est un exemple et n'est
          pas connecté à un backend. Les messages sont stockés localement et
          disparaîtront lors du rafraîchissement de la page.
        </p>
      </div>
    </div>
  );
};

export default ChatroomPage; 