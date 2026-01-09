import React, { createContext, useContext, useMemo, useState } from "react";

type CounterCtx = {
  count: number;
  incrementBy: (amount: number) => void;
  decrementBy: (amount: number) => void;
};

const Ctx = createContext<CounterCtx | null>(null);

export function CounterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  const value = useMemo<CounterCtx>(() => ({
    count,
    incrementBy: (amount) => setCount((c) => c + amount),
    decrementBy: (amount) => setCount((c) => c - amount),
  }), [count]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCounter() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCounter must be used within CounterProvider");
  return ctx;
}
