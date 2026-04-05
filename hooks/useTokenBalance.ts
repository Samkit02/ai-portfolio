"use client";

import { useState, useCallback } from "react";

export function useTokenBalance(initialBalance: number) {
  const [remaining, setRemaining] = useState(initialBalance);
  const [used, setUsed] = useState(0);
  const expired = remaining <= 0;

  const consume = useCallback(
    (n: number) => {
      setRemaining((r) => Math.max(0, r - n));
      setUsed((u) => u + n);
    },
    []
  );

  return {
    remaining,
    used,
    expired,
    consume,
  };
}
