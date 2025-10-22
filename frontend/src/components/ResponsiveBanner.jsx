import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente de banner responsivo reutilizável
 * - Mobile: Layout centralizado
 * - Desktop/Tablet: Layout assimétrico (texto à direita) - identidade original
 * @param {Object} props - Props do componente
 * @param {string} props.image - URL da imagem de fundo
 * @param {string} props.alt - Texto alternativo da imagem
 * @param {string} props.title - Título principal
 * @param {string} props.subtitle - Subtítulo (opcional)
 * @param {string} props.description - Descrição
 * @param {string} props.buttonText - Texto do botão
 * @param {string} props.buttonLink - Link do botão
 * @param {string} props.buttonColor - Cor do botão (opcional)
 */
const ResponsiveBanner = ({ 
  image, 
  alt, 
  title, 
  subtitle = null,
  description, 
  buttonText, 
  buttonLink,
  buttonColor = "#822b98"
}) => {
  return (
    <section className="relative h-[400px] md:h-[600px] overflow-hidden rounded-[30px] mx-4" style={{ marginTop: '83px' }}>
      {/* Background Image */}
      <div className="absolute inset-0 rounded-[30px] overflow-hidden">
        <img 
          src={image} 
          alt={alt}
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Mobile Layout - Centralizado */}
      <div className="absolute inset-0 flex flex-col justify-center items-center p-4 md:hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-black/35 rounded-[30px]"></div>
        
        {/* Content Container - Centralizado para mobile */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="font-semibold text-2xl leading-[1.2] text-white mb-2">
            {title}
          </h1>

          {/* Subtitle (opcional) */}
          {subtitle && (
            <h2 className="font-medium text-lg text-white/90 mb-4">
              {subtitle}
            </h2>
          )}

          {/* Description */}
          <p className="text-base leading-[1.4] text-white mb-6 max-w-2xl">
            {description}
          </p>

          {/* Button */}
          <Link 
            to={buttonLink}
            className="inline-block text-white px-6 py-3 rounded-[30px] font-bold text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: buttonColor }}
          >
            {buttonText}
          </Link>
        </div>
      </div>

      {/* Desktop/Tablet Layout - Assimétrico (identidade original) */}
      <div className="hidden md:block absolute right-[50px] top-[50px] w-[70vh] h-[495px] flex flex-col justify-between p-8">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-black/35 rounded-[30px]"></div>
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Main Heading */}
          <div className="text-right absolute top-0">
            <h1 className="font-semibold text-[3rem] leading-[1.2] text-white mb-4">
              <p className="mb-0">{title}</p>
            </h1>
          </div>

          {/* Description */}
          <div className="text-right absolute top-1/2 right-0">
            <p className="text-[22px] leading-[1.4] text-white">
              {description}
            </p>
          </div>

          {/* Button */}
          <div className="text-right absolute bottom-0 right-0">
            <Link 
              to={buttonLink}
              className="inline-block text-white px-8 py-4 rounded-[30px] font-bold text-[16px] hover:opacity-90 transition-opacity"
              style={{ backgroundColor: buttonColor }}
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveBanner;
