// Configuration PayCOMET pour l'environnement de test
export const paycometConfig = {
  // URLs de l'API de test PayCOMET
  API_URL: 'https://rest.paycomet.com',
  SANDBOX_API_URL: 'https://rest-sandbox.paycomet.com',
  
  // Endpoints
  ENDPOINTS: {
    CREATE_ORDER: '/v1/form',
    CHECK_STATUS: '/v1/payments/',
    REFUND: '/v1/payments/refund'
  }
};