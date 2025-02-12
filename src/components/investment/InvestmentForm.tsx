import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CreditCard } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

interface InvestmentFormProps {
  onSubmit: (amount: number) => void;
}

export default function InvestmentForm({ onSubmit }: InvestmentFormProps) {
  const [amount, setAmount] = useState<number>(10000);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(amount);
    navigate('/payment', { state: { amount } });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Votre Investissement</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Montant de l'investissement
          </label>
          <div className="relative">
            <input
              type="number"
              min="50"
              step="50"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              €
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">Montant minimum : 1 000€</p>
        </div>

        <div className="bg-secondary/5 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Résumé de l'investissement</h3>
          <div className="flex justify-between mb-2">
            <span>Montant investi</span>
            <span>{formatCurrency(amount)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Rendement estimé (35%)</span>
            <span className="text-primary">
              {formatCurrency(amount * 1.35)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Lock className="w-4 h-4" />
          <span>Paiement sécurisé via PayCOMET</span>
        </div>

        <button
          type="submit"
          className="w-full px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
        >
          Procéder au paiement
          <CreditCard className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
