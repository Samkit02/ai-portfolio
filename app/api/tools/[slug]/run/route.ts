import { NextResponse } from "next/server";
import { getTool } from "@/lib/tools/registry";
import { runTool, getStreamParams } from "@/lib/tools/run";
import { streamClaude } from "@/lib/anthropic";

export async function POST(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const tool = getTool(slug);
    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const {
      input = {},
      stream: wantStream = false,
      apiKey,
    } = body as {
      input?: Record<string, string>;
      stream?: boolean;
      apiKey?: string;
    };

    if (wantStream) {
      const params = getStreamParams(slug, input ?? {});
      if (!params) {
        const emptyMessages: Record<string, string> = {
          "pr-autopilot":
            "Please paste a git diff or patch. You can run `git diff HEAD~1` or `git diff main` and paste the output.",
          "bug-detector": "Please paste a code snippet to analyze.",
          "code-explainer": "Please paste code to explain.",
        };
        const text = emptyMessages[slug] ?? "Please provide input.";
        return new NextResponse(text, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }
      const readable = streamClaude(
        {
          system: params.systemPrompt,
          messages: [{ role: "user", content: params.userContent }],
          maxTokens: params.maxTokens,
        },
        undefined,
        apiKey
      );
      return new NextResponse(readable, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const { result, usage } = await runTool(slug, input ?? {});
    return NextResponse.json({ result, usage });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Tool run failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
