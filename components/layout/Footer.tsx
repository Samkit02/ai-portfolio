import { PERSONAL } from "@/content/resume";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-between border-t border-[var(--border)] px-6 py-10 md:px-[60px]">
      <p className="font-[family-name:var(--font-dm-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
        © {year} {PERSONAL.name} — samkit.ai
      </p>
      <p className="font-[family-name:var(--font-dm-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
        Built with ♥ and caffeine
      </p>
    </footer>
  );
}
