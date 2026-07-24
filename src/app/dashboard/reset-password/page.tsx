'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardBody } from '@/components/ui/Card';
import { Church, Mail, Loader2, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
            <CheckCircle className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Email enviado!</h1>
          <p className="text-gray-600 mb-6">
            Enviamos um link de redefinição de senha para <strong>{email}</strong>.
            Verifique sua caixa de entrada e siga as instruções.
          </p>
          <Link href="/dashboard/login">
            <Button variant="outline">Voltar para o login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
            <Church className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Igreja Campo do Planalto</h1>
          <p className="text-gray-500 mt-1">Vila Planalto</p>
        </div>

        <Card>
          <CardBody className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Redefinir senha</h2>
            <p className="text-sm text-gray-500 mb-6">
              Digite seu email e enviaremos um link para redefinir sua senha.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg text-sm text-primary-700" role="alert">
                  {error}
                </div>
              )}

              <Input
                label="Email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button type="submit" className="w-full" size="lg" loading={loading} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Link de Redefinição'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <Link href="/dashboard/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Voltar para o login
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
