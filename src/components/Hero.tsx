import React from 'react';
import ClientLogos from './ClientLogos';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0f0416] to-[#1a0a2e] pt-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9c2cf3]/20 rounded-full filter blur-[80px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#e35c75]/20 rounded-full filter blur-[60px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center py-16">
        <div className="flex justify-center mb-8">
          <div className="flex -space-x-2 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="inline-block h-12 w-12 rounded-full border-2 border-[#1a0a2e] bg-gray-800">
                <img 
                  src={`https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150`} 
                  alt="Team member" 
                  className="h-full w-full object-cover rounded-full" 
                />
              </div>
            ))}
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 tracking-tight">
          <span className="text-[#e35c75] animate-text-fade">Empowering</span> Businesses Through
          <br />
          Transformative <span className="text-[#e35c75] animate-text-fade">Cloud</span> Solutions.
        </h1>
        
        <p className="text-white/80 max-w-3xl mx-auto text-lg md:text-xl mb-10 leading-relaxed">
          Our team of seasoned experts specialize in providing comprehensive cloud consulting services,
          delivering tailored strategies and implementation plans to drive your digital transformation.
        </p>
        
        <button className="bg-[#f64661] hover:bg-[#e63754] text-white py-1.5 px-8 rounded-[12px] border-4 border-[#f64661] text-lg font-medium transition duration-300 transform hover:scale-105">
          Let's Build Together
        </button>
        
        <div className="mt-24">
          <ClientLogos />
        </div>
      </div>
    </section>
  );
};

export default Hero;