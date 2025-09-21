'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleGoToTraining = () => {
    router.push('/training');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Velkommen til CDT Training</h1>
      <p className="mb-6 text-gray-600">
        Du er nu klar til at udforske CDT's træningsmoduler. Her kan du arbejde med cases, 
        teste din viden og øve kommunikation.
      </p>
      <Button onClick={handleGoToTraining}>
        Kom igang
      </Button>
    </div>
  );
}