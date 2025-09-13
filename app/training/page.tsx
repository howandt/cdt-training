'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function TrainingPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-3xl space-y-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          {name ? `Hej ${name} 👋` : 'Velkommen'}
        </h1>
        <p className="text-lg text-gray-700">Hvordan vil du gerne træne i dag?</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-white font-semibold">
      <Link
    href={`/case?name=${encodeURIComponent(name || '')}`}
    className="bg-blue-500 hover:bg-blue-600 p-5 rounded-2xl transition-colors text-white font-semibold flex items-center justify-center"
  >
    🎭 Case
  </Link>
          <button className="bg-green-500 hover:bg-green-600 p-5 rounded-2xl transition-colors">
            🎮 Rollespil
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 p-5 rounded-2xl transition-colors">
            🧠 Quiz
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 p-5 rounded-2xl transition-colors">
            📄 Template
          </button>
          <button className="bg-gray-700 hover:bg-gray-800 p-5 rounded-2xl transition-colors col-span-2 md:col-span-1">
            🔗 Matrix
          </button>
        </div>
      </div>
    </div>
  );
}
