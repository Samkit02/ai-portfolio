"use client";

import type { Tool } from "@/types/tool";
import { useState } from "react";

interface ToolSandboxProps {
  tool: Tool;
  onRun: (input: Record<string, string>) => Promise<void>;
  result: string | null;
  loading: boolean;
  error: string | null;
}

export function ToolSandbox({ tool, onRun, result, loading, error }: ToolSandboxProps) {
  const [diff, setDiff] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [context, setContext] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input: Record<string, string> = {};
    if (tool.slug === "pr-autopilot") input.diff = diff;
    if (tool.slug === "bug-detector") {
      input.code = code;
      if (language) input.language = language;
    }
    if (tool.slug === "code-explainer") {
      input.code = code;
      if (context) input.context = context;
    }
    await onRun(input);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="tool-input"
          className="mb-2 block font-[family-name:var(--font-dm-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]"
        >
          {tool.inputLabel}
        </label>
        {tool.slug === "pr-autopilot" && (
          <textarea
            id="tool-input"
            value={diff}
            onChange={(e) => setDiff(e.target.value)}
            placeholder={tool.inputPlaceholder}
            rows={12}
            className="w-full resize-y border border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-mono text-[13px] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
          />
        )}
        {(tool.slug === "bug-detector" || tool.slug === "code-explainer") && (
          <>
            <textarea
              id="tool-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={tool.inputPlaceholder}
              rows={12}
              className="w-full resize-y border border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-mono text-[13px] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
            />
            {tool.slug === "bug-detector" && (
              <div className="mt-3">
                <label
                  htmlFor="language"
                  className="mb-1 block font-[family-name:var(--font-dm-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]"
                >
                  Language (optional)
                </label>
                <input
                  id="language"
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="e.g. TypeScript, Python"
                  className="w-full max-w-[200px] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[13px] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
            )}
            {tool.slug === "code-explainer" && (
              <div className="mt-3">
                <label
                  htmlFor="context"
                  className="mb-1 block font-[family-name:var(--font-dm-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]"
                >
                  Context (optional)
                </label>
                <input
                  id="context"
                  type="text"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="e.g. file path or purpose"
                  className="w-full max-w-[400px] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[13px] text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
            )}
          </>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full border border-[var(--accent)] bg-[var(--accent)] py-3 text-[13px] font-bold tracking-wide text-white transition-colors hover:bg-[rgba(108,99,255,0.9)] disabled:opacity-50"
      >
        {loading ? "Running…" : "Run"}
      </button>

      {error && (
        <div className="border border-[var(--accent2)] bg-[rgba(255,107,107,0.1)] px-4 py-3 text-[13px] text-[var(--accent2)]">
          {error}
        </div>
      )}

      {result != null && result !== "" && (
        <div>
          <h3 className="mb-2 font-[family-name:var(--font-dm-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
            {tool.outputLabel ?? "Output"}
          </h3>
          <div
            className="whitespace-pre-wrap border border-[var(--border)] bg-[var(--surface)] px-4 py-4 font-mono text-[13px] leading-relaxed text-[var(--text)]"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {result}
          </div>
        </div>
      )}
    </form>
  );
}
