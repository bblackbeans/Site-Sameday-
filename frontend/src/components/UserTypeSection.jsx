import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Importando imagens existentes
import entregaLastMile from "../assets/images/entrega-last-mile.jpg";
import transporteEficiente from "../assets/images/transporte-eficiente.jpg";
import armazemInteligente from "../assets/images/armazem-inteligente.jpg";
import embarcador from "../assets/images/embarcador.png";

const UserTypeSection = () => {
  const userTypes = [
    {
      id: '01',
      title: 'Sou Embarcador',
      link: '/embarcador#cadastro',
      image: embarcador
    },
    {
      id: '02',
      title: 'Sou Transportador',
      link: '/transportador#cadastro',
      image: transporteEficiente
    },
    {
      id: '03',
      title: 'Sou Entregador',
      link: '/entregador',
      image: entregaLastMile
    },
    {
      id: '04',
      title: 'Tenho Espaço',
      link: '/stock-store#interesse',
      image: armazemInteligente
    }
  ];

  return (
    <section className="w-full">
      {/* Grid responsivo - 1 coluna em mobile, 2 em tablet, 4 em desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-auto lg:h-[600px]">
        {userTypes.map((userType, index) => (
          <Link 
            key={userType.id}
            to={userType.link}
            className="group relative overflow-hidden hover:scale-105 transition-transform duration-300 h-[300px] md:h-[400px] lg:h-full"
          >
            {/* Imagem de fundo que ocupa todo o bloco */}
            <img 
              src={userType.image} 
              alt={userType.title}
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            
            {/* Gradiente de baixo para cima (preto para transparente) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            
            {/* Texto sobreposto na parte inferior esquerda */}
            <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5 p-3 md:p-6">
              <h3 className="text-white text-xl md:text-2xl lg:text-4xl drop-shadow-lg font-semibold">
                {userType.title}
              </h3>
            </div>
            
            {/* Ícone de seta fixo no lado direito */}
            <div className="absolute bottom-4 right-4 md:bottom-5 md:right-5 transform -translate-y-1/2">
              <div className="border border-white rounded-full p-2 md:p-3 group-hover:border-white/80 transition-all duration-300">
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default UserTypeSection;
