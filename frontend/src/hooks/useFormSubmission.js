import { useState } from 'react';
import emailService from '../services/emailService';

const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const submitForm = async (formData, formType = 'contact') => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      let result;
      
      // Escolher a função de envio baseada no tipo de formulário
      switch (formType) {
        case 'contact':
          result = await emailService.sendContactEmail(formData);
          break;
        case 'embarcador':
          result = await emailService.sendShipperEmail(formData);
          break;
        case 'transportador':
          result = await emailService.sendCarrierEmail(formData);
          break;
        case 'stock-store':
          result = await emailService.sendStockStoreEmail(formData);
          break;
        case 'entregador':
          result = await emailService.sendDeliveryPersonEmail(formData);
          break;
        default:
          result = await emailService.sendContactEmail(formData);
      }

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
