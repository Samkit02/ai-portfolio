import { getTool } from "@/lib/tools/registry";
import { runPRAutopilot } from "@/lib/tools/pr-autopilot";
import { runBugDetector } from "@/lib/tools/bug-detector";
import { runCodeExplainer } from "@/lib/tools/code-explainer";
import { PR_AUTOPILOT_SYSTEM_PROMPT } from "@/lib/tools/pr-autopilot";
import { BUG_DETECTOR_SYSTEM_PROMPT } from "@/lib/tools/bug-detector";
import { CODE_EXPLAINER_SYSTEM_PROMPT } from "@/lib/tools/code-explainer";

export interface RunToolInput {
  [key: string]: string | undefined;
  diff?: string;
  code?: string;
  language?: string;
  context?: string;
}

export interface RunToolResult {
  result: string;
  usage?: { inputTokens: number; outputTokens: number };
}

export async function runTool(
  slug: string,
  input: RunToolInput
): Promise<RunToolResult> {
  const tool = getTool(slug);
  if (!tool) {
    throw new Error(`Unknown tool: ${slug}`);
  }

  switch (slug) {
    case "pr-autopilot": {
      const out = await runPRAutopilot({ diff: input.diff ?? "" });
      return { result: out.content, usage: out.usage };
    }
    case "bug-detector": {
      const out = await runBugDetector({
        code: input.code ?? "",
        language: input.language,
      });
      return { result: out.content, usage: out.usage };
    }
    case "code-explainer": {
      const out = await runCodeExplainer({
        code: input.code ?? "",
        context: input.context,
      });
      return { result: out.content, usage: out.usage };
    }
    default:
      throw new Error(`Tool not implemented: ${slug}`);
  }
}

export interface StreamParams {
  systemPrompt: string;
  userContent: string;
  maxTokens: number;
}

/**
 * Build system prompt and user message for streaming. Returns null if input is empty (caller may respond with placeholder).
 */
export function getStreamParams(
  slug: string,
  input: RunToolInput
): StreamParams | null {
  switch (slug) {
    case "pr-autopilot": {
      const text = (input.diff ?? "").trim();
      if (!text) return null;
      return {
        systemPrompt: PR_AUTOPILOT_SYSTEM_PROMPT,
        userContent: text,
        maxTokens: 1500,
      };
    }
    case "bug-detector": {
      const code = (input.code ?? "").trim();
      if (!code) return null;
      const userContent = input.language
        ? `Language: ${input.language}\n\nCode:\n\`\`\`\n${code}\n\`\`\``
        : code;
      return {
        systemPrompt: BUG_DETECTOR_SYSTEM_PROMPT,
        userContent,
        maxTokens: 1500,
      };
    }
    case "code-explainer": {
      const code = (input.code ?? "").trim();
      if (!code) return null;
      const userContent = input.context
        ? `Context: ${input.context}\n\nCode:\n\`\`\`\n${code}\n\`\`\``
        : code;
      return {
        systemPrompt: CODE_EXPLAINER_SYSTEM_PROMPT,
        userContent,
        maxTokens: 1500,
      };
    }
    default:
      return null;
  }
}
