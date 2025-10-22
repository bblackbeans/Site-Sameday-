import React from 'react';
import Header from '../components/Header';
import LogicoStyleFooter from '../components/LogicoStyleFooter';
import BannerWithBadge from '../components/BannerWithBadge';
import { FileText } from 'lucide-react';
import heroBannerImage from "../assets/images/banner.jpg";

const TermsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <BannerWithBadge
        image={heroBannerImage}
        alt="Termos de Uso"
        badgeText="LEGAL"
        badgeIcon={<FileText size={20} />}
        title="Termos de Uso"
        description="Conheça os termos e condições que regem o uso da nossa plataforma de logística urbana."
        buttonText="Ler Termos"
        buttonLink="#termos"
      />

      {/* Terms Content */}
      <section id="termos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Termos de Uso - SameDay</h1>
                
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">1. Aceitação dos Termos</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Ao acessar e utilizar a plataforma SameDay, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deve utilizar nossa plataforma.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">2. Descrição do Serviço</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      A SameDay é uma plataforma de logística urbana que conecta embarcadores, transportadores e entregadores, oferecendo soluções integradas para:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Gestão de entregas urbanas</li>
                      <li>Simulação de custos de frete e armazenagem</li>
                      <li>Rede de parceiros Stock Store</li>
                      <li>Plataforma de comunicação entre usuários</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">3. Cadastro e Conta de Usuário</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Para utilizar nossos serviços, você deve criar uma conta fornecendo informações precisas e atualizadas. Você é responsável por:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Manter a confidencialidade de sua senha</li>
                      <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                      <li>Fornecer informações verdadeiras e precisas</li>
                      <li>Atualizar suas informações quando necessário</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">4. Uso Aceitável</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Você concorda em não utilizar nossa plataforma para:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Atividades ilegais ou não autorizadas</li>
                      <li>Transmitir conteúdo ofensivo, difamatório ou inadequado</li>
                      <li>Interferir no funcionamento da plataforma</li>
                      <li>Tentar obter acesso não autorizado a sistemas</li>
                      <li>Usar a plataforma para spam ou comunicações não solicitadas</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">5. Propriedade Intelectual</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Todo o conteúdo da plataforma SameDay, incluindo textos, gráficos, logotipos, ícones, imagens, software e outros materiais, é propriedade da SameDay ou de seus licenciadores e está protegido por leis de direitos autorais e outras leis de propriedade intelectual.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">6. Limitação de Responsabilidade</h2>
                    <p className="text-gray-700 leading-relaxed">
                      A SameDay não será responsável por danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou incapacidade de usar nossa plataforma, incluindo, mas não limitado a, perda de lucros, dados ou outras perdas intangíveis.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">7. Modificações dos Termos</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Reservamo-nos o direito de modificar estes termos a qualquer momento. As modificações entrarão em vigor imediatamente após a publicação na plataforma. O uso continuado da plataforma após tais modificações constitui sua aceitação dos novos termos.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">8. Rescisão</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Podemos suspender ou encerrar sua conta e acesso à plataforma a qualquer momento, com ou sem aviso prévio, por violação destes termos ou por qualquer outro motivo a nosso critério.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">9. Lei Aplicável</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-primary-purple mb-4">10. Contato</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Se você tiver dúvidas sobre estes termos, entre em contato conosco através do email: <a href="mailto:contato@sameday.com.br" className="text-primary-purple hover:underline">contato@sameday.com.br</a>
                    </p>
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

export default TermsPage;
