import { paycometConfig } from '../config/paycomet.js';

export const validatePaycometRequest = (req, res, next) => {
  const { PAYCOMET_API_KEY, VITE_PAYCOMET_MERCHANT_CODE, VITE_PAYCOMET_TERMINAL } = process.env;
  
  if (!PAYCOMET_API_KEY || !VITE_PAYCOMET_MERCHANT_CODE || !VITE_PAYCOMET_TERMINAL) {
    console.error('Configuration PayCOMET manquante');
    return res.status(500).json({ error: 'Configuration du service de paiement invalide' });
  }

  // Header pour l'API PayCOMET
  req.paycometHeaders = {
    'PAYCOMET-API-TOKEN':  process.env['PAYCOMET-API-TOKEN'],
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  next();
};