import React from 'react';
import { CloudCog } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-[#9c2cf3]/10 rounded-full filter blur-[60px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#e35c75]/10 rounded-full filter blur-[70px]" />
      </div>
      
      <div className="container mx-auto px-28 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          <div className="lg:w-1/2">
            <div className="text-sm uppercase tracking-wider text-[#e35c75]">About Us</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-6 leading-tight">
              The Future Is In The Cloud<br />
              And We're Already There.
            </h2>
            
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              At Nebula Logix, we help businesses transform, scale, and thrive with innovative
              cloud-native solutions. From startups to enterprises, our mission is to simplify
              complexity and deliver lasting value through serverless architecture, secure
              cloud development, and tailored technology strategies.
            </p>
            
            <div className="mt-12 relative">
              <div className="relative">
                <div className="text-5xl text-[#e35c75] font-bold">"</div>
                <blockquote className="text-xl text-white/90 italic ml-8 mb-4">
                  We simplify complexity so you can focus on
                  what matters most — your business.
                </blockquote>
                <cite className="text-[#e35c75] ml-8 block">— Irene Ogutu, Founder</cite>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-[400px] h-[400px]">
              <div className="animate-spin-slow absolute inset-0">
                <CloudNetwork />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Cloud network visualization component
const CloudNetwork: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      {/* This is a placeholder for the 3D network visualization */}
      {/* In a real implementation, this would be a proper 3D visualization */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <CloudCog size={80} className="text-[#9c2cf3]" />
      </div>
      {Array.from({ length: 15 }).map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-[#e35c75] opacity-70"
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `pulse ${Math.random() * 3 + 2}s infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

export default About;