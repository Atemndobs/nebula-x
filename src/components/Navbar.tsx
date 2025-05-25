import React, { useState, useEffect } from 'react';
import { Link } from './ui/Link';

interface NavbarProps {
  onProfileClick?: () => void;
  showProfile?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onProfileClick, showProfile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleProfileButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onProfileClick) {
      onProfileClick();
    }
  };

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
            
            {/* Profile icon commented out as per user request
            {onProfileClick && (
              <button 
                onClick={handleProfileButtonClick}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Toggle profile menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            )}
            */}
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="bg-[#f64661] hover:bg-[#e63754] text-white py-1.5 px-8 rounded-[12px] border-4 border-[#f64661] transition duration-300 text-sm font-medium">
              Let's Talk
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white hover:text-gray-200 focus:outline-none"
              onClick={handleMenuToggle}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 rounded-b-lg p-4">
              <div className="flex flex-col space-y-4">
                <Link href="#about" className="text-white hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                <Link href="#services" className="text-white hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Services</Link>
                <Link href="#projects" className="text-white hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Projects</Link>
                <Link href="#why" className="text-white hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Why Nebula</Link>
                
                {onProfileClick && (
                  <button 
                    onClick={(e) => {
                      handleProfileButtonClick(e);
                      setIsMenuOpen(false);
                    }}
                    className="text-white hover:text-gray-300 text-left py-2 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export { Navbar };