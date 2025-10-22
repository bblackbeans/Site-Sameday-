import React from 'react';

const Header = () => {
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
            <a href="/" className="text-gray-900 hover:text-purple-600 transition-colors">Início</a>
            <a href="/embarcador" className="text-gray-900 hover:text-purple-600 transition-colors">Embarcador</a>
            <a href="/transportador" className="text-gray-900 hover:text-purple-600 transition-colors">Transportador</a>
            <a href="/entregador" className="text-gray-900 hover:text-purple-600 transition-colors">Entregador</a>
            <a href="/stock-store" className="text-gray-900 hover:text-purple-600 transition-colors">Stock Store</a>
            <a href="/contato" className="text-gray-900 hover:text-purple-600 transition-colors">Contato</a>
          </nav>
          
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
