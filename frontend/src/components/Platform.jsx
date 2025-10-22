import React from 'react';
import { Package, Clock, CheckCircle } from 'lucide-react';
import mockupImage from '../assets/images/mockup.png';

const Platform = () => {
  const advantages = [
    {
      icon: <Package className="text-blue-600" size={24} />,
      title: "Redução de Custos",
      description: "Otimização de rotas e consolidação de cargas para maximizar eficiência"
    },
    {
      icon: <Clock className="text-green-600" size={24} />,
      title: "Agilidade",
      description: "Entregas mais rápidas com rede distribuída estrategicamente"
    },
    {
      icon: <CheckCircle className="text-primary-purple" size={24} />,
      title: "Transparência",
      description: "Rastreamento completo e comunicação em tempo real"
    }
  ];

  return (
    <section id="plataforma" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo à esquerda */}
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Vantagens da Nossa Plataforma
              </h3>
              <p className="text-gray-600 text-xl">
                Soluções completas para otimizar sua operação logística
              </p>
            </div>
            
            {/* Lista de vantagens */}
            <div className="space-y-6">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {advantage.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">
                      {advantage.title}
                    </h4>
                    <p className="text-gray-600">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Imagem à direita */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src={mockupImage} 
                alt="Mockup da plataforma" 
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platform;
