// lib/hooks/use-current-user.ts
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthError, User } from "@supabase/supabase-js";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null); 
  
  useEffect(() => {
    const supabase = createClient();
    async function loadUser() {
      const { data: { user }, error } = await supabase.auth.getUser();

      if(error) setError(error)
        
      setUser(user);
      setLoading(false);
    }


    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading, error };
}
