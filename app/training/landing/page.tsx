'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleGoToPlatform = () => {
    window.location.href = 'https://cdt-platform.vercel.app';
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">CDT Training</h1>
      <p className="mb-6 text-gray-600">
        Du er landet på CDT's træningsmiljø. For adgang skal du starte fra platformen.
      </p>
      <Button onClick={handleGoToPlatform}>
        Gå til platformen
      </Button>
    </div>
  );
}