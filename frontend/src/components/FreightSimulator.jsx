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
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    serviceType: 'standard'
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

  const calculateFreight = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simulação de cálculo usando novo modelo 2025
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const { length, width, height } = formData.dimensions;
      
      // 1. Calcular peso cubado (LTL) usando divisor 6000 (padrão ANTT)
      const volumetricWeight = (parseFloat(length) * parseFloat(width) * parseFloat(height)) / FREIGHT_CONFIG.volumetricWeightDivisor;
      
      // 2. Peso taxado = max(peso real, peso cubado)
      const taxedWeight = Math.max(weight, volumetricWeight);
      
      // 3. Determinar se é LTL ou FTL
      const isFTL = weight > 1000;
      
      let baseFreight = 0;
      let selectedVehicle = null;
      
      if (isFTL) {
        // Modo FTL - Cálculo por km e tipo de veículo
        const distance = 400; // Simulação (será melhorado com APIs reais)
        
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
      
      // 4. Calcular pedágio (simulado)
      const originState = formData.origin.substring(0, 2);
      const destState = formData.destination.substring(0, 2);
      const routeKey = `${originState}-${destState}`;
      const toll = FREIGHT_CONFIG.tollRoutes[routeKey] || (500 * FREIGHT_CONFIG.defaultTollRate);
      
      // 5. Adicionais (serão implementados quando houver campos no formulário)
      const fragileCharge = baseFreight * FREIGHT_CONFIG.additionalCharges.fragile;
      const urgentCharge = baseFreight * FREIGHT_CONFIG.additionalCharges.urgent;
      
      // 6. GRIS (será implementado quando houver campo de valor da NF)
      const gris = 0; // placeholder
      
      // 7. Frete Total
      const totalFreight = baseFreight + toll + fragileCharge + urgentCharge + gris;
      
      // 8. Calcular prazo (simulado)
      const deliveryTime = isFTL ? '3-5 dias úteis' : '2-4 dias úteis';
      
      // 9. Simular distância
      const isSameState = originState === destState;
      const distanceRange = isSameState ? FREIGHT_CONFIG.simulatedDistances.sameState : FREIGHT_CONFIG.simulatedDistances.differentState;
      const distance = Math.floor(Math.random() * (distanceRange.max - distanceRange.min) + distanceRange.min);
      
      setResult({
        price: totalFreight.toFixed(2),
        deliveryTime,
        distance: distance + ' km',
        taxedWeight: taxedWeight.toFixed(2) + ' kg',
        volumetricWeight: volumetricWeight.toFixed(2) + ' kg',
        realWeight: weight.toFixed(2) + ' kg',
        mode: isFTL ? 'FTL (Carga Completa)' : 'LTL (Carga Fracionada)',
        vehicle: selectedVehicle ? selectedVehicle.name : null
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

                    {/* Weight */}
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
                          <span className="text-gray-600">Distância estimada:</span>
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

