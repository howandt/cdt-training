'use client';

import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">CDT Training Landing</h1>
      <p className="mb-6 text-gray-600">
        Du er landet på CDT's træningsmiljø.
      </p>
      <Button>Gå til platformen</Button>
    </div>
  );
}