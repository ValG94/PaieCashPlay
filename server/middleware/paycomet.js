import { paycometConfig } from '../config/paycomet.js';

export const validatePaycometRequest = (req, res, next) => {
  const { PAYCOMET_API_KEY, VITE_PAYCOMET_MERCHANT_CODE, VITE_PAYCOMET_TERMINAL } = process.env;
  console.log('PAYCOMET_API_KEY:', process.env.PAYCOMET_API_KEY);
  console.log('VITE_PAYCOMET_MERCHANT_CODE:', process.env.VITE_PAYCOMET_MERCHANT_CODE);
  console.log('VITE_PAYCOMET_TERMINAL:', process.env.VITE_PAYCOMET_TERMINAL);

  
  if (!PAYCOMET_API_KEY || !VITE_PAYCOMET_MERCHANT_CODE || !VITE_PAYCOMET_TERMINAL) {
    console.error('Configuration PayCOMET manquante');
    return res.status(500).json({ error: 'Configuration du service de paiement invalide' });
  }

  // Utiliser le hash de la clé API
  req.paycometHeaders = {
    'PAYCOMET-API-TOKEN': PAYCOMET_API_KEY, // Hash de la clé API
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  next();
};