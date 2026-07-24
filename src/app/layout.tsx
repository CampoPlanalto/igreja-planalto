import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Igreja Campo do Planalto - Laranjal do Jari - AP',
  description: 'Assembleia de Deus - Plataforma de campanhas e fichas de visita da Igreja Campo do Planalto em Laranjal do Jari, Amapá',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
