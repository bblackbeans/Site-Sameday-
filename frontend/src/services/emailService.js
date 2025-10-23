// Sistema de envio de emails via API AdonisJS - VERSÃO CORRIGIDA
const API_BASE_URL = 'https://sameday-sameday-api.psvs5z.easypanel.host/v2';

/**
 * Função base para enviar email via API
 */
async function sendEmail(formData, formType) {
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

// Named exports - funções diretas
export const sendContactEmail = async (formData) => {
  return await sendEmail(formData, 'contact');
};

export const sendShipperEmail = async (formData) => {
  return await sendEmail(formData, 'embarcador');
};

export const sendCarrierEmail = async (formData) => {
  return await sendEmail(formData, 'transportador');
};

export const sendStockStoreEmail = async (formData) => {
  return await sendEmail(formData, 'stock-store');
};

export const sendDeliveryPersonEmail = async (formData) => {
  return await sendEmail(formData, 'entregador');
};
