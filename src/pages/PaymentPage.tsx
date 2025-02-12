import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentForm from '../components/investment/PaymentForm';

export default function PaymentPage() {
  const location = useLocation();
  const amount = location.state?.amount || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Finaliser votre Investissement
          </h1>
          <p className="text-gray-600">
            Votre paiement est sécurisé par PayCOMET
          </p>
        </div>

        <PaymentForm amount={amount} />
      </div>
    </div>
  );
}