import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const setSession = useAuthStore((state) => state.setSession);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    let mounted = true;

    // Escuchar cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setSession(session);
      setLoading(false);
    });

    // Recuperar sesión existente
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;

      if (error) {
        setSession(null);
      } else {
        setSession(data.session);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setSession, setLoading]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
