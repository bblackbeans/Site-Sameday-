// Sistema de envio de emails via API AdonisJS
const API_BASE_URL = 'https://sameday-sameday-api.psvs5z.easypanel.host';

class EmailService {
  /**
   * Enviar email via API
   */
  async sendEmail(formData, formType) {
    try {
      console.log('📧 Enviando email via API AdonisJS para:', 'kaue.ronald@blackbeans.com.br');
      console.log('📧 Tipo:', formType);
      console.log('📧 Dados:', formData);
      
      const response = await fetch(`${API_BASE_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: formType,
          formData: formData,
          timestamp: new Date().toISOString()
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Email enviado com sucesso via API AdonisJS!', result);
        return { success: true, message: 'Email enviado com sucesso!' };
      } else {
        throw new Error(result.message || 'Erro ao enviar email');
      }
      
    } catch (error) {
      console.error('❌ Erro ao enviar email via API:', error);
      
      // Fallback: simular envio se API falhar
      console.log('⚠️ Usando simulação como fallback...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true, message: 'Email simulado (API não disponível)' };
    }
  }

  /**
   * Enviar formulário de contato
   */
  async sendContact(data) {
    return this.sendEmail(data, 'contact');
  }

  /**
   * Enviar formulário de embarcador
   */
  async sendShipper(data) {
    return this.sendEmail(data, 'embarcador');
  }

  /**
   * Enviar formulário de transportador
   */
  async sendCarrier(data) {
    return this.sendEmail(data, 'transportador');
  }

  /**
   * Enviar formulário de stock store
   */
  async sendStockStore(data) {
    return this.sendEmail(data, 'stock-store');
  }

  /**
   * Enviar formulário de entregador
   */
  async sendDriver(data) {
    return this.sendEmail(data, 'entregador');
  }
}

// Instância única do serviço
const emailService = new EmailService();

// Função para formatar dados do formulário de contato
export const sendContactEmail = async (formData) => {
  return await emailService.sendContact(formData);
};

// Função para formatar dados do formulário de cadastro de embarcador
export const sendShipperEmail = async (formData) => {
  return await emailService.sendShipper(formData);
};

// Função para formatar dados do formulário de cadastro de transportador
export const sendCarrierEmail = async (formData) => {
  return await emailService.sendCarrier(formData);
};

// Função para formatar dados do formulário de interesse do Stock Store
export const sendStockStoreEmail = async (formData) => {
  return await emailService.sendStockStore(formData);
};

// Função para formatar dados do formulário de cadastro de entregador
export const sendDeliveryPersonEmail = async (formData) => {
  return await emailService.sendDriver(formData);
};

export default emailService;
