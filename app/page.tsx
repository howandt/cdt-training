import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Velkommen til Heidi Træning</h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8">
        En personlig AI-tutor for dig, der arbejder med børn med diagnoser.
        Træn cases, quizzer, teori og rollespil – i dit tempo.
      </p>
      <Link href="/onboarding">
        <Button size="lg">Kom i gang</Button>
      </Link>
    </main>
  );
}
