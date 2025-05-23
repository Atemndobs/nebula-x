import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import IndustrySectors from './components/IndustrySectors';
import Values from './components/Values';
import StrategicPartner from './components/StrategicPartner';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    document.title = 'Nebula Logix | Cloud Solutions';
    
    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (favicon) {
      favicon.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☁️</text></svg>';
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <IndustrySectors />
      <Values />
      <StrategicPartner />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;