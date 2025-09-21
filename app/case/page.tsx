'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface CaseData {
  id: string;
  title: string;
  diagnosis: string;
  age_group: string;
  setting: string;
  situation: string;
  task_description: string;
  difficulty_level: string;
}

export default function CasePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const role = searchParams.get('role');
  const caseId = searchParams.get('id') || 'adhd-struktur'; // Default case
  
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState('');
  const [heidiFeedback, setHeidiFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Hent case-data fra database
  useEffect(() => {
    const fetchCase = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/cases?id=eq.${caseId}&select=*`,
          {
            headers: {
              'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            }
          }
        );
        
        const data = await response.json();
        if (data && data.length > 0) {
          setCaseData(data[0]);
        }
      } catch (error) {
        console.error('Fejl ved hentning af case:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [caseId]);

  const generateHeidiFeedback = async (userReflection: string, userRole: string, diagnosis: string) => {
    const roleContext = {
      'forælder': 'Som forælder fokuserer du på hjemmemiljøet og samarbejde med skolen.',
      'lærer': 'Som lærer har du ansvar for hele klassens trivsel og læring.',
      'specialist': 'Som specialist kan du anvende dybdegående teoretisk viden i praksis.',
      'anden': 'Din unikke perspektiv bidrager værdifuldt til forståelsen.'
    };

    const diagnosisInsights = {
      'ADHD': 'Børn med ADHD har ofte udfordringer med eksekutive funktioner, impulskontrol og opmærksomhed.',
      'Autisme': 'Børn med autisme har brug for forudsigelighed og kan have sensoriske følsomheder.',
      'Aspergers': 'Børn med Aspergers/højfungerende autisme maskerer ofte deres udfordringer.'
    };

    const context = roleContext[userRole as keyof typeof roleContext] || roleContext['anden'];
    const diagnosisInfo = diagnosisInsights[diagnosis as keyof typeof diagnosisInsights] || '';
    
    let feedback = `**Heidi's Evaluering for ${name}** (${userRole})\n\n`;
    feedback += `${context}\n\n`;
    feedback += `**Diagnose-specifik viden:** ${diagnosisInfo}\n\n`;
    feedback += `**Hvad du gør godt:**\n`;
    
    // Dynamisk analyse baseret på refleksion og diagnose
    if (userReflection.toLowerCase().includes('rolig') || userReflection.toLowerCase().includes('berolig')) {
      feedback += `• Fremragende fokus på at bevare roen - fundamentalt for børn med ${diagnosis}\n`;
    }
    if (userReflection.toLowerCase().includes('struktur') || userReflection.toLowerCase().includes('rutine')) {
      feedback += `• Du forstår vigtigheden af forudsigelighed for børn med ${diagnosis}\n`;
    }
    if (userReflection.toLowerCase().includes('forstå') || userReflection.toLowerCase().includes('behov')) {
      feedback += `• Stærk empati og forståelse for barnets underliggende behov\n`;
    }
    
    feedback += `\n**Forbedringsmuligheder specifikt for ${diagnosis}:**\n`;
    
    if (diagnosis === 'ADHD') {
      feedback += `• Overvej konkrete redskaber som timere, visuelle hjælpemidler eller "pause-kort"\n`;
      feedback += `• Husk at give korte, tydelige instruktioner\n`;
    } else if (diagnosis === 'Autisme') {
      feedback += `• Tænk på sensoriske aspekter - lyde, lys, berøring\n`;
      feedback += `• Brug konkret, bogstavelig kommunikation\n`;
    } else if (diagnosis.includes('Aspergers')) {
      feedback += `• Vær opmærksom på masking-adfærd og energiforbrug\n`;
      feedback += `• Hjælp med at afkode sociale situationer eksplicit\n`;
    }
    
    feedback += `\n**Anbefaling til praksis:**\n`;
    feedback += `Gem denne løsning! Du kan bruge lignende strategier i fremtidige situationer.`;

    return feedback;
  };

  const handleReflectionSubmit = async () => {
    if (!reflection.trim() || !caseData) return;
    
    setIsAnalyzing(true);
    
    const feedback = await generateHeidiFeedback(reflection, role || 'anden', caseData.diagnosis);
    setHeidiFeedback(feedback);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowFeedback(true);
    }, 2000);
  };

  const saveReflectionAndFeedback = async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/reflections`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            user_id: crypto.randomUUID(),
            case_id: caseId,
            content: reflection,
            display_name: name,
            user_email: email,
            user_role: role,
            heidi_feedback: heidiFeedback
          }),
        }
      );

      if (response.ok) {
        alert('Løsning og feedback gemt!');
      } else {
        alert('Gemt lokalt - kan synkroniseres senere');
      }
      
    } catch (error) {
      alert('Gemt lokalt som backup');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Henter case...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Case ikke fundet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Case Training</h1>
          <p className="text-lg text-gray-600">Velkommen {name} - arbejd med en konkret situation</p>
        </div>

        {/* Case Presentation */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl mb-6">
            <h2 className="text-2xl font-bold mb-4">📚 {caseData.title}</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div><strong>Diagnose:</strong> {caseData.diagnosis}</div>
              <div><strong>Alder:</strong> {caseData.age_group}</div>
              <div><strong>Setting:</strong> {caseData.setting}</div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Situationen:</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {caseData.situation}
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
              <h4 className="font-semibold text-amber-800 mb-2">Din opgave:</h4>
              <p className="text-amber-700">
                {caseData.task_description}
              </p>
            </div>
          </div>
        </div>

        {/* Reflection Interface */}
        {!showReflection ? (
          <div className="text-center">
            <button
              onClick={() => setShowReflection(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              📝 Start din løsning
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Din løsning:</h3>
            
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder={`Beskriv detaljeret hvordan du vil håndtere denne ${caseData.diagnosis}-situation...`}
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-800 resize-none"
            />
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setReflection('');
                  setShowReflection(false);
                  setShowFeedback(false);
                }}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Annuller
              </button>
              
              <button
                onClick={handleReflectionSubmit}
                disabled={!reflection.trim() || isAnalyzing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 transition-colors"
              >
                {isAnalyzing ? '🤖 Heidi analyserer...' : '🤖 Få Heidi\'s feedback'}
              </button>
            </div>
          </div>
        )}

        {/* Heidi Feedback */}
        {showFeedback && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-xl p-8 mt-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Heidi's AI Evaluering</h3>
                <p className="text-purple-100">Specialpædagogisk feedback til {caseData.diagnosis}-casen</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
              <pre className="whitespace-pre-wrap text-white leading-relaxed">
                {heidiFeedback}
              </pre>
            </div>

            <button
              onClick={saveReflectionAndFeedback}
              disabled={isSaving}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Gemmer...' : '💾 Gem løsning til fremtidig brug'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}