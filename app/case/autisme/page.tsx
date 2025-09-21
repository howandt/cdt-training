'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AutismePage() {
  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('autisme_reflection', reflection);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleCancel = () => {
    setReflection('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="mb-8">
          <Link 
            href="/case" 
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Tilbage til Cases
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="space-y-6">
            
            <h1 className="text-2xl font-bold text-gray-900 mb-6">🎭 Case-træning</h1>
            <p className="text-gray-600 mb-6">Velkommen gæst – her er din anden case.</p>

            <div className="space-y-4">
              <p><strong>🧠 Diagnose:</strong> Autisme</p>
              <p><strong>🎯 Niveau:</strong> Let</p>
              <p><strong>📂 Tema:</strong> Sociale situationer</p>
              <p><strong>📌 Baggrund:</strong> Dreng, 8 år, med autisme-diagnose. Han har intense interesser og bliver meget urolig ved sociale krav. Foretrækker at være alene og har svært ved øjenkontakt.</p>
              <p><strong>🎯 Pædagogisk mål:</strong> Hjælpe ham med at navigere i sociale situationer uden at blive overvældet.</p>
            </div>

            <div className="border-t pt-6">
              <p><strong>🧠 Case:</strong> Det er frikvarter, og børnene skal ud på legepladsen. Drengen sidder i hjørnet med sine togbøger og nægter at gå med ud. Når du nærmer dig, vender han ryggen til og dækker ørerne. <strong>Hvad gør du?</strong></p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">🧩 Refleksionsspørgsmål:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hvad signalerer barnets kropssprog i denne situation?</li>
                <li>Hvordan kan du respektere hans behov og samtidig støtte hans udvikling?</li>
                <li>Hvilke alternative tilgange kunne fungere bedre?</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Reflection Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Skriv dine refleksioner her..."
          />
          
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Annuller
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {isSaved ? 'Gemt!' : 'Gem refleksion'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/case"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Tilbage til Cases
          </Link>
          <Link 
            href="/quiz"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Tag Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}