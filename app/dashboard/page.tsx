export default function DashboardPage() {
  const searchParams = useSearchParams();
  const isTrial = searchParams?.get("trial") === "true";
  const [testStarted, setTestStarted] = useState(false);

  return (
    <div className="p-6">
      <TrialTimer start={testStarted} duration={1800} />

      <h1 className="text-2xl font-bold">Velkommen til Dashboard 🎉</h1>
      <p className="mt-4">Du er nu logget ind og klar til at bruge CDT Training.</p>
      
      <button
  onClick={() => setTestStarted(true)}
  className="mt-6 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
>
  🎭 Start test (midlertidig knap)
</button>
    </div>
  );
}

