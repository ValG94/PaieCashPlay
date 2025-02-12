// Configuration PayCOMET pour l'environnement de test
export const paycometConfig = {
  // URLs de l'API de test PayCOMET
  API_URL: 'https://rest.paycomet.com/v1',
  SANDBOX_API_URL: 'https://rest-sandbox.paycomet.com/v1',
  
  // Endpoints
  ENDPOINTS: {
    CREATE_ORDER: '/payments',
    CHECK_STATUS: '/payments/',
    REFUND: '/payments/refund'
  }
};