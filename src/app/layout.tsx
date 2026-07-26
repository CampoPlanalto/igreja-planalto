import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Igreja Campo do Planalto - Laranjal do Jari - AP',
    template: '%s | Igreja Campo do Planalto',
  },
  description: 'Assembleia de Deus - Plataforma de campanhas e fichas de visita da Igreja Campo do Planalto em Laranjal do Jari, Amapá',
  openGraph: {
    title: 'Igreja Campo do Planalto',
    description: 'Plataforma de campanhas e fichas de visita',
    siteName: 'Igreja Campo do Planalto',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
