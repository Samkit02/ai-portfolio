import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.warn("ANTHROPIC_API_KEY is not set; tool runs will fail.");
}

export const anthropic = new Anthropic({ apiKey: apiKey ?? "" });

function getClient(overrideKey?: string) {
  if (overrideKey && overrideKey.trim()) {
    return new Anthropic({ apiKey: overrideKey.trim() });
  }
  return anthropic;
}

const DEFAULT_MODEL = "claude-sonnet-4-20250514";

/** System prompt with optional prompt caching (ephemeral). */
function systemWithCache(system: string, useCache = true) {
  if (!useCache) return system;
  return [
    { type: "text" as const, text: system, cache_control: { type: "ephemeral" as const } },
  ];
}

export interface RunClaudeOptions {
  system: string;
  messages: { role: "user"; content: string }[];
  maxTokens?: number;
}

export interface RunClaudeResult {
  content: string;
  usage?: { inputTokens: number; outputTokens: number };
}

/**
 * Run Claude (non-streaming). Returns full assistant text and optional usage for token counting.
 * Uses prompt caching for the system prompt when useCache is true.
 */
export async function runClaude(options: RunClaudeOptions, useCache = true): Promise<RunClaudeResult> {
  const { system, messages, maxTokens = 1024 } = options;
  const response = await anthropic.messages.create({
    model: DEFAULT_MODEL,
    max_tokens: maxTokens,
    system: systemWithCache(system, useCache),
    messages: messages.map((m) => ({
      role: m.role as "user",
      content: m.content,
    })),
  });

  const textBlock = response.content.find((b) => b.type === "text");
  const content = textBlock && textBlock.type === "text" ? textBlock.text : "";
  const usage =
    response.usage != null
      ? { inputTokens: response.usage.input_tokens, outputTokens: response.usage.output_tokens }
      : undefined;

  return { content, usage };
}

export interface StreamClaudeOptions {
  system: string;
  messages: { role: "user"; content: string }[];
  maxTokens?: number;
}

type StreamUsage = { inputTokens: number; outputTokens: number };

/**
 * Decode Anthropic SSE stream (newline-delimited JSON) to plain text only.
 * Emits only content_block_delta.delta.text. Optionally captures usage from message_delta/message_stop.
 */
function decodeSSEToTextStream(
  raw: ReadableStream<Uint8Array>,
  onUsage?: (usage: StreamUsage) => void
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let buffer = "";

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = raw.getReader();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            try {
              const obj = JSON.parse(trimmed) as {
                type?: string;
                delta?: { type?: string; text?: string };
                usage?: { input_tokens?: number; output_tokens?: number };
              };
              if (
                obj.type === "content_block_delta" &&
                obj.delta?.type === "text_delta" &&
                typeof obj.delta.text === "string"
              ) {
                controller.enqueue(encoder.encode(obj.delta.text));
              }
              if (onUsage && obj.usage && (obj.type === "message_delta" || obj.type === "message_stop")) {
                const input = Number(obj.usage.input_tokens) || 0;
                const output = Number(obj.usage.output_tokens) || 0;
                if (input > 0 || output > 0) onUsage({ inputTokens: input, outputTokens: output });
              }
            } catch {
              // ignore non-JSON or malformed lines
            }
          }
        }
        // flush remaining buffer
        if (buffer.trim()) {
          try {
            const obj = JSON.parse(buffer.trim()) as {
              type?: string;
              delta?: { type?: string; text?: string };
              usage?: { input_tokens?: number; output_tokens?: number };
            };
            if (
              obj.type === "content_block_delta" &&
              obj.delta?.type === "text_delta" &&
              typeof obj.delta.text === "string"
            ) {
              controller.enqueue(encoder.encode(obj.delta.text));
            }
            if (onUsage && obj.usage && (obj.type === "message_delta" || obj.type === "message_stop")) {
              const input = Number(obj.usage.input_tokens) || 0;
              const output = Number(obj.usage.output_tokens) || 0;
              if (input > 0 || output > 0) onUsage({ inputTokens: input, outputTokens: output });
            }
          } catch {
            // ignore
          }
        }
      } finally {
        reader.releaseLock();
      }
      controller.close();
    },
  });
}

/**
 * Stream Claude response. Returns a ReadableStream of plain text (UTF-8) and an optional
 * promise that resolves with usage when the stream ends (for server-side trial tracking).
 * The SDK's toReadableStream() emits newline-delimited JSON; we decode to text only.
 * Uses prompt caching for the system prompt.
 */
export function streamClaude(
  options: StreamClaudeOptions,
  onStreamUsage?: (usage: { inputTokens: number; outputTokens: number }) => void,
  apiKeyOverride?: string
): ReadableStream<Uint8Array> {
  const { system, messages, maxTokens = 1024 } = options;
  const client = getClient(apiKeyOverride);
  const stream = client.messages.stream({
    model: DEFAULT_MODEL,
    max_tokens: maxTokens,
    system: systemWithCache(system),
    messages: messages.map((m) => ({ role: m.role as "user", content: m.content })),
  });
  const raw = stream.toReadableStream();
  return decodeSSEToTextStream(raw, onStreamUsage);
}
