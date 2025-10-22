// Configurações do Simulador de Frete
export const FREIGHT_CONFIG = {
  // Taxa fixa base
  basePrice: 15.00,
  
  // Peso volumétrico (kg por m³)
  volumetricWeightFactor: 167,
  
  // Fatores regionais
  regionFactors: {
    sameState: 0.8,      // Mesmo estado
    neighborState: 1.2,  // Estado vizinho
    distantState: 1.8    // Estado distante
  },
  
  // Multiplicadores de serviço
  serviceMultipliers: {
    standard: 1.0,
    express: 1.8
  },
  
  // Prazos de entrega (em dias úteis)
  deliveryTimes: {
    sameState: {
      standard: '2-3 dias úteis',
      express: '1 dia útil'
    },
    differentState: {
      standard: '4-7 dias úteis',
      express: '2-3 dias úteis'
    }
  },
  
  // Distâncias simuladas (km)
  distances: {
    sameState: { min: 50, max: 200 },
    differentState: { min: 200, max: 800 }
  }
};

// Configurações do Simulador de Armazenagem
export const STORAGE_CONFIG = {
  // Categorias de armazenagem
  categories: [
    {
      name: 'Mini',
      maxVolume: 0.1, // m³
      pricePerUnit: 2.50, // R$ por unidade/dia
      examples: 'Caixa de sapato, livros, jóias'
    },
    {
      name: 'Pequeno',
      maxVolume: 0.5, // m³
      pricePerUnit: 5.00, // R$ por unidade/dia
      examples: 'Videogame, ferramentas manuais'
    },
    {
      name: 'Médio',
      maxVolume: 1.5, // m³
      pricePerUnit: 8.50, // R$ por unidade/dia
      examples: 'Micro-ondas, cadeira desmontada'
    },
    {
      name: 'Grande',
      maxVolume: Infinity, // m³
      pricePerUnit: 15.00, // R$ por unidade/dia
      examples: 'Geladeira, máquinas industriais'
    }
  ],
  
  // Limites
  maxStorageDays: 30,
  
  // Conversão de cm para m³
  volumeConversion: 1000000 // cm³ para m³
};

export default {
  FREIGHT_CONFIG,
  STORAGE_CONFIG
};
