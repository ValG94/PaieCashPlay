import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InvestmentPage from './pages/InvestmentPage';
import PaymentPage from './pages/PaymentPage';
import TestPayment from './pages/TestPayment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invest" element={<InvestmentPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/test-payment" element={<TestPayment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;