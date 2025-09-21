'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function TrainingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get('name') || 'Bruger';
  const email = searchParams.get('email') || '';
  const role = searchParams.get('role') || '';
  const type = searchParams.get('type') || 'test';

  const navigateToCase = (caseId: string) => {
    router.push(`/case?id=${caseId}&name=${name}&email=${email}&role=${role}&type=${type}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Velkommen {name}!</h1>
      <p className="mb-8 text-gray-600">Vælg et træningsområde for at komme i gang:</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {/* Cases Dropdown */}
        <div className="relative group">
          <button className="w-full p-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <h3 className="text-xl font-bold mb-2">Cases</h3>
            <p className="text-sm opacity-90">Konkrete situationer med feedback</p>
          </button>
          
          {/* Dropdown menu */}
          <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 mt-2">
            <button
              onClick={() => navigateToCase('5d3c41b8-728f-4cae-8a2e-a495f9552740')}
              className="w-full text-left p-4 hover:bg-blue-50 first:rounded-t-xl"
            >
              <div className="font-semibold text-blue-800">ADHD og Strukturændringer</div>
              <div className="text-sm text-gray-600">9-årig pige, klasseværelse</div>
            </button>
            <button
              onClick={() => navigateToCase('e0c88304-118c-433b-b3df-48e6307a816f')}
              className="w-full text-left p-4 hover:bg-blue-50 border-t border-gray-100"
            >
              <div className="font-semibold text-blue-800">Autisme og Sociale Udfordringer</div>
              <div className="text-sm text-gray-600">8-årig dreng, frikvarter</div>
            </button>
            <button
              onClick={() => navigateToCase('c1fbd3a4-d135-4cfa-af8b-4bf9524bb185')}
              className="w-full text-left p-4 hover:bg-blue-50 border-t border-gray-100 last:rounded-b-xl"
            >
              <div className="font-semibold text-blue-800">Højfungerende Autisme - Masking</div>
              <div className="text-sm text-gray-600">12-årig pige, efter skole</div>
            </button>
          </div>
        </div>
        
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
          onClick={() => router.push('/diagnosis')}
          className="p-6 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <h3 className="text-xl font-bold mb-2">Diagnoser</h3>
          <p className="text-sm opacity-90">Dybdegående viden</p>
        </button>
      </div>
    </div>
  );
}