'use client'
import { useState } from 'react'
import { ChevronRight, Heart, BookOpen, UserCheck, MessageCircle, History, Brain, FileText } from 'lucide-react'

const CDTOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [currentScreen, setCurrentScreen] = useState('onboarding')
  const [userProfile, setUserProfile] = useState({
    name: '',
    role: '',
    language: '',
    informationDepth: '',
    completed: false,
    casesCompleted: 0
  })
  
  const [userHistory, setUserHistory] = useState([])
  const [currentCase, setCurrentCase] = useState(null)
  
  const sampleCases = [
    {
      id: 1,
      title: "Barn med ADHD kan ikke arbejde i grupper",
      description: "Emma, 8 år, med ADHD har svært ved at koncentrere sig når hun skal arbejde i grupper. Hun bliver hurtigt distraheret og forstyrrer de andre børn.",
      category: "ADHD",
      difficulty: "Begynder"
    },
    {
      id: 2, 
      title: "Autistisk barn får meltdown ved skift",
      description: "Oliver, 10 år, med autisme får voldsomme reaktioner når dagens program ændres uventet. Han har brug for forudsigelighed.",
      category: "Autisme",
      difficulty: "Mellem"
    },
    {
      id: 3,
      title: "Barn med Aspergers isolerer sig socialt",
      description: "Sophie, 12 år, med Aspergers har svært ved at danne venskaber og trækker sig fra sociale aktiviteter i frikvartererne.",
      category: "Aspergers", 
      difficulty: "Avanceret"
    }
  ]

  const steps = [
    { title: "Velkommen", icon: Heart },
    { title: "Navn", icon: MessageCircle },
    { title: "Din rolle", icon: UserCheck },
    { title: "Information", icon: BookOpen }
  ]

  const roles = [
    { 
      value: 'teacher', 
      label: 'Lærer/Pædagog', 
      description: 'Jeg arbejder professionelt med børn i skole/institution' 
    },
    { 
      value: 'parent', 
      label: 'Forælder/Pårørende', 
      description: 'Jeg har et barn eller familiemedlem med særlige behov' 
    },
    { 
      value: 'professional', 
      label: 'Fagperson', 
      description: 'Jeg er frisør, massør, tandlæge eller anden fagperson der møder børn' 
    },
    { 
      value: 'specialist', 
      label: 'Specialist', 
      description: 'Jeg er psykolog, specialpædagog eller anden specialist inden for området' 
    }
  ]

  const informationDepth = [
    { value: 'brief', label: 'Kort og konkret', description: 'Giv mig de vigtigste pointer hurtigt' },
    { value: 'detailed', label: 'Uddybende forklaringer', description: 'Jeg vil gerne forstå baggrunden og detaljerne' }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setUserProfile(prev => ({...prev, completed: true}))
      setCurrentScreen('dashboard')
    }
  }

  const handleSelection = (field, value) => {
    const updatedProfile = {...userProfile, [field]: value}
    
    if (field === 'role') {
      switch(value) {
        case 'parent':
          updatedProfile.language = 'everyday'
          break
        case 'teacher':
          updatedProfile.language = 'professional'
          break
        case 'professional':
          updatedProfile.language = 'everyday'
          break
        case 'specialist':
          updatedProfile.language = 'clinical'
          break
        default:
          updatedProfile.language = 'everyday'
      }
    }
    
    setUserProfile(updatedProfile)
  }

  const startCase = (caseItem) => {
    setCurrentCase(caseItem)
    setCurrentScreen('case-evaluation')
  }

  const goToDashboard = () => {
    setCurrentScreen('dashboard')
    setCurrentCase(null)
  }

  const addToHistory = (caseResult) => {
    const historyItem = {
      id: Date.now(),
      case: currentCase,
      userSolution: caseResult.userSolution,
      feedback: caseResult.feedback,
      timestamp: new Date().toISOString(),
      score: caseResult.score
    }
    
    setUserHistory(prev => [historyItem, ...prev])
    setUserProfile(prev => ({
      ...prev,
      casesCompleted: prev.casesCompleted + 1
    }))
  }

  // Dashboard Component
  const Dashboard = () => {
    const recentHistory = userHistory.slice(0, 3)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Velkommen tilbage, {userProfile.name}!</h1>
                <p className="text-gray-600 mt-2">Jeg er Heidi, din CDT specialist. Hvad skal vi arbejde med i dag?</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Cases gennemført</div>
                <div className="text-2xl font-bold text-blue-600">{userProfile.casesCompleted}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Brain className="w-6 h-6 mr-2 text-blue-600" />
                  Nye Cases at øve på
                </h2>
                <div className="grid gap-4">
                  {sampleCases.map((caseItem) => (
                    <div key={caseItem.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-2">{caseItem.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{caseItem.description}</p>
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                              {caseItem.category}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                              {caseItem.difficulty}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => startCase(caseItem)}
                          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Start Case
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2 text-green-600" />
                  Din profil
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-500">Rolle:</span>
                    <div className="font-medium">{roles.find(r => r.value === userProfile.role)?.label}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Info-dybde:</span>
                    <div className="font-medium">{informationDepth.find(i => i.value === userProfile.informationDepth)?.label}</div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setUserProfile({name: '', role: '', language: '', informationDepth: '', completed: false, casesCompleted: 0})
                    setCurrentStep(0)
                    setCurrentScreen('onboarding')
                  }}
                  className="w-full mt-4 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Rediger profil
                </button>
              </div>

              {recentHistory.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                    <History className="w-5 h-5 mr-2 text-purple-600" />
                    Seneste aktivitet
                  </h3>
                  <div className="space-y-3">
                    {recentHistory.map((item) => (
                      <div key={item.id} className="border-l-4 border-blue-200 pl-3">
                        <div className="font-medium text-sm text-gray-800">{item.case.title}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(item.timestamp).toLocaleDateString('da-DK')}
                        </div>
                        <div className="text-xs text-green-600 font-medium">Score: {item.score}/100</div>
                      </div>
                    ))}
                  </div>
                  {userHistory.length > 3 && (
                    <button className="w-full mt-3 text-sm text-blue-600 hover:text-blue-800">
                      Se alle ({userHistory.length})
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Case Evaluation Component
  const CaseEvaluation = () => {
    const [step, setStep] = useState('reading')
    const [userSolution, setUserSolution] = useState('')
    const [feedback, setFeedback] = useState(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    const generateFeedback = () => {
      setIsAnalyzing(true)
      
      setTimeout(() => {
        const feedback = generateIntelligentFeedback(currentCase, userSolution, userProfile)
        setFeedback(feedback)
        setStep('feedback')
        setIsAnalyzing(false)
      }, 2000)
    }

    const generateIntelligentFeedback = (caseData, solution, profile) => {
      const isParent = profile.role === 'parent'
      const isProfessional = profile.role === 'professional'
      const isSpecialist = profile.role === 'specialist'

      let positiveElements = []
      let improvements = []
      let optimalSolution = ''
      let score = 60

      if (solution.toLowerCase().includes('rolig') || solution.toLowerCase().includes('stille')) {
        if (isParent) {
          positiveElements.push("Du tænker på at bevare roen - det er super vigtigt når børn er pressede!")
        } else if (isProfessional) {
          positiveElements.push("Dit fokus på at skabe et roligt miljø viser god forståelse - vigtig i dit fag!")
        } else if (isSpecialist) {
          positiveElements.push("Din fokus på at skabe et roligt miljø viser god forståelse for barnets reguleringsudfordringer")
        }
        score += 15
      }

      if (solution.toLowerCase().includes('pause') || solution.toLowerCase().includes('hvile')) {
        if (isParent) {
          positiveElements.push("Pauser er guld værd! Du forstår at børn med ADHD har brug for at 'tanke op'")
        } else if (isProfessional) {
          positiveElements.push("Pauser i behandlingen - smart tilgang der hjælper barnet med at regulere sig")
        } else if (isSpecialist) {
          positiveElements.push("Implementation af strukturerede pauser er evidensbaseret praksis for ADHD")
        }
        score += 15
      }

      if (!solution.toLowerCase().includes('lille') && !solution.toLowerCase().includes('kort')) {
        if (isParent) {
          improvements.push("Tænk på at dele opgaver op i mindre bid - det gør det meget nemmere for Emma at overskue")
        } else if (isProfessional) {
          improvements.push("Overvej at dele din behandling/service op i kortere sekvenser - børn med ADHD klarer det bedre")
        } else if (isSpecialist) {
          improvements.push("Opgave-segmentering vil forbedre fokus og reducere kognitiv belastning")
        }
      }

      if (isParent) {
        optimalSolution = `Den optimale tilgang for Emma:

1. Start småt: Del gruppearbejdet op i 10-15 minutters intervaller
2. Giv hende en rolle: Lad Emma være 'tidstager' eller 'materialeansvarlig' 
3. Skab forudsigelighed: Faste pladser, klare regler
4. Bevægelsespauser: 2-3 minutters pause hver 15. minut
5. Ros det der virker: Giv opmærksomhed når det går godt

Dette virker fordi børn med ADHD har brug for struktur og korte intervaller.`

      } else if (isProfessional) {
        optimalSolution = `Som fagperson kan du hjælpe børn som Emma:

1. Forbered barnet: Forklar hvad der skal ske
2. Korte behandlinger: Del din service op med pauser
3. Giv barnet kontrol: "Løft hånden hvis du har brug for pause"
4. Brug barnets interesser: Motivér med noget de kan lide
5. Ros samarbejdet: Giv positive tilbagemeldinger

Som frisør/tandlæge møder du måske kun barnet sjældent, men din forståelse gør en kæmpe forskel.`

      } else if (isSpecialist) {
        optimalSolution = `Evidensbaseret tilgang til Emmas udfordringer:

1. Strukturel differentiering: 10-15 minutters arbejdsintervaller
2. Rollefastsættelse: Konkret funktion (timekeeper, ansvarlig)
3. Miljøoptimering: Faste pladser, minimeret distraktioner
4. Kinæstetisk integration: Planlagte bevægelsespauser
5. Positiv adfærdsforstærkning: Immediat anerkendelse

ADHD påvirker eksekutive funktioner og sustained attention. Korte intervaller reducerer cognitive load.`
      }

      return {
        score,
        positiveElements,
        improvements,
        optimalSolution,
        personalizedMessage: isParent ?
          `${profile.name}, jeg kan mærke at du virkelig ønsker at hjælpe! Dine instinkter er gode.` :
          isProfessional ?
          `${profile.name}, det er fantastisk at du som fagperson vil forstå børn bedre!` :
          isSpecialist ?
          `${profile.name}, din professionelle tilgang er solid.` :
          `${profile.name}, tak for din interesse i at hjælpe børn.`
      }
    }

    const completeCase = () => {
      addToHistory({
        userSolution,
        feedback,
        score: feedback.score
      })
      goToDashboard()
    }

    if (isAnalyzing) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Heidi analyserer din løsning...</h3>
            <p className="text-gray-600 mb-6">
              Jeg læser din tilgang og sammenligner den med bedste praksis.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
      )
    }

    if (step === 'reading') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={goToDashboard}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Tilbage til dashboard
            </button>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">{currentCase?.title}</h1>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    {currentCase?.category}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    {currentCase?.difficulty}
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Hej {userProfile.name}!</h3>
                    <p className="text-gray-700">
                      Jeg er Heidi, og vi skal sammen arbejde med denne case. Læs scenariet grundigt.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-amber-600" />
                  Case Scenario
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">{currentCase?.description}</p>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setStep('solving')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
                >
                  Jeg er klar til at løse casen
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (step === 'solving') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={goToDashboard}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Tilbage til dashboard
            </button>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">{currentCase?.title}</h1>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 font-medium mb-2">Scenariet:</p>
                <p className="text-gray-700">{currentCase?.description}</p>
              </div>

              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                  Hvordan vil du håndtere denne situation?
                </label>
                <textarea
                  value={userSolution}
                  onChange={(e) => setUserSolution(e.target.value)}
                  placeholder="Beskriv din løsning med dine egne ord..."
                  className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-lg"
                />
                <div className="text-right text-sm text-gray-500 mt-2">
                  {userSolution.length} tegn
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setStep('reading')}
                  className="text-gray-600 hover:text-gray-800 px-4 py-2"
                >
                  ← Læs casen igen
                </button>
                
                <button
                  onClick={generateFeedback}
                  disabled={!userSolution.trim() || userSolution.length < 20}
                  className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                    userSolution.trim() && userSolution.length >= 20
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Få Heidis feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (step === 'feedback') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={goToDashboard}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Tilbage til dashboard
            </button>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {feedback?.score}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Fremragende arbejde, {userProfile.name}!</h2>
                  <p className="text-gray-600">{feedback?.personalizedMessage}</p>
                </div>
              </div>

              {feedback?.positiveElements.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-green-700 mb-4">
                    ✓ Det du gør rigtigt
                  </h3>
                  <div className="space-y-3">
                    {feedback.positiveElements.map((element, index) => (
                      <div key={index} className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                        <p className="text-gray-700">{element}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {feedback?.improvements.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-amber-700 mb-4">
                    💡 Sådan kan du gøre det endnu bedre
                  </h3>
                  <div className="space-y-3">
                    {feedback.improvements.map((improvement, index) => (
                      <div key={index} className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                        <p className="text-gray-700">{improvement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-blue-700 mb-4">
                  ⭐ Den optimale løsning
                </h3>
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="whitespace-pre-line text-gray-700">{feedback?.optimalSolution}</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setStep('solving')
                      setUserSolution('')
                      setFeedback(null)
                    }}
                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    Prøv casen igen
                  </button>
                  <button
                    onClick={completeCase}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Gem resultat og fortsæt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  if (currentScreen === 'dashboard') {
    return <Dashboard />
  }
  
  if (currentScreen === 'case-evaluation') {
    return <CaseEvaluation />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-2 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            )
          })}
        </div>

        <div className="mb-8">
          {currentStep === 0 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Velkommen til CDT</h2>
              <p className="text-lg text-gray-600 mb-6">
                Din personlige, dynamiske fagbog til at hjælpe børn med særlige behov.
              </p>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Hvad skal jeg kalde dig?</h2>
              <p className="text-gray-600 mb-6">
                Jeg vil gerne personalisere oplevelsen ved at kende dit navn.
              </p>
              <input
                type="text"
                placeholder="Indtast dit navn..."
                value={userProfile.name}
                onChange={(e) => handleSelection('name', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Hvad er din rolle?</h2>
              <p className="text-gray-600 mb-6">
                Dette hjælper mig med at tilpasse mine råd og vejledning til din situation.
              </p>
              <div className="space-y-3">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => handleSelection('role', role.value)}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                      userProfile.role === role.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-800">{role.label}</div>
                    <div className="text-sm text-gray-600">{role.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Hvor uddybende information ønsker du?</h2>
              <p className="text-gray-600 mb-6">
                Nogle foretrækker korte, konkrete svar, mens andre vil forstå baggrunden i detaljer.
              </p>
              <div className="space-y-3">
                {informationDepth.map((depth) => (
                  <button
                    key={depth.value}
                    onClick={() => handleSelection('informationDepth', depth.value)}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                      userProfile.informationDepth === depth.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-800">{depth.label}</div>
                    <div className="text-sm text-gray-600">{depth.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
            className={`px-6 py-2 rounded-lg font-semibold ${
              currentStep > 0 
                ? 'text-gray-600 hover:text-gray-800' 
                : 'text-gray-300 cursor-not-allowed'
            }`}
            disabled={currentStep === 0}
          >
            Tilbage
          </button>
          
          <button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !userProfile.name) ||
              (currentStep === 2 && !userProfile.role) ||
              (currentStep === 3 && !userProfile.informationDepth)
            }
            className={`flex items-center px-6 py-2 rounded-lg font-semibold ${
              ((currentStep === 1 && userProfile.name) ||
               (currentStep === 2 && userProfile.role) ||
               (currentStep === 3 && userProfile.informationDepth) ||
               currentStep === 0)
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length - 1 ? 'Afslut' : 'Næste'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return <CDTOnboarding />
}