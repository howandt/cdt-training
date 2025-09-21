'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function CasePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function saveReflection() {
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('reflections')
        .insert([
          {
            user_id: name || 'anonym',
            case_id: 'case-001',
            content: reflection,
          },
        ]);

      if (error) {
        console.error('Supabase fejl:', error.message);
        alert('Kunne ikke gemme. Prøv igen.');
      } else {
        alert('Refleksion gemt!');
        setReflection('');
        setShowReflection(false);
      }
    } catch (error) {
      console.error('Fejl ved gemning:', error);
      alert('Der opstod en fejl. Prøv igen.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 max-w-3xl w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Case-træning</h1>
          <p className="text-gray-800 text-lg">
            Velkommen {name || 'gæst'} – her er din første case.
          </p>
        </div>

        <div className="bg-orange-100 p-4 rounded-xl space-y-2 text-gray-900">
          <p><strong>Diagnose:</strong> ADHD</p>
          <p><strong>Niveau:</strong> Let</p>
          <p><strong>Tema:</strong> Struktur</p>
        </div>

        <div className="space-y-4 text-gray-900">
          <p><strong>Baggrund:</strong> Pige, 9 år, med ADHD-diagnose. Hun har svært ved at følge morgenrutinerne i skolen og bliver ofte urolig og udadreagerende, hvis der sker ændringer.</p>
          <p><strong>Pædagogisk mål:</strong> Hjælpe hende med at følge faste rutiner og skabe forudsigelighed.</p>
          <p><strong>Case:</strong> Det er mandag morgen, og læreren ændrer planen i døren pga. sygdom. Pigen begynder at tale højt, går rundt i klassen og nægter at sætte sig. <br /> <strong>Hvad gør du?</strong></p>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-xl space-y-2 text-gray-900">
          <p className="font-semibold">Refleksionsspørgsmål:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Hvad er barnets behov i denne situation?</li>
            <li>Hvad kunne være en rolig og anerkendende reaktion?</li>
            <li>Hvilke redskaber kan skabe tryghed her?</li>
          </ul>
        </div>

        {!showReflection ? (
          <div className="text-right">
            <button
              onClick={() => setShowReflection(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm"
            >
              Start refleksion
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Skriv dine refleksioner her..."
              className="w-full p-4 border border-gray-300 rounded-lg min-h-[120px] text-gray-900"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setReflection('');
                  setShowReflection(false);
                }}
                className="text-gray-600 hover:underline"
              >
                Annuller
              </button>

              <button
                onClick={saveReflection}
                disabled={reflection.trim().length === 0 || isSaving}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
              >
                {isSaving ? 'Gemmer...' : 'Gem refleksion'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}