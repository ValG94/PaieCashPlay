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
    
    if (!amount) {
      return res.status(400).json({ error: 'Le montant est requis' });
    }
    
    const orderReference = "test-order-" + crypto.randomBytes(4).toString('hex');
    
    // Payload pour test avec carte directe
    const payload = {
      terminal: parseInt(process.env.VITE_PAYCOMET_TERMINAL),
      order: orderReference,
      amount: Math.round(amount * 100), // Conversion en centimes
      currency: 'EUR',
      methodId: 1,
      merchantCode: process.env.VITE_PAYCOMET_MERCHANT_CODE,
      pan: "4111111111111111",
      expiryYear: "25",
      expiryMonth: "12",
      cvv: "123",
      urlOk: `${process.env.FRONTEND_URL}/success`,
      urlKo: `${process.env.FRONTEND_URL}/error`,
      secure: 1
    };

    console.log('Tentative de paiement direct PayCOMET:', {
      url: `${API_BASE_URL}${ENDPOINTS.CREATE_ORDER}`,
      headers: req.paycometHeaders,
      payload: {
        ...payload,
        pan: '************1111', // Masquer le numéro de carte dans les logs
        cvv: '***'
      }
    });

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CREATE_ORDER}`, {
      method: 'POST',
      headers: {
        ...req.paycometHeaders,
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('Réponse PayCOMET:', data);

    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    res.json({ 
      success: true,
      paymentId: orderReference,
      ...data
    });
  } catch (error) {
    console.error('Erreur PayCOMET:', error);
    res.status(500).json({ error: error.message || 'Erreur interne du serveur' });
  }
});

/**
 * Vérifie le statut d'un paiement
 */
router.get('/verify-payment/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;

    console.log('Vérification paiement:', {
      url: `${API_BASE_URL}${ENDPOINTS.CHECK_STATUS}${paymentId}`,
    });

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CHECK_STATUS}${paymentId}`, {
      headers: {
        ...req.paycometHeaders,
        'Accept': 'application/json'
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur vérification:', errorData);
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    console.log('Statut paiement:', data);
    
    res.json({
      status: data.status,
      paymentId: data.order,
    });
  } catch (error) {
    console.error('Erreur de vérification:', error);
    res.status(500).json({ error: error.message || 'Erreur interne du serveur' });
  }
});

/**
 * Webhook pour les notifications PayCOMET
 */
router.post('/webhook', express.json(), async (req, res) => {
  try {
    const notification = req.body;
    console.log('Notification PayCOMET reçue:', notification);
    
    // Vérification de la signature
    const signature = req.headers['paycomet-signature'];
    const calculatedSignature = crypto
      .createHmac('sha256', process.env.PAYCOMET_API_KEY)
      .update(JSON.stringify(notification))
      .digest('hex');

    if (signature !== calculatedSignature) {
      console.error('Signature invalide');
      return res.status(400).json({ error: 'Signature invalide' });
    }

    // Traitement de la notification
    console.log('Notification validée:', notification);

    res.json({ received: true });
  } catch (error) {
    console.error('Erreur webhook:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;