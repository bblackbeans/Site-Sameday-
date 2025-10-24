import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import Header from './Header';
import LogicoStyleFooter from './LogicoStyleFooter';
import BannerWithBadge from './BannerWithBadge';
import useFormSubmission from '../hooks/useFormSubmission';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  Headphones,
  Users,
  HelpCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

import heroBannerImage from "../assets/images/banner.jpg";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    userType: ''
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
    const success = await submitForm(formData, 'contact');
    
    // Reset form only on success
    if (success) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        userType: ''
      });
    }
  };

  const contactMethods = [
    {
      icon: <Phone className="text-blue-600" size={32} />,
      title: "Telefone",
      description: "Fale conosco diretamente",
      contact: "(11) 4000-0000",
      availability: "Seg-Sex: 8h às 18h"
    },
    {
      icon: <Mail className="text-blue-600" size={32} />,
      title: "E-mail",
      description: "Envie sua mensagem",
      contact: "contato@sameday.com.br",
      availability: "Resposta em até 24h"
    },
    {
      icon: <MessageCircle className="text-blue-600" size={32} />,
      title: "WhatsApp",
      description: "Chat direto conosco",
      contact: "(11) 99999-9999",
      availability: "Seg-Sex: 8h às 18h"
    },
    {
      icon: <Headphones className="text-blue-600" size={32} />,
      title: "Suporte Técnico",
      description: "Ajuda especializada",
      contact: "suporte@sameday.com.br",
      availability: "24/7 para emergências"
    }
  ];

  const supportTypes = [
    {
      icon: <Users className="text-green-600" size={24} />,
      title: "Embarcadores",
      description: "Dúvidas sobre envios, cotações e rastreamento"
    },
    {
      icon: <Users className="text-orange-600" size={24} />,
      title: "Transportadores",
      description: "Suporte para parceiros transportadores"
    },
    {
      icon: <Users className="text-primary-purple" size={24} />,
      title: "Entregadores",
      description: "Ajuda com entregas e aplicativo"
    },
    {
      icon: <Users className="text-blue-600" size={24} />,
      title: "Stock Stores",
      description: "Suporte para parceiros de armazenagem"
    }
  ];

  const faqs = [
    {
      question: "Como posso rastrear minha encomenda?",
      answer: "Você pode rastrear sua encomenda através do nosso site ou app, usando o código de rastreamento fornecido."
    },
    {
      question: "Qual o prazo de entrega?",
      answer: "Os prazos variam conforme o tipo de serviço: Padrão (2-5 dias úteis) ou Expresso (1-2 dias úteis)."
    },
    {
      question: "Como funciona o seguro da carga?",
      answer: "Todas as cargas são automaticamente seguradas pelo valor declarado, sem custo adicional."
    },
    {
      question: "Posso alterar o endereço de entrega?",
      answer: "Sim, alterações podem ser feitas até 2 horas antes da coleta, através do nosso suporte."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <BannerWithBadge
        image={heroBannerImage}
        alt="Fale Conosco"
        badgeText="CONTATO"
        badgeIcon={<MessageCircle size={20} />}
        title="Fale Conosco"
        subtitle="Estamos aqui para ajudar"
        description="Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo ou envie uma mensagem diretamente."
        buttonText="Enviar Mensagem"
        buttonLink="#contato-form"
      />

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Canais de Atendimento
            </h2>
            <p className="text-xl text-gray-600">
              Escolha a forma mais conveniente para entrar em contato
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="mb-4">{method.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-3">{method.description}</p>
                <p className="font-semibold text-blue-600 mb-2">{method.contact}</p>
                <p className="text-sm text-gray-500">{method.availability}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contato-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Envie uma Mensagem
                </h2>
                <p className="text-gray-600 mb-8">
                  Preencha o formulário abaixo para enviar sua mensagem.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
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
                        Telefone
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Usuário
                      </label>
                      <select 
                        name="userType"
                        value={formData.userType}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Selecione</option>
                        <option value="embarcador">Embarcador</option>
                        <option value="transportador">Transportador</option>
                        <option value="entregador">Entregador</option>
                        <option value="stock-store">Parceiro Stock Store</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assunto *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Assunto da sua mensagem"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Descreva sua dúvida ou solicitação"
                      rows={6}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Enviando...</>
                    ) : (
                      <>
                        Enviar Mensagem
                        <Send className="ml-2" size={20} />
                      </>
                    )}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                      <CheckCircle className="text-green-600 mr-2" size={20} />
                      <span className="text-green-800 font-medium">
                        Mensagem enviada com sucesso!
                      </span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                      <XCircle className="text-red-600 mr-2" size={20} />
                      <span className="text-red-800 font-medium">
                        Erro ao enviar mensagem. Tente novamente.
                      </span>
                    </div>
                  )}
                </form>
              </div>

              {/* Support Info */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Suporte Especializado
                </h3>
                <p className="text-gray-600 mb-8">
                  Nossa equipe está preparada para atender diferentes tipos de usuários com suporte especializado.
                </p>

                <div className="space-y-6">
                  {supportTypes.map((type, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-4 mt-1">{type.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{type.title}</h4>
                        <p className="text-gray-600 text-sm">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Clock className="text-blue-600 mr-2" size={20} />
                    <h4 className="font-semibold text-gray-900">Horário de Atendimento</h4>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Segunda a Sexta: 8h às 18h</li>
                    <li>• Sábado: 8h às 12h</li>
                    <li>• Suporte de emergência: 24/7</li>
                    <li>• WhatsApp: Seg-Sex 8h às 18h</li>
                  </ul>
                </div>
              </div>
            </div>
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
                Encontre respostas rápidas para as dúvidas mais comuns
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md">
                  <div className="p-6">
                    <div className="flex items-start">
                      <HelpCircle className="text-blue-600 mr-3 mt-1" size={20} />
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

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Não encontrou a resposta que procurava?
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Entre em Contato Conosco
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossa Localização
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Visite nosso escritório ou entre em contato pelos canais digitais
            </p>
            
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="text-blue-600 mr-2" size={24} />
                <h3 className="text-xl font-semibold text-gray-900">Sede SameDay</h3>
              </div>
              <p className="text-gray-600 mb-2">
                Av. Paulista, 1000 - Bela Vista
              </p>
              <p className="text-gray-600 mb-4">
                São Paulo - SP, 01310-100
              </p>
              <p className="text-sm text-gray-500">
                Estacionamento disponível | Próximo ao metrô Trianon-MASP
              </p>
            </div>
          </div>
        </div>
      </section>

      <LogicoStyleFooter />
    </div>
  );
};

export default ContactPage;

