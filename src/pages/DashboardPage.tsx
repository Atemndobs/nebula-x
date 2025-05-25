import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { DashboardNavbar } from '../components/dashboard/DashboardNavbar';
import { DashboardDrawer } from '../components/dashboard/DashboardDrawer';
import { AwsUsageDashboard } from '../components/dashboard/aws-usage/AwsUsageDashboard';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import styles from '../styles/background.module.css';

export const DashboardPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-black text-white flex pt-16 relative">
        <div className="fixed inset-0 overflow-hidden">
          <div className={`${styles.backgroundBlob} ${styles.purple}`} />
          <div className={`${styles.backgroundBlob} ${styles.pink}`} />
        </div>
        
        <DashboardDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        <div className={`flex-1 flex flex-col overflow-hidden ${styles.dashboardContent}`}>
          <DashboardNavbar onMenuClick={toggleDrawer} />
          
          <main className="flex-1 overflow-y-auto p-6">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    <span className="text-[#f64661]">AWS Resources</span> Dashboard
                  </h1>
                  <p className="text-gray-300">
                    Welcome back, {user?.email?.split('@')[0] || 'User'}. Here's an overview of your AWS resources.
                  </p>
                </div>
                
                <AwsUsageDashboard />
              </div>
            </div>
          </main>
        </div>
      </div>
    </NextThemesProvider>
  );
};

export default DashboardPage;
