import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Igreja Campo do Planalto - Vila Planalto',
  description: 'Plataforma de campanhas e fichas de visita da Igreja Campo do Planalto',
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
