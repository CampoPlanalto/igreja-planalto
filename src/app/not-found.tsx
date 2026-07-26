import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-600">404</h1>
        <p className="mt-4 text-xl text-gray-600">Página não encontrada</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-primary-600 px-6 py-2 text-white hover:bg-primary-700"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}