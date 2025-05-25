import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
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

const AppContent = () => {
  const { user, loading } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar onProfileClick={handleProfileClick} showProfile={showProfile} />
                <DashboardPage />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
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
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

function App() {
  return <AppContent />;
}

export default App;