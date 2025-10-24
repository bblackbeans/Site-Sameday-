import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import Header from './Header';
import LogicoStyleFooter from './LogicoStyleFooter';
import BannerWithBadge from './BannerWithBadge';
import useFormSubmission from '../hooks/useFormSubmission';
import { 
  Truck, 
  DollarSign, 
  Route, 
  Clock, 
  Shield, 
  BarChart3, 
  Upload,
  CheckCircle,
  ArrowRight,
  Users,
  MapPin,
  XCircle
} from 'lucide-react';

import heroBannerImage from "../assets/images/banner.jpg";

const CarrierPage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    cnpj: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    fleetSize: '',
    vehicleTypes: '',
    operationAreas: '',
    rntrc: '',
    experience: '',
    description: ''
  });

  const { isSubmitting, submitStatus, submitForm } = useFormSubmission();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm(formData, 'transportador');
    
    // Reset form only on success
    if (success) {
      setFormData({
        companyName: '',
        cnpj: '',
        contactName: '',
        email: '',
        phone: '',
        address: '',
        fleetSize: '',
        vehicleTypes: '',
        operationAreas: '',
        rntrc: '',
        experience: '',
        description: ''
      });
    }
  };

  const advantages = [
    {
      icon: <DollarSign className="text-green-600" size={32} />,
      title: "Aumente sua Receita",
      description: "Maximize o uso da sua frota com cargas otimizadas e rotas eficientes"
    },
    {
      icon: <Route className="text-green-600" size={32} />,
      title: "Rotas Inteligentes",
      description: "Nossa tecnologia otimiza rotas para reduzir custos e tempo de viagem"
    },
    {
      icon: <Clock className="text-green-600" size={32} />,
      title: "Cargas Constantes",
      description: "Acesso a um fluxo contínuo de cargas através da nossa rede"
    },
    {
      icon: <Shield className="text-green-600" size={32} />,
      title: "Pagamento Garantido",
      description: "Receba seus pagamentos de forma segura e pontual"
    },
    {
      icon: <BarChart3 className="text-green-600" size={32} />,
      title: "Gestão Completa",
      description: "Acompanhe suas operações e performance em tempo real"
    },
    {
      icon: <Users className="text-green-600" size={32} />,
      title: "Suporte Dedicado",
      description: "Equipe especializada para apoiar suas operações"
    }
  ];

  const requirements = [
    "CNPJ ativo e regularizado",
    "Registro RNTRC válido",
    "Frota própria ou agregados",
    "Experiência comprovada em transporte",
    "Cobertura de seguro adequada",
    "Documentação de condutores em dia"
  ];

  const processSteps = [
    {
      number: "01",
      title: "Cadastro Inicial",
      description: "Preencha o formulário com dados da empresa e frota"
    },
    {
      number: "02",
      title: "Análise Documental",
      description: "Verificamos toda documentação e qualificações"
    },
    {
      number: "03",
      title: "Aprovação",
      description: "Aprovação do cadastro e liberação na plataforma"
    },
    {
      number: "04",
      title: "Início das Operações",
      description: "Comece a receber cargas e gerar receita"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <BannerWithBadge
        image={heroBannerImage}
        alt="Parceria para Transportadores"
        badgeText="PARA TRANSPORTADORES"
        badgeIcon={<Truck size={20} />}
        title="Parceria para"
        subtitle="Transportadores"
        description="Maximize sua frota e aumente sua receita com nossa rede de cargas otimizadas. Junte-se aos transportadores que já confiam na SameDay."
        buttonText="Quero Transportar"
        buttonLink="#cadastro"
      />

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona para Transportadores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma conecta sua frota com embarcadores que precisam de transporte confiável
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Funcionamento da Plataforma
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                    <MapPin className="text-green-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Receba Solicitações</h4>
                    <p className="text-gray-600">Cargas disponíveis aparecem automaticamente no seu painel</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                    <Truck className="text-green-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Aceite e Colete</h4>
                    <p className="text-gray-600">Aceite as cargas que se adequam à sua rota e capacidade</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                    <Route className="text-green-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Transporte Otimizado</h4>
                    <p className="text-gray-600">Siga rotas otimizadas para máxima eficiência</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                    <DollarSign className="text-green-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Receba o Pagamento</h4>
                    <p className="text-gray-600">Pagamentos automáticos após confirmação da entrega</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Vantagens Exclusivas</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">Cargas pré-aprovadas e verificadas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">Pagamento garantido em até 30 dias</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">Suporte operacional 24/7</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">Seguro de carga incluso</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vantagens para Transportadores
            </h2>
            <p className="text-xl text-gray-600">
              Benefícios exclusivos para quem tem frota própria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Requisitos para Parceria
              </h2>
              <p className="text-xl text-gray-600">
                Critérios necessários para se tornar um transportador parceiro
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Documentação Exigida</h3>
                <ul className="space-y-3">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-green-500 mr-3 mt-0.5" size={16} />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Processo de Aprovação</h3>
                <div className="space-y-4">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        {step.number}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{step.title}</h4>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="cadastro" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Cadastre-se como Transportador
              </h2>
              <p className="text-xl text-gray-600">
                Preencha os dados abaixo para iniciar sua parceria
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome da Empresa *
                    </label>
                    <Input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      placeholder="Digite o nome da sua empresa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CNPJ *
                    </label>
                    <Input
                      type="text"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleInputChange}
                      required
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Responsável *
                    </label>
                    <Input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      placeholder="Nome completo do responsável"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="email@empresa.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RNTRC *
                    </label>
                    <Input
                      type="text"
                      name="rntrc"
                      value={formData.rntrc}
                      onChange={handleInputChange}
                      required
                      placeholder="Número do RNTRC"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço da Empresa *
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Endereço completo"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tamanho da Frota *
                    </label>
                    <select 
                      name="fleetSize"
                      value={formData.fleetSize}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Selecione</option>
                      <option value="1-5">1 a 5 veículos</option>
                      <option value="6-15">6 a 15 veículos</option>
                      <option value="16-50">16 a 50 veículos</option>
                      <option value="50+">Mais de 50 veículos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tempo de Experiência
                    </label>
                    <select 
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Selecione</option>
                      <option value="1-2">1 a 2 anos</option>
                      <option value="3-5">3 a 5 anos</option>
                      <option value="6-10">6 a 10 anos</option>
                      <option value="10+">Mais de 10 anos</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipos de Veículos
                  </label>
                  <Input
                    type="text"
                    name="vehicleTypes"
                    value={formData.vehicleTypes}
                    onChange={handleInputChange}
                    placeholder="Ex: VUC, 3/4, Truck, Carreta, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Áreas de Operação
                  </label>
                  <Input
                    type="text"
                    name="operationAreas"
                    value={formData.operationAreas}
                    onChange={handleInputChange}
                    placeholder="Ex: São Paulo, Rio de Janeiro, Minas Gerais"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Informações Adicionais
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Conte-nos mais sobre sua empresa e experiência"
                    rows={4}
                  />
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Upload className="text-green-600 mt-1 mr-3" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Documentos Necessários</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Após o envio do formulário, nossa equipe solicitará:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Cartão CNPJ e Contrato Social</li>
                        <li>• Certificado RNTRC válido</li>
                        <li>• CNH dos condutores</li>
                        <li>• Documentos dos veículos (CRLV)</li>
                        <li>• Apólice de seguro</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mr-2"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Concordo com os <a href="#termos" className="text-green-600 hover:underline">Termos de Uso</a> e 
                    <a href="#privacidade" className="text-green-600 hover:underline ml-1">Política de Privacidade</a>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Cadastro'}
                  <CheckCircle className="ml-2" size={20} />
                </Button>

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

export default CarrierPage;

