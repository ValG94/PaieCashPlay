export interface PaymentResponse {
  success: boolean;
  error?: string;
  paymentId?: string;
  status?: string;
}

export interface PaymentSession {
  id: string;
  amount: number;
  currency: string;
  status: string;
}