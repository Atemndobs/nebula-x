import { createContext } from 'react';
import { User, Session } from '@supabase/supabase-js';

type Provider = 'github' | 'google';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithProvider: (provider: Provider) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword?: (email: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export type { AuthContextType, Provider };
