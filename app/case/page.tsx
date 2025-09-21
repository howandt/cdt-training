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
  
  feedback += `\n**Heidi's optimale løsningsstrategi:**\n`;
  
  if (diagnosis === 'ADHD') {
    feedback += `**Øjeblikkelig respons:**\n`;
    feedback += `• Gå ned på Emmas niveau og tal lavt og roligt\n`;
    feedback += `• Anerkend hendes følelser: "Jeg kan se du er skuffet over ændringen"\n`;
    feedback += `• Tilbyd to acceptable alternativer: "Vi kan lave matematik med timer eller uden musik"\n\n`;
    
    feedback += `**Strukturelle løsninger:**\n`;
    feedback += `• Implementer "ændringskort" - visuelle kort der forbereder på pludselige ændringer\n`;
    feedback += `• Etabler et "check-in" ritual hver morgen hvor dagens plan gennemgås\n`;
    feedback += `• Skab en "ro-zone" i klasselokalet hvor Emma kan gå hen ved overvældelse\n\n`;
    
    feedback += `**Forebyggelse:**\n`;
    feedback += `• Ugentlige planlægningsmøder hvor mulige ændringer diskuteres\n`;
    feedback += `• Træn "fleksibilitets-spil" hvor børnene øver sig i at håndtere små ændringer\n`;
    feedback += `• Etabler partnerskab med Emma - hun bliver "dagens hjælper" ved ændringer\n`;
    
  } else if (diagnosis === 'Autisme') {
    feedback += `**Øjeblikkelig respons:**\n`;
    feedback += `• Respekter Marcus' behov for afstand - gå ikke tættere på\n`;
    feedback += `• Brug konkret sprog: "Marcus, det er okay at være alene. Jeg står her hvis du har brug for hjælp"\n`;
    feedback += `• Adresser klassekammeratens kommentar direkte men roligt\n\n`;
    
    feedback += `**Strukturelle løsninger:**\n`;
    feedback += `• Etabler "interesseklubber" hvor Marcus kan dele sin viden om tog\n`;
    feedback += `• Skab strukturerede sociale aktiviteter baseret på hans interesser\n`;
    feedback += `• Implementer "buddy-system" med en forståelig klassekammerat\n\n`;
    
    feedback += `**Forebyggelse:**\n`;
    feedback += `• Undervis hele klassen om neurodivergens og forskellige måder at være social på\n`;
    feedback += `• Etabler "interessepræsentationer" hvor alle børn deler deres passioner\n`;
    feedback += `• Skab forudsigelige social strukturer i frikvartererne\n`;
    
  } else if (diagnosis.includes('Aspergers')) {
    feedback += `**Øjeblikkelig respons:**\n`;
    feedback += `• Anerkend hendes mod til at dele sine følelser\n`;
    feedback += `• Normaliser hendes oplevelser: "Mange mennesker føler sig sådan - du er ikke alene"\n`;
    feedback += `• Tilbyd konkret støtte: "Lad os finde nogle strategier der kan hjælpe dig"\n\n`;
    
    feedback += `**Strukturelle løsninger:**\n`;
    feedback += `• Etabler "sosiale kort" - konkrete forklaringer på sociale situationer\n`;
    feedback += `• Skab en "pause-protokol" hvor Sarah kan trække sig tilbage når masking bliver for hårdt\n`;
    feedback += `• Implementer "autenticitets-øvelser" hvor det er okay at være anderledes\n\n`;
    
    feedback += `**Forebyggelse:**\n`;
    feedback += `• Undervis i "social energistyring" - hvordan man sparer kræfter\n`;
    feedback += `• Etabler støttegrupper med andre neurodiverse elever\n`;
    feedback += `• Træn hele klassen i at værdsætte forskellige kommunikationsstile\n`;
  }
  
  feedback += `\n**Langsigtede strategier:**\n`;
  feedback += `• Samarbejd med forældre om konsistente tilgange hjemme og i skolen\n`;
  feedback += `• Dokumenter hvad der virker og del viden med kommende lærere\n`;
  feedback += `• Byg barnets selvforståelse og selvværd gennem succesoplevelser\n\n`;
  
  feedback += `**Gem denne løsning!** Du kan bruge disse strategier i lignende situationer og videreudvikle dem baseret på barnets respons.`;

  return feedback;
};