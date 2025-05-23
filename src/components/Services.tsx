import React from 'react';
import { Smartphone, Brain, Cloud, Figma, LineChart, Shield } from 'lucide-react';

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBg: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, iconBg }) => {
  return (
    <div className="group p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-[#e35c75]/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(227,92,117,0.1)]">
      <div 
        className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 ${iconBg}`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/70 leading-relaxed">{description}</p>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <Smartphone size={24} />,
      title: "SaaS & Mobile App Development",
      description: "Build powerful apps that streamline operations and delight users.",
      iconBg: "bg-pink-900/30",
    },
    {
      icon: <Brain size={24} />,
      title: "AI & Machine Learning Solutions",
      description: "Intelligent automation and predictive insights, built into your workflows.",
      iconBg: "bg-purple-900/30",
    },
    {
      icon: <Cloud size={24} />,
      title: "Cloud-Native Integration",
      description: "Migrate legacy systems or build from scratch with secure, scalable, serverless architecture.",
      iconBg: "bg-pink-900/30",
    },
    {
      icon: <Figma size={24} />,
      title: "UI/UX Design",
      description: "Seamless experiences that match your brand and empower your users.",
      iconBg: "bg-purple-900/30",
    },
    {
      icon: <Shield size={24} />,
      title: "24/7 Cloud Support & Services",
      description: "Continuous monitoring, proactive optimization, and enterprise-grade security.",
      iconBg: "bg-pink-900/30",
    },
    {
      icon: <LineChart size={24} />,
      title: "Cloud Strategy & Consulting",
      description: "Expert guidance on architecture, migration, and optimization for your business needs.",
      iconBg: "bg-purple-900/30",
    },
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-[#1a0a2e] to-black relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9c2cf3]/10 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#e35c75]/10 rounded-full filter blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-28 relative z-10">
        <div className="text-center mb-16">
          <div className="text-sm uppercase tracking-wider text-[#e35c75] mb-2">Core Services</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cloud Services That<br />Drive Business Forward
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              iconBg={service.iconBg}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;