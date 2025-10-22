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
  Ruler
} from 'lucide-react';

import heroBannerImage from "../assets/images/banner.jpg";

const StorageSimulator = () => {
  const [formData, setFormData] = useState({
    productName: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    quantity: '1',
    storageDays: '7'
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('dimensions.')) {
      const dimension = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [dimension]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculateVolume = (length, width, height) => {
    // Converter cm para m³ usando configuração
    return (length * width * height) / STORAGE_CONFIG.volumeConversion;
  };

  const getCategory = (volume) => {
    // Encontrar categoria usando configuração
    for (const category of STORAGE_CONFIG.categories) {
      if (volume <= category.maxVolume) {
        return { name: category.name, price: category.pricePerUnit };
      }
    }
    // Fallback para última categoria
    const lastCategory = STORAGE_CONFIG.categories[STORAGE_CONFIG.categories.length - 1];
    return { name: lastCategory.name, price: lastCategory.pricePerUnit };
  };

  const calculateStorage = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    
    setTimeout(() => {
      const { length, width, height } = formData.dimensions;
      const volume = calculateVolume(
        parseFloat(length), 
        parseFloat(width), 
        parseFloat(height)
      );
      
      const category = getCategory(volume);
      const quantity = parseInt(formData.quantity);
      const days = parseInt(formData.storageDays);
      
      const dailyPrice = category.price * quantity;
      const totalPrice = dailyPrice * days;
      
      setResult({
        volume: volume.toFixed(4),
        category: category.name,
        dailyPrice: dailyPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
        pricePerUnit: category.price.toFixed(2),
        maxDays: 30
      });
      setIsCalculating(false);
    }, 1500);
  };

      // Gerar exemplos de categorias usando configuração
      const categoryExamples = STORAGE_CONFIG.categories.map((category, index) => {
        const prevCategory = index > 0 ? STORAGE_CONFIG.categories[index - 1] : null;
        const volumeRange = prevCategory 
          ? `${prevCategory.maxVolume.toFixed(1)} m³ – ${category.maxVolume === Infinity ? 'Acima de' : category.maxVolume.toFixed(1) + ' m³'}`
          : `Até ${category.maxVolume.toFixed(1)} m³`;
        
        return {
          category: category.name,
          volume: volumeRange,
          examples: category.examples,
          price: `R$ ${category.pricePerUnit.toFixed(2)}/unidade/dia`
        };
      });

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
        subtitle="Armazenagem"
        description="Calcule o custo de armazenagem dos seus produtos em nossa rede de Stock Stores"
        buttonText="Calcular Agora"
        buttonLink="#simulador-armazenagem-form"
      />

      {/* Simulator Form */}
      <section id="simulador-armazenagem-form" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Dados do Produto
                  </h2>
                  
                  <form onSubmit={calculateStorage} className="space-y-6">
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome do Produto
                      </label>
                      <Input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        placeholder="Ex: Notebook, Geladeira, Caixa de livros"
                      />
                    </div>

                    {/* Dimensions */}
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
                          <span className="text-xs text-gray-500">Comprimento</span>
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
                          <span className="text-xs text-gray-500">Largura</span>
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
                          <span className="text-xs text-gray-500">Altura</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity and Days */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          placeholder="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="inline mr-2" size={16} />
                          Período de Armazenagem (dias) *
                        </label>
                        <Input
                          type="number"
                          name="storageDays"
                          value={formData.storageDays}
                          onChange={handleInputChange}
                          required
                          min="1"
                              max={STORAGE_CONFIG.maxStorageDays}
                          placeholder="7"
                        />
                        <span className="text-xs text-gray-500">Máximo {STORAGE_CONFIG.maxStorageDays} dias</span>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={isCalculating}
                    >
                      {isCalculating ? (
                        <>Calculando...</>
                      ) : (
                        <>
                          Calcular Custo
                          <Calculator className="ml-2" size={20} />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Result Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Resultado da Simulação
                  </h3>
                  
                  {result ? (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <DollarSign className="text-green-600 mr-2" size={20} />
                          <span className="font-semibold text-gray-900">Custo Total</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          R$ {result.totalPrice}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Volume:</span>
                          <span className="font-semibold">{result.volume} m³</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Categoria:</span>
                          <span className="font-semibold">{result.category}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Preço por unidade/dia:</span>
                          <span className="font-semibold">R$ {result.pricePerUnit}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Custo diário:</span>
                          <span className="font-semibold">R$ {result.dailyPrice}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Contratar Armazenagem
                          <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="mx-auto text-gray-400 mb-4" size={48} />
                      <p className="text-gray-500">
                        Preencha os dados ao lado para calcular o custo de armazenagem
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Categorias de Armazenagem
              </h2>
              <p className="text-xl text-gray-600">
                Preços baseados no volume do produto
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryExamples.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.category}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.volume}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      {item.examples}
                    </p>
                    <div className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-semibold">
                      {item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-lg p-8">
              <div className="flex items-start">
                <Info className="text-blue-600 mt-1 mr-4" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Como Funciona a Armazenagem
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Cálculo do Volume:</strong> Volume (m³) = Comprimento × Largura × Altura (em metros)</li>
                    <li>• <strong>Categorização:</strong> Produtos são classificados automaticamente por volume</li>
                    <li>• <strong>Cobrança:</strong> Taxa diária por unidade armazenada</li>
                    <li>• <strong>Prazo Máximo:</strong> Até 30 dias de armazenagem</li>
                    <li>• <strong>Localização:</strong> Produtos ficam em Stock Stores próximos ao destino final</li>
                    <li>• <strong>Segurança:</strong> Produtos protegidos com seguro incluso</li>
                    <li>• <strong>Rastreamento:</strong> Acompanhe seus produtos em tempo real</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LogicoStyleFooter />
    </div>
  );
};

export default StorageSimulator;

