import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// Icons (using Heroicons v2)
const ArrowLeftOnRectangleIcon = ({ className = '' }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={`w-6 h-6 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H3" />
  </svg>
);

interface DashboardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardDrawer = ({ isOpen, onClose }: DashboardDrawerProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const closeDrawer = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        closeDrawer();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeDrawer]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out z-30 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#0a0212] to-[#1a0a2e] shadow-xl transform transition-transform duration-300 ease-in-out z-40 border-r border-white/10 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#f64661] to-[#9c2cf3] bg-clip-text text-transparent">
              Nebula Logix
            </h2>
            <button
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none"
              onClick={closeDrawer}
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                >
                  <span>Dashboard</span>
                </a>
              </li>
              {/* Add more navigation items here */}
            </ul>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardDrawer;
