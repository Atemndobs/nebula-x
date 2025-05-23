import React from 'react';
import ClientLogos from './ClientLogos';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[calc(100vh-8px)] pt-12 flex items-start justify-center bg-black -mt-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9c2cf3]/20 rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#e35c75]/20 rounded-full" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Hero Card */}
      <div className="container mx-auto px-28 h-[calc(100vh-8rem)] mt-16 mb-8">
        <div className="relative bg-gradient-to-br from-[#1a0a2e]/90 via-[#1a0a2e]/85 to-[#3a0a3e]/80 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col">
          <div className="absolute inset-0">
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#f64661]/20 to-[#9c2cf3]/20 rounded-full transform translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>
          <div className="relative z-10 flex-1 flex flex-col justify-end p-8 md:px-12 lg:px-16 pt-12 pb-16">
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
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight max-w-3xl mx-auto">
              <span className="text-[#f64661]">Empowering</span> Businesses Through
              <br />
              Transformative <span className="text-[#f64661]">Cloud</span> Solutions.
            </h1>
            
            <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base mb-12 leading-relaxed mt-6 text-center">
              Our team of seasoned experts specialize in providing comprehensive cloud consulting services,
              delivering tailored strategies and implementation plans to drive your digital transformation.
            </p>
            
            <button className="bg-[#f64661] hover:bg-[#e63754] text-white py-1.5 px-8 rounded-[12px] border-4 border-[#f64661] text-lg font-medium transition duration-300 transform hover:scale-105 mx-auto block w-fit">
              Let's Build Together
            </button>
            
            <div className="mt-24">
              <ClientLogos />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;