import { runClaude } from "@/lib/anthropic";

export const BUG_DETECTOR_SYSTEM_PROMPT = `You are a Bug Detector. Analyze the provided code for:
1. Bugs and logic errors
2. Security issues (injection, XSS, sensitive data exposure)
3. Code smells and maintainability issues

For each finding provide:
- **Severity**: Critical / High / Medium / Low / Info
- **Location**: where in the code (line or snippet)
- **Description**: what the issue is
- **Fix suggestion**: how to fix it (code or steps)

Output in markdown. Use headings for each finding, e.g. "## Finding 1 (High)".
If the code is empty or not code, say so and ask for a code snippet.
If no issues are found, say "No issues found." and optionally note good practices.`;

export interface BugDetectorInput {
  code: string;
  language?: string;
}

export interface BugDetectorResult {
  content: string;
  usage?: { inputTokens: number; outputTokens: number };
}

export async function runBugDetector(input: BugDetectorInput): Promise<BugDetectorResult> {
  const code = (input.code || "").trim();
  if (!code) {
    return { content: "Please paste a code snippet to analyze." };
  }
  const userContent = input.language
    ? `Language: ${input.language}\n\nCode:\n\`\`\`\n${code}\n\`\`\``
    : code;
  const { content, usage } = await runClaude({
    system: BUG_DETECTOR_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userContent }],
    maxTokens: 1500,
  });
  return { content, usage };
}
