import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PERSONAL } from "@/content/resume";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <Nav />
      <div className="mx-auto max-w-[800px] px-6 py-[120px]">
        <h1 className="font-[family-name:var(--font-syne)] text-4xl font-extrabold text-[var(--text)]">
          About
        </h1>
        <p className="mt-6 leading-relaxed text-[var(--muted)]">
          {PERSONAL.shortBio}
        </p>
        <Link
          href="/#about"
          className="mt-8 inline-block text-[var(--accent)]"
        >
          ← Back home
        </Link>
      </div>
      <Footer />
    </main>
  );
}
