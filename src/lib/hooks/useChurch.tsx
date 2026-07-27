'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface Church {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  banner_url: string | null;
  slogan: string | null;
  primary_color: string;
  secondary_color: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  social_links: Record<string, string>;
  settings: Record<string, unknown>;
}

interface ChurchContextType {
  currentChurch: Church | null;
  churches: Church[];
  setCurrentChurch: (church: Church) => void;
  loading: boolean;
  isSuperAdmin: boolean;
  userRole: string | null;
  refetch: () => Promise<void>;
}

const ChurchContext = createContext<ChurchContextType>({
  currentChurch: null,
  churches: [],
  setCurrentChurch: () => {},
  loading: true,
  isSuperAdmin: false,
  userRole: null,
  refetch: async () => {},
});

export function useChurch() {
  return useContext(ChurchContext);
}

export function ChurchProvider({ children }: { children: ReactNode }) {
  const [currentChurch, setCurrentChurchState] = useState<Church | null>(null);
  const [churches, setChurches] = useState<Church[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setUserId(user.id);

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      const role = roleData?.role || 'user';
      setUserRole(role);
      const isSuper = role === 'super_admin';

      if (isSuper) {
        const { data: allChurches } = await supabase
          .from('churches')
          .select('*')
          .order('name', { ascending: true });

        setChurches(allChurches || []);
        if (allChurches && allChurches.length > 0) {
          setCurrentChurchState(allChurches[0]);
        }
      } else {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('church_id')
          .eq('id', user.id)
          .single();

        if (profileData?.church_id) {
          const { data: churchData } = await supabase
            .from('churches')
            .select('*')
            .eq('id', profileData.church_id)
            .single();

          if (churchData) {
            setChurches([churchData]);
            setCurrentChurchState(churchData);
          }
        }
      }
    } catch (err) {
      console.error('Error loading church context:', err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const setCurrentChurch = useCallback((church: Church) => {
    setCurrentChurchState(church);
  }, []);

  return (
    <ChurchContext.Provider
      value={{
        currentChurch,
        churches,
        setCurrentChurch,
        loading,
        isSuperAdmin: userRole === 'super_admin',
        userRole,
        refetch: fetchData,
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
}