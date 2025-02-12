import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { PayCOMETService } from '../../services/paycomet';

interface PaymentStatusProps {
  paymentId: string;
}

export default function PaymentStatus({ paymentId }: PaymentStatusProps) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const result = await PayCOMETService.verifyPaymentStatus(paymentId);
      
      if (result.success) {
        setStatus('success');
        setMessage('Votre paiement a été traité avec succès');
        setTimeout(() => navigate('/success'), 2000);
      } else {
        setStatus('error');
        setMessage(result.error || 'Une erreur est survenue');
      }
    };

    checkPaymentStatus();
  }, [paymentId, navigate]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md mx-4">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Vérification du paiement
              </h3>
              <p className="text-gray-600">Veuillez patienter...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Paiement réussi</h3>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Erreur de paiement</h3>
              <p className="text-gray-600">{message}</p>
              <button
                onClick={() => navigate('/invest')}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Réessayer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}