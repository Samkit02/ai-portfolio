import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { getTool } from "@/lib/tools/registry";
import { ToolPageClient } from "@/components/tools/ToolPageClient";

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <Nav />
      <ToolPageClient tool={tool} />
    </main>
  );
}
