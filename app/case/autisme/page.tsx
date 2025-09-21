'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AutismePage() {
  const [reflection, setReflection] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('autisme_reflection', reflection);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleCancel = () => {
    setReflection('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/training/cases" 
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Tilbage til Cases
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Case: Autisme Spektrum Forstyrrelser
          </h1>
          <p className="text-gray-600">
            Læs casen igennem og reflekter over de diagnostiske overvejelser
          </p>
        </div>

        {/* Case Content */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="space-y-8">
            
            {/* Baggrund */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Baggrund</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  <strong>Navn:</strong> Marcus, 8 år<br/>
                  <strong>Henvisning:</strong> Forældre og skole bekymrede for sociale vanskeligheder og usædvanlig adfærd
                </p>
                <p>
                  Marcus' forældre har gennem det sidste år været bekymrede for hans udvikling. 
                  Han har altid været "anderledes" end andre børn, men bekymringerne er øget siden skolestart.
                </p>
              </div>
            </section>

            {/* Observationer */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Observationer fra hjem</h2>
              <div className="prose text-gray-700 space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Intens fascination af tog - kender alle togtyper og køretider</li>
                  <li>Bliver meget urolig ved ændringer i rutiner</li>
                  <li>Vanskeligheder med øjenkontakt, især med fremmede</li>
                  <li>Gentager ofte fraser fra TV-programmer</li>
                  <li>Bliver overvældet af støjende miljøer som supermarkeder</li>
                  <li>Leger sjældent med andre børn - foretrækker at være alene</li>
                  <li>Meget følsom over for teksturer i tøj og mad</li>
                </ul>
              </div>
            </section>

            {/* Skole observationer */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Observationer fra skole</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  Lærer rapporterer at Marcus er meget intelligent og har stærke faglige færdigheder, 
                  især i matematik og læsning. Dog observeres følgende udfordringer:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Isolerer sig i frikvartererne - sidder ofte alene</li>
                  <li>Reagerer kraftigt på uventede lydstimuli (brand alarm øvelse)</li>
                  <li>Har svært ved gruppearbejde og skifter opgaver</li>
                  <li>Forstår ikke ironiske bemærkninger eller vittigheder</li>
                  <li>Bliver frustreret når andre børn ikke følger "reglerne"</li>
                  <li>Viser repetitive bevægelser når han er koncentreret (vipper med kroppen)</li>
                </ul>
              </div>
            </section>

            {/* Udvikling */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tidlig udvikling</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  Forældrene fortæller at Marcus som spæd var "nem" - græd sjældent og sov godt. 
                  Sprogudviklingen var normal, men han talte ofte i "boglærde" vendinger selv som 3-årig.
                </p>
                <p>
                  Som 2-årig havde han intense interesser der skiftede (først dinosaurer, så fly, nu tog). 
                  Han kunne huske utrolige detaljer om sine interesser, men havde svært ved almindelig "small talk".
                </p>
              </div>
            </section>

            {/* Diagnostiske overvejelser */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Diagnostiske overvejelser</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  Marcus viser et mønster af vanskeligheder der peger mod autisme spektrum forstyrrelser:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Sociale kommunikationsvanskeligheder:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Begrænset øjenkontakt</li>
                      <li>• Vanskeligheder med at forstå social kontekst</li>
                      <li>• Udfordringer i peer-relationer</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Repetitive mønstre:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Intense, begrænsede interesser</li>
                      <li>• Rutine-afhængighed</li>
                      <li>• Sensoriske sensitiviteter</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Intervention */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Interventionsovervejelser</h2>
              <div className="prose text-gray-700 space-y-4">
                <p>
                  En multidisciplinær tilgang vil være hensigtsmæssig:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Social færdighedstræning i små grupper</li>
                  <li>Sensorisk integration terapi</li>
                  <li>Strukturerede rutiner og visuel støtte</li>
                  <li>Tæt samarbejde mellem hjem og skole</li>
                  <li>Fokus på Marcus' styrker og interesser</li>
                </ul>
              </div>
            </section>

          </div>
        </div>

        {/* Reflection Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Dine refleksioner</h2>
          <p className="text-gray-600 mb-4">
            Reflekter over casen og noter dine overvejelser om diagnose, intervention og samarbejde med familien.
          </p>
          
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Skriv dine refleksioner her..."
          />
          
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {isSaved ? 'Gemt!' : 'Gem refleksioner'}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Annuller
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link 
            href="/training/cases"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Tilbage til Cases
          </Link>
          <Link 
            href="/training/quiz"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Tag Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}