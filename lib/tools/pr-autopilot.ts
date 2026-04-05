import { runClaude } from "@/lib/anthropic";

export const PR_AUTOPILOT_SYSTEM_PROMPT = `You are a PR Autopilot. Given a git diff or patch, you generate:
1. A concise PR title (one line, imperative mood).
2. A structured PR description with: Summary, Changes, Testing notes.
3. Suggested commit messages (if the diff could be split into logical commits).
4. A short changelog line (user-facing, one line).

Output in markdown. Use clear headings: ## PR Title, ## Description, ## Suggested Commits, ## Changelog.
Keep the tone professional and concise. If the diff is empty or invalid, say so and ask for a valid diff.`;

export interface PRAutopilotInput {
  diff: string;
}

export interface PRAutopilotResult {
  content: string;
  usage?: { inputTokens: number; outputTokens: number };
}

export async function runPRAutopilot(input: PRAutopilotInput): Promise<PRAutopilotResult> {
  const text = (input.diff || "").trim();
  if (!text) {
    return { content: "Please paste a git diff or patch. You can run `git diff HEAD~1` or `git diff main` and paste the output." };
  }
  const { content, usage } = await runClaude({
    system: PR_AUTOPILOT_SYSTEM_PROMPT,
    messages: [{ role: "user", content: text }],
    maxTokens: 1500,
  });
  return { content, usage };
}
