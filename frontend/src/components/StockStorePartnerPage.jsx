import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import Header from './Header';
import LogicoStyleFooter from './LogicoStyleFooter';
import BannerWithBadge from './BannerWithBadge';
import useFormSubmission from '../hooks/useFormSubmission';
import { 
  Store, 
  DollarSign, 
  MapPin, 
  Package, 
  Users, 
  BarChart3, 
  Upload,
  CheckCircle,
  ArrowRight,
  Home,
  Clock,
  Shield,
  XCircle
} from 'lucide-react';

import heroBannerImage from "../assets/images/banner.jpg";

const StockStorePartnerPage = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    cpfCnpj: '',
    propertyType: '',
    address: '',
    spaceSize: '',
    availability: '',
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
    const success = await submitForm(formData, 'stock-store');
    
    // Reset form only on success
    if (success) {
      setFormData({
        ownerName: '',
        email: '',
        phone: '',
        cpfCnpj: '',
        propertyType: '',
        address: '',
        spaceSize: '',
        availability: '',
        experience: '',
        description: ''
      });
    }
  };

  const benefits = [
    {
      icon: <DollarSign className="text-orange-600" size={32} />,
      title: "Renda Extra Garantida",
      description: "Monetize seu espaço ocioso com pagamentos mensais garantidos"
    },
    {
      icon: <Package className="text-orange-600" size={32} />,
      title: "Gestão Simplificada",
      description: "Nossa equipe cuida de toda a operação e logística"
    },
    {
      icon: <Users className="text-orange-600" size={32} />,
      title: "Movimento no Local",
      description: "Aumento do fluxo de pessoas e potenciais clientes"
    },
    {
      icon: <Shield className="text-orange-600" size={32} />,
      title: "Seguro Incluso",
      description: "Cobertura completa para produtos armazenados"
    },
    {
      icon: <BarChart3 className="text-orange-600" size={32} />,
      title: "Relatórios Detalhados",
      description: "Acompanhe a movimentação e seus ganhos"
    },
    {
      icon: <Clock className="text-orange-600" size={32} />,
      title: "Suporte 24/7",
      description: "Equipe sempre disponível para apoio operacional"
    }
  ];

  const whoCanBe = [
    {
      icon: <Store className="text-orange-600" size={24} />,
      title: "Estabelecimentos Comerciais",
      description: "Lojas, farmácias, mercados, padarias com espaço disponível"
    },
    {
      icon: <Home className="text-orange-600" size={24} />,
      title: "Residências Estratégicas",
      description: "Casas em localizações privilegiadas com espaço adequado"
    },
    {
      icon: <MapPin className="text-orange-600" size={24} />,
      title: "Pontos Comerciais",
      description: "Locais com alto fluxo de pessoas e fácil acesso"
    }
  ];

  const activationSteps = [
    {
      number: "01",
      title: "Manifestação de Interesse",
      description: "Preencha o formulário e envie fotos do local"
    },
    {
      number: "02",
      title: "Análise Técnica",
      description: "Nossa equipe avalia a viabilidade do local"
    },
    {
      number: "03",
      title: "Visita Técnica",
      description: "Agendamos uma visita para conhecer o espaço"
    },
    {
      number: "04",
      title: "Contratação",
      description: "Assinatura do contrato e início da operação"
    },
    {
      number: "05",
      title: "Instalação",
      description: "Montagem da estrutura e treinamento"
    },
    {
      number: "06",
      title: "Operação",
      description: "Início das atividades e recebimento dos produtos"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <BannerWithBadge
        image={heroBannerImage}
        alt="Seja um Parceiro Stock Store"
        badgeText="PARA STOCK STORES"
        badgeIcon={<Store size={20} />}
        title="Seja um"
        subtitle="Parceiro Stock Store"
        description="Transforme seu espaço em uma fonte de renda extra. Torne-se um ponto estratégico da nossa rede de armazenagem distribuída."
        buttonText="Quero Participar"
        buttonLink="#interesse"
      />

      {/* Who Can Be Partner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quem Pode Ser Parceiro
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diversos tipos de estabelecimentos e locais podem se tornar Stock Stores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {whoCanBe.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Requisitos Básicos
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Localização</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-gray-700">Área urbana ou suburbana</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-gray-700">Fácil acesso para veículos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-gray-700">Localização estratégica</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Espaço</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-gray-700">Mínimo de 10m² disponíveis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-gray-700">Local seco e seguro</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span className="text-gray-700">Disponibilidade para recebimento</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Benefícios da Parceria
            </h2>
            <p className="text-xl text-gray-600">
              Vantagens exclusivas para nossos parceiros Stock Store
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona o Stock Store
            </h2>
            <p className="text-xl text-gray-600">
              Entenda o modelo de operação simples e eficiente
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Operação Diária
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-orange-100 rounded-full p-3 mr-4">
                    <Package className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Recebimento</h4>
                    <p className="text-gray-600">
                      Produtos chegam via transportadores parceiros
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-100 rounded-full p-3 mr-4">
                    <Store className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Armazenagem</h4>
                    <p className="text-gray-600">
                      Produtos ficam organizados no seu espaço
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-100 rounded-full p-3 mr-4">
                    <Users className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Coleta</h4>
                    <p className="text-gray-600">
                      Entregadores coletam para entrega final
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-100 rounded-full p-3 mr-4">
                    <DollarSign className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Remuneração</h4>
                    <p className="text-gray-600">
                      Receba por cada produto armazenado
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">Modelo de Remuneração</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                  <span className="font-medium">Taxa por produto/dia</span>
                  <span className="text-orange-600 font-bold">R$ 0,50 - R$ 2,00</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                  <span className="font-medium">Bônus por volume</span>
                  <span className="text-orange-600 font-bold">Até 20%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                  <span className="font-medium">Pagamento</span>
                  <span className="text-orange-600 font-bold">Mensal</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                * Valores podem variar conforme localização e tipo de produto
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activation Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Etapas da Ativação
            </h2>
            <p className="text-xl text-gray-600">
              Processo simples para se tornar um Stock Store
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activationSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-100 text-orange-600 rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interest Form */}
      <section id="interesse" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Formulário de Interesse
              </h2>
              <p className="text-xl text-gray-600">
                Preencha os dados abaixo para realizar seu cadastro
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo *
                    </label>
                    <Input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      required
                      placeholder="Seu nome completo"
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
                      placeholder="seu@email.com"
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
                      CPF ou CNPJ *
                    </label>
                    <Input
                      type="text"
                      name="cpfCnpj"
                      value={formData.cpfCnpj}
                      onChange={handleInputChange}
                      required
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço do Local *
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Endereço completo do local"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Propriedade *
                    </label>
                    <select 
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Selecione</option>
                      <option value="comercial">Estabelecimento Comercial</option>
                      <option value="residencial">Residência</option>
                      <option value="misto">Misto</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tamanho do Espaço Disponível
                    </label>
                    <select 
                      name="spaceSize"
                      value={formData.spaceSize}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Selecione</option>
                      <option value="10-20">10 a 20 m²</option>
                      <option value="21-50">21 a 50 m²</option>
                      <option value="51-100">51 a 100 m²</option>
                      <option value="100+">Mais de 100 m²</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disponibilidade para Recebimento
                  </label>
                  <select 
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Selecione</option>
                    <option value="comercial">Horário comercial (8h às 18h)</option>
                    <option value="estendido">Horário estendido (7h às 22h)</option>
                    <option value="flexivel">Horário flexível</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experiência Anterior
                  </label>
                  <Input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Ex: já trabalhou com logística, e-commerce, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição do Local e Observações
                  </label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descreva o local, facilidades, observações importantes"
                    rows={4}
                  />
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Upload className="text-orange-600 mt-1 mr-3" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Fotos do Local</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Após o envio do formulário, nossa equipe solicitará:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Fotos externas do local</li>
                        <li>• Fotos do espaço disponível</li>
                        <li>• Fotos do acesso para veículos</li>
                        <li>• Documentos do imóvel</li>
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
                    Concordo com os <a href="#termos" className="text-orange-600 hover:underline">Termos de Uso</a> e 
                    <a href="#privacidade" className="text-orange-600 hover:underline ml-1">Política de Privacidade</a>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Interesse'}
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
                      Erro ao enviar interesse. Tente novamente.
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

export default StockStorePartnerPage;

