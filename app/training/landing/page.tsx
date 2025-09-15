import { Button } from "@/components/ui/button";

export default function TrainingLandingPage() {
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
    </main>
  );
}
