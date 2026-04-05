"use client";

import { useState, useCallback, useEffect } from "react";

export function useTrialTimer(durationSeconds = 120) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const [started, setStarted] = useState(false);
  const [expired, setExpired] = useState(false);

  const start = useCallback(() => setStarted(true), []);

  useEffect(() => {
    if (!started) return;
    if (secondsLeft <= 0) {
      setExpired(true);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [started, secondsLeft]);

  const formatted = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`;

  return {
    secondsLeft,
    started,
    expired,
    start,
    formatted,
  };
}
