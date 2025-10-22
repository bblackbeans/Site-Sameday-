# SameDay - Plataforma de Logística Urbana

Uma plataforma moderna de logística urbana desenvolvida com React 19, Vite e Tailwind CSS, oferecendo simuladores de frete e armazenagem, formulários de cadastro e uma interface responsiva.

## 🚀 Tecnologias

- **Frontend:** React 19.1 + Vite 6.4.1
- **Styling:** Tailwind CSS 4.1.7
- **Routing:** React Router 7.6.1
- **UI Components:** Shadcn/UI (Radix UI)
- **Animations:** Framer Motion
- **Package Manager:** pnpm
- **Build Tool:** Vite com otimizações avançadas

## 📁 Estrutura do Projeto

```
Site-Sameday/
├── frontend/                    # Aplicação React
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   │   ├── ui/             # Componentes UI (Shadcn)
│   │   │   ├── *Page.jsx       # Páginas principais
│   │   │   └── *Section.jsx    # Seções da homepage
│   │   ├── pages/              # Páginas com roteamento
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # Serviços (email)
│   │   ├── config/             # Configurações
│   │   └── assets/             # Imagens e ícones
│   ├── Dockerfile              # Container do frontend
│   └── package.json
├── docker-compose.yml           # Orquestração (apenas frontend)
└── README.md
```

## 🎯 Funcionalidades

### 📱 Páginas Principais
- **Homepage** - Landing page com seções informativas
- **Embarcador** - Cadastro para empresas que enviam
- **Transportador** - Cadastro para empresas de transporte
- **Entregador** - Portal para entregadores
- **Stock Store Partner** - Cadastro para parceiros de armazenagem
- **Contato** - Formulário de contato geral
- **Termos de Uso** - Página legal
- **Política de Privacidade** - Página legal

### 🧮 Simuladores
- **Simulador de Frete** - Cálculo baseado em peso, volume e região
- **Simulador de Armazenagem** - Cálculo por categoria de volume

### 📧 Sistema de Emails
- **Simulação temporária** até integração com API AdonisJS
- **Logs detalhados** no console do navegador
- **Formulários funcionais** com limpeza automática
- **Dados estruturados** para integração com API

## ⚙️ Configuração dos Simuladores

### 🚛 Simulador de Frete
**Arquivo:** `frontend/src/config/simulatorConfig.js`

```javascript
FREIGHT_CONFIG = {
  basePrice: 15.00,                    // Taxa fixa base (R$)
  volumetricWeightFactor: 167,         // kg por m³
  regionFactors: {
    sameState: 0.8,                   // Mesmo estado
    neighborState: 1.2,               // Estado vizinho  
    distantState: 1.8                 // Estado distante
  },
  serviceMultipliers: {
    standard: 1.0,                    // Serviço padrão
    express: 1.8                      // Serviço expresso
  },
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
}
```

### 📦 Simulador de Armazenagem
**Arquivo:** `frontend/src/config/simulatorConfig.js`

```javascript
STORAGE_CONFIG = {
  categories: [
    {
      name: 'Mini',
      maxVolume: 0.1,                  // m³ máximo
      pricePerUnit: 2.50,             // R$ por unidade/dia
      examples: 'Caixa de sapato, livros'
    },
    {
      name: 'Pequeno',
      maxVolume: 0.5,
      pricePerUnit: 5.00,
      examples: 'Videogame, ferramentas'
    },
    {
      name: 'Médio',
      maxVolume: 1.5,
      pricePerUnit: 8.50,
      examples: 'Micro-ondas, cadeira'
    },
    {
      name: 'Grande',
      maxVolume: Infinity,
      pricePerUnit: 15.00,
      examples: 'Geladeira, máquinas'
    }
  ],
  maxStorageDays: 30,                  // Dias máximos
  volumeConversion: 1000000           // cm³ para m³
}
```

## 🛠️ Como Personalizar os Simuladores

### 1. **Editar Preços**
```bash
# Abrir arquivo de configuração
nano frontend/src/config/simulatorConfig.js

# Ajustar valores conforme sua tabela de preços
# Salvar arquivo
```

### 2. **Adicionar Novas Categorias**
```javascript
// No STORAGE_CONFIG.categories, adicionar:
{
  name: 'Super Grande',
  maxVolume: 5.0,
  pricePerUnit: 25.00,
  examples: 'Máquinas industriais'
}
```

### 3. **Modificar Fatores Regionais**
```javascript
// No FREIGHT_CONFIG.regionFactors, ajustar:
regionFactors: {
  sameState: 0.7,        // Reduzir para mesmo estado
  neighborState: 1.0,    // Ajustar estado vizinho
  distantState: 2.0      // Aumentar estado distante
}
```

## 🚀 Instalação e Execução

### 📦 Instalação Local
```bash
# Clonar repositório
git clone <repository-url>
cd Site-Sameday

# Instalar dependências
cd frontend
pnpm install

# Executar em desenvolvimento
pnpm run dev
```

### 🐳 Execução com Docker
```bash
# Build e execução
docker-compose up --build

# Apenas build
docker-compose build

# Execução em background
docker-compose up -d
```

### 🌐 Acesso
- **Desenvolvimento:** http://localhost:5173
- **Docker:** http://localhost:3000

## 📊 Otimizações Implementadas

### ⚡ Performance
- **Code Splitting** - Carregamento lazy de componentes
- **Image Optimization** - Imagens WebP e lazy loading
- **Bundle Optimization** - Chunks otimizados por funcionalidade
- **Tree Shaking** - Remoção de código não utilizado

### 📱 Responsividade
- **Mobile First** - Design otimizado para mobile
- **Breakpoints** - sm, md, lg, xl
- **Banners Responsivos** - Layout adaptativo
- **Grid Flexível** - Componentes que se adaptam

### 🎨 UX/UI
- **Loading States** - Feedback visual durante carregamento
- **Smooth Scrolling** - Navegação suave entre seções
- **Form Validation** - Validação em tempo real
- **Success/Error Messages** - Feedback claro para usuário

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev

# Build de produção
pnpm run build

# Preview do build
pnpm run preview

# Lint do código
pnpm run lint

# Otimização de imagens
./optimize-images.sh
```

## 📧 Sistema de Emails

### 🔍 Como Funciona
1. **Usuário preenche** formulário
2. **Sistema simula** envio de email
3. **Dados exibidos** no console do navegador
4. **Formulário limpo** automaticamente
5. **Mensagem de sucesso** exibida

### 📝 Verificar Emails Simulados
```bash
# Abrir DevTools (F12)
# Ir para aba Console
# Preencher qualquer formulário
# Ver logs detalhados no console
```

### 📊 Dados Capturados
- **Contato:** Nome, email, telefone, assunto, mensagem
- **Embarcador:** Empresa, CNPJ, contato, volume mensal
- **Transportador:** Empresa, frota, áreas de operação
- **Stock Store:** Proprietário, espaço, disponibilidade
- **Entregador:** Dados pessoais, veículo, experiência

## 🎯 Próximos Passos

### 📈 Melhorias Futuras
- [x] Integração com API AdonisJS para emails
- [ ] Dashboard administrativo
- [ ] Sistema de autenticação
- [ ] Base de dados para leads
- [ ] Analytics e métricas

### 🔗 Integrações Implementadas
- **API AdonisJS** - Para envio real de emails
- **Simuladores configuráveis** - Controle total dos preços
- **Sistema responsivo** - Mobile-first design
- **Otimizações de performance** - Code splitting e lazy loading

## 📞 Suporte

Para dúvidas ou sugestões sobre os simuladores ou configurações:

1. **Verificar** arquivo `simulatorConfig.js`
2. **Consultar** logs no console do navegador
3. **Testar** formulários em modo desenvolvimento
4. **Ajustar** valores conforme necessário

---

**Desenvolvido com ❤️ para SameDay Logística Urbana**