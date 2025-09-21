'use client';

import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabaseClient';

export default function TrainingPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Training Dashboard</h1>
      <p className="mb-6 text-gray-600">
        Velkommen til træningsområdet.
      </p>
    </div>
  );
}