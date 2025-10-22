import React, { useState } from 'react';

const Header = () => {
  const [perfisOpen, setPerfisOpen] = useState(false);
  const [simuladoresOpen, setSimuladoresOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img 
                src="/src/assets/images/sameday_logo.png" 
                alt="SameDay Logo" 
                className="h-8 w-auto"
                loading="eager"
                decoding="async"
              />
            </a>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-900 hover:text-purple-600 transition-colors">Sobre a SameDay</a>
            <a href="/embarcador" className="text-gray-900 hover:text-purple-600 transition-colors">Como Funciona</a>
            
            {/* Dropdown Perfis */}
            <div className="relative">
              <button 
                className="text-gray-900 hover:text-purple-600 transition-colors flex items-center"
                onMouseEnter={() => setPerfisOpen(true)}
                onMouseLeave={() => setPerfisOpen(false)}
              >
                Perfis
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {perfisOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50"
                  onMouseEnter={() => setPerfisOpen(true)}
                  onMouseLeave={() => setPerfisOpen(false)}
                >
                  <div className="py-1">
                    <a href="/embarcador" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Embarcador</a>
                    <a href="/transportador" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Transportador</a>
                    <a href="/entregador" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Entregador</a>
                    <a href="/stock-store" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Stock Store</a>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown Simuladores */}
            <div className="relative">
              <button 
                className="text-gray-900 hover:text-purple-600 transition-colors flex items-center"
                onMouseEnter={() => setSimuladoresOpen(true)}
                onMouseLeave={() => setSimuladoresOpen(false)}
              >
                Simuladores
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {simuladoresOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50"
                  onMouseEnter={() => setSimuladoresOpen(true)}
                  onMouseLeave={() => setSimuladoresOpen(false)}
                >
                  <div className="py-1">
                    <a href="/simulador-frete" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Simulador de Frete</a>
                    <a href="/simulador-armazenagem" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Simulador de Armazenagem</a>
                  </div>
                </div>
              )}
            </div>
          </nav>
          
          {/* Botão Fale Conosco */}
          <div className="hidden md:block">
            <a 
              href="/contato" 
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Fale Conosco
            </a>
          </div>
          
          {/* Menu mobile */}
          <div className="md:hidden">
            <button className="text-gray-900 hover:text-purple-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
