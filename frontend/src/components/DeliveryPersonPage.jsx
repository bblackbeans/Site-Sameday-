import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import Header from './Header';
import LogicoStyleFooter from './LogicoStyleFooter';
import BannerWithBadge from './BannerWithBadge';
import useFormSubmission from '../hooks/useFormSubmission';
import { 
  Users, 
  MapPin, 
  Clock, 
  DollarSign, 
  Smartphone, 
  Shield,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

import heroBannerImage from "../assets/images/banner.jpg";

const DeliveryPersonPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    email: '',
    phone: '',
    vehicleType: '',
    cnh: '',
    experience: ''
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
    await submitForm(formData, 'entregador');
    
    // Reset form only on success
    if (submitStatus === 'success') {
      setFormData({
        fullName: '',
        cpf: '',
        email: '',
        phone: '',
        vehicleType: '',
        cnh: '',
        experience: ''
      });
    }
  };
  const benefits = [
    {
      icon: <DollarSign className="text-primary-purple" size={32} />,
      title: "Renda Extra",
      description: "Ganhe dinheiro extra fazendo entregas na sua região"
    },
    {
      icon: <Clock className="text-primary-purple" size={32} />,
      title: "Horários Flexíveis",
      description: "Trabalhe quando quiser, no seu próprio tempo"
    },
    {
      icon: <MapPin className="text-primary-purple" size={32} />,
      title: "Entregas Locais",
      description: "Entregas próximas à sua localização"
    },
    {
      icon: <Smartphone className="text-primary-purple" size={32} />,
      title: "App Intuitivo",
      description: "Aplicativo fácil de usar para gerenciar suas entregas"
    },
    {
      icon: <Shield className="text-primary-purple" size={32} />,
      title: "Suporte Total",
      description: "Equipe de suporte disponível para ajudar"
    },
    {
      icon: <Users className="text-primary-purple" size={32} />,
      title: "Comunidade",
      description: "Faça parte de uma rede de entregadores parceiros"
    }
  ];

  const faqs = [
    {
      question: "Como funciona o sistema de entregas?",
      answer: "Você recebe notificações de entregas disponíveis na sua região através do app. Aceite as que se adequam ao seu perfil e horário, colete o produto no Stock Store mais próximo e entregue ao cliente final."
    },
    {
      question: "Preciso ter veículo próprio?",
      answer: "Sim, você precisa ter seu próprio veículo (moto, bicicleta, carro) e documentação em dia. Também é necessário ter CNH válida para veículos motorizados."
    },
    {
      question: "Como é feito o pagamento?",
      answer: "Os pagamentos são processados semanalmente via PIX ou transferência bancária, baseado nas entregas realizadas e confirmadas."
    },
    {
      question: "Qual é o valor por entrega?",
      answer: "O valor varia conforme a distância, tipo de produto e urgência da entrega. Você sempre verá o valor antes de aceitar a entrega."
    },
    {
      question: "Posso trabalhar em outras cidades?",
      answer: "Sim, desde que haja Stock Stores e demanda na região. Você pode atualizar sua área de cobertura no app."
    },
    {
      question: "Há algum custo para participar?",
      answer: "Não há taxa de adesão. Você só precisa ter os equipamentos necessários (veículo, smartphone, bag térmica se aplicável)."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <BannerWithBadge
        image={heroBannerImage}
        alt="Seja um Entregador Parceiro"
        badgeText="PARA ENTREGADORES"
        badgeIcon={<Users size={20} />}
        title="Seja um"
        subtitle="Entregador Parceiro"
        description="Ganhe dinheiro extra fazendo entregas na sua região com horários flexíveis e suporte completo da nossa equipe."
        buttonText="App do Entregador"
        buttonLink="#portal"
      />


      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona para Entregadores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Processo simples e direto para começar a fazer entregas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Modelo de Trabalho
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-purple-light rounded-full p-3 mr-4">
                    <Smartphone className="text-primary-purple" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">1. Receba Notificações</h4>
                    <p className="text-gray-600">
                      O app notifica quando há entregas disponíveis na sua região
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-purple-light rounded-full p-3 mr-4">
                    <MapPin className="text-primary-purple" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">2. Colete no Stock Store</h4>
                    <p className="text-gray-600">
                      Vá até o Stock Store mais próximo para coletar o produto
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-purple-light rounded-full p-3 mr-4">
                    <Users className="text-primary-purple" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">3. Entregue ao Cliente</h4>
                    <p className="text-gray-600">
                      Realize a entrega no endereço indicado e confirme no app
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-purple-light rounded-full p-3 mr-4">
                    <DollarSign className="text-primary-purple" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">4. Receba o Pagamento</h4>
                    <p className="text-gray-600">
                      Pagamento automático processado semanalmente
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">Requisitos Básicos</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">Maior de 18 anos</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">CPF e RG válidos</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">Smartphone com internet</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">Veículo próprio (moto, bike, carro)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">CNH válida (para veículos motorizados)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={20} />
                  <span className="text-gray-700">Conta bancária para recebimento</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vantagens de ser Entregador SameDay
            </h2>
            <p className="text-xl text-gray-600">
              Benefícios exclusivos para nossos parceiros entregadores
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

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-xl text-gray-600">
                Tire suas dúvidas sobre como ser um entregador parceiro
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md">
                  <div className="p-6">
                    <div className="flex items-start">
                      <HelpCircle className="text-primary-purple mr-3 mt-1" size={20} />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portal Section */}
      <section id="portal" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              App do Entregador
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Acesse o app para gerenciar suas entregas
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-primary-purple hover:bg-primary-purple-hover text-white font-semibold px-8 py-4"
              >
                Acessar App
                <ExternalLink className="ml-2" size={20} />
              </Button>
            </div>
            
            <div className="mt-8 text-sm opacity-90">
              <p>
                Ainda não tem cadastro? Entre em contato conosco pelo WhatsApp: 
                <a href="#" className="underline ml-1">(11) 99999-9999</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <LogicoStyleFooter />
    </div>
  );
};

export default DeliveryPersonPage;

