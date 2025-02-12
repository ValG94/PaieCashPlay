import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Info,
  TrendingUp,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InvestmentOption {
  type: 'ordinary' | 'preferred' | 'bond';
  duration: number;
  amount: number;
}

export default function InvestmentTable() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'ordinary' | 'preferred' | 'bond'>('ordinary');
  const [amount, setAmount] = useState<number>(10000);
  const [duration, setDuration] = useState<number>(5);
  const [interestType, setInterestType] = useState<'simple' | 'compound'>('simple');
  const [results, setResults] = useState<any>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const CAPITAL_RATIO = 20000; // 20 000€ = 1% du capital

  const getMinimumAmount = (type: 'ordinary' | 'preferred' | 'bond'): number => {
    return type === 'bond' ? 50 : 10000;
  };

  const handleTypeChange = (type: 'ordinary' | 'preferred' | 'bond') => {
    setSelectedType(type);
    setAmount(getMinimumAmount(type));
  };

  const calculateCapitalShare = (investmentAmount: number): number => {
    return (investmentAmount / CAPITAL_RATIO) * 1; // Calcul du pourcentage
  };

  const getBondInterestRate = (amount: number, duration: number): number => {
    if (amount < 500) {
      return 0.07; // 7% pour les montants < 500€
    }
    
    // Pour les montants >= 500€, utiliser les taux existants
    const interestRates = {
      3: 0.12, // 12% pour 3 ans
      5: 0.14, // 14% pour 5 ans
      8: 0.16, // 16% pour 8 ans
    };
    return interestRates[duration as keyof typeof interestRates];
  };

  const calculateCompoundInterest = (principal: number, rate: number, time: number): number => {
    return principal * Math.pow(1 + rate, time) - principal;
  };

  const calculateSimpleInterest = (principal: number, rate: number, time: number): number => {
    return principal * rate * time;
  };

  const isFormValid = () => {
    const minimumAmount = getMinimumAmount(selectedType);
    return amount >= minimumAmount && (selectedType !== 'bond' || duration > 0);
  };

  const handleInvestClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmInvestment = () => {
    setShowConfirmation(false);
    navigate('/payment', { state: { amount, type: selectedType, duration } });
  };

  const calculateInvestment = () => {
    let calculatedResults = {
      capitalShare: 0,
      fees: 0,
      expectedReturn: 0,
      totalValue: 0,
      annualYield: 0,
      guaranteedDividend: 0,
      interestEarned: 0,
    };

    switch (selectedType) {
      case 'ordinary':
        calculatedResults.capitalShare = calculateCapitalShare(amount);
        calculatedResults.fees = amount * 0.02;
        calculatedResults.guaranteedDividend = amount * 0.05;
        calculatedResults.expectedReturn = amount * 0.05;
        break;

      case 'preferred':
        calculatedResults.capitalShare = calculateCapitalShare(amount);
        calculatedResults.fees = amount * 0.015;
        calculatedResults.guaranteedDividend = amount * 0.08;
        calculatedResults.annualYield = amount * 0.08;
        break;

      case 'bond':
        const interestRate = getBondInterestRate(amount, duration);
        calculatedResults.interestEarned = interestType === 'compound'
          ? calculateCompoundInterest(amount, interestRate, duration)
          : calculateSimpleInterest(amount, interestRate, duration);
        calculatedResults.totalValue = amount + calculatedResults.interestEarned;
        calculatedResults.annualYield = interestRate * 100;
        break;
    }

    setResults(calculatedResults);
  };

  useEffect(() => {
    calculateInvestment();
  }, [selectedType, amount, duration, interestType]);

  const renderImportantInfo = () => {
    if (selectedType === 'bond') {
      return (
        <ul className="space-y-2 text-sm text-gray-600">
          <li>Période minimale de détention : 3 ans</li>
          <li>
            Conditions de sortie : Les obligations seront remboursées à maturité ou selon les conditions convenues
          </li>
          <li>Investissement soumis aux risques du marché</li>
        </ul>
      );
    }

    return (
      <ul className="space-y-2 text-sm text-gray-600">
        <li>Période minimale de détention : 5 ans</li>
        <li>
          La rentabilité dépendra de la performance financière de l'entreprise
        </li>
        <li>
          Conditions de sortie : Les actionnaires auront la possibilité de vendre leur actions après 5 ans, soit à un autre investisseur sous certaines conditions,
          soit à l'entreprise via un rachat interne
        </li>
        <li>Investissement soumis aux risques de marché</li>
      </ul>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Simulateur d'Investissement</h2>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <button
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedType === 'ordinary'
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 hover:border-primary/50'
            }`}
            onClick={() => handleTypeChange('ordinary')}
          >
            <h3 className="font-semibold mb-2">Actions Ordinaires</h3>
            <p className="text-sm text-gray-600">Minimum 10 000€</p>
          </button>

          <button
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedType === 'preferred'
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 hover:border-primary/50'
            }`}
            onClick={() => handleTypeChange('preferred')}
          >
            <h3 className="font-semibold mb-2">Actions Préférentielles</h3>
            <p className="text-sm text-gray-600">Minimum 10 000€</p>
          </button>

          <button
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedType === 'bond'
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 hover:border-primary/50'
            }`}
            onClick={() => handleTypeChange('bond')}
          >
            <h3 className="font-semibold mb-2">Obligations</h3>
            <p className="text-sm text-gray-600">Minimum 50€</p>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Montant de l'investissement (€)
            </label>
            <input
              type="number"
              min={getMinimumAmount(selectedType)}
              step={selectedType === 'bond' ? 50 : 10000}
              value={amount}
              onChange={(e) => {
                const newAmount = Number(e.target.value);
                const minAmount = getMinimumAmount(selectedType);
                setAmount(Math.max(newAmount, minAmount));
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <p className="mt-1 text-sm text-gray-500">
              Minimum : {selectedType === 'bond' ? '50€' : '10 000€'}
            </p>
          </div>

          {selectedType === 'bond' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durée (années)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value={3}>3 ans</option>
                  <option value={5}>5 ans</option>
                  <option value={8}>8 ans</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'intérêts
                </label>
                <select
                  value={interestType}
                  onChange={(e) => setInterestType(e.target.value as 'simple' | 'compound')}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="simple">Intérêts simples</option>
                  <option value="compound">Intérêts composés</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">
          Récapitulatif de l'Investissement
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Détails de l'Investissement
            </h4>
            <ul className="space-y-2">
              {(selectedType === 'ordinary' || selectedType === 'preferred') && (
                <>
                  <li>Part du capital : {results?.capitalShare.toFixed(2)}%</li>
                  <li>Frais de gestion : {results?.fees.toFixed(2)}€</li>
                  <li>
                    Dividende annuel garanti :{' '}
                    {results?.guaranteedDividend.toFixed(2)}€
                  </li>
                  {selectedType === 'ordinary' && (
                    <li>
                      Rendement estimé : {results?.expectedReturn.toFixed(2)}€
                    </li>
                  )}
                </>
              )}
              {selectedType === 'bond' && (
                <>
                  <li>Taux d'intérêt annuel : {results?.annualYield.toFixed(2)}%</li>
                  <li>Intérêts gagnés : {results?.interestEarned.toFixed(2)}€</li>
                  <li>Valeur à maturité : {results?.totalValue.toFixed(2)}€</li>
                  <li>Type d'intérêts : {interestType === 'simple' ? 'Simples' : 'Composés'}</li>
                  <li>Durée : {duration} ans</li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Informations Importantes
            </h4>
            {renderImportantInfo()}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-8">
        <p className="text-sm text-yellow-800 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          L'investissement en actions comporte des risques. Il est recommandé de
          diversifier vos placements.
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={handleInvestClick}
          disabled={!isFormValid()}
          className={`
            px-8 py-4 rounded-full flex items-center justify-center gap-2 w-full md:w-auto mx-auto
            ${
              isFormValid()
                ? 'bg-primary text-white hover:bg-primary/90 transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
            transition-all duration-300 shadow-lg hover:shadow-xl
          `}
        >
          <Lock className="w-5 h-5" />
          Investir {amount.toLocaleString('fr-FR')}€
        </button>

        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600">
          <ShieldCheck className="w-4 h-4" />
          Transaction sécurisée via notre plateforme certifiée
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4">
            <h3 className="text-2xl font-bold mb-4">
              Confirmer votre investissement
            </h3>
            <div className="mb-6">
              <p className="mb-4">Vous êtes sur le point d'investir :</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-xl text-primary">
                  {amount.toLocaleString('fr-FR')}€
                </p>
                <p className="text-gray-600">
                  en{' '}
                  {selectedType === 'ordinary'
                    ? 'actions ordinaires'
                    : selectedType === 'preferred'
                    ? 'actions préférentielles'
                    : 'obligations'}
                </p>
                {selectedType === 'bond' && (
                  <p className="text-gray-600">Durée : {duration} ans</p>
                )}
                {(selectedType === 'ordinary' || selectedType === 'preferred') && (
                  <p className="text-gray-600">
                    Part du capital : {results?.capitalShare.toFixed(2)}%
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmInvestment}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}