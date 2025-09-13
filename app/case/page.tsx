'use client';

import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser as useClerkUser } from '@clerk/nextjs';

export default function CasePage() {
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState('');
  const supabase = useSupabaseClient();
  const { user } = useClerkUser();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Case: Louise</h1>

      <p className="mb-6 text-gray-800">
        Louise er 9 år og har netop fået diagnosen autisme. Hun er begyndt i en almenklasse med støtte,
        men oplever udfordringer i overgangen mellem timer og frikvarter. Du er lærer i klassen.
      </p>

      {!showReflection ? (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowReflection(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ➕ Start refleksion
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Skriv dine refleksioner her..."
            className="w-full p-4 border border-gray-300 rounded-lg min-h-[120px]"
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
              onClick={async () => {
                await saveReflection({
                  supabase,
                  userId: user?.id,
                  caseId: 'case-001',
                  content: reflection,
                });
                setShowReflection(false);
              }}
              disabled={reflection.trim().length === 0}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
            >
              Gem refleksion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Gem refleksion i Supabase
async function saveReflection({
  supabase,
  userId,
  caseId,
  content,
}: {
  supabase: any;
  userId: string;
  caseId: string;
  content: string;
}) {
  const { error } = await supabase.from('reflections').insert([
    {
      user_id: userId,
      case_id: caseId,
      content,
    },
  ]);

  if (error) {
    console.error('Kunne ikke gemme refleksion:', error.message);
    alert('Noget gik galt – prøv igen.');
  } else {
    alert('Refleksion gemt ✅');
  }
}
