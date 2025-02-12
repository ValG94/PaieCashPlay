import { PaymentResponse } from '../types/payment';

interface PayCOMETConfig {
  merchantCode: string;
  terminal: string;
  jetId: string;
}

declare global {
  interface Window {
    PAYCOMET: any;
  }
}

export class PayCOMETService {
  private static config: PayCOMETConfig;
  private static iframeContainer: HTMLElement | null = null;
  private static scriptLoaded = false;

  /**
   * Initialise PayCOMET avec les credentials
   */
  static initialize(): Promise<void> {
    return new Promise((resolve) => {
      this.config = {
        merchantCode: import.meta.env.VITE_PAYCOMET_MERCHANT_CODE,
        terminal: import.meta.env.VITE_PAYCOMET_TERMINAL,
        jetId: import.meta.env.VITE_PAYCOMET_JET_ID,
      };

      if (this.scriptLoaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'paycomet-script';
      script.src = 'https://api.paycomet.com/gateway/jet-iframe.js';
      script.async = true;
      
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      
      document.body.appendChild(script);
    });
  }

  /**
   * Crée une session de paiement
   */
  static async createPaymentSession(amount: number): Promise<PaymentResponse> {
    try {
      await this.initialize();

      const response = await fetch('http://localhost:3001/api/paycomet/create-payment-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création de la session de paiement');
      }

      const { sessionToken } = await response.json();

      if (!sessionToken) {
        throw new Error('Token de session invalide');
      }

      // Création du conteneur pour l'iframe
      this.iframeContainer = document.createElement('div');
      this.iframeContainer.id = 'paycomet-container';
      this.iframeContainer.style.position = 'fixed';
      this.iframeContainer.style.top = '0';
      this.iframeContainer.style.left = '0';
      this.iframeContainer.style.width = '100%';
      this.iframeContainer.style.height = '100%';
      this.iframeContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      this.iframeContainer.style.zIndex = '9999';
      document.body.appendChild(this.iframeContainer);

      return new Promise((resolve) => {
        if (!window.PAYCOMET) {
          this.cleanup();
          resolve({
            success: false,
            error: 'PayCOMET non initialisé',
          });
          return;
        }

        window.PAYCOMET.modal.launch({
          token: sessionToken,
          lang: 'fr',
          container: 'paycomet-container',
          styles: {
            common: {
              padding: '20px',
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            },
            input: {
              backgroundColor: '#f7f7f7',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '10px',
            },
            button: {
              backgroundColor: '#4FBA73',
              color: '#ffffff',
              borderRadius: '9999px',
              padding: '12px 24px',
              cursor: 'pointer',
            },
          },
          callback: (response: any) => {
            this.cleanup();
            if (response.errorCode === 0) {
              resolve({
                success: true,
                paymentId: response.order,
                status: 'completed',
              });
            } else {
              resolve({
                success: false,
                error: response.errorMessage || 'Erreur de paiement',
              });
            }
          },
        });
      });
    } catch (error) {
      this.cleanup();
      console.error('Erreur PayCOMET:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue',
      };
    }
  }

  /**
   * Vérifie le statut d'un paiement
   */
  static async verifyPaymentStatus(paymentId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(`http://localhost:3001/api/paycomet/verify-payment/${paymentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la vérification du paiement');
      }

      const result = await response.json();
      return {
        success: result.status === 'completed',
        status: result.status,
        paymentId: result.paymentId,
      };
    } catch (error) {
      console.error('Erreur de vérification:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue',
      };
    }
  }

  /**
   * Nettoie les ressources PayCOMET
   */
  private static cleanup() {
    if (this.iframeContainer) {
      this.iframeContainer.remove();
      this.iframeContainer = null;
    }
  }
}