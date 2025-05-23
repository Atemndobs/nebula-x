import React from 'react';
import { Mail, MessageSquare, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section className="py-24 bg-[#1a0a2e] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#9c2cf3]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-[#e35c75]/10 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto bg-black/50 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-[#1a0a2e] to-black">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                Connect with our team of cloud experts to discuss how we can help you leverage cloud technology 
                to drive innovation and growth for your business.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#e35c75]/20 flex items-center justify-center mr-4">
                    <Mail size={18} className="text-[#e35c75]" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Email Us</div>
                    <a href="mailto:contact@nebulalogix.com" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">
                      contact@nebulalogix.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#e35c75]/20 flex items-center justify-center mr-4">
                    <Phone size={18} className="text-[#e35c75]" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Call Us</div>
                    <a href="tel:+1234567890" className="text-white/70 hover:text-[#e35c75] transition-colors duration-300">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-[#e35c75]/20 flex items-center justify-center mr-4">
                    <MessageSquare size={18} className="text-[#e35c75]" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">Live Chat</div>
                    <div className="text-white/70">
                      Available 24/7 for urgent inquiries
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 md:p-12 lg:p-16">
              <form>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e35c75]/50 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e35c75]/50 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e35c75]/50 focus:border-transparent resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#f64661] hover:bg-[#e63754] text-white py-1.5 px-6 rounded-[12px] border-4 border-[#f64661] transition duration-300 font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;