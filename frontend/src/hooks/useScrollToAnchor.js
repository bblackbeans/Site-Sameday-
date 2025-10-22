import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToAnchor = () => {
  const location = useLocation();

  useEffect(() => {
    // Aguarda mais tempo para garantir que a página carregou completamente
    const timer = setTimeout(() => {
      const hash = location.hash;
      
      if (hash) {
        // Remove o # do hash
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          // Scroll suave para o elemento com offset para o header
          const headerHeight = 80; // Altura aproximada do header
          const elementPosition = element.offsetTop - headerHeight;
          
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        } else {
          // Se o elemento não existe, tenta novamente após um tempo
          setTimeout(() => {
            const retryElement = document.getElementById(elementId);
            if (retryElement) {
              const headerHeight = 80;
              const elementPosition = retryElement.offsetTop - headerHeight;
              
              window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
              });
            }
          }, 500);
        }
      } else {
        // Se não há hash, scroll para o topo
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [location]);
};

export default useScrollToAnchor;
