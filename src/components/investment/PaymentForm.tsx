import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const initPayCOMET = async () => {
      try {
        await PayCOMETService.initialize();
      } catch (error) {
        console.error('Erreur d\'initialisation PayCOMET:', error);
        setError('Erreur lors de l\'initialisation du système de paiement');
      }
    };

    initPayCOMET();
  }, []);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      const result = await PayCOMETService.createPaymentSession(amount);

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors du traitement du paiement');
      }

      // Le paiement est géré par l'iframe PayCOMET
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