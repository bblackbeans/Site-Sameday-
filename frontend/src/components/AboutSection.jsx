import React from 'react';
import { CheckCircle } from 'lucide-react';
import caminhaoImage from '../assets/images/caminhao_entrega_urbana.webp';

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sobre a SameDay
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolucionamos a logística urbana conectando embarcadores, transportadores e entregadores 
            em uma plataforma integrada, rápida e inteligente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">
              Nossa Missão
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Simplificar e otimizar a logística urbana através de tecnologia avançada e uma rede 
              integrada de parceiros. Oferecemos soluções completas que abrangem desde a armazenagem 
              até a entrega final, garantindo eficiência e transparência em cada etapa.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" size={20} />
                <span className="text-gray-700">Cobertura nacional com foco em áreas urbanas</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" size={20} />
                <span className="text-gray-700">Tecnologia de rastreamento em tempo real</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" size={20} />
                <span className="text-gray-700">Rede de parceiros qualificados e verificados</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src={caminhaoImage} 
              alt="Caminhão de entrega urbana" 
              className="rounded-lg shadow-lg w-full"
            />
            <div className="absolute -bottom-6 -right-2 bg-primary-purple text-white p-6 rounded-full shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm">Suporte</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;

