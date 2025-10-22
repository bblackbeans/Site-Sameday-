# 🧮 Guia Completo - Manipulação dos Simuladores

## 📍 Localização dos Arquivos

### 🚛 Simulador de Frete
- **Arquivo:** `frontend/src/config/simulatorConfig.js`
- **Componente:** `frontend/src/components/FreightSimulator.jsx`

### 📦 Simulador de Armazenagem  
- **Arquivo:** `frontend/src/config/simulatorConfig.js`
- **Componente:** `frontend/src/components/StorageSimulator.jsx`

---

## 🚛 SIMULADOR DE FRETE - Configuração Detalhada

### 💰 **Preços Base**
```javascript
FREIGHT_CONFIG = {
  basePrice: 15.00,  // Taxa fixa inicial (R$)
}
```

**Como alterar:**
- **Aumentar taxa fixa:** `basePrice: 20.00`
- **Reduzir taxa fixa:** `basePrice: 10.00`

### ⚖️ **Peso Volumétrico**
```javascript
volumetricWeightFactor: 167,  // kg por m³
```

**Como alterar:**
- **Padrão IATA:** `167` (1 m³ = 167 kg)
- **Padrão rodoviário:** `200` (1 m³ = 200 kg)
- **Personalizado:** `150` (1 m³ = 150 kg)

### 🌍 **Fatores Regionais**
```javascript
regionFactors: {
  sameState: 0.8,      // Mesmo estado (ex: SP → SP)
  neighborState: 1.2,  // Estado vizinho (ex: SP → RJ)
  distantState: 1.8    // Estado distante (ex: SP → AM)
}
```

**Como alterar:**
- **Reduzir mesmo estado:** `sameState: 0.6`
- **Aumentar estado distante:** `distantState: 2.0`
- **Adicionar mais regiões:** Criar novos fatores

### 🚀 **Multiplicadores de Serviço**
```javascript
serviceMultipliers: {
  standard: 1.0,  // Serviço padrão (sem multiplicador)
  express: 1.8    // Serviço expresso (80% mais caro)
}
```

**Como alterar:**
- **Express mais caro:** `express: 2.0`
- **Adicionar urgente:** `urgent: 2.5`
- **Reduzir express:** `express: 1.5`

### ⏰ **Prazos de Entrega**
```javascript
deliveryTimes: {
  sameState: {
    standard: '2-3 dias úteis',
    express: '1 dia útil'
  },
  differentState: {
    standard: '4-7 dias úteis',
    express: '2-3 dias úteis'
  }
}
```

**Como alterar:**
- **Mesmo estado mais rápido:** `standard: '1-2 dias úteis'`
- **Estado distante mais lento:** `standard: '5-10 dias úteis'`
- **Adicionar urgente:** `urgent: '4 horas'`

### 📏 **Distâncias Simuladas**
```javascript
distances: {
  sameState: { min: 50, max: 200 },      // 50-200 km
  differentState: { min: 200, max: 800 } // 200-800 km
}
```

**Como alterar:**
- **Mesmo estado maior:** `sameState: { min: 100, max: 300 }`
- **Estado distante menor:** `differentState: { min: 150, max: 500 }`

---

## 📦 SIMULADOR DE ARMAZENAGEM - Configuração Detalhada

### 📊 **Categorias de Volume**
```javascript
categories: [
  {
    name: 'Mini',
    maxVolume: 0.1,           // Até 0,1 m³
    pricePerUnit: 2.50,       // R$ 2,50/unidade/dia
    examples: 'Caixa de sapato, livros'
  },
  {
    name: 'Pequeno', 
    maxVolume: 0.5,           // 0,1 - 0,5 m³
    pricePerUnit: 5.00,       // R$ 5,00/unidade/dia
    examples: 'Videogame, ferramentas'
  },
  {
    name: 'Médio',
    maxVolume: 1.5,           // 0,5 - 1,5 m³
    pricePerUnit: 8.50,       // R$ 8,50/unidade/dia
    examples: 'Micro-ondas, cadeira'
  },
  {
    name: 'Grande',
    maxVolume: Infinity,      // Acima de 1,5 m³
    pricePerUnit: 15.00,      // R$ 15,00/unidade/dia
    examples: 'Geladeira, máquinas'
  }
]
```

### 💰 **Como Alterar Preços**
```javascript
// Exemplo: Aumentar preços em 20%
{
  name: 'Mini',
  maxVolume: 0.1,
  pricePerUnit: 3.00,  // Era 2.50, agora 3.00
  examples: 'Caixa de sapato, livros'
}
```

### 📏 **Como Alterar Volumes**
```javascript
// Exemplo: Redefinir categorias
{
  name: 'Micro',        // Nova categoria
  maxVolume: 0.05,     // Até 0,05 m³
  pricePerUnit: 1.50,  // R$ 1,50/unidade/dia
  examples: 'Jóias, documentos'
}
```

### ⏰ **Prazo Máximo**
```javascript
maxStorageDays: 30,  // Máximo 30 dias
```

**Como alterar:**
- **Mais dias:** `maxStorageDays: 60`
- **Menos dias:** `maxStorageDays: 15`

### 🔄 **Conversão de Volume**
```javascript
volumeConversion: 1000000,  // cm³ para m³
```

**Como alterar:**
- **Manter padrão:** `1000000` (1.000.000 cm³ = 1 m³)
- **Usar dm³:** `1000` (1.000 dm³ = 1 m³)

---

## 🛠️ **EXEMPLOS PRÁTICOS DE PERSONALIZAÇÃO**

### 📈 **Cenário 1: Aumentar Preços em 30%**
```javascript
// Frete
basePrice: 19.50,  // Era 15.00

// Armazenagem
pricePerUnit: 3.25,  // Era 2.50 (Mini)
pricePerUnit: 6.50,  // Era 5.00 (Pequeno)
pricePerUnit: 11.05, // Era 8.50 (Médio)
pricePerUnit: 19.50, // Era 15.00 (Grande)
```

### 🎯 **Cenário 2: Criar Nova Categoria**
```javascript
// Adicionar categoria "Super Grande"
{
  name: 'Super Grande',
  maxVolume: 10.0,      // Até 10 m³
  pricePerUnit: 50.00,  // R$ 50,00/unidade/dia
  examples: 'Contêineres, máquinas industriais'
}
```

### 🌍 **Cenário 3: Personalizar Regiões**
```javascript
// Adicionar região "Capital"
regionFactors: {
  sameState: 0.8,
  neighborState: 1.2,
  distantState: 1.8,
  capital: 0.6  // Capital mais barato
}
```

### ⚡ **Cenário 4: Adicionar Serviço Urgente**
```javascript
// No FreightSimulator.jsx, adicionar:
serviceMultipliers: {
  standard: 1.0,
  express: 1.8,
  urgent: 3.0  // 300% mais caro
}
```

---

## 🔧 **COMO APLICAR AS MUDANÇAS**

### 1. **Editar Arquivo**
```bash
# Abrir arquivo de configuração
nano frontend/src/config/simulatorConfig.js

# Ou usar VS Code
code frontend/src/config/simulatorConfig.js
```

### 2. **Fazer Alterações**
- **Editar** valores conforme necessário
- **Salvar** arquivo
- **Verificar** sintaxe JavaScript

### 3. **Testar Mudanças**
```bash
# Desenvolvimento
cd frontend
pnpm run dev

# Acessar simuladores
# http://localhost:5173/simulador-frete
# http://localhost:5173/simulador-armazenagem
```

### 4. **Build de Produção**
```bash
# Build otimizado
pnpm run build

# Preview do build
pnpm run preview
```

---

## 📊 **VALIDAÇÃO DOS CÁLCULOS**

### 🚛 **Fórmula do Frete**
```
Preço Final = (Taxa Fixa + Peso Cobrável × Fator Regional) × Multiplicador Serviço

Onde:
- Peso Cobrável = MAX(Peso Real, Peso Volumétrico)
- Peso Volumétrico = Volume × Fator Volumétrico
- Volume = (Comprimento × Largura × Altura) ÷ 1.000.000
```

### 📦 **Fórmula da Armazenagem**
```
Custo Total = Preço por Unidade × Quantidade × Dias

Onde:
- Preço por Unidade = Baseado na categoria do volume
- Categoria = Determinada pelo volume calculado
- Volume = (Comprimento × Largura × Altura) ÷ 1.000.000
```

---

## 🎯 **DICAS IMPORTANTES**

### ✅ **Boas Práticas**
- **Teste sempre** após mudanças
- **Mantenha backup** do arquivo original
- **Valide valores** antes de salvar
- **Documente mudanças** importantes

### ⚠️ **Cuidados**
- **Não quebrar** a sintaxe JavaScript
- **Manter consistência** entre categorias
- **Verificar** se valores fazem sentido
- **Testar** em diferentes cenários

### 🔍 **Debug**
- **Console do navegador** para ver cálculos
- **Logs detalhados** durante desenvolvimento
- **Validação** de entrada de dados
- **Teste** com valores extremos

---

**🎉 Agora você tem controle total sobre os simuladores!**
