import React from 'react';
import { CreditCard, Store, Bot, Video, BarChart as ChartBar } from 'lucide-react';

export default function Solution() {
  const solutions = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "PaieCash",
      description: "Plateforme de paiement sécurisée avec carte digitale multidevises et transactions via blockchain"
    },
    {
      icon: <Store className="w-6 h-6" />,
      title: "PaieCashStore",
      description: "Marketplace dédiée aux clubs avec e-commerce intégré et CRM supporter personnalisé"
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "PaieCashBot",
      description: "Chatbot IA 24/7 pour une interaction fluide avec les fans et support en temps réel"
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "PaieCashPStream",
      description: "Solution de streaming haute qualité pour matchs, entraînements et contenus exclusifs"
    },
    {
      icon: <ChartBar className="w-6 h-6" />,
      title: "Outils de Monétisation",
      description: "Analytics avancés et outils de gestion pour optimiser les revenus des clubs"
    }
  ];

  return (
    <section id="solution" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-6">
          Nos Solutions Technologiques
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          Une suite complète d'outils innovants pour transformer l'expérience des fans et optimiser la gestion des clubs
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl bg-gray-50 hover:bg-secondary/5 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
              style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease-in-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                {solution.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
              <p className="text-gray-600">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}