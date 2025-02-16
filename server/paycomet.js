import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import fetch from 'node-fetch';
import { paycometConfig } from './config/paycomet.js';
import { validatePaycometRequest } from './middleware/paycomet.js';

dotenv.config();

const router = express.Router();
const { API_URL, ENDPOINTS } = paycometConfig;

// Log de l'environnement utilisé
console.log('Environment PayCOMET: TEST (Terminal de test)');
console.log('API URL:', API_URL);
console.log('==> la route payComet est correcte');

// Middleware de validation pour toutes les routes PayCOMET
router.use(validatePaycometRequest);

/**
 * Crée une session de paiement PayCOMET
 */
router.post('/create-payment-session', async (req, res) => {
  try {
    const { amount } = req.body;
    
    // Validation du montant
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Le montant est requis et doit être un nombre positif' 
      });
    }
    
    const orderReference = "order-" + crypto.randomBytes(8).toString('hex');
    
    // Construction du payload selon la documentation PayCOMET
    const payload = {
      payment: {
        terminal: parseInt(process.env.VITE_PAYCOMET_TERMINAL),
        order: orderReference,
        amount: Math.round(amount * 100), // Conversion en centimes
        currency: 'EUR',
        methodId: 1,
        merchantCode: process.env.VITE_PAYCOMET_MERCHANT_CODE,
        originalIp: req.ip || '127.0.0.1',
        secure: 1,
        urlOk: `${process.env.FRONTEND_URL}/success`,
        urlKo: `${process.env.FRONTEND_URL}/error`,
        userInteraction: 1
      },
      operationType: 1,
      language: 'fr'
    };

    console.log('Envoi de la requête PayCOMET:', {
      url: `${API_URL}${ENDPOINTS.CREATE_ORDER}`,
      headers: {
        ...req.paycometHeaders,
        'merchantCode': '****' // Masquer le code marchand dans les logs
      },
      payload
    });

    const response = await fetch(`${API_URL}${ENDPOINTS.CREATE_ORDER}`, {
      method: 'POST',
      headers: {
        ...req.paycometHeaders,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erreur PayCOMET:', data);
      return res.status(response.status).json({
        success: false,
        error: data.errorMessage || 'Erreur lors de la création du paiement'
      });
    }

    console.log('Réponse PayCOMET:', {
      ...data,
      order: orderReference
    });
    
    res.json({ 
      success: true,
      paymentId: orderReference,
      challengeUrl: data.challengeUrl,
      isTest: true
    });
  } catch (error) {
    console.error('Erreur PayCOMET détaillée:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur lors de la création du paiement' 
    });
  }
});

/**
 * Vérifie le statut d'un paiement
 */
router.get('/verify-payment/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        error: 'ID de paiement requis'
      });
    }

    console.log('Vérification paiement:', {
      url: `${API_URL}${ENDPOINTS.CHECK_STATUS}${paymentId}`,
    });

    const response = await fetch(`${API_URL}${ENDPOINTS.CHECK_STATUS}${paymentId}`, {
      method: 'GET',
      headers: req.paycometHeaders
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erreur vérification:', data);
      return res.status(response.status).json({
        success: false,
        error: data.errorMessage || 'Erreur lors de la vérification'
      });
    }

    console.log('Statut paiement:', data);
    
    res.json({
      success: true,
      status: data.status || 'pending',
      paymentId: data.order,
      isTest: true
    });
  } catch (error) {
    console.error('Erreur de vérification:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur lors de la vérification du paiement' 
    });
  }
});

export default router;