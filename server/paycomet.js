import express from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import fetch from 'node-fetch';
import { paycometConfig } from './config/paycomet.js';
import { validatePaycometRequest } from './middleware/paycomet.js';

dotenv.config();

const router = express.Router();
const { API_URL, SANDBOX_API_URL, ENDPOINTS } = paycometConfig;

// Utiliser l'URL de sandbox en mode test
const API_BASE_URL = process.env.NODE_ENV === 'test' ? SANDBOX_API_URL : API_URL;

// Middleware de validation pour toutes les routes PayCOMET
router.use(validatePaycometRequest);

/**
 * Crée une session de paiement PayCOMET
 */
router.post('/create-payment-session', async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Le montant doit être supérieur à 0' });
    }
    
    const orderReference = "order-" + crypto.randomBytes(8).toString('hex');
    
    // Payload pour l'API v1/form de PayCOMET
    const payload = {
      operationType: 1,
      language: "fr",
      payment: {
        methodId: 1,
        terminal: parseInt(process.env.VITE_PAYCOMET_TERMINAL),
        order: orderReference,
        amount: Math.round(amount * 100).toString(), // Conversion en centimes et en string
        currency: "EUR",
        originalIp: req.ip || "127.0.0.1",
        secure: 1,
        userInteraction: 1,
        productDescription: "Investissement PaieCash",
        merchantCode: process.env.VITE_PAYCOMET_MERCHANT_CODE,
        urlOk: `${process.env.FRONTEND_URL}/success`,
        urlKo: `${process.env.FRONTEND_URL}/error`
      }
    };

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CREATE_ORDER}`, {
      method: 'POST',
      headers: {
        ...req.paycometHeaders,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    const payment = await fetch('/url', {
      method: 'POST',
      headers: {
        'PAYCOMET-API-TOKEN': `${process.env.PAYCOMET-API-TOKEN}`
      },
      body: JSON.stringify({ data: 'montant du formulaire à récupérer + relier le bouton avec appel des paiements' }),
      })
        .then(response => response.json())
        .then(data => {
      if (data.challengeUrl) {
          window.location.href = data.challengeUrl; // Redirection
      }
  })
  .catch(error => console.error('Erreur:', error));
    const data = await response.json();

    if (!response.ok || data.errorCode) {
      throw new Error(data.errorDescription || 'Erreur lors de la création du formulaire de paiement');
    }

    if (!data.challengeUrl) {
      throw new Error('URL de paiement non reçue');
    }

    res.json({ 
      success: true,
      challengeUrl: res.data.challengeUrl,
      paymentId: orderReference
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Erreur interne du serveur' 
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

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CHECK_STATUS}${paymentId}`, {
      method: 'GET',
      headers: {
        ...req.paycometHeaders,
        'Accept': 'application/json'
      },
    });

    const data = await response.json();

    if (!response.ok || data.errorCode) {
      throw new Error(data.errorDescription || 'Erreur lors de la vérification du paiement');
    }
    
    res.json({
      success: true,
      status: data.status || 'pending',
      paymentId: data.order,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Erreur interne du serveur' 
    });
  }
});

/**
 * Webhook pour les notifications PayCOMET
 */
router.post('/webhook', express.json(), async (req, res) => {
  res.setHeader('PAYCOMET-API-TOKEN', process.env.PAYCOMET-API-TOKEN);
  try {
    const notification = req.body;
    
    // Vérification de la signature
    const signature = req.headers['paycomet-signature'];
    const calculatedSignature = crypto
      .createHmac('sha256', process.env.PAYCOMET_API_KEY)
      .update(JSON.stringify(notification))
      .digest('hex');

    if (signature !== calculatedSignature) {
      return res.status(400).json({ 
        success: false,
        error: 'Signature invalide' 
      });
    }

    res.json({ success: true, received: true });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Erreur interne du serveur' 
    });
  }
});

export default router;