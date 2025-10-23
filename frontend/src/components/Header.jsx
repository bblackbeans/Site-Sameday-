import React, { useState } from 'react';
import samedayLogo from '../assets/images/sameday_logo.png';

const Header = () => {
  const [perfisOpen, setPerfisOpen] = useState(false);
  const [simuladoresOpen, setSimuladoresOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img 
                src={samedayLogo} 
                alt="SameDay Logo" 
                className="h-12 w-auto"
                loading="eager"
                decoding="async"
              />
            </a>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#sobre" className="text-gray-900 hover:text-purple-600 transition-colors">Sobre a SameDay</a>
            <a href="#como-funciona" className="text-gray-900 hover:text-purple-600 transition-colors">Como Funciona</a>
            
            {/* Dropdown Perfis */}
            <div className="relative">
              <button 
                className="text-gray-900 hover:text-purple-600 transition-colors flex items-center"
                onClick={() => {
                  setPerfisOpen(!perfisOpen);
                  setSimuladoresOpen(false);
                }}
              >
                Perfis
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {perfisOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 border">
                  <div className="py-1">
                    <a href="/embarcador" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setPerfisOpen(false)}>Embarcador</a>
                    <a href="/transportador" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setPerfisOpen(false)}>Transportador</a>
                    <a href="/entregador" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setPerfisOpen(false)}>Entregador</a>
                    <a href="/stock-store" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setPerfisOpen(false)}>Stock Store</a>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown Simuladores */}
            <div className="relative">
              <button 
                className="text-gray-900 hover:text-purple-600 transition-colors flex items-center"
                onClick={() => {
                  setSimuladoresOpen(!simuladoresOpen);
                  setPerfisOpen(false);
                }}
              >
                Simuladores
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {simuladoresOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50 border">
                  <div className="py-1">
                    <a href="/simulador-frete" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setSimuladoresOpen(false)}>Simulador de Frete</a>
                    <a href="/simulador-armazenagem" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setSimuladoresOpen(false)}>Simulador de Armazenagem</a>
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
