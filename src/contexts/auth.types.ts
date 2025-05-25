import { createContext } from 'react';
import { User } from '@supabase/supabase-js';

type Provider = 'github' | 'google';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithProvider: (provider: Provider) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export type { AuthContextType, Provider };
