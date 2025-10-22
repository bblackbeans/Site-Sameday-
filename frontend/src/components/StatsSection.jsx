import React from 'react';
import { Users, MapPin, Truck, Package } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: <Users size={40} />,
      number: '125k',
      label: 'Clientes Ativos',
      description: 'Empresas que confiam em nossos serviços'
    },
    {
      icon: <MapPin size={40} />,
      number: '189+',
      label: 'Cidades Atendidas',
      description: 'Cobertura nacional em expansão'
    },
    {
      icon: <Truck size={40} />,
      number: '950+',
      label: 'Parceiros Transportadores',
      description: 'Rede qualificada e verificada'
    },
    {
      icon: <Package size={40} />,
      number: '159k',
      label: 'Entregas Realizadas',
      description: 'Operações concluídas com sucesso'
    }
  ];

  return (
    <section className="py-20 bg-primary-purple text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group"
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300 group-hover:scale-110 transform" style={{backgroundColor: '#f60e4a'}}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>

              {/* Number */}
              <div className="text-5xl lg:text-6xl font-semibold text-white mb-2 transition-colors duration-300">
                {stat.number}
              </div>

              {/* Label */}
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm text-white">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Content */}
        <div className="text-center mt-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Números que comprovam nossa excelência
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nossa plataforma conecta milhares de empresas e profissionais, 
            criando uma rede logística eficiente e confiável em todo o Brasil.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

