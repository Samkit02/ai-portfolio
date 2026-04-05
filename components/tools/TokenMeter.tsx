"use client";

interface TokenMeterProps {
  remaining: number;
  initialBalance: number;
  used?: number;
}

export function TokenMeter({
  remaining,
  initialBalance,
  used = initialBalance - remaining,
}: TokenMeterProps) {
  const pct = initialBalance > 0 ? (remaining / initialBalance) * 100 : 0;

  return (
    <div className="font-[family-name:var(--font-dm-mono)] text-[10px]">
      <div className="flex items-center justify-between px-0 py-1 uppercase tracking-[0.1em] text-[var(--muted)]">
        <span>Tokens</span>
        <span
          className={
            remaining <= 0 ? "text-[var(--accent2)]" : "text-[var(--accent3)]"
          }
        >
          {remaining} left
        </span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
        <div
          className="h-full rounded-full bg-[var(--accent3)] transition-all duration-300"
          style={{ width: `${Math.max(0, pct)}%` }}
        />
      </div>
    </div>
  );
}
