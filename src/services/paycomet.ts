import { PaymentResponse } from '../types/payment';

interface PayCOMETConfig {
  merchantCode: string;
  terminal: string;
  jetId: string;
}

export class PayCOMETService {
  private static config: PayCOMETConfig;

  /**
   * Initialise PayCOMET avec les credentials
   */
  static initialize(): void {
    try {
      this.config = {
        merchantCode: import.meta.env.VITE_PAYCOMET_MERCHANT_CODE,
        terminal: import.meta.env.VITE_PAYCOMET_TERMINAL,
        jetId: import.meta.env.VITE_PAYCOMET_JET_ID,
      };

      if (!this.config.merchantCode || !this.config.terminal || !this.config.jetId) {
        throw new Error('Configuration PayCOMET incomplète');
      }
    } catch (error) {
      throw new Error('Erreur d\'initialisation PayCOMET: ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
    }
  }

  /**
   * Crée une session de paiement
   */
  /*
  static async createPaymentSession(amount: number): Promise<PaymentResponse> {
    try {
      if (!amount || amount <= 0) {
        throw new Error('Le montant doit être supérieur à 0');
      }

      const response = await fetch('http://localhost:3001/api/paycomet/create-payment-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || `Erreur ${response.status}: ${response.statusText}`);
      }

      if (!data.formUrl) {
        throw new Error('URL du formulaire de paiement non reçue');
      }

      // Redirection vers le formulaire de paiement PayCOMET
      window.location.href = data.formUrl;

      return { 
        success: true,
        paymentId: data.paymentId 
      };
    } catch (error) {
      throw new Error('Erreur de paiement: ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
    }
  } */

  /**
   * Vérifie le statut d'un paiement
   */
  static async verifyPaymentStatus(paymentId: string): Promise<PaymentResponse> {
    try {
      if (!paymentId) {
        throw new Error('ID de paiement requis');
      }

      const response = await fetch(`http://localhost:3001/api/paycomet/verify-payment/${paymentId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || `Erreur ${response.status}: ${response.statusText}`);
      }

      return {
        success: true,
        status: data.status,
        paymentId: data.paymentId,
      };
    } catch (error) {
      throw new Error('Erreur de vérification: ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
    }
  }
}