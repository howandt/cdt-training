'use client'

import { useRouter } from 'next/navigation'
import { roles } from '@/constants/roles'
import { informationDepth } from '@/constants/informationDepth'
import { useUser } from '@/contexts/UserContext'
import { ChevronRight } from 'lucide-react'

export default function OnboardingPage() {
  const router = useRouter()
  const { user: profile, setUser: setProfile } = useUser()


  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    role: '',
    language: '',
    informationDepth: '',
    completed: false,
    casesCompleted: 0,
  })

  const handleNext = () => {
    if (step === 2) {
      // Gør onboarding færdig og send videre til case-træning
      setProfile((prev) => ({ ...prev, completed: true }))
      router.push('/case-training')
    } else {
      setStep(step + 1)
    }
  }

  const handleSelect = (field: keyof UserProfile, value: string) => {
    const updated = { ...profile, [field]: value };

    // Automatisk sprog baseret på rolle
    if (field === 'role') {
      updated.language = {
        parent: 'everyday',
        teacher: 'professional',
        professional: 'everyday',
        specialist: 'clinical',
      }[value] || 'everyday'
    }

    setProfile(updated)
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

        {/* Næste-knap */}
        <div className="mt-6 text-right">
  <button
    onClick={handleNext}
    disabled={
      (step === 0 && !profile.name.trim()) ||
      (step === 1 && !profile.role) ||
      (step === 2 && !profile.informationDepth)
    }
    className="inline-flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Næste
    <ChevronRight className="ml-2 w-5 h-5" />
  </button>
</div>
