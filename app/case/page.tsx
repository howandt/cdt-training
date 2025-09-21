const saveReflection = async () => {
  if (!reflection.trim()) return;
  
  // Debug miljøvariabler
  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Found' : 'Missing');
  
  setIsSaving(true);
  
  try {
    localStorage.setItem('reflection_' + Date.now(), JSON.stringify({
      user_id: name || 'anonym',
      email: email,
      role: role,
      case: 'case-001',
      content: reflection,
      timestamp: new Date().toISOString()
    }));

    alert('Debug: Tjek browser console for miljøvariabler');
    
  } catch (error) {
    console.error('Fejl:', error);
    alert('Gemt lokalt som backup');
  } finally {
    setIsSaving(false);
  }
};