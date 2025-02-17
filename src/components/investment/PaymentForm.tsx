import React, { useState } from 'react';
import { Shield, CreditCard } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import { paymentLogos } from '../../assets/payment-logos';

interface PaymentFormProps {
  amount: number;
}

export default function PaymentForm({ amount }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateOrderId = () => {
    return 'order-' + Math.random().toString(36).substring(2, 15);
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      const paymentData = {
        operationType: 1,
        language: "fr",
        payment: {
          methodId: 1,
          terminal: 77351,
          order: generateOrderId(),
          amount: Math.round(amount * 100).toString(), // Conversion en centimes
          currency: "EUR",
          originalIp: "127.0.0.1",
          secure: 1,
          userInteraction: 1,
          productDescription: "Investissement PaieCash",
          merchantCode: "48sfshfw",
          urlOk: "https://paiecash.fr/success",
          urlKO: "https://paiecash.fr/error"
        }
      };

      const response = await fetch('https://rest.paycomet.com/v1/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'PAYCOMET-API-TOKEN': '7e776b70e7650d1f0a94080bb25bbf7f345b11e8'
        },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();

      if (data.challengeUrl) {
        window.location.href = data.challengeUrl;
      } else {
        throw new Error('URL de paiement non reçue');
      }
    } catch (error) {
      console.error('Erreur de paiement:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue lors du paiement');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Paiement Sécurisé</h2>

      <div className="mb-8">
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Récapitulatif</h3>
          <div className="flex justify-between">
            <span>Montant total</span>
            <span className="font-bold">{formatCurrency(amount)}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Shield className="w-4 h-4" />
          <span>Vos données sont protégées et cryptées par PayCOMET</span>
        </div>

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all flex items-center justify-center gap-2 ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isProcessing ? (
            'Traitement en cours...'
          ) : (
            <>
              Payer {formatCurrency(amount)}
              <CreditCard className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-8">
        {Object.entries(paymentLogos).map(([name, src]) => (
          <img 
            key={name}
            src={src}
            alt={`${name} logo`}
            className="h-8 object-contain"
          />
        ))}
      </div>
    </div>
  );
}