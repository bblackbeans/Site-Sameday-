import React, { useState, useEffect } from 'react';
import { Package, Truck, MapPin, CheckCircle } from 'lucide-react';

const HowItWorksSection = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const steps = [
    {
      icon: <Package className="text-white" size={40} />,
      step: "Passo 1",
      title: "Cadastro e Solicitação",
      description: "Embarcador se cadastra na plataforma e solicita o serviço de logística",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=800&fit=crop"
    },
    {
      icon: <MapPin className="text-white" size={40} />,
      step: "Passo 2",
      title: "Armazenagem Estratégica",
      description: "Produtos são direcionados para Stock Stores próximos ao destino final",
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&h=800&fit=crop"
    },
    {
      icon: <Truck className="text-white" size={40} />,
      step: "Passo 3",
      title: "Transporte Inteligente",
      description: "Transportadores qualificados coletam e entregam as cargas de forma otimizada",
      image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&h=800&fit=crop"
    },
    {
      icon: <CheckCircle className="text-white" size={40} />,
      step: "Passo 4",
      title: "Entrega Final",
      description: "Entregadores locais realizam a última milha com rastreamento em tempo real",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=800&fit=crop"
    }
  ];

  // Effect to handle image changes based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const stepElements = document.querySelectorAll('[data-step-index]');
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      stepElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        const elementBottom = elementTop + rect.height;
        
        // Check if the step is in the viewport
        if (rect.top <= viewportHeight * 0.5 && rect.bottom >= viewportHeight * 0.5) {
          setActiveImageIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="como-funciona" className="bg-white">
      {/* Header Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-primary-purple font-semibold mb-4 uppercase tracking-wide">
              Impulsionando o sucesso da cadeia de suprimentos
            </p>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Logística moderna para o crescimento do seu negócio
            </h2>
            <p className="text-xl text-gray-600">
              Nossa plataforma oferece soluções logísticas personalizadas, 
              capacitando empresas com transporte rápido, seguro e eficiente.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Stacking Steps Section - Desktop */}
      <div className="hidden md:block relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8">
            {/* Left side - Sticky content area */}
            <div className="relative">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  data-step-index={index}
                  className="sticky top-24 mb-[20vh]"
                  style={{ 
                    zIndex: index + 1,
                    transform: `translateY(${index * 60}px)`,
                  }}
                >
                  <div 
                    className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-300 hover:scale-105"
                    style={{
                      boxShadow: `0 25px 50px -12px rgba(0, 0, 0, ${0.15 + index * 0.05})`,
                    }}
                  >
                    <div className="flex items-start space-x-6">
                      <div className="rounded-2xl p-4 flex-shrink-0" style={{background: 'linear-gradient(to bottom right, #6a2480, #5a1f6e)'}}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-primary-purple font-semibold mb-2 text-sm uppercase tracking-wide">
                          {step.step}
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-lg">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side - Fixed image with fade effect */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="rounded-3xl overflow-hidden shadow-2xl h-[600px] relative">
                  {steps.map((step, index) => (
                    <img 
                      key={index}
                      src={step.image} 
                      alt={step.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        activeImageIndex === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                </div>
              </div>
              {/* Spacer to sync with steps */}
              <div className="h-[80vh]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden pb-20">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="rounded-xl p-3 flex-shrink-0" style={{background: 'linear-gradient(to bottom right, #6a2480, #5a1f6e)'}}>
                      {step.icon}
                    </div>
                    <div>
                      <p className="text-primary-purple font-semibold text-sm uppercase tracking-wide">
                        {step.step}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default HowItWorksSection;

