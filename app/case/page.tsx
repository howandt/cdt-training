'use client';

import { useSearchParams } from 'next/navigation';

export default function CasePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 max-w-3xl w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">🎭 Case-træning</h1>
          <p className="text-gray-800 text-lg">
            Velkommen {name || 'gæst'} – her er din første case.
          </p>
        </div>

        <div className="bg-orange-100 p-4 rounded-xl space-y-2 text-gray-900">
          <p><strong>🧠 Diagnose:</strong> ADHD</p>
          <p><strong>🎯 Niveau:</strong> Let</p>
          <p><strong>📂 Tema:</strong> Struktur</p>
        </div>

        <div className="space-y-4 text-gray-900">
          <p><strong>📌 Baggrund:</strong> Pige, 9 år, med ADHD-diagnose. Hun har svært ved at følge morgenrutinerne i skolen og bliver ofte urolig og udadreagerende, hvis der sker ændringer.</p>

          <p><strong>🎯 Pædagogisk mål:</strong> Hjælpe hende med at følge faste rutiner og skabe forudsigelighed.</p>

          <p><strong>🧠 Case:</strong> Det er mandag morgen, og læreren ændrer planen i døren pga. sygdom. Pigen begynder at tale højt, går rundt i klassen og nægter at sætte sig. <br /> <strong>Hvad gør du?</strong></p>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-xl space-y-2 text-gray-900">
          <p className="font-semibold">🧩 Refleksionsspørgsmål:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Hvad er barnets behov i denne situation?</li>
            <li>Hvad kunne være en rolig og anerkendende reaktion?</li>
            <li>Hvilke redskaber kan skabe tryghed her?</li>
          </ul>
        </div>

        <div className="text-right">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm">
            ➕ Start refleksion
          </button>
        </div>
      </div>
    </div>
  );
}
