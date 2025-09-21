'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function TrainingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get('name') || 'Bruger';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Velkommen {name}!</h1>
      <p className="mb-8 text-gray-600">Vælg et træningsområde for at komme i gang:</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <button 
          onClick={() => router.push('/case')}
          className="p-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <h3 className="text-xl font-bold mb-2">Cases</h3>
          <p className="text-sm opacity-90">Konkrete situationer med feedback</p>
        </button>
        
        <button 
          onClick={() => router.push('/quiz')}
          className="p-6 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
        >
          <h3 className="text-xl font-bold mb-2">Quiz</h3>
          <p className="text-sm opacity-90">Test din viden interaktivt</p>
        </button>
        
        <button 
          onClick={() => router.push('/roleplay')}
          className="p-6 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
        >
          <h3 className="text-xl font-bold mb-2">Rollespil</h3>
          <p className="text-sm opacity-90">Øv kommunikation og se reaktioner</p>
        </button>
        
        <button 
          onClick={() => router.push('/template')}
          className="p-6 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors"
        >
          <h3 className="text-xl font-bold mb-2">Templates</h3>
          <p className="text-sm opacity-90">Praktiske skabeloner</p>
        </button>
        
        <button 
          onClick={() => router.push('/comorbidity')}
          className="p-6 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
        >
          <h3 className="text-xl font-bold mb-2">Komorbiditet</h3>
          <p className="text-sm opacity-90">Sammenhænge mellem diagnoser</p>
        </button>
        
        <button 
         onClick={() => router.push(`/case?name=${name}&email=${searchParams.get('email')}&role=${searchParams.get('role')}&type=${type}`)}
         className="p-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <h3 className="text-xl font-bold mb-2">Diagnoser</h3>
          <p className="text-sm opacity-90">Dybdegående viden</p>
        </button>
      </div>
    </div>
  );
}