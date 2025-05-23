import React from 'react';
import { Building2, ShoppingCart, Heart, Factory, Shield, Network, Users } from 'lucide-react';

const IndustrySectors: React.FC = () => {
  const sectors = [
    {
      icon: <Building2 className="text-[#e35c75]" />,
      name: 'FinTech',
    },
    {
      icon: <ShoppingCart className="text-[#e35c75]" />,
      name: 'E-Commerce & Retail',
    },
    {
      icon: <Heart className="text-[#e35c75]" />,
      name: 'Healthcare & Life Sciences',
    },
    {
      icon: <Factory className="text-[#e35c75]" />,
      name: 'Manufacturing & Supply Chain',
    },
    {
      icon: <Shield className="text-[#e35c75]" />,
      name: 'Government & Public Sector',
    },
    {
      icon: <Network className="text-[#e35c75]" />,
      name: 'Business Networking',
    },
    {
      icon: <Users className="text-[#e35c75]" />,
      name: 'Non-Profit & Social Impact',
    },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#9c2cf3]/10 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#e35c75]/10 rounded-full filter blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="text-sm uppercase tracking-wider text-[#e35c75] mb-2">Industries We Serve</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built For Impact, Across Every Sector
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {sectors.map((sector, index) => (
            <div
              key={index}
              className="group flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-sm rounded-full border border-white/5 hover:border-[#e35c75]/20 transition-all duration-300"
            >
              {sector.icon}
              <span className="text-white/90 group-hover:text-white transition-colors duration-300">
                {sector.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrySectors;