import React from 'react';
import { Server, Award, Users, Clock, Target } from 'lucide-react';

const StrategicPartner: React.FC = () => {
  const benefits = [
    {
      icon: <Server className="text-[#e35c75]" />,
      text: "Serverless-first approach for cost-efficient scaling",
    },
    {
      icon: <Award className="text-[#e35c75]" />,
      text: "Proven track record across industries",
    },
    {
      icon: <Users className="text-[#e35c75]" />,
      text: "Black-owned, woman-led, values-driven leadership",
    },
    {
      icon: <Clock className="text-[#e35c75]" />,
      text: "24/7 support and proactive cloud management",
    },
    {
      icon: <Target className="text-[#e35c75]" />,
      text: "Expert teams focused on your business outcomes",
    },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] opacity-10 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>
      
      <div className="container mx-auto px-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Circuit Board Pattern"
              className="rounded-2xl border border-[#e35c75]/20 shadow-2xl shadow-[#e35c75]/10"
            />
          </div>
          
          <div>
            <div className="text-sm uppercase tracking-wider text-[#e35c75] mb-2">
              Why Choose Nebula Logix
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Your Strategic Partner<br />
              In The Cloud
            </h2>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#e35c75]/10 flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <p className="text-white/90">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicPartner;