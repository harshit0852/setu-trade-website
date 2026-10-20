import { useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { AdminAuthContext, type AdminAuthContextValue } from '@/lib/adminAuthContext';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminAuthContextValue['session']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AdminAuthContext.Provider value={{ session, user: session?.user ?? null, loading, signIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
