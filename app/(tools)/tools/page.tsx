import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { getAllTools } from "@/lib/tools/registry";

export default function ToolsPage() {
  const tools = getAllTools();
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <Nav />
      <div className="mx-auto max-w-[1200px] px-6 py-[120px]">
        <p className="font-[family-name:var(--font-dm-mono)] mb-4 text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
          // Demos
        </p>
        <h1 className="font-[family-name:var(--font-syne)] mb-12 text-[clamp(36px,5vw,60px)] font-extrabold tracking-[-2px] text-[var(--text)]">
          AI Tool Demos
        </h1>
        <div className="grid gap-5 md:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="border border-[var(--border)] bg-[var(--surface)] p-8 transition-colors hover:border-[var(--accent)]"
            >
              <span className="text-3xl">{t.icon}</span>
              <h2 className="mt-4 font-[family-name:var(--font-syne)] text-xl font-bold text-[var(--text)]">
                {t.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
