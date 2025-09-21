'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const role = searchParams.get('role');
  const type = searchParams.get('type');

  // Hvis brugerdata findes, gå direkte til training
  if (name && type) {
    router.push(`/training?name=${name}&email=${email}&role=${role}&type=${type}`);
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
            CDT Training Platform
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Danmarks mest avancerede træningsplatform for specialpædagogik. 
            Hvor AI møder praksis i arbejdet med børn med særlige behov.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-blue-500 rounded-xl mb-6"></div>
            <h3 className="text-2xl font-bold mb-4">Dynamiske Cases</h3>
            <p className="text-blue-100">
              Arbejd med realistiske situationer fra skole og hjem. 
              Hver case tilpasser sig din rolle og erfaring.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-green-500 rounded-xl mb-6"></div>
            <h3 className="text-2xl font-bold mb-4">Intelligente Quizzer</h3>
            <p className="text-blue-100">
              Test din viden med spørgsmål der udvikler sig baseret på dine svar. 
              Få personaliseret feedback til din praksis.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="w-12 h-12 bg-purple-500 rounded-xl mb-6"></div>
            <h3 className="text-2xl font-bold mb-4">Rollespil Træning</h3>
            <p className="text-blue-100">
              Øv kommunikation og se hvordan børn reagerer på forskellige tilgange. 
              Oplev konsekvenser af dine valg.
            </p>
          </div>
        </div>

        {/* Access Notice */}
        <div className="text-center bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold mb-4">Adgang via CDT Platform</h2>
          <p className="text-lg text-blue-100 mb-6">
            Denne træningsplatform er tilgængelig gennem vores hovedplatform, 
            hvor du registrerer dig og får personaliseret adgang baseret på din rolle.
          </p>
          <button
            onClick={() => window.location.href = 'https://cdt-platform.vercel.app'}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-2xl"
          >
            Gå til CDT Platform
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-blue-200">
          <p>CDT Training Platform • AI-Powered Specialpædagogik • Powered by 8500+ timers forskning</p>
        </div>
      </div>
    </div>
  );
}