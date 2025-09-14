'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Reflections from "@/components/Reflections";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TrainingPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const router = useRouter();
  const user = useUser();

  // ⏱ Redirect efter 30 min for test-brugere
  useEffect(() => {
    if (user.type === "test") {
      const end = localStorage.getItem("cdt_test_endtime");
      if (end) {
        const interval = setInterval(() => {
          const now = Date.now();
          if (now > parseInt(end, 10)) {
            clearInterval(interval);
            alert("Din testperiode er udløbet. Du bliver nu sendt tilbage.");
            router.push("https://cdt-platform.vercel.app");
          }
        }, 1000);
        return () => clearInterval(interval);
      }
    }
  }, [user, router]);

  function handleTrainingClick(path: string) {
    if (user.type === "test") {
      const existing = localStorage.getItem("cdt_test_endtime");
      if (!existing) {
        const end = Date.now() + 30 * 60 * 1000;
        localStorage.setItem("cdt_test_endtime", end.toString());
      }
    }

    router.push(path);
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 w-full max-w-3xl text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Velkommen {name || 'bruger'} 👋
        </h1>
        <p className="text-gray-600 text-lg">
          Hvad vil du træne i dag?
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-white font-semibold">
          <button
            onClick={() => handleTrainingClick(`/case?name=${encodeURIComponent(name || '')}`)}
            className="bg-blue-500 hover:bg-blue-600 p-5 rounded-2xl transition-colors flex items-center justify-center"
          >
            🎭 Case
          </button>

          <button
            onClick={() => handleTrainingClick(`/roleplay?name=${encodeURIComponent(name || '')}`)}
            className="bg-purple-500 hover:bg-purple-600 p-5 rounded-2xl transition-colors flex items-center justify-center"
          >
            🎮 Rollespil
          </button>

          <button
            onClick={() => handleTrainingClick(`/quiz?name=${encodeURIComponent(name || '')}`)}
            className="bg-green-500 hover:bg-green-600 p-5 rounded-2xl transition-colors flex items-center justify-center"
          >
            🧠 Quiz
          </button>

          <button
            onClick={() => handleTrainingClick(`/template?name=${encodeURIComponent(name || '')}`)}
            className="bg-yellow-500 hover:bg-yellow-600 p-5 rounded-2xl transition-colors flex items-center justify-center"
          >
            🧰 Template
          </button>

          <button
            onClick={() => handleTrainingClick(`/comorbidity?name=${encodeURIComponent(name || '')}`)}
            className="bg-pink-500 hover:bg-pink-600 p-5 rounded-2xl transition-colors flex items-center justify-center"
          >
            🧬 Komorbiditet
          </button>

          <button
            onClick={() => handleTrainingClick(`/diagnosis?name=${encodeURIComponent(name || '')}`)}
            className="bg-gray-700 hover:bg-gray-800 p-5 rounded-2xl transition-colors flex items-center justify-center"
          >
            📖 Diagnoser
          </button>
        </div>
      </div>
    </div>
  );
}
