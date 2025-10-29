import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Header from './Header';
import LogicoStyleFooter from './LogicoStyleFooter';
import BannerWithBadge from './BannerWithBadge';
import { STORAGE_CONFIG } from '../config/simulatorConfig';
import { 
  Calculator, 
  Package, 
  Calendar, 
  DollarSign,
  ArrowRight,
  Info,
  Ruler,
  TrendingUp
} from 'lucide-react';

import heroBannerImage from "../assets/images/banner.jpg";

// Produtos exemplo pré-cadastrados
const exampleProducts = {
  relogio: { length: 10, width: 10, height: 8, name: 'Relógio Smart' },
  fone: { length: 15, width: 10, height: 8, name: 'Fone Bluetooth' },
  furadeira: { length: 30, width: 20, height: 15, name: 'Furadeira' },
  microondas: { length: 50, width: 40, height: 30, name: 'Micro-ondas' },
  cadeira: { length: 80, width: 60, height: 40, name: 'Cadeira Desmontada' },
  geladeira: { length: 180, width: 70, height: 80, name: 'Geladeira Compacta' },
  palete: { length: 120, width: 100, height: 150, name: 'Palete Industrial' }
};

// Preços de mercado para comparação
const marketPrices = {
  nano: 3.00,
  mini: 5.50,
  small: 10.00,
  medium: 15.00,
  large: 24.00,
  extra: 32.00
};

const StorageSimulator = () => {
  const [formData, setFormData] = useState({
    productType: '',
    dimensions: {
      length: '10',
      width: '10',
      height: '8'
    },
    quantity: '1000',
    months: '1',
    salesRate: '70',
    volumeBonus: true
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState('resume');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('dimensions.')) {
      const dimension = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [dimension]: value
        }
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'productType') {
      setFormData(prev => {
        const newData = {
          ...prev,
          [name]: value
        };
        
        // Se selecionou um produto exemplo, preencher dimensões
        if (value && value !== 'custom' && exampleProducts[value]) {
          const product = exampleProducts[value];
          newData.dimensions = {
            length: product.length.toString(),
            width: product.width.toString(),
            height: product.height.toString()
          };
        }
        
        return newData;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculateVolume = (length, width, height) => {
    // Converter cm para m³
    return (length * width * height) / STORAGE_CONFIG.volumeConversion;
  };

  const getCategory = (volume) => {
    let selectedCategory = STORAGE_CONFIG.categories[STORAGE_CONFIG.categories.length - 1];
    
    for (let i = 0; i < STORAGE_CONFIG.categories.length; i++) {
      const category = STORAGE_CONFIG.categories[i];
      const prevCategory = i > 0 ? STORAGE_CONFIG.categories[i - 1] : null;
      
      const minVolume = prevCategory ? prevCategory.maxVolume : 0;
      const maxVolume = category.maxVolume === Infinity ? Infinity : category.maxVolume;
      
      if (volume > minVolume && volume <= maxVolume) {
        selectedCategory = category;
        break;
      }
    }
    
    return selectedCategory;
  };

  const calculateStorage = (e) => {
    e.preventDefault();
    
    setResult(null);
    setIsCalculating(true);
    
    setTimeout(() => {
      const { length, width, height } = formData.dimensions;
      const unitVolume = calculateVolume(
        parseFloat(length || 0), 
        parseFloat(width || 0), 
        parseFloat(height || 0)
      );
      
      const totalVolume = unitVolume * parseInt(formData.quantity);
      const category = getCategory(unitVolume);
      const quantity = parseInt(formData.quantity);
      const months = parseInt(formData.months);
      const salesRate = parseFloat(formData.salesRate) / 100;
      
      // Cálculo Mês 1
      const monthlySales = Math.floor(quantity * salesRate);
      const unsoldUnits = quantity - monthlySales;
      
      // Armazenagem base (preço mensal por unidade)
      const monthlyStorageCost = quantity * category.pricePerMonth;
      
      // Fulfillment
      const monthlyFulfillmentCost = monthlySales * STORAGE_CONFIG.fulfillmentRate;
      
      // Rollover gratuito (25% do estoque inicial)
      const rolloverFree = Math.floor(quantity * STORAGE_CONFIG.freeRolloverPercentage);
      const excessUnits = Math.max(0, unsoldUnits - rolloverFree);
      
      // Custo de excedente (35% do valor fixo mensal)
      const excessRate = category.pricePerMonth * STORAGE_CONFIG.excessChargeMultiplier;
      const excessCost = excessUnits * excessRate;
      
      // Bônus de volume
      let discountRate = 0;
      if (formData.volumeBonus && (quantity >= STORAGE_CONFIG.volumeDiscount.minUnits || totalVolume >= STORAGE_CONFIG.volumeDiscount.minVolume)) {
        discountRate = STORAGE_CONFIG.volumeDiscount.percentage;
      }
      
      const discountAmount = monthlyStorageCost * discountRate;
      
      // Custo total mês 1
      const month1Total = monthlyStorageCost + monthlyFulfillmentCost + excessCost - discountAmount;
      
      // Calcular custos para múltiplos meses com descontos progressivos
      const monthlyTotals = [];
      for (let month = 1; month <= months; month++) {
        let monthDiscount = 0;
        if (month === 2) {
          monthDiscount = STORAGE_CONFIG.progressiveDiscounts.month2;
        } else if (month === 3) {
          monthDiscount = STORAGE_CONFIG.progressiveDiscounts.month3;
        } else if (month >= 4) {
          monthDiscount = STORAGE_CONFIG.progressiveDiscounts.month4Plus;
        }
        
        const baseMonthCost = monthlyStorageCost * (1 - monthDiscount) + monthlyFulfillmentCost + excessCost - discountAmount;
        monthlyTotals.push({
          month,
          cost: baseMonthCost,
          discount: monthDiscount
        });
      }
      
      const totalCost = monthlyTotals.reduce((sum, m) => sum + m.cost, 0);
      
      // Preço de mercado para comparação
      const categoryKey = category.name.toLowerCase();
      const marketPrice = marketPrices[categoryKey] || category.pricePerMonth;
      const marketTotal = quantity * marketPrice * months;
      const savings = marketTotal - totalCost;
      const savingsPercentage = marketTotal > 0 ? (savings / marketTotal * 100) : 0;
      
      setResult({
        category: category.name,
        categoryKey,
        unitVolume: unitVolume.toFixed(4),
        totalVolume: totalVolume.toFixed(2),
        quantity,
        months,
        monthlyStorageCost: monthlyStorageCost.toFixed(2),
        monthlyFulfillmentCost: monthlyFulfillmentCost.toFixed(2),
        rolloverFree,
        excessUnits,
        excessCost: excessCost.toFixed(2),
        discountAmount: discountAmount.toFixed(2),
        month1Total: month1Total.toFixed(2),
        monthlyTotals,
        totalCost: totalCost.toFixed(2),
        marketPrice,
        marketTotal: marketTotal.toFixed(2),
        savings: savings.toFixed(2),
        savingsPercentage: savingsPercentage.toFixed(1)
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  // Gerar exemplos de categorias
  const categoryExamples = STORAGE_CONFIG.categories.map((category, index) => {
    const prevCategory = index > 0 ? STORAGE_CONFIG.categories[index - 1] : null;
    const volumeRange = prevCategory 
      ? `${prevCategory.maxVolume.toFixed(2)} m³ – ${category.maxVolume === Infinity ? 'Acima de' : category.maxVolume.toFixed(2) + ' m³'}`
      : `Até ${category.maxVolume.toFixed(2)} m³`;
    
    return {
      category: category.name,
      volume: volumeRange,
      examples: category.examples,
      price: `R$ ${category.pricePerMonth.toFixed(2)}/30 dias`,
      strategy: category.strategy
    };
  });

  const getBadgeClass = (categoryName) => {
    const badges = {
      'Nano': 'bg-green-100 text-green-800',
      'Mini': 'bg-blue-100 text-blue-800',
      'Pequeno': 'bg-orange-100 text-orange-800',
      'Médio': 'bg-purple-100 text-purple-800',
      'Grande': 'bg-pink-100 text-pink-800',
      'Extra': 'bg-yellow-100 text-yellow-800'
    };
    return badges[categoryName] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <BannerWithBadge
        image={heroBannerImage}
        alt="Simulador de Armazenagem"
        badgeText="SIMULADOR"
        badgeIcon={<Package size={20} />}
        title="Simulador de"
        subtitle="Armazenagem Stock Store 2025"
        description="Precificação otimizada para atratividade comercial e escalabilidade"
        buttonText="Calcular Agora"
        buttonLink="#simulador-armazenagem-form"
      />

      {/* Simulator Form */}
      <section id="simulador-armazenagem-form" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Package className="text-blue-600" size={24} />
                    Configuração do Estoque
                  </h2>
                  
                  <form onSubmit={calculateStorage} className="space-y-6">
                    {/* Product Type Select */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Produto
                      </label>
                      <select
                        name="productType"
                        value={formData.productType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      >
                        <option value="">Selecione um produto exemplo</option>
                        <option value="relogio">Relógio Smart (10×10×8cm)</option>
                        <option value="fone">Fone Bluetooth (15×10×8cm)</option>
                        <option value="furadeira">Furadeira (30×20×15cm)</option>
                        <option value="microondas">Micro-ondas (50×40×30cm)</option>
                        <option value="cadeira">Cadeira Desmontada (80×60×40cm)</option>
                        <option value="geladeira">Geladeira Compacta (180×70×80cm)</option>
                        <option value="palete">Palete Industrial (120×100×150cm)</option>
                        <option value="custom">Personalizar Dimensões</option>
                      </select>
                    </div>

                    {/* Custom Dimensions */}
                    {(formData.productType === 'custom' || !formData.productType) && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Ruler className="inline mr-2" size={16} />
                          Dimensões (cm) *
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Input
                              type="number"
                              name="dimensions.length"
                              value={formData.dimensions.length}
                              onChange={handleInputChange}
                              placeholder="Comprimento"
                              min="1"
                              required
                            />
                          </div>
                          <div>
                            <Input
                              type="number"
                              name="dimensions.width"
                              value={formData.dimensions.width}
                              onChange={handleInputChange}
                              placeholder="Largura"
                              min="1"
                              required
                            />
                          </div>
                          <div>
                            <Input
                              type="number"
                              name="dimensions.height"
                              value={formData.dimensions.height}
                              onChange={handleInputChange}
                              placeholder="Altura"
                              min="1"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quantity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Package className="inline mr-2" size={16} />
                        Quantidade de Unidades *
                      </label>
                      <Input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                        min="1"
                        placeholder="1000"
                      />
                    </div>

                    {/* Months */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline mr-2" size={16} />
                        Meses de Armazenagem *
                      </label>
                      <Input
                        type="number"
                        name="months"
                        value={formData.months}
                        onChange={handleInputChange}
                        required
                        min="1"
                        placeholder="1"
                      />
                    </div>

                    {/* Sales Rate */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <TrendingUp className="inline mr-2" size={16} />
                        Taxa de Vendas Mensal (% do estoque) *
                      </label>
                      <Input
                        type="number"
                        name="salesRate"
                        value={formData.salesRate}
                        onChange={handleInputChange}
                        required
                        min="0"
                        max="100"
                        placeholder="70"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Percentual de estoque vendido por mês
                      </p>
                    </div>

                    {/* Volume Bonus Checkbox */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="volumeBonus"
                          checked={formData.volumeBonus}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700">
                          Aplicar Bônus de Volume (+5% para ≥ 1.000 unidades ou ≥ 5m³)
                        </span>
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={isCalculating}
                    >
                      {isCalculating ? (
                        <>Calculando...</>
                      ) : (
                        <>
                          Calcular Custos
                          <Calculator className="ml-2" size={20} />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Results Panel */}
              <div>
                <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Calculator className="text-green-600" size={24} />
                    Resultados da Simulação
                  </h3>
                  
                  {/* Tabs */}
                  <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setActiveTab('resume')}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                        activeTab === 'resume'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      📊 Resumo
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('details')}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                        activeTab === 'details'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      📋 Detalhes
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('comparison')}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                        activeTab === 'comparison'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      💰 Comparação
                    </button>
                  </div>

                  {/* Tab Content */}
                  {!result ? (
                    <div className="text-center py-12">
                      <Package className="mx-auto text-gray-400 mb-4" size={64} />
                      <p className="text-gray-500">
                        Configure os dados ao lado e clique em "Calcular Custos" para ver sua simulação personalizada
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Tab: Resumo */}
                      {activeTab === 'resume' && (
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                              💼 Resumo Financeiro - Mês 1
                            </h4>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between items-center py-2 border-b border-white/20">
                                <span>Categoria:</span>
                                <span className={`font-bold px-3 py-1 rounded-full text-sm ${getBadgeClass(result.category)}`}>
                                  {result.category}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-white/20">
                                <span>Volume Total:</span>
                                <span className="font-semibold">{result.totalVolume} m³</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-white/20">
                                <span>Armazenagem Base:</span>
                                <span className="font-semibold">R$ {result.monthlyStorageCost}</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-white/20">
                                <span>Fulfillment:</span>
                                <span className="font-semibold">R$ {result.monthlyFulfillmentCost}</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-white/20">
                                <span>Rollover Gratuito:</span>
                                <span className="font-semibold">{result.rolloverFree} unidades</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-white/20">
                                <span>Excedente Pago:</span>
                                <span className="font-semibold">R$ {result.excessCost} ({result.excessUnits} unid.)</span>
                              </div>
                              {parseFloat(result.discountAmount) > 0 && (
                                <div className="flex justify-between items-center py-2 border-b border-white/20 text-green-200">
                                  <span>Desconto Volume:</span>
                                  <span className="font-semibold">- R$ {result.discountAmount}</span>
                                </div>
                              )}
                              <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-white/30 text-lg">
                                <span className="font-bold">TOTAL MÊS 1:</span>
                                <span className="font-bold text-xl">R$ {result.month1Total}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                            <p className="text-sm font-semibold text-green-800 mb-2">
                              🎯 Descontos Progressivos:
                            </p>
                            <p className="text-sm text-green-700">
                              Mês 2: 30% OFF • Mês 3: 20% OFF • Mês 4+: 10% OFF
                            </p>
                          </div>

                          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                            <p className="text-sm font-semibold text-yellow-800">
                              🎁 Rollover Gratuito:
                            </p>
                            <p className="text-sm text-yellow-700 mt-1">
                              Até 25% do estoque inicial pode ficar sem custo adicional!
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Tab: Detalhes */}
                      {activeTab === 'details' && (
                        <div className="space-y-4">
                          <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="font-bold text-gray-900 mb-4">Detalhamento do Cálculo</h4>
                            <ul className="space-y-3">
                              <li className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Volume por unidade:</span>
                                <span className="font-semibold">{result.unitVolume} m³</span>
                              </li>
                              <li className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Volume total ({result.quantity} unid.):</span>
                                <span className="font-semibold">{result.totalVolume} m³</span>
                              </li>
                              <li className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Categoria:</span>
                                <span className={`font-semibold px-2 py-1 rounded text-sm ${getBadgeClass(result.category)}`}>
                                  {result.category}
                                </span>
                              </li>
                              <li className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Preço por 30 dias (unidade):</span>
                                <span className="font-semibold">R$ {STORAGE_CONFIG.categories.find(c => c.name === result.category)?.pricePerMonth.toFixed(2)}</span>
                              </li>
                              <li className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Armazenagem base ({result.quantity} unid.):</span>
                                <span className="font-semibold">R$ {result.monthlyStorageCost}</span>
                              </li>
                              <li className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Fulfillment (R$ 2,90/unidade):</span>
                                <span className="font-semibold">R$ {result.monthlyFulfillmentCost}</span>
                              </li>
                              <li className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Rollover gratuito (25%):</span>
                                <span className="font-semibold">{result.rolloverFree} unidades</span>
                              </li>
                              <li className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Excedente pago (35% do fixo):</span>
                                <span className="font-semibold">R$ {result.excessCost}</span>
                              </li>
                              {parseFloat(result.discountAmount) > 0 && (
                                <li className="flex justify-between border-b pb-2 text-green-600">
                                  <span>Desconto volume (-5%):</span>
                                  <span className="font-semibold">- R$ {result.discountAmount}</span>
                                </li>
                              )}
                              <li className="flex justify-between pt-2">
                                <span className="font-bold">Total Mês 1:</span>
                                <span className="font-bold text-lg text-green-600">R$ {result.month1Total}</span>
                              </li>
                            </ul>
                          </div>

                          {result.monthlyTotals && result.monthlyTotals.length > 1 && (
                            <div className="bg-blue-50 rounded-lg p-6">
                              <h4 className="font-bold text-gray-900 mb-4">Projeção Mensal</h4>
                              <div className="space-y-2">
                                {result.monthlyTotals.map((month) => (
                                  <div key={month.month} className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">
                                      Mês {month.month}
                                      {month.discount > 0 && (
                                        <span className="ml-2 text-xs text-green-600 font-semibold">
                                          ({month.discount * 100}% OFF)
                                        </span>
                                      )}
                                    </span>
                                    <span className="font-semibold">R$ {month.cost.toFixed(2)}</span>
                                  </div>
                                ))}
                                <div className="flex justify-between pt-2 font-bold text-lg">
                                  <span>Total ({result.months} meses):</span>
                                  <span className="text-green-600">R$ {result.totalCost}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Tab: Comparação */}
                      {activeTab === 'comparison' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
                              <h4 className="text-sm font-semibold text-red-800 mb-2 uppercase">
                                Preço de Mercado
                              </h4>
                              <div className="text-3xl font-bold text-red-600">
                                R$ {result.marketPrice.toFixed(2)}
                              </div>
                              <p className="text-xs text-red-700 mt-2">por unidade/mês</p>
                            </div>
                            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                              <h4 className="text-sm font-semibold text-green-800 mb-2 uppercase">
                                Nosso Preço
                              </h4>
                              <div className="text-3xl font-bold text-green-600">
                                R$ {STORAGE_CONFIG.categories.find(c => c.name === result.category)?.pricePerMonth.toFixed(2)}
                              </div>
                              <p className="text-xs text-green-700 mt-2">por unidade/mês</p>
                            </div>
                          </div>

                          {parseFloat(result.savings) > 0 && (
                            <div className="bg-green-600 text-white rounded-lg p-6 text-center">
                              <div className="text-sm mb-2">Economia Total</div>
                              <div className="text-3xl font-bold mb-2">
                                R$ {result.savings}
                              </div>
                              <div className="text-sm opacity-90">
                                {result.savingsPercentage}% de economia vs. mercado
                              </div>
                            </div>
                          )}

                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-700">
                              <strong>Comparação:</strong> Mercado tradicional cobra em média{' '}
                              <strong>R$ {result.marketPrice.toFixed(2)}</strong> por unidade/mês para categoria{' '}
                              <strong>{result.category}</strong>, enquanto nosso preço é de{' '}
                              <strong>R$ {STORAGE_CONFIG.categories.find(c => c.name === result.category)?.pricePerMonth.toFixed(2)}</strong>.
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t mt-6">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Contratar Armazenagem
                          <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tabela de Preços Stock Store 2025
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Categoria</th>
                    <th className="px-6 py-4 text-left font-semibold">Faixa de Volume (m³)</th>
                    <th className="px-6 py-4 text-left font-semibold">Exemplos de Produtos</th>
                    <th className="px-6 py-4 text-left font-semibold">Preço por 30 Dias</th>
                    <th className="px-6 py-4 text-left font-semibold">Observação Estratégica</th>
                  </tr>
                </thead>
                <tbody>
                  {STORAGE_CONFIG.categories.map((category, index) => {
                    const prevCategory = index > 0 ? STORAGE_CONFIG.categories[index - 1] : null;
                    const volumeRange = prevCategory 
                      ? `${prevCategory.maxVolume.toFixed(2)} – ${category.maxVolume === Infinity ? 'Acima de' : category.maxVolume.toFixed(2)} m³`
                      : `Até ${category.maxVolume.toFixed(2)} m³`;
                    
                    return (
                      <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getBadgeClass(category.name)}`}>
                            {category.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{volumeRange}</td>
                        <td className="px-6 py-4 text-gray-600">{category.examples}</td>
                        <td className="px-6 py-4">
                          <strong className="text-gray-900">R$ {category.pricePerMonth.toFixed(2)}</strong>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{category.strategy}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mt-8">
              <h3 className="font-bold text-green-800 mb-4">💡 Modelo de Cobrança Híbrido</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>📦 Armazenagem:</strong> Cobrança fixa mensal por categoria (pagamento antecipado)</li>
                <li><strong>🚚 Fulfillment:</strong> R$ 2,90/unidade vendida (separação, embalagem, etiquetagem e expedição)</li>
                <li><strong>🎁 Rollover Gratuito:</strong> Até 25% do total contratado sem custo adicional</li>
                <li><strong>📈 Excedente:</strong> 35% do valor fixo adicional acima do rollover</li>
                <li><strong>🏆 Bonificação:</strong> +5% desconto para +1.000 unidades ou +5 m³ totais</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <LogicoStyleFooter />
    </div>
  );
};

export default StorageSimulator;
