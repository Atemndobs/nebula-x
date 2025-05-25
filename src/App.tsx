import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthCallback } from './pages/AuthCallback';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
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
import { Spinner } from './components/ui/Spinner';

const Home = () => {
  const [showProfile, setShowProfile] = useState(false);
  
  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      <Navbar onProfileClick={handleProfileClick} showProfile={showProfile} />
      <main className="pt-16">
        <Hero />
        <About />
        <Services />
        <IndustrySectors />
        <Values />
        <StrategicPartner />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

const AppContent = () => {
  const { user, loading } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const isAuthCallback = location.pathname === '/auth/callback';

  useEffect(() => {
    document.title = 'Nebula Logix | Cloud Solutions';
    
    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (favicon) {
      favicon.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%22900%22>☁️</text></svg>';
    }
  }, []);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  if (loading && !isAuthCallback) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                {/* <Navbar onProfileClick={handleProfileClick} showProfile={showProfile} /> */}
                <DashboardPage />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;