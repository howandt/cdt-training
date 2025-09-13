'use client';

import { useSearchParams } from 'next/navigation';

export default function DiagnosisPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 max-w-2xl w-full space-y-6 text-gray-900">
        <h1 className="text-3xl font-bold text-center">📖 Diagnoser</h1>
        <p className="text-lg text-center">
          Velkommen {name || 'bruger'} – her finder du viden om fx ADHD, autisme og angst.
        </p>
        <p className="text-center text-gray-500">
          Denne sektion henter tekster fra din fagbog og opdateres løbende.
        </p>
      </div>
    </div>
  );
}
