import { useEffect, useState } from "react";

export function useTestTimer(started: boolean) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!started) return;

    const storedEnd = localStorage.getItem("cdt_test_endtime");

    let endTime: number;
    if (storedEnd) {
      endTime = parseInt(storedEnd, 10);
    } else {
      endTime = Date.now() + 30 * 60 * 1000; // 30 minutter
      localStorage.setItem("cdt_test_endtime", endTime.toString());
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        setRemaining(0);
        clearInterval(interval);
      } else {
        setRemaining(Math.floor(diff / 1000)); // sekunder
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [started]);

  return {
    remaining, // sekunder tilbage
    expired: remaining === 0,
  };
}
