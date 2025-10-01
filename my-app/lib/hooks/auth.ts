import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js'; 

export function useUser() {
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient(); // no need to await
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        setError(error);
      } else {
        setUser(data.user); // ✅ assign single user object
      }

      setLoading(false);
    }

    fetchUser();
  }, []);

  return { user, loading, error };
}

