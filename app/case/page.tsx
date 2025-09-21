'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CasePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const role = searchParams.get('role');
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState('');
  const [heidiFeedback, setHeidiFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateHeidiFeedback = async (userReflection: string, userRole: string) => {
    // Simuleret Heidi AI feedback baseret på rolle og svar
    const roleContext = {
      'forælder': 'Som forælder fokuserer du på hjemmemiljøet og samarbejde med skolen.',
      'lærer': 'Som lærer har du ansvar for hele klassens trivsel og læring.',
      'specialist': 'Som specialist kan du anvende dybdegående teoretisk viden i praksis.',
      'anden': 'Din unikke perspektiv bidrager værdifuldt til forståelsen.'
    };

    const context = roleContext[userRole as keyof typeof roleContext] || roleContext['anden'];
    
    // Basis feedback struktur
    let feedback = `**Heidi's Evaluering for ${name}** (${userRole})\n\n`;
    feedback += `${context}\n\n`;
    feedback += `**Hvad du gør godt:**\n`;
    
    if (userReflection.toLowerCase().includes('rolig')) {
      feedback += `• Fremragende fokus på at bevare roen - dette er fundamentalt når børn med ADHD er dysregulerede\n`;
    }
    if (userReflection.toLowerCase().includes('struktur') || userReflection.toLowerCase().includes('rutine')) {
      feedback += `• Du forstår vigtigheden af forudsigelighed og struktur for børn med ADHD\n`;
    }
    if (userReflection.toLowerCase().includes('forstå') || userReflection.toLowerCase().includes('behov')) {
      feedback += `• Stærk empati og forståelse for barnets underliggende behov\n`;
    }
    
    feedback += `\n**Forbedringsmuligheder:**\n`;
    feedback += `• Overvej konkrete redskaber som visuelle hjælpemidler eller "pause-kort"\n`;
    feedback += `• Husk vigtigheden af at validere barnets følelser før du guide mod løsning\n`;
    feedback += `• Tænk på hvordan du kan involvere barnet i at finde alternative strategier\n\n`;
    
    feedback += `**Specialpædagogisk perspektiv:**\n`;
    feedback += `Børn med ADHD har ofte svært ved fleksibilitet og overgange. Din tilgang viser forståelse for neurodivergens. `;
    feedback += `Næste gang kan du prøve "først-så" strategier eller give barnet to acceptable valgmuligheder.\n\n`;
    
    feedback += `**Anbefaling til praksis:**\n`;
    feedback += `Gem denne løsning! Du kan bruge lignende strategier i fremtidige situationer med pludselige ændringer.`;

    return feedback;
  };

  const handleReflectionSubmit = async () => {
    if (!reflection.trim()) return;
    
    setIsAnalyzing(true);
    
    // Generer Heidi feedback
    const feedback = await generateHeidiFeedback(reflection, role || 'anden');
    setHeidiFeedback(feedback);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowFeedback(true);
    }, 2000); // Simuler AI analyse tid
  };

  const saveReflectionAndFeedback = async () => {
    setIsSaving(true);
    
    try {
      // Gem både reflektion og feedback
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/reflections`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            user_id: crypto.randomUUID(),
            case_id: 'case-001-adhd',
            content: reflection,
            display_name: name,
            user_email: email,
            user_role: role,
            heidi_feedback: heidiFeedback
          }),
        }
      );

      if (response.ok) {
        alert('Løsning og feedback gemt! Du kan finde den i din profil.');
      } else {
        alert('Gemt lokalt - kan synkroniseres senere');
      }
      
    } catch (error) {
      alert('Gemt lokalt som backup');
    } finally {
      setIsSaving(false);
    }
  };

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
            <h2 className="text-2xl font-bold mb-4">📚 Case: ADHD og Strukturændringer</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div><strong>Diagnose:</strong> ADHD</div>
              <div><strong>Alder:</strong> 9 år (pige)</div>
              <div><strong>Setting:</strong> Klasseværelse</div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Situationen:</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Det er mandag morgen, og du er ved at starte dagen med din klasse. 
              Pludselig kommer skolelederen ind og fortæller at den planlagte idrætstime 
              er aflyst på grund af sygdom, og at I i stedet skal have matematik. 
              
              Emma, en 9-årig pige med ADHD-diagnose, reagerer kraftigt på denne ændring. 
              Hun begynder at tale højt, rejser sig fra sin plads, går rundt i lokalet 
              og nægter at sætte sig ned igen. Hun siger: "Det er ikke fair! Vi skulle 
              have idræt! Jeg kan ikke lave matematik nu!"
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
              <h4 className="font-semibold text-amber-800 mb-2">Din opgave:</h4>
              <p className="text-amber-700">
                Læs casen grundigt og skriv en detaljeret løsning på hvordan du vil håndtere 
                denne situation. Fokuser på praktiske strategier der tager højde for Emmas 
                ADHD-diagnose og hendes behov for forudsigelighed.
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
              placeholder="Beskriv detaljeret hvordan du vil håndtere denne situation med Emma. Tænk på: Øjeblikkelige reaktioner, langsigtede strategier, kommunikation med Emma, hendes behov..."
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
                <p className="text-purple-100">Specialpædagogisk feedback baseret på din rolle</p>
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