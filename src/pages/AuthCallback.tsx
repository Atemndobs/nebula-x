import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Spinner } from '../components/ui/Spinner';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

export const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check for error from OAuth provider
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        
        if (error) {
          throw new Error(errorDescription || 'Authentication failed');
        }

        // Check if there's a session in the URL (for PKCE flow)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (session) {
          // Show success message
          toast.success('Successfully signed in!');
          // Redirect to dashboard or intended URL
          const redirectTo = localStorage.getItem('returnTo') || '/dashboard';
          localStorage.removeItem('returnTo');
          navigate(redirectTo);
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to complete authentication';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    };

    handleAuthCallback();
  }, [user, navigate, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="mt-3 text-2xl font-bold text-gray-900">Authentication Error</h2>
            <p className="mt-2 text-sm text-gray-600">
              {error}
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/login')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 text-indigo-600">
          <Spinner size="lg" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">Signing you in</h3>
        <p className="mt-2 text-sm text-gray-600">Please wait while we complete your authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
