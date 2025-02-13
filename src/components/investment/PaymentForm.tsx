import React, { useState } from 'react';
import { Shield, CreditCard } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';
import { PayCOMETService } from '../../services/paycomet';
import { paymentLogos } from '../../assets/payment-logos';

interface PaymentFormProps {
  amount: number;
}

export default function PaymentForm({ amount }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // Initialiser PayCOMET
      PayCOMETService.initialize();

      // Créer la session de paiement
      await PayCOMETService.createPaymentSession(amount);

      // La redirection est gérée dans le service PayCOMET
    } catch (error) {
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