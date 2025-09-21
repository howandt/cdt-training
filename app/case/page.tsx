'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CasePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const role = searchParams.get('role');
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const saveReflection = async () => {
    if (!reflection.trim()) return;
    
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Found' : 'Missing');
    
    setIsSaving(true);
    
    try {
      localStorage.setItem('reflection_' + Date.now(), JSON.stringify({
        user_id: name || 'anonym',
        email: email,
        role: role,
        case: 'case-001',
        content: reflection,
        timestamp: new Date().toISOString()
      }));

      alert('Debug: Tjek browser console for miljøvariabler');
      setReflection('');
      setShowReflection(false);
    } catch (error) {
      console.error('Fejl:', error);
      alert('Gemt lokalt som backup');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Case: ADHD struktur</h1>
      <p className="mb-6 text-gray-600">
        Velkommen {name || 'Bruger'}! Pige, 9 år, med ADHD-diagnose. 
        Læreren ændrer planen i døren pga. sygdom. 
        Pigen begynder at tale højt og nægter at sætte sig. Hvad gør du?
      </p>

      {!showReflection ? (
        <button
          onClick={() => setShowReflection(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Start refleksion
        </button>
      ) : (
        <div className="space-y-4">
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Skriv dine refleksioner her..."
            className="w-full p-4 border border-gray-300 rounded-lg min-h-[120px]"
          />
          <div className="flex gap-2">
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
              disabled={!reflection.trim() || isSaving}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {isSaving ? 'Gemmer...' : 'Gem refleksion'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}