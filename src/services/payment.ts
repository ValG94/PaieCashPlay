import { loadStripe } from '@stripe/stripe-js';
import type { PaymentIntent } from '@stripe/stripe-js';

// Initialisation de Stripe avec la clé publique
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PaymentResponse {
  success: boolean;
  error?: string;
  paymentIntent?: PaymentIntent;
}

export class PaymentService {
  /**
   * Crée une session de paiement
   * @param amount - Montant en euros
   * @returns PaymentResponse
   */
  static async createPaymentSession(amount: number): Promise<PaymentResponse> {
    try {
      const response = await fetch('http://localhost:3001/api/create-payment-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la session de paiement');
      }

      const session = await response.json();
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe n\'a pas pu être initialisé');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      console.error('Erreur de paiement:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue',
      };
    }
  }

  /**
   * Vérifie le statut d'un paiement
   * @param paymentId - Identifiant du paiement
   * @returns PaymentResponse
   */
  static async verifyPaymentStatus(paymentId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(`http://localhost:3001/api/verify-payment/${paymentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la vérification du paiement');
      }

      const paymentStatus = await response.json();
      return { success: true, paymentIntent: paymentStatus };
    } catch (error) {
      console.error('Erreur de vérification:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue',
      };
    }
  }
}