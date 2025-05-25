import { useEffect, useState, ReactNode, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, signInWithProvider } from '../lib/supabase';
import { AuthContext, Provider } from './auth.types';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle auth state changes
  useEffect(() => {
    // Check for an existing session first
    const checkSession = async () => {
      try {
        setLoading(true);
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // If there's a returnTo in localStorage, redirect there after login
        if (currentSession) {
          const returnTo = localStorage.getItem('returnTo');
          if (returnTo) {
            localStorage.removeItem('returnTo');
            navigate(returnTo);
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to check authentication status';
        setError(errorMessage);
        console.error('Auth error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Handle specific auth events
        if (event === 'SIGNED_IN') {
          toast.success('Successfully signed in!');
          const returnTo = localStorage.getItem('returnTo') || '/dashboard';
          localStorage.removeItem('returnTo');
          if (window.location.pathname !== returnTo) {
            navigate(returnTo);
          }
        } else if (event === 'SIGNED_OUT') {
          toast.success('Successfully signed out');
          navigate('/login');
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed');
        }
      }
    );

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Handle email/password sign in
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Handle email/password sign up
  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = useCallback(async (provider: Provider) => {
    try {
      setLoading(true);
      setError(null);
      
      // Store the current path to redirect back after login
      if (window.location.pathname !== '/login') {
        localStorage.setItem('returnTo', window.location.pathname);
      }
      
      await signInWithProvider(provider);
      // The rest is handled by the auth state change listener
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign in with provider';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle sign out
  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSession(null);
      toast.success('Successfully signed out');
      navigate('/login');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign out';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const value = {
    user,
    session,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    signInWithProvider: handleSocialLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
