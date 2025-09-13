'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function TrainingPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 w-full max-w-3xl text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Velkommen {name || 'bruger'} 👋
        </h1>
        <p className="text-gray-600 text-lg">
          Hvad vil du træne i dag?
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-white font-semibold">
          <Link
            href={`/case?name=${encodeURIComponent(name || '')}`}
            className="bg-blue-500 hover:bg-blue-600 p-5 rounded-2xl transition-colors flex items-center justify-center"
          >
            🎭 Case
          </Link>

          <Link
            href={`/roleplay?name=${encodeURIComponent(name || '')}`}
            className="bg-purple-500 hover:bg-purple-600 p-5 rounded-2xl transition-colors flex items-center justify-center"
          >
            🎮 Rollespil
          </Link>

          <Link
            href={`/quiz?name=${encodeURIComponent(name || '')}`}
            className="bg-green-500 hover:bg-green-600 p-5 rounded-2xl transition-colors flex items-center justify-center"
          >
            🧠 Quiz
          </Link>

          <Link
            href={`/template?name=${encodeURIComponent(name || '')}`}
            className="bg-yellow-500 hover:bg-yellow-600 p-5 rounded-2xl transition-colors flex items-center justify-center"
          >
            🧰 Template
          </Link>

          <Link
            href={`/comorbidity?name=${encodeURIComponent(name || '')}`}
            className="bg-pink-500 hover:bg-pink-600 p-5 rounded-2xl transition-colors flex items-center justify-center"
          >
            🧬 Komorbiditet
          </Link>

          <Link
            href={`/diagnosis?name=${encodeURIComponent(name || '')}`}
            className="bg-gray-700 hover:bg-gray-800 p-5 rounded-2xl transition-colors flex items-center justify-center"
          >
            📖 Diagnoser
          </Link>
        </div>
      </div>
    </div>
  );
}
