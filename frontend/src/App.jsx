import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useScrollToAnchor from './hooks/useScrollToAnchor';

// Lazy loading para todas as páginas
const NewHomePage = lazy(() => import('./pages/NewHomePage'));
const NewShipperPage = lazy(() => import('./components/NewShipperPage'));
const CarrierPage = lazy(() => import('./components/CarrierPage'));
const DeliveryPersonPage = lazy(() => import('./components/DeliveryPersonPage'));
const StockStorePartnerPage = lazy(() => import('./components/StockStorePartnerPage'));
const FreightSimulator = lazy(() => import('./components/FreightSimulator'));
const StorageSimulator = lazy(() => import('./components/StorageSimulator'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));

// Componente de loading para páginas
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
      <div className="text-gray-600">Carregando página...</div>
    </div>
  </div>
);

// Componente wrapper para usar o hook de scroll
const AppContent = () => {
  useScrollToAnchor();
  
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<NewHomePage />} />
        <Route path="/embarcador" element={<NewShipperPage />} />
        <Route path="/transportador" element={<CarrierPage />} />
        <Route path="/entregador" element={<DeliveryPersonPage />} />
        <Route path="/stock-store" element={<StockStorePartnerPage />} />
        <Route path="/simulador-frete" element={<FreightSimulator />} />
        <Route path="/simulador-armazenagem" element={<StorageSimulator />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="/termos" element={<TermsPage />} />
        <Route path="/privacidade" element={<PrivacyPage />} />
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;