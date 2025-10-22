import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, MapPin, Warehouse, ArrowRight } from 'lucide-react';

import armazemInteligente from "../assets/images/armazem-inteligente.jpg";
import entregaLastMile from "../assets/images/entrega-last-mile.jpg";
import transporteEficiente from "../assets/images/transporte-eficiente.jpg";
import logisticaIntegrada from "../assets/images/logistica-integrada.jpg";

const ServicesSection = () => {
  const services = [
    {
      id: '01',
      icon: <Warehouse size={40} />,
      title: 'Armazenagem Inteligente',
      description: 'Soluções de estoque distribuído com Stock Stores estrategicamente localizados para otimizar sua logística.',
      link: '/stock-store',
      image: armazemInteligente
    },
    {
      id: '02',
      icon: <Truck size={40} />,
      title: 'Transporte Eficiente',
      description: 'Rede de transportadores qualificados para cargas fracionadas e completas com rastreamento em tempo real.',
      link: '/transportador',
      image: transporteEficiente
    },
    {
      id: '03',
      icon: <MapPin size={40} />,
      title: 'Entrega Last Mile',
      description: 'Entregadores locais para a última milha com tecnologia avançada e cobertura completa.',
      link: '/entregador',
      image: entregaLastMile
    },
    {
      id: '04',
      icon: <Package size={40} />,
      title: 'Logística Integrada',
      description: 'Plataforma única que conecta todos os elos da cadeia logística urbana de forma inteligente.',
      link: '/embarcador',
      image: logisticaIntegrada
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header - Similar ao Supply */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Logística redefinida
          </h2>
          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-8">
            Impulsionando o futuro
          </h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Movemos cargas de forma rápida, segura e inteligente para o sucesso da sua cadeia de suprimentos urbana.
          </p>
        </div>

        {/* Services Grid - Layout responsivo melhorado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="group relative"
            >
              {/* Image Card */}
              <div className="relative h-[250px] md:h-[292px] rounded-[30px] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              {/* Icon Container - Responsivo */}
              <div className="absolute bottom-[180px] md:bottom-[200px] left-1/2 transform -translate-x-1/2 z-20">
                <div className="w-[70px] h-[70px] md:w-[97px] md:h-[97px] bg-[#f7f7f7] rounded-[10px] flex items-center justify-center">
                  <div className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] text-gray-700">
                    {service.icon}
                  </div>
                </div>
              </div>

              {/* Content abaixo do ícone */}
              <div className="pt-[35px] md:pt-[48.5px]">
                {/* Title */}
                <h3 className="text-xl md:text-2xl lg:text-[32px] font-bold text-black text-center mb-3 md:mb-4 leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-[15px] font-light text-black text-center leading-relaxed max-w-[280px] md:max-w-[222px] mx-auto">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - Mais proeminente */}
        <div className="text-center">
          <Link 
            to="/contato"
            className="inline-block bg-[#822b98] text-white px-8 py-4 rounded-[30px] font-bold hover:bg-[#6a2480] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Mais Opções
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

