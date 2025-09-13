'use client';

import { useSearchParams } from 'next/navigation';

export default function ComorbidityPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 max-w-2xl w-full space-y-6 text-gray-900">
        <h1 className="text-3xl font-bold text-center">🧬 Komorbiditet</h1>
        <p className="text-lg text-center">
          Hej {name || 'bruger'} – her kan du snart udforske sammenhænge mellem diagnoser.
        </p>
        <p className="text-center text-gray-500">
          Vi visualiserer overlap mellem fx ADHD, angst og autisme.
        </p>
      </div>
    </div>
  );
}
