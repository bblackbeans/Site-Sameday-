import React, { Suspense, lazy } from 'react';
import Header from '../components/Header';
import ResponsiveBanner from '../components/ResponsiveBanner';

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
      <Header />

      {/* Banner Principal */}
      <ResponsiveBanner
        image="/src/assets/images/hero_banner_logistica_urbana.jpg"
        alt="Logística Urbana Inteligente"
        title="Logística Urbana Inteligente"
        subtitle="Impulsionando o futuro"
        description="Movemos cargas de forma rápida, segura e inteligente para o sucesso da sua cadeia de suprimentos urbana."
        buttonText="Simular Frete"
        buttonLink="/simulador-frete"
        buttonColor="#822b98"
      />
      
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

