import React from 'react';
import { Lightbulb, Users, Shield, Target, Code, Heart } from 'lucide-react';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-[#e35c75]/20 transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-[#e35c75]/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

const Values: React.FC = () => {
  const values = [
    {
      icon: <Lightbulb className="text-[#e35c75]" />,
      title: "Innovation First",
      description: "Pushing boundaries with cutting-edge cloud solutions and emerging technologies.",
    },
    {
      icon: <Users className="text-[#e35c75]" />,
      title: "Inclusive Culture",
      description: "Fostering diversity and creating an environment where all voices are heard and valued.",
    },
    {
      icon: <Shield className="text-[#e35c75]" />,
      title: "Unwavering Integrity",
      description: "Building trust through transparency, honesty, and ethical business practices.",
    },
    {
      icon: <Target className="text-[#e35c75]" />,
      title: "Results Driven",
      description: "Focusing on measurable outcomes and tangible business value for our clients.",
    },
    {
      icon: <Code className="text-[#e35c75]" />,
      title: "Technical Excellence",
      description: "Maintaining the highest standards in code quality and architectural design.",
    },
    {
      icon: <Heart className="text-[#e35c75]" />,
      title: "Client Success",
      description: "Dedicated to our clients' growth and long-term success in the digital landscape.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black to-[#1a0a2e] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#9c2cf3]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-[#e35c75]/10 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="text-sm uppercase tracking-wider text-[#e35c75] mb-2">Our Values & Vision</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            A Commitment To Innovation,<br />
            Inclusion & Integrity
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;