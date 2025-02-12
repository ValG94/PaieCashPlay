import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import InvestmentTable from '../components/investment/InvestmentTable';

export default function InvestmentPage() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      {/* Navigation Elements */}
      <button
        onClick={handleNavigateHome}
        className="fixed top-8 left-8 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        aria-label="Retour à l'accueil"
      >
        <ArrowLeft className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
      </button>

      <button
        onClick={handleNavigateHome}
        className="fixed top-8 right-8 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        aria-label="Fermer"
      >
        <X className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
      </button>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Investissez dans l'Avenir du Sport
          </h1>
          <p className="text-gray-600 mb-8">
            Choisissez votre type d'investissement et simulez votre rendement
          </p>
        </div>

        <InvestmentTable />
      </div>
    </div>
  );
}