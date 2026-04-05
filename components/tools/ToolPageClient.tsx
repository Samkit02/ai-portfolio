"use client";

import { useState, useCallback, useEffect } from "react";
import type { Tool } from "@/types/tool";
import { ToolSandbox } from "@/components/tools/ToolSandbox";
import Link from "next/link";

const REPO_URL = "https://github.com/Samkit02/ai-portfolio";
const LOCAL_KEY_STORAGE = "samkit_anthropic_api_key";

interface ToolPageClientProps {
  tool: Tool;
}

export function ToolPageClient({ tool }: ToolPageClientProps) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");

  // Load saved key from localStorage (client-only, never sent back to you)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(LOCAL_KEY_STORAGE);
    if (stored) setApiKey(stored);
  }, []);

  const handleSaveKey = () => {
    if (typeof window === "undefined") return;
    if (!apiKey.trim()) {
      window.localStorage.removeItem(LOCAL_KEY_STORAGE);
      setError("Anthropic API key cleared. Add your own key to run the tools.");
      return;
    }
    window.localStorage.setItem(LOCAL_KEY_STORAGE, apiKey.trim());
    setError(null);
  };

  const handleRun = useCallback(
    async (input: Record<string, string>) => {
      setError(null);
      setResult(null);
      setLoading(true);
      try {
        if (!apiKey.trim()) {
          setError("Add your own Anthropic API key below to run this demo.");
          return;
        }

        const res = await fetch(`/api/tools/${tool.slug}/run`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input, stream: true, apiKey: apiKey.trim() }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error ?? "Something went wrong.");
          return;
        }

        const contentType = res.headers.get("Content-Type") ?? "";
        if (contentType.includes("text/plain") && res.body) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let accumulated = "";
          setResult("");
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            accumulated += chunk;
            setResult(accumulated);
          }
        } else {
          const data = await res.json().catch(() => ({}));
          setResult(data.result ?? "");
        }
      } finally {
        setLoading(false);
      }
    },
    [tool.slug]
  );

  return (
    <div className="mx-auto max-w-[800px] px-6 py-[120px]">
      <Link
        href="/tools"
        className="font-[family-name:var(--font-dm-mono)] text-sm uppercase tracking-wide text-[var(--accent)] hover:underline"
      >
        ← Back to Tools
      </Link>
      <div className="mt-8 flex items-start gap-4">
        <span className="flex h-12 w-12 items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[22px]">
          {tool.icon}
        </span>
        <div>
          <h1 className="font-[family-name:var(--font-syne)] text-4xl font-extrabold text-[var(--text)]">
            {tool.name}
          </h1>
          <p className="mt-2 text-[var(--muted)]">{tool.description}</p>
        </div>
      </div>

      <div className="mt-8">
        <ToolSandbox
          tool={tool}
          onRun={handleRun}
          result={result}
          loading={loading}
          error={error}
        />
      </div>

      <div className="mt-12 border-t border-[var(--border)] pt-8">
        <p className="font-[family-name:var(--font-dm-mono)] mb-2 text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
          Bring your own Anthropic key
        </p>
        <p className="mb-2 text-[13px] text-[var(--muted)]">
          For visa and compliance reasons, this site does not use a shared API key. Paste your own
          Claude API key (never stored on the server — only in your browser) to run the demo.
        </p>
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="anthropic_..."
            className="w-full max-w-[360px] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[13px] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSaveKey}
            className="mt-2 inline-flex items-center justify-center border border-[var(--accent)] px-4 py-2 text-[12px] font-bold text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors md:mt-0"
          >
            Save key locally
          </button>
        </div>

        <p className="font-[family-name:var(--font-dm-mono)] mb-2 text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
          Use in your own project
        </p>
        <p className="mb-4 text-[13px] text-[var(--muted)]">
          This is a showcase demo. To run these tools yourself or integrate them into your app, clone or download the portfolio repo.
        </p>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-[var(--accent)] px-6 py-3 text-[13px] font-bold text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-colors"
        >
          Clone or download repo →
        </a>
      </div>
    </div>
  );
}
