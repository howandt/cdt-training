'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { roles } from '@/constants/roles';
import { informationDepth } from '@/constants/informationDepth';
import { ChevronRight } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { UserProfile } from '@/types';

export default function OnboardingPage() {
  const router = useRouter();
  const { user: profile, setUser: setProfile } = useUser();
  const [step, setStep] = useState(0);

  const handleSelect = (field: keyof UserProfile, value: string) => {
    const updated = { ...profile, [field]: value };

    if (field === 'role') {
      updated.language = {
        parent: 'everyday',
        teacher: 'professional',
        professional: 'everyday',
        specialist: 'clinical',
      }[value] || 'everyday';
    }

    setProfile(updated);
  };

  const handleNext = () => {
    if (step === 2) {
      setProfile({ ...profile, completed: true });
      router.push('/case-training');
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl p-6 sm:p-10 w-full max-w-xl">
        {step === 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Hvad skal jeg kalde dig?</h2>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleSelect('name', e.target.value)}
              placeholder="Skriv dit navn"
              className="w-full p-4 border border-gray-300 rounded-lg"
            />
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Vælg din rolle</h2>
            <div className="space-y-3">
              {roles.map((role) => (
                <button
                  key={role.value}
                  onClick={() => handleSelect('role', role.value)}
                  className={`w-full text-left p-4 border rounded-lg ${
                    profile.role === role.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  <div className="font-semibold">{role.label}</div>
                  <div className="text-sm text-gray-600">{role.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Hvordan vil du have information?</h2>
            <div className="space-y-3">
              {informationDepth.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect('informationDepth', option.value)}
                  className={`w-full text-left p-4 border rounded-lg ${
                    profile.informationDepth === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={handleNext}
            disabled={
              (step === 0 && !profile.name) ||
              (step === 1 && !profile.role) ||
              (step === 2 && !profile.informationDepth)
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {step === 2 ? 'Start træning' : 'Næste'}
            <ChevronRight className="inline-block ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}


