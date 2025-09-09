"use client";

import { useEffect, useState } from "react";

type TrialTimerProps = {
  start: boolean;
  duration?: number;
};

export function TrialTimer({ start, duration = 1800 }: TrialTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = "https://cdt-platform.vercel.app/#pricing";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${String(sec).padStart(2, "0")}`;
  };

  if (!start) return null;

  return (
    <div className="fixed top-4 right-4 bg-yellow-200 text-black px-4 py-2 rounded-lg shadow text-sm">
      ⏳ Gratis test: {formatTime(timeLeft)}
    </div>
  );
}
