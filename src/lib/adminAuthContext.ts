import { createContext, useContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

export interface AdminAuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
