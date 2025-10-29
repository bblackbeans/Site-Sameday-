import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Header from './Header';
import LogicoStyleFooter from './LogicoStyleFooter';
import BannerWithBadge from './BannerWithBadge';
import { FREIGHT_CONFIG } from '../config/simulatorConfig';
import { 
  Calculator, 
  MapPin, 
  Package, 
  Truck, 
  Clock,
  DollarSign,
  ArrowRight,
  Info
} from 'lucide-react';

import heroBannerImage from "../assets/images/banner.jpg";

const FreightSimulator = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    distance: '',
    weight: '',
    invoiceValue: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    serviceType: 'standard',
    dedicatedVehicle: false,
    isFragile: false,
    isPerishable: false,
    isUrgent: false,
    withGris: true
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

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
    } else {
      setFormData(prev => {
        const newData = {
          ...prev,
          [name]: value
        };
        
        // Auto-atualizar distância quando CEPs mudarem (se distância não foi editada manualmente)
        if ((name === 'origin' || name === 'destination') && !prev.distance) {
          if (newData.origin.length >= 2 && newData.destination.length >= 2) {
            const originState = newData.origin.substring(0, 2);
            const destState = newData.destination.substring(0, 2);
            const routeKey = `${originState}-${destState}`;
            
            const knownRoutes = {
              'SP-SP': 150,
              'SP-RJ': 430,
              'SP-MG': 600,
              'SP-DF': 1000,
              'RJ-MG': 400,
            };
            
            if (knownRoutes[routeKey]) {
              newData.distance = knownRoutes[routeKey].toString();
            }
          }
        }
        
        return newData;
      });
    }
  };

  const calculateFreight = (e) => {
    e.preventDefault();
    
    // Limpar resultado anterior para garantir recalculo
    setResult(null);
    setIsCalculating(true);
    
    // Simulação de cálculo usando novo modelo 2025
    // Sempre usar valores atuais do formulário
    setTimeout(() => {
      const weight = parseFloat(formData.weight || 0);
      const { length, width, height } = formData.dimensions;
      
      // 1. Calcular peso cubado (LTL) usando divisor 6000 (padrão ANTT)
      const volumetricWeight = (parseFloat(length || 0) * parseFloat(width || 0) * parseFloat(height || 0)) / FREIGHT_CONFIG.volumetricWeightDivisor;
      
      // 2. Peso taxado = max(peso real, peso cubado)
      const taxedWeight = Math.max(weight, volumetricWeight);
      
      // 3. Calcular distância PRIMEIRO (usar do formulário ou calcular)
      const originState = formData.origin.substring(0, 2);
      const destState = formData.destination.substring(0, 2);
      const routeKey = `${originState}-${destState}`;
      let distance;
      
      // Se distância foi fornecida pelo usuário, usar ela
      if (formData.distance && parseFloat(formData.distance) > 0) {
        distance = parseFloat(formData.distance);
      } else {
        // Senão, calcular automaticamente baseada nos CEPs
        const isSameState = originState === destState;
        
        // Mapear rotas conhecidas com distâncias fixas
        const knownRoutes = {
          'SP-SP': 150,    // São Paulo → São Paulo
          'SP-RJ': 430,    // São Paulo → Rio de Janeiro
          'SP-MG': 600,    // São Paulo → Minas Gerais
          'SP-DF': 1000,   // São Paulo → Brasília
          'RJ-MG': 400,    // Rio de Janeiro → Minas Gerais
        };
        
        if (knownRoutes[routeKey]) {
          distance = knownRoutes[routeKey];
        } else if (isSameState) {
          // Mesma origem e destino = mesma cidade (50-200 km)
          const cepDistance = Math.abs(parseInt(originState.substring(2, 5)) - parseInt(destState.substring(2, 5)));
          distance = Math.max(50, Math.min(200, cepDistance));
        } else {
          // Estados diferentes (500-1000 km)
          const stateDiff = Math.abs(parseInt(originState) - parseInt(destState));
          distance = Math.max(400, Math.min(1000, stateDiff * 50 + 300));
        }
      }
      
      // 4. Determinar se é LTL ou FTL
      // Forçar FTL se checkbox marcado OU se peso > 1000kg
      const isFTL = formData.dedicatedVehicle || weight > 1000;
      
      let baseFreight = 0;
      let selectedVehicle = null;
      
      if (isFTL) {
        // Modo FTL - Cálculo por km e tipo de veículo (usando distância calculada)
        // Selecionar veículo baseado no peso
        for (const [vehicleName, vehicleData] of Object.entries(FREIGHT_CONFIG.vehicleRates)) {
          if (weight <= vehicleData.capacity) {
            selectedVehicle = { name: vehicleName, ...vehicleData };
            break;
          }
        }
        
        if (!selectedVehicle) {
          selectedVehicle = FREIGHT_CONFIG.vehicleRates.Rodotrem;
        }
        
        baseFreight = distance * selectedVehicle.rate;
      } else {
        // Modo LTL - Cálculo por kg
        let ratePerKg = FREIGHT_CONFIG.weightBasedRates.above1000;
        
        if (weight <= 100) {
          ratePerKg = FREIGHT_CONFIG.weightBasedRates.upTo100;
        } else if (weight <= 300) {
          ratePerKg = FREIGHT_CONFIG.weightBasedRates.upTo300;
        } else if (weight <= 600) {
          ratePerKg = FREIGHT_CONFIG.weightBasedRates.upTo600;
        } else if (weight <= 1000) {
          ratePerKg = FREIGHT_CONFIG.weightBasedRates.upTo1000;
        }
        
        baseFreight = taxedWeight * ratePerKg;
      }
      
      // 5. Aplicar multiplicador do tipo de serviço (Padrão/Expresso)
      const serviceMultipliers = {
        standard: 1.0,   // Padrão
        express: 1.8     // Expresso (80% mais caro)
      };
      
      const serviceMultiplier = serviceMultipliers[formData.serviceType] || 1.0;
      baseFreight = baseFreight * serviceMultiplier;
      
      // 6. Calcular pedágio
      const toll = FREIGHT_CONFIG.tollRoutes[routeKey] || (distance * FREIGHT_CONFIG.defaultTollRate);
      
      // 7. Adicionais (aplicar apenas se checkboxes marcados)
      const fragileCharge = formData.isFragile ? baseFreight * FREIGHT_CONFIG.additionalCharges.fragile : 0;
      const perishableCharge = formData.isPerishable ? baseFreight * FREIGHT_CONFIG.additionalCharges.perishable : 0;
      const urgentCharge = formData.isUrgent ? baseFreight * FREIGHT_CONFIG.additionalCharges.urgent : 0;
      
      // 8. GRIS (aplicar se checkbox marcado e valor da NF fornecido)
      const invoiceValue = parseFloat(formData.invoiceValue || 0);
      const gris = (formData.withGris && invoiceValue > 0) ? invoiceValue * FREIGHT_CONFIG.grisRate : 0;
      
      // 9. Frete Total
      const totalFreight = baseFreight + toll + fragileCharge + perishableCharge + urgentCharge + gris;
      
      // 10. Calcular prazo baseado no tipo de serviço
      const deliveryTime = formData.serviceType === 'express' 
        ? (isFTL ? '2-3 dias úteis' : '1-2 dias úteis')
        : (isFTL ? '3-5 dias úteis' : '2-4 dias úteis');
      
      setResult({
        price: totalFreight.toFixed(2),
        deliveryTime,
        distance: distance + ' km',
        taxedWeight: taxedWeight.toFixed(2) + ' kg',
        volumetricWeight: volumetricWeight.toFixed(2) + ' kg',
        realWeight: weight.toFixed(2) + ' kg',
        mode: isFTL ? 'FTL (Carga Completa)' : 'LTL (Carga Fracionada)',
        vehicle: selectedVehicle ? selectedVehicle.name : null,
        baseFreight: baseFreight.toFixed(2),
        toll: toll.toFixed(2),
        fragileCharge: fragileCharge.toFixed(2),
        perishableCharge: perishableCharge.toFixed(2),
        urgentCharge: urgentCharge.toFixed(2),
        gris: gris.toFixed(2),
        hasAdditions: fragileCharge > 0 || perishableCharge > 0 || urgentCharge > 0 || gris > 0
      });
      setIsCalculating(false);
    }, 2000);
  };

  const serviceTypes = [
    {
      value: 'standard',
      label: 'Padrão',
      description: 'Entrega em 2-5 dias úteis',
      icon: <Truck className="text-blue-600" size={20} />
    },
    {
      value: 'express',
      label: 'Expresso',
      description: 'Entrega em 1-2 dias úteis',
      icon: <Clock className="text-orange-600" size={20} />
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <BannerWithBadge
        image={heroBannerImage}
        alt="Simulador de Frete"
        badgeText="SIMULADOR"
        badgeIcon={<Calculator size={20} />}
        title="Simulador de"
        subtitle="Frete"
        description="Calcule o valor do frete para suas entregas de forma rápida e precisa"
        buttonText="Calcular Agora"
        buttonLink="#simulador-form"
      />

      {/* Simulator Form */}
      <section id="simulador-form" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Dados da Entrega
                  </h2>
                  
                  <form onSubmit={calculateFreight} className="space-y-6">
                    {/* Origin and Destination */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="inline mr-2" size={16} />
                          CEP de Origem *
                        </label>
                        <Input
                          type="text"
                          name="origin"
                          value={formData.origin}
                          onChange={handleInputChange}
                          required
                          placeholder="00000-000"
                          maxLength="9"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="inline mr-2" size={16} />
                          CEP de Destino *
                        </label>
                        <Input
                          type="text"
                          name="destination"
                          value={formData.destination}
                          onChange={handleInputChange}
                          required
                          placeholder="00000-000"
                          maxLength="9"
                        />
                      </div>
                    </div>

                    {/* Distance (Optional) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="inline mr-2" size={16} />
                        Distância Aproximada (km) <span className="text-gray-400 text-xs">(opcional)</span>
                      </label>
                      <Input
                        type="number"
                        name="distance"
                        value={formData.distance}
                        onChange={handleInputChange}
                        placeholder="Deixe vazio para cálculo automático"
                        min="1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        💡 Se não informar, a distância será calculada automaticamente
                      </p>
                    </div>

                    {/* Weight and Invoice Value */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Package className="inline mr-2" size={16} />
                          Peso (kg) *
                        </label>
                        <Input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          required
                          placeholder="0.0"
                          min="0.1"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <DollarSign className="inline mr-2" size={16} />
                          Valor da Nota Fiscal (R$) *
                        </label>
                        <Input
                          type="number"
                          name="invoiceValue"
                          value={formData.invoiceValue}
                          onChange={handleInputChange}
                          required
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    {/* Dimensions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dimensões (cm)
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <Input
                          type="number"
                          name="dimensions.length"
                          value={formData.dimensions.length}
                          onChange={handleInputChange}
                          placeholder="Comprimento"
                          min="1"
                        />
                        <Input
                          type="number"
                          name="dimensions.width"
                          value={formData.dimensions.width}
                          onChange={handleInputChange}
                          placeholder="Largura"
                          min="1"
                        />
                        <Input
                          type="number"
                          name="dimensions.height"
                          value={formData.dimensions.height}
                          onChange={handleInputChange}
                          placeholder="Altura"
                          min="1"
                        />
                      </div>
                    </div>

                    {/* Dedicated Vehicle Checkbox */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="dedicatedVehicle"
                          checked={formData.dedicatedVehicle}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700">
                          Solicitar Veículo Dedicado (FTL)
                        </span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1 ml-7">
                        Força o uso de modalidade FTL independente do peso
                      </p>
                    </div>

                    {/* Additional Charges */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Características da Carga:
                      </label>
                      <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="isFragile"
                            checked={formData.isFragile}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">
                            🔧 Carga Frágil <span className="text-gray-500">(+3%)</span>
                          </span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="isPerishable"
                            checked={formData.isPerishable}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">
                            ❄️ Carga Perecível <span className="text-gray-500">(+3%)</span>
                          </span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="isUrgent"
                            checked={formData.isUrgent}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">
                            ⚡ Entrega Urgente <span className="text-gray-500">(+15%)</span>
                          </span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="withGris"
                            checked={formData.withGris}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm text-gray-700">
                            🛡️ Incluir Seguro GRIS <span className="text-gray-500">(0,3% do valor da NF)</span>
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Service Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Tipo de Serviço
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {serviceTypes.map((service) => (
                          <label key={service.value} className="cursor-pointer">
                            <input
                              type="radio"
                              name="serviceType"
                              value={service.value}
                              checked={formData.serviceType === service.value}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className={`p-4 border-2 rounded-lg transition-all ${
                              formData.serviceType === service.value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}>
                              <div className="flex items-center mb-2">
                                {service.icon}
                                <span className="ml-2 font-semibold">{service.label}</span>
                              </div>
                              <p className="text-sm text-gray-600">{service.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
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
                          Calcular Frete
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
                          <span className="font-semibold text-gray-900">Valor do Frete</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          R$ {result.price}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Modalidade:</span>
                          <span className="font-semibold">{result.mode}</span>
                        </div>
                        {result.vehicle && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Veículo:</span>
                            <span className="font-semibold">{result.vehicle}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Prazo de entrega:</span>
                          <span className="font-semibold">{result.deliveryTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Distância:</span>
                          <span className="font-semibold">{result.distance}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Peso taxado:</span>
                          <span className="font-semibold">{result.taxedWeight}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Peso real:</span>
                          <span className="font-semibold">{result.realWeight}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Peso cubado:</span>
                          <span className="font-semibold">{result.volumetricWeight}</span>
                        </div>
                        
                        {result.hasAdditions && (
                          <div className="pt-3 mt-3 border-t border-gray-200">
                            <p className="text-xs text-gray-500 mb-2">Detalhamento:</p>
                            <div className="space-y-1 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Frete base:</span>
                                <span className="font-semibold">R$ {result.baseFreight}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-600">Pedágio:</span>
                                <span className="font-semibold">R$ {result.toll}</span>
                              </div>
                              {parseFloat(result.fragileCharge) > 0 && (
                                <div className="flex items-center justify-between text-orange-600">
                                  <span>Carga Frágil (+3%):</span>
                                  <span className="font-semibold">R$ {result.fragileCharge}</span>
                                </div>
                              )}
                              {parseFloat(result.perishableCharge) > 0 && (
                                <div className="flex items-center justify-between text-blue-600">
                                  <span>Carga Perecível (+3%):</span>
                                  <span className="font-semibold">R$ {result.perishableCharge}</span>
                                </div>
                              )}
                              {parseFloat(result.urgentCharge) > 0 && (
                                <div className="flex items-center justify-between text-red-600">
                                  <span>Entrega Urgente (+15%):</span>
                                  <span className="font-semibold">R$ {result.urgentCharge}</span>
                                </div>
                              )}
                              {parseFloat(result.gris) > 0 && (
                                <div className="flex items-center justify-between text-green-600">
                                  <span>GRIS (0,3% NF):</span>
                                  <span className="font-semibold">R$ {result.gris}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Contratar Serviço
                          <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calculator className="mx-auto text-gray-400 mb-4" size={48} />
                      <p className="text-gray-500">
                        Preencha os dados ao lado para calcular o frete
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-lg p-8">
              <div className="flex items-start">
                <Info className="text-blue-600 mt-1 mr-4" size={24} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Informações Importantes
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Os valores apresentados são estimativas baseadas nas informações fornecidas</li>
                    <li>• O valor final pode variar conforme características específicas da carga</li>
                    <li>• Prazos de entrega não incluem fins de semana e feriados</li>
                    <li>• Para cargas especiais, entre em contato para cotação personalizada</li>
                    <li>• Seguro da carga está incluso no valor do frete</li>
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

export default FreightSimulator;

