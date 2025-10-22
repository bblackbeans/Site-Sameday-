import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-purple-600">Same</span>
                <span className="text-2xl font-bold text-gray-800 ml-1">Day</span>
                <div className="ml-2">
                  <div className="text-xs text-gray-600">Logística Inteligente</div>
                </div>
              </div>
            </a>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-900 hover:text-purple-600 transition-colors">Sobre a SameDay</a>
            <a href="/embarcador" className="text-gray-900 hover:text-purple-600 transition-colors">Como Funciona</a>
            <a href="/transportador" className="text-gray-900 hover:text-purple-600 transition-colors">Perfis</a>
            <a href="/simulador-frete" className="text-gray-900 hover:text-purple-600 transition-colors">Simuladores</a>
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
