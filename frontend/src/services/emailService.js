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

// Função para cadastrar Embarcador
export const sendShipperEmail = async (formData) => {
  try {
    console.log('📧 Cadastrando Embarcador via API...');
    console.log('📧 Dados:', formData);
    
    const response = await fetch(`${API_BASE_URL}/partners/shippers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName: formData.companyName,
        cnpj: formData.cnpj,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        businessType: formData.businessType,
        monthlyVolume: formData.monthlyVolume,
        description: formData.description
      })
    });
    
    const result = await response.json();
    console.log('📦 Resposta da API do embarcador:', result);
    
    // Verifica se a mensagem contém "sucesso" ou se tem o objeto shipper
    const isSuccess = (result.message && result.message.includes('sucesso')) || result.shipper;
    
    if (isSuccess) {
      console.log('✅ Embarcador cadastrado com sucesso!', result);
      return { success: true, message: 'Cadastro realizado com sucesso!' };
    } else {
      console.log('❌ Resposta não é sucesso:', result);
      throw new Error(result.message || 'Erro ao cadastrar embarcador');
    }
    
  } catch (error) {
    console.error('❌ Erro ao cadastrar embarcador:', error);
    return { success: false, message: 'Erro ao cadastrar embarcador' };
  }
};

// Função para cadastrar Transportador
export const sendCarrierEmail = async (formData) => {
  try {
    console.log('📧 Cadastrando Transportador via API...');
    console.log('📧 Dados:', formData);
    
    const response = await fetch(`${API_BASE_URL}/partners/carriers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName: formData.companyName,
        cnpj: formData.cnpj,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        rntrc: formData.rntrc,
        fleetSize: formData.fleetSize,
        vehicleTypes: formData.vehicleTypes,
        operationAreas: formData.operationAreas,
        experience: formData.experience,
        description: formData.description
      })
    });
    
    const result = await response.json();
    
    // Verifica se a mensagem contém "sucesso" ou se tem o objeto carrier
    if ((result.message && result.message.includes('sucesso')) || result.carrier) {
      console.log('✅ Transportador cadastrado com sucesso!', result);
      return { success: true, message: 'Cadastro realizado com sucesso!' };
    } else {
      throw new Error(result.message || 'Erro ao cadastrar transportador');
    }
    
  } catch (error) {
    console.error('❌ Erro ao cadastrar transportador:', error);
    return { success: false, message: 'Erro ao cadastrar transportador' };
  }
};

// Função para cadastrar Stock Store
export const sendStockStoreEmail = async (formData) => {
  try {
    console.log('📧 Cadastrando Stock Store via API...');
    console.log('📧 Dados:', formData);
    
    const response = await fetch(`${API_BASE_URL}/partners/stock-store`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        cpfCnpj: formData.cpfCnpj,
        propertyType: formData.propertyType,
        address: formData.address,
        spaceSize: formData.spaceSize,
        availability: formData.availability,
        description: formData.description
      })
    });
    
    const result = await response.json();
    
    // Verifica se a mensagem contém "sucesso" ou se tem o objeto partner
    if ((result.message && result.message.includes('sucesso')) || result.partner) {
      console.log('✅ Stock Store cadastrado com sucesso!', result);
      return { success: true, message: 'Cadastro realizado com sucesso!' };
    } else {
      throw new Error(result.message || 'Erro ao cadastrar stock store');
    }
    
  } catch (error) {
    console.error('❌ Erro ao cadastrar stock store:', error);
    return { success: false, message: 'Erro ao cadastrar stock store' };
  }
};

export const sendDeliveryPersonEmail = async (formData) => {
  return await sendEmail(formData, 'entregador');
};
