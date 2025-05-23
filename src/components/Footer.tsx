import React from 'react';
import { Cloud, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-16 pb-8">
      <div className="container mx-auto px-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Cloud className="text-[#e35c75] mr-2" />
              <span className="text-xl font-bold tracking-tight">NEBULA<span className="text-[#e35c75]">LOGIX</span></span>
            </div>
            <p className="text-white/70 mb-6">
              Empowering businesses through transformative cloud solutions that drive innovation and growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/50 hover:text-[#e35c75] transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/50 hover:text-[#e35c75] transition-colors duration-300">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white/50 hover:text-[#e35c75] transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/50 hover:text-[#e35c75] transition-colors duration-300">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">SaaS Development</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">AI Solutions</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">Cloud Integration</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">UI/UX Design</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">24/7 Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">Our Team</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">Press</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">Case Studies</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">Documentation</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">Events</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">Partnerships</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Nebula Logix. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;