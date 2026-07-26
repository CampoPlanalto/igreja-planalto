'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600">Algo deu errado!</h2>
        <p className="mt-2 text-gray-600">{error.message}</p>
        <button
          onClick={reset}
          className="mt-4 rounded-lg bg-primary-600 px-6 py-2 text-white hover:bg-primary-700"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}