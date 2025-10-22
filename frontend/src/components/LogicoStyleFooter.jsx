import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const LogicoStyleFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Get in Touch Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Info */}
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Fale Conosco/</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Estamos sempre prontos para ajudá-lo e responder suas perguntas sobre logística urbana.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Call Center */}
                <div>
                  <h4 className="text-lg font-semibold text-primary-purple mb-3">Central de Atendimento</h4>
                  <div className="space-y-1">
                    <a href="tel:+5511999999999" className="block text-gray-300 hover:text-white transition-colors">
                      +55 (11) 99999-9999
                    </a>
                    <a href="tel:+5511999999998" className="block text-gray-300 hover:text-white transition-colors">
                      +55 (11) 99999-9998
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h4 className="text-lg font-semibold text-primary-purple mb-3">Nossa Localização</h4>
                  <p className="text-gray-300">
                    São Paulo, SP – 01310-100<br />
                    Av. Paulista, 1000
                  </p>
                </div>

                {/* Email */}
                <div>
                  <h4 className="text-lg font-semibold text-primary-purple mb-3">Email</h4>
                  <a href="mailto:contato@sameday.com.br" className="text-gray-300 hover:text-white transition-colors">
                    contato@sameday.com.br
                  </a>
                </div>

                {/* Social Network */}
                <div>
                  <h4 className="text-lg font-semibold text-primary-purple mb-3">Redes Sociais</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-gray-700 rounded-[30px] flex items-center justify-center hover:bg-primary-purple transition-colors">
                      <span className="text-white font-bold text-sm">f</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-700 rounded-[30px] flex items-center justify-center hover:bg-primary-purple transition-colors">
                      <span className="text-white font-bold text-sm">x</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-700 rounded-[30px] flex items-center justify-center hover:bg-primary-purple transition-colors">
                      <span className="text-white font-bold text-sm">in</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-700 rounded-[30px] flex items-center justify-center hover:bg-primary-purple transition-colors">
                      <span className="text-white font-bold text-sm">yt</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Entre em Contato</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Nome Completo</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-[30px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                      placeholder="Nome Completo"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-[30px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Assunto</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Assunto"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Mensagem</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    placeholder="Sua mensagem"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary-purple hover:bg-primary-purple-hover text-white font-semibold py-3 px-6 rounded-[30px] transition-colors flex items-center justify-center"
                >
                  Enviar Mensagem
                  <ArrowRight size={20} className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main CTA Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Entregas no prazo, sem complicações.
          </h2>
          <Link 
            to="/contato" 
            className="inline-flex items-center bg-primary-purple hover:bg-primary-purple-hover text-white font-bold py-4 px-8 rounded-[30px] text-lg transition-all duration-300 transform hover:scale-105"
          >
            Entre em Contato
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Social */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-purple rounded-[30px] flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-2xl font-bold text-white">SameDay</span>
              </Link>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-[30px] flex items-center justify-center hover:bg-primary-purple transition-colors">
                  <span className="text-white font-bold text-sm">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-[30px] flex items-center justify-center hover:bg-primary-purple transition-colors">
                  <span className="text-white font-bold text-sm">x</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-[30px] flex items-center justify-center hover:bg-primary-purple transition-colors">
                  <span className="text-white font-bold text-sm">in</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-[30px] flex items-center justify-center hover:bg-primary-purple transition-colors">
                  <span className="text-white font-bold text-sm">yt</span>
                </a>
              </div>
              <p className="text-gray-400 text-sm">desde 2020</p>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold text-primary-purple mb-6">Empresa</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/#sobre" className="text-gray-400 hover:text-white transition-colors">
                    / Sobre a SameDay
                  </a>
                </li>
                <li>
                  <Link to="/contato" className="text-gray-400 hover:text-white transition-colors">
                    / Contatos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Profiles Links */}
            <div>
              <h4 className="text-lg font-semibold text-primary-purple mb-6">Perfis</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/embarcador" className="text-gray-400 hover:text-white transition-colors">
                    / Embarcador
                  </Link>
                </li>
                <li>
                  <Link to="/transportador" className="text-gray-400 hover:text-white transition-colors">
                    / Transportador (TAC)
                  </Link>
                </li>
                <li>
                  <Link to="/entregador" className="text-gray-400 hover:text-white transition-colors">
                    / Entregador
                  </Link>
                </li>
                <li>
                  <Link to="/stock-store" className="text-gray-400 hover:text-white transition-colors">
                    / Parceiro Stock Store
                  </Link>
                </li>
              </ul>
            </div>

            {/* Menu Links */}
            <div>
              <h4 className="text-lg font-semibold text-primary-purple mb-6">Menu</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/#como-funciona" className="text-gray-400 hover:text-white transition-colors">
                    / Como Funciona
                  </a>
                </li>
                <li>
                  <Link to="/simulador-frete" className="text-gray-400 hover:text-white transition-colors">
                    / Simulador de Frete
                  </Link>
                </li>
                <li>
                  <Link to="/simulador-armazenagem" className="text-gray-400 hover:text-white transition-colors">
                    / Simulador de Armazenagem
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-gray-400">©</span>
              <Link to="/" className="text-primary-purple font-bold hover:text-primary-purple transition-colors">
                SameDay
              </Link>
              <span className="text-gray-400">2025. Todos os direitos reservados.</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/termos" className="text-gray-400 hover:text-white transition-colors">
                Termos de uso
              </Link>
              <Link to="/privacidade" className="text-gray-400 hover:text-white transition-colors">
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LogicoStyleFooter;