import { useState } from 'react';
import { sendContactEmail, sendShipperEmail, sendCarrierEmail, sendStockStoreEmail, sendDeliveryPersonEmail } from '../services/emailService';

const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const submitForm = async (formData, formType = 'contact') => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Mapear tipos de formulário para funções de envio
      const senders = {
        contact:       sendContactEmail,
        embarcador:    sendShipperEmail,
        transportador: sendCarrierEmail,
        'stock-store': sendStockStoreEmail,
        entregador:    sendDeliveryPersonEmail,
      };

      const sender = senders[formType] || sendContactEmail;
      const result = await sender(formData);

      if (result.success) {
        setSubmitStatus('success');
        console.log('✅ Email enviado com sucesso para kaue.ronald@blackbeans.com.br');
        return true; // Retorna true para indicar sucesso
      } else {
        throw new Error('Erro ao enviar email');
      }
      
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      setSubmitStatus('error');
      return false; // Retorna false para indicar erro
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitStatus,
    submitForm
  };
};

export default useFormSubmission;
