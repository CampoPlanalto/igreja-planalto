'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Church, QrCode, ArrowRight, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Church className="h-7 w-7 text-primary-600" />
              <span className="font-semibold text-lg text-gray-900">Planalto</span>
            </div>
            <Link
              href="/dashboard/login"
              className="btn-outline text-sm"
            >
              <Shield className="h-4 w-4 mr-2" />
              Área Administrativa
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="text-center max-w-3xl mx-auto">
            {/* Logo placeholder */}
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-white/10 backdrop-blur-sm mb-6 ring-1 ring-white/20">
              <Church className="h-10 w-10 text-white" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Igreja Campo do Planalto
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 font-light mb-2">
              Laranjal do Jari - AP
            </p>
            <p className="text-lg text-primary-200 mb-10 max-w-xl mx-auto">
              Assembleia de Deus - Uma igreja acolhedora para toda a família. Venha nos visitar e fazer parte da nossa história.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/campanhas">
                <Button variant="gold" size="xl" className="w-full sm:w-auto">
                  <QrCode className="h-5 w-5 mr-2" />
                  Preencher minha ficha
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard/login">
                <Button size="xl" className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 border border-white/20">
                  <Shield className="h-5 w-5 mr-2" />
                  Área Administrativa
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-50 to-transparent" />
      </section>

      {/* Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mb-4">
              <Church className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cultos</h3>
            <p className="text-gray-600">
              Domingos às 9h e 19h<br />
              Quartas às 19h
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mb-4">
              <Church className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Localização</h3>
            <p className="text-gray-600">
              Laranjal do Jari - AP<br />
              Amazônia
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 mb-4">
              <Church className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Seja Bem-Vindo</h3>
            <p className="text-gray-600">
              Preencha sua ficha de visita<br />
              e faça parte da nossa família
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-100 border-t border-[#e5dcc8] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>Igreja Campo do Planalto - Laranjal do Jari - AP</p>
        </div>
      </footer>
    </div>
  );
}
