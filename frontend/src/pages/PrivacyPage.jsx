import React from 'react';
import Header from '../components/Header';
import LogicoStyleFooter from '../components/LogicoStyleFooter';
import BannerWithBadge from '../components/BannerWithBadge';
import { Shield } from 'lucide-react';
import heroBannerImage from "../assets/images/banner.jpg";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <BannerWithBadge
        image={heroBannerImage}
        alt="Política de Privacidade"
        badgeText="LEGAL"
        badgeIcon={<Shield size={20} />}
        title="Política de Privacidade"
        description="Conheça como coletamos, utilizamos e protegemos suas informações pessoais em nossa plataforma."
        buttonText="Ler Política"
        buttonLink="#privacidade"
      />

      {/* Privacy Content */}
      <section id="privacidade" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidade - SameDay</h1>
                
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">1. Introdução</h2>
                    <p className="text-gray-700 leading-relaxed">
                      A SameDay está comprometida em proteger a privacidade e segurança dos dados pessoais de nossos usuários. Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">2. Informações que Coletamos</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Informações Fornecidas Diretamente</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                      <li>Nome completo e dados de contato</li>
                      <li>Endereço de email e telefone</li>
                      <li>Informações de cadastro (CPF/CNPJ)</li>
                      <li>Endereços de entrega e coleta</li>
                      <li>Informações de pagamento</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Informações Coletadas Automaticamente</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Endereço IP e dados de localização</li>
                      <li>Informações do dispositivo e navegador</li>
                      <li>Histórico de uso da plataforma</li>
                      <li>Cookies e tecnologias similares</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">3. Como Utilizamos suas Informações</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Utilizamos suas informações pessoais para:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Fornecer e melhorar nossos serviços de logística</li>
                      <li>Processar pedidos e entregas</li>
                      <li>Comunicar sobre serviços e atualizações</li>
                      <li>Personalizar sua experiência na plataforma</li>
                      <li>Cumprir obrigações legais e regulamentares</li>
                      <li>Prevenir fraudes e garantir a segurança</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">4. Compartilhamento de Informações</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Não vendemos suas informações pessoais. Podemos compartilhar suas informações apenas nas seguintes situações:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Com parceiros de entrega e transportadores necessários para o serviço</li>
                      <li>Com prestadores de serviços que nos auxiliam na operação</li>
                      <li>Quando exigido por lei ou autoridades competentes</li>
                      <li>Para proteger nossos direitos e segurança</li>
                      <li>Com seu consentimento explícito</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">5. Segurança dos Dados</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Implementamos medidas técnicas e organizacionais adequadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui criptografia, controles de acesso e monitoramento contínuo de segurança.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">6. Seus Direitos</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      De acordo com a LGPD, você tem os seguintes direitos:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li><strong>Acesso:</strong> Solicitar informações sobre seus dados pessoais</li>
                      <li><strong>Correção:</strong> Corrigir dados incompletos ou incorretos</li>
                      <li><strong>Exclusão:</strong> Solicitar a exclusão de seus dados</li>
                      <li><strong>Portabilidade:</strong> Transferir seus dados para outro serviço</li>
                      <li><strong>Revogação:</strong> Revogar o consentimento a qualquer momento</li>
                      <li><strong>Oposição:</strong> Opor-se ao tratamento de seus dados</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">7. Cookies e Tecnologias Similares</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso da plataforma e personalizar conteúdo. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">8. Retenção de Dados</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, cumprir obrigações legais ou resolver disputas. Quando não precisarmos mais de suas informações, as excluiremos de forma segura.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">9. Menores de Idade</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente informações pessoais de menores. Se tomarmos conhecimento de que coletamos dados de um menor, tomaremos medidas para excluir essas informações.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">10. Alterações nesta Política</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas através da plataforma ou por email. Recomendamos revisar esta política regularmente.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">11. Contato</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato conosco:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li><strong>Email:</strong> <a href="mailto:privacidade@sameday.com.br" className="text-primary-purple hover:underline">privacidade@sameday.com.br</a></li>
                      <li><strong>Telefone:</strong> +55 (11) 99999-9999</li>
                      <li><strong>Endereço:</strong> Av. Paulista, 1000 - São Paulo, SP - 01310-100</li>
                    </ul>
                  </div>

                  <div className="border-t border-gray-200 pt-8 mt-12">
                    <p className="text-sm text-gray-500">
                      <strong>Última atualização:</strong> Janeiro de 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LogicoStyleFooter />
    </div>
  );
};

export default PrivacyPage;
