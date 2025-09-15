// /landing/page.tsx

import React from "react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Velkommen til Træning med Heidi
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          En interaktiv læringsplatform for dig, der arbejder med børn med diagnoser.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="default" size="lg">
            Start træning
          </Button>
          <Button variant="outline" size="lg">
            Se cases
          </Button>
        </div>
      </section>

      <section className="px-6 py-20 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Hvad tilbyder vi?</h2>
          <p className="text-muted-foreground text-lg">
            Træn med cases, quizzer, teori og rollespil. Heidi guider dig trin for trin.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">For hvem?</h2>
          <p className="text-muted-foreground text-lg">
            Uanset om du er lærer, forælder, pædagog eller specialist – Heidi tilpasser sig dig.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 bg-muted">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Klar til at gå i gang?</h2>
          <Button size="lg">Start her</Button>
        </div>
      </section>
    </main>
  );
}
