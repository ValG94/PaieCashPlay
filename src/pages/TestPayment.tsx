import React, { useState } from 'react';
import { PayCOMETService } from '../services/paycomet';
import { AlertCircle, CheckCircle2, Euro } from 'lucide-react';

export default function TestPayment() {
  const [testAmount, setTestAmount] = useState<number>(100);
  const [testResults, setTestResults] = useState<Array<{
    type: string;
    success: boolean;
    message: string;
    timestamp: Date;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTestResult = (type: string, success: boolean, message: string) => {
    setTestResults(prev => [{
      type,
      success,
      message,
      timestamp: new Date()
    }, ...prev]);
  };

  const handlePaymentTest = async () => {
    setIsLoading(true);
    try {
      addTestResult('info', true, `Démarrage du test de paiement pour ${testAmount}€`);
      
      const result = await PayCOMETService.createPaymentSession(testAmount);
      
      if (result.success) {
        addTestResult('success', true, `Session de paiement créée avec succès. ID: ${result.paymentId}`);
        
        if (result.paymentId) {
          const verificationResult = await PayCOMETService.verifyPaymentStatus(result.paymentId);
          addTestResult(
            'verify',
            verificationResult.success,
            verificationResult.success
              ? `Paiement vérifié avec succès. Statut: ${verificationResult.status}`
              : `Erreur de vérification: ${verificationResult.error}`
          );
        }
      } else {
        addTestResult('error', false, `Erreur: ${result.error}`);
      }
    } catch (error) {
      addTestResult('error', false, `Exception: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Test PayCOMET</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Merchant Code</p>
                <div className="bg-gray-50 p-2 rounded">
                  {import.meta.env.VITE_PAYCOMET_MERCHANT_CODE}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Terminal</p>
                <div className="bg-gray-50 p-2 rounded">
                  {import.meta.env.VITE_PAYCOMET_TERMINAL}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Test de Paiement</h2>
            
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant du test (€)
                </label>
                <input
                  type="number"
                  value={testAmount}
                  onChange={(e) => setTestAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  min="1"
                  step="1"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={handlePaymentTest}
                  disabled={isLoading}
                  className={`px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`}
                >
                  <Euro className="w-5 h-5" />
                  {isLoading ? 'Test en cours...' : 'Tester le paiement'}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg flex items-start gap-3 ${
                    result.type === 'error'
                      ? 'bg-red-50 text-red-700'
                      : result.type === 'success'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {result.type === 'error' ? (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : result.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{result.message}</p>
                    <p className="text-sm opacity-75">
                      {result.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}