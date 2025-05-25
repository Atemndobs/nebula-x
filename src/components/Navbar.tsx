import React, { useState, useEffect } from 'react';
import { Link } from './ui/Link';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4">
      <div 
        className={`
          rounded-[12px] transition-all duration-300 backdrop-blur-[2px]
          ${isScrolled 
            ? 'bg-black/75 py-5' 
            : 'bg-black/20 py-7'
          }
        `}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-xl tracking-tight">
              <span className="font-bold text-white">NEBULA</span>
              <span className="text-white">LOGI</span>
              <span className="text-[#f64661]">X</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#about">About Us</Link>
            <Link href="#services">Services</Link>
            <Link href="#projects">Projects</Link>
            <Link href="#why">Why Nebula</Link>
          </div>
          
          <button className="bg-[#f64661] hover:bg-[#e63754] text-white py-1.5 px-8 rounded-[12px] border-4 border-[#f64661] transition duration-300 text-sm font-medium">
            Let's Talk
          </button>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };