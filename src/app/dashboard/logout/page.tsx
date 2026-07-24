'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

export default function LogoutPage() {
  const router = useRouter();
  const supabase = createClient();
  const [message, setMessage] = useState('Saindo...');

  useEffect(() => {
    async function signOut() {
      try {
        await supabase.auth.signOut();
        setMessage('Redirecionando...');
      } catch {
        setMessage('Erro ao sair');
      } finally {
        setTimeout(() => {
          router.push('/dashboard/login');
        }, 1000);
      }
    }

    signOut();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
}
