import React, { Suspense, lazy } from 'react';

// Lazy loading para componentes pesados
const ServicesSection = lazy(() => import('../components/ServicesSection'));
const UserTypeSection = lazy(() => import('../components/UserTypeSection'));
const AboutSection = lazy(() => import('../components/AboutSection'));
const StatsSection = lazy(() => import('../components/StatsSection'));
const HowItWorksSection = lazy(() => import('../components/HowItWorksSection'));
const Platform = lazy(() => import('../components/Platform'));
const LogicoStyleFooter = lazy(() => import('../components/LogicoStyleFooter'));

// Componente de loading
const SectionLoader = () => (
  <div className="w-full h-32 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <div className="text-gray-500">Carregando...</div>
  </div>
);

const NewHomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Header simples */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img 
                src="/src/assets/images/sameday_logo.png" 
                alt="SameDay Logo" 
                className="h-8 w-auto"
                loading="eager"
                decoding="async"
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-900 hover:text-purple-600">Início</a>
              <a href="/embarcador" className="text-gray-900 hover:text-purple-600">Embarcador</a>
              <a href="/transportador" className="text-gray-900 hover:text-purple-600">Transportador</a>
              <a href="/entregador" className="text-gray-900 hover:text-purple-600">Entregador</a>
              <a href="/stock-store" className="text-gray-900 hover:text-purple-600">Stock Store</a>
              <a href="/contato" className="text-gray-900 hover:text-purple-600">Contato</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Banner simples */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Logística Urbana Inteligente
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Conectamos embarcadores, transportadores e entregadores para uma logística mais eficiente e sustentável
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/embarcador" 
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sou Embarcador
            </a>
            <a 
              href="/transportador" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Sou Transportador
            </a>
          </div>
        </div>
      </section>
      
      <Suspense fallback={<SectionLoader />}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <UserTypeSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <StatsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <HowItWorksSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Platform />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <LogicoStyleFooter />
      </Suspense>
    </div>
  );
};

export default NewHomePage;

