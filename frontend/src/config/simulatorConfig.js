// Configurações do Simulador de Frete - SameDay 2025
export const FREIGHT_CONFIG = {
  // Modalidades
  modalType: {
    LTL: 'ltl', // Carga Fracionada (peso ≤ 1.000 kg)
    FTL: 'ftl'  // Carga Completa / Veículo Dedicado (peso > 1.000 kg)
  },
  
  // Divisor para peso cubado (ANTT)
  volumetricWeightDivisor: 6000, // Fórmula: (C × L × A) / 6000
  
  // Tarifas por faixa de peso (LTL)
  weightBasedRates: {
    upTo100: 1.50,    // Até 100 kg → R$ 1,50/kg
    upTo300: 1.20,    // Até 300 kg → R$ 1,20/kg
    upTo600: 0.90,    // Até 600 kg → R$ 0,90/kg
    upTo1000: 0.70,   // Até 1.000 kg → R$ 0,70/kg
    above1000: 0.50   // Acima de 1.000 kg → R$ 0,50/kg
  },
  
  // Taxas por tipo de veículo (FTL) - por km
  vehicleRates: {
    VUC: {
      capacity: 1000,
      rate: 2.15,      // R$ 2,15/km
      application: 'Urbano e curta distância'
    },
    '3/4': {
      capacity: 3000,
      rate: 2.60,      // R$ 2,60/km
      application: 'Médio porte'
    },
    Toco: {
      capacity: 12000,
      rate: 4.15,      // R$ 4,15/km
      application: 'Transporte regional'
    },
    Truck: {
      capacity: 18000,
      rate: 4.75,      // R$ 4,75/km
      application: 'Médio-pesado'
    },
    'Carreta LS': {
      capacity: 32000,
      rate: 6.25,      // R$ 6,25/km
      application: 'Longo percurso'
    },
    Bitrem: {
      capacity: 45000,
      rate: 7.65,      // R$ 7,65/km
      application: 'Cargas pesadas interestaduais'
    },
    Rodotrem: {
      capacity: 74000,
      rate: 9.25,      // R$ 9,25/km
      application: 'Cargas completas / alta tonelagem'
    }
  },
  
  // Pedágios por rota
  tollRoutes: {
    'SP-RJ': 120,
    'SP-DF': 400,
    'SP-MG': 180,
    'RJ-MG': 150
  },
  
  // Taxa padrão de pedágio (por km)
  defaultTollRate: 0.15,
  
  // Adicionais sobre frete base
  additionalCharges: {
    fragile: 0.03,      // Carga Frágil: +3%
    perishable: 0.03,    // Carga Perecível: +3%
    urgent: 0.15        // Entrega Urgente: +15%
  },
  
  // GRIS (Gerenciamento de Riscos e Segurança)
  grisRate: 0.003,       // 0,3% do valor da NF
  
  // Distâncias simuladas (km)
  simulatedDistances: {
    sameState: { min: 50, max: 200 },
    differentState: { min: 200, max: 800 }
  }
};

// Configurações do Simulador de Armazenagem - Stock Store 2025
export const STORAGE_CONFIG = {
  // Categorias de armazenagem (atualizadas 2025)
  categories: [
    {
      name: 'Nano',
      maxVolume: 0.05,          // Até 0,05 m³
      pricePerUnit: 0.08,       // R$ 0,08/unidade/dia
      pricePerMonth: 2.40,      // R$ 2,40/30 dias
      examples: 'Relógio, cosmético, peça eletrônica',
      strategy: 'Categoria de alta rotatividade (dropshipping e e-commerce leve)'
    },
    {
      name: 'Mini',
      maxVolume: 0.2,           // 0,05 – 0,2 m³
      pricePerUnit: 0.15,       // R$ 0,15/unidade/dia
      pricePerMonth: 4.50,      // R$ 4,50/30 dias
      examples: 'Livro, fone, caixa de perfume',
      strategy: 'Ideal para itens de e-commerce B2C pequeno porte'
    },
    {
      name: 'Pequeno',
      maxVolume: 0.6,           // 0,2 – 0,6 m³
      pricePerUnit: 0.28,       // R$ 0,28/unidade/dia
      pricePerMonth: 8.40,      // R$ 8,40/30 dias
      examples: 'Videogame, ferramentas, brinquedos',
      strategy: 'Mais competitivo que média de mercado (R$ 0,30–0,35/dia)'
    },
    {
      name: 'Médio',
      maxVolume: 1.5,           // 0,6 – 1,5 m³
      pricePerUnit: 0.42,       // R$ 0,42/unidade/dia
      pricePerMonth: 12.60,     // R$ 12,60/30 dias
      examples: 'Micro-ondas, cadeira desmontada',
      strategy: 'Categoria com melhor margem operacional'
    },
    {
      name: 'Grande',
      maxVolume: 3.0,           // 1,5 – 3,0 m³
      pricePerUnit: 0.70,       // R$ 0,70/unidade/dia
      pricePerMonth: 21.00,     // R$ 21,00/30 dias
      examples: 'Geladeira, palete, motor leve',
      strategy: 'Valor reduzido ~10% vs. armazéns tradicionais'
    },
    {
      name: 'Extra',
      maxVolume: Infinity,      // +3,0 m³
      pricePerUnit: 0.90,       // R$ 0,90/unidade/dia
      pricePerMonth: 27.00,     // R$ 27,00/30 dias
      examples: 'Paletes múltiplos / cargas volumosas',
      strategy: 'Inclui priorização de manuseio e reserva de área exclusiva'
    }
  ],
  
  // Limites
  maxStorageDays: 30,
  
  // Fulfillment (opcional)
  fulfillmentRate: 2.90,        // R$ 2,90/unidade vendida
  
  // Rollover gratuito
  freeRolloverPercentage: 0.25, // 25% do total contratado
  
  // Excedente pago
  excessChargeMultiplier: 0.35, // 35% do valor fixo adicional
  
  // Descontos progressivos
  progressiveDiscounts: {
    month2: 0.30,    // Mês 2: -30%
    month3: 0.20,    // Mês 3: -20%
    month4Plus: 0.10 // Mês 4+: -10%
  },
  
  // Bonificação de volume
  volumeDiscount: {
    minUnits: 1000,  // +1.000 unidades
    minVolume: 5,    // ou +5 m³ totais
    percentage: 0.05 // +5% desconto
  },
  
  // Serviços adicionais (opcional)
  additionalServices: {
    min: 0.80,       // R$ 0,80/unid.
    max: 1.50        // R$ 1,50/unid.
  },
  
  // Conversão de cm para m³
  volumeConversion: 1000000 // cm³ para m³
};

export default {
  FREIGHT_CONFIG,
  STORAGE_CONFIG
};
