import Link from 'next/link';

export default function DashboardNotFound() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-600">404</h1>
        <p className="mt-2 text-gray-600">Página não encontrada no painel</p>
        <Link
          href="/dashboard"
          className="mt-4 inline-block rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
        >
          Voltar ao dashboard
        </Link>
      </div>
    </div>
  );
}