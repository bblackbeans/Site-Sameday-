import React, { Suspense, lazy } from 'react';
import Header from '../components/Header';
import ResponsiveBanner from '../components/ResponsiveBanner';
import bannerImage from '../assets/images/banner.jpg';

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
        image={bannerImage}
        alt="Logística urbana integrada"
        title="Logística urbana integrada, rápida e inteligente"
        subtitle="Impulsionando o futuro"
        description="Conectamos embarcadores, transportadores e entregadores em uma plataforma única e eficiente"
        buttonText="Enviar Agora"
        buttonLink="/contato"
        buttonColor="#822b98"
      />
      
      {/* Seção Sobre */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Logística redefinida</h2>
            <p className="text-xl text-gray-600">Impulsionando o futuro</p>
            <p className="text-lg text-gray-700 mt-6 max-w-3xl mx-auto">
              Movemos cargas de forma rápida, segura e inteligente para o sucesso da sua cadeia de suprimentos urbana.
            </p>
          </div>
        </div>
      </section>
      
      <Suspense fallback={<SectionLoader />}>
        <ServicesSection />
      </Suspense>
      
      {/* Seção Como Funciona */}
      <section id="como-funciona" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona</h2>
            <p className="text-xl text-gray-600">Processo simples e eficiente</p>
          </div>
        </div>
      </section>
      
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

