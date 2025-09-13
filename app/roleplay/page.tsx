'use client';

import { useSearchParams } from 'next/navigation';

export default function RoleplayPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 max-w-2xl w-full space-y-6 text-gray-900">
        <h1 className="text-3xl font-bold text-center">🎮 Rollespil</h1>
        <p className="text-lg text-center">
          Velkommen {name || 'bruger'} – her vil du snart kunne træne kommunikation gennem realistiske scenarier.
        </p>

        <div className="bg-purple-100 p-6 rounded-xl space-y-4 text-gray-800">
          <p>🔄 Systemet vil spille et barn eller en kollega, og du svarer med det sprog, du ville bruge i virkeligheden.</p>
          <p>🧠 Du får feedback på:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Effektivt sprog</li>
            <li>Problematiske signaler</li>
            <li>Barnets oplevelse (reverse-perspektiv)</li>
          </ul>
        </div>

        <p className="text-center text-gray-500">🎯 Funktionalitet er under opbygning – men du er med fra starten.</p>
      </div>
    </div>
  );
}
