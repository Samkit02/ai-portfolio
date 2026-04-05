import { runClaude } from "@/lib/anthropic";

export const CODE_EXPLAINER_SYSTEM_PROMPT = `You are a Code Explainer. Given a code snippet, provide a plain-English explanation that covers:
1. **What it does** — high-level purpose
2. **How it works** — key logic, flow, and data structures
3. **Edge cases / caveats** — if relevant
4. **Dependencies** — external APIs, globals, or assumptions

Write for developers who might be onboarding or reading unfamiliar code. Use short paragraphs and bullet points where helpful. Output in markdown.
If the input is empty or not code, say so and ask for a code snippet.`;

export interface CodeExplainerInput {
  code: string;
  context?: string;
}

export interface CodeExplainerResult {
  content: string;
  usage?: { inputTokens: number; outputTokens: number };
}

export async function runCodeExplainer(input: CodeExplainerInput): Promise<CodeExplainerResult> {
  const code = (input.code || "").trim();
  if (!code) {
    return { content: "Please paste code to explain." };
  }
  const userContent = input.context
    ? `Context: ${input.context}\n\nCode:\n\`\`\`\n${code}\n\`\`\``
    : code;
  const { content, usage } = await runClaude({
    system: CODE_EXPLAINER_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userContent }],
    maxTokens: 1500,
  });
  return { content, usage };
}
