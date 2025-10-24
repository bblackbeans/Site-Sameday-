import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import LogicoStyleFooter from './LogicoStyleFooter';
import BannerWithBadge from './BannerWithBadge';
import useFormSubmission from '../hooks/useFormSubmission';
import { Package, Truck, MapPin, Shield, BarChart3, Clock, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

import heroBannerImage from "../assets/images/banner.jpg";

const NewShipperPage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    cnpj: '',
    contactName: '',
    email: '',
    phone: '',
    monthlyVolume: '',
    address: '',
    businessType: '',
    description: '',
    agreeTerms: false
  });

  const { isSubmitting, submitStatus, submitForm } = useFormSubmission();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm(formData, 'embarcador');
    
    // Reset form only on success
    if (success) {
      setFormData({
        companyName: '',
        cnpj: '',
        contactName: '',
        email: '',
        phone: '',
        monthlyVolume: '',
        address: '',
        businessType: '',
        description: '',
        agreeTerms: false
      });
    }
  };

  const benefits = [
    {
      icon: <Package size={40} />,
      title: 'Armazenagem Estratégica',
      description: 'Seus produtos ficam próximos aos clientes finais em nossa rede de Stock Stores',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      icon: <Truck size={40} />,
      title: 'Coleta Programada',
      description: 'Coletamos seus produtos de acordo com sua programação',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: <MapPin size={40} />,
      title: 'Entrega Rápida',
      description: 'Entregas no mesmo dia ou next day para seus clientes',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: <Shield size={40} />,
      title: 'Segurança Total',
      description: 'Rastreamento completo e seguro de ponta a ponta',
      color: 'bg-primary-purple-light text-primary-purple'
    },
    {
      icon: <BarChart3 size={40} />,
      title: 'Relatórios Detalhados',
      description: 'Acompanhe todas as suas operações em tempo real',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      icon: <Clock size={40} />,
      title: 'Suporte 24/7',
      description: 'Nossa equipe está sempre disponível para ajudar',
      color: 'bg-red-50 text-red-600'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Cadastro',
      description: 'Complete seu cadastro e envie a documentação necessária'
    },
    {
      number: '02',
      title: 'Aprovação',
      description: 'Nossa equipe analisa e aprova seu cadastro'
    },
    {
      number: '03',
      title: 'Integração',
      description: 'Configuramos sua conta e integrações necessárias'
    },
    {
      number: '04',
      title: 'Operação',
      description: 'Comece a usar nossa plataforma e enviar suas cargas'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <BannerWithBadge
        image={heroBannerImage}
        alt="Logística para Embarcadores"
        badgeText="PARA EMBARCADORES"
        badgeIcon={<Package size={20} />}
        title="Soluções Logísticas para"
        subtitle="Embarcadores"
        description="Otimize sua logística com nossa rede integrada de armazenagem, transporte e entrega. Reduza custos e melhore a experiência dos seus clientes."
        buttonText="Cadastrar-se Agora"
        buttonLink="#cadastro"
      />

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Benefícios para Embarcadores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma oferece soluções completas para suas necessidades logísticas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 ${benefit.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Como Funciona o Processo
            </h2>
            <p className="text-xl text-gray-600">
              Simples e rápido para começar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-200">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-transparent w-1/2"></div>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="cadastro" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Cadastre-se como Embarcador
              </h2>
              <p className="text-xl text-gray-600">
                Preencha os dados abaixo para realizar seu cadastro
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome da Empresa *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Digite o nome da sua empresa"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CNPJ *
                    </label>
                    <input
                      type="text"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleInputChange}
                      placeholder="00.000.000/0000-00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome do Contato *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="Nome completo do responsável"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@empresa.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Volume Mensal Estimado
                    </label>
                    <select
                      name="monthlyVolume"
                      value={formData.monthlyVolume}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    >
                      <option value="">Selecione</option>
                      <option value="1-50">1 a 50 entregas/mês</option>
                      <option value="51-200">51 a 200 entregas/mês</option>
                      <option value="201-500">201 a 500 entregas/mês</option>
                      <option value="500+">Mais de 500 entregas/mês</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Endereço da Empresa *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Endereço completo"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Negócio
                  </label>
                  <input
                    type="text"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    placeholder="Ex: E-commerce, Varejo, Indústria, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descrição dos Produtos/Serviços
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descreva brevemente seus produtos ou serviços"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Documents Section */}
                <div className="bg-orange-50 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <CheckCircle className="text-orange-500 mr-2" size={20} />
                    Documentos Necessários
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Após o cadastro, você receberá as informações de acesso:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                      Cartão CNPJ
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                      Contrato Social
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                      Inscrição Estadual (se aplicável)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2 flex-shrink-0" size={16} />
                      Comprovante de endereço da empresa
                    </li>
                  </ul>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                    required
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Concordo com os{' '}
                    <Link to="/termos" className="text-orange-600 hover:text-orange-700 font-semibold">
                      Termos de Uso
                    </Link>
                    {' '}e{' '}
                    <Link to="/privacidade" className="text-orange-600 hover:text-orange-700 font-semibold">
                      Política de Privacidade
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Cadastro'}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={20} />
                    <span className="text-green-800 font-medium">
                      Cadastro realizado com sucesso!
                    </span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <XCircle className="text-red-600 mr-2" size={20} />
                    <span className="text-red-800 font-medium">
                      Erro ao enviar cadastro. Tente novamente.
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <LogicoStyleFooter />
    </div>
  );
};

export default NewShipperPage;

