// 📂 Fil: app/training/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabaseClient';

export default function TrainingPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    const validateAccess = async () => {
      if (!user) {
        router.replace('/platform?error=unauthenticated');
        return;
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .select('plan_type')
        .eq('id', user.id)
        .single();

      if (error || !data || data.plan_type !== 'pro') {
        router.replace('/platform?error=unauthorized');
      } else {
        setAuthorized(true);
        router.replace('/training/landing');
      }
    };

    validateAccess();
  }, [user, loading, router]);

  return null;
}
