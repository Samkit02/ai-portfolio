"use client";

interface TrialTimerProps {
  secondsLeft: number;
  started: boolean;
  expired: boolean;
  formatted: string;
  onStart: () => void;
}

export function TrialTimer({
  secondsLeft,
  started,
  expired,
  formatted,
  onStart,
}: TrialTimerProps) {
  return (
    <div className="flex items-center justify-between border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 font-[family-name:var(--font-dm-mono)] text-[10px]">
      <span className="uppercase tracking-[0.1em] text-[var(--muted)]">
        Free trial
      </span>
      {started ? (
        <span className={expired ? "text-[var(--accent2)]" : "text-[var(--accent3)]"}>
          {expired ? "Expired" : `${formatted} left`}
        </span>
      ) : (
        <button
          type="button"
          onClick={onStart}
          className="text-[var(--accent3)] underline hover:no-underline"
        >
          Start trial
        </button>
      )}
    </div>
  );
}
