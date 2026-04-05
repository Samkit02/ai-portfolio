import type { Tool } from "@/types/tool";

export const TOOLS: Tool[] = [
  {
    slug: "pr-autopilot",
    name: "PR Autopilot",
    icon: "🤖",
    description:
      "AI generates perfect pull request descriptions, commit messages, and changelogs from your code diff in seconds.",
    trialType: "time",
    trialValue: 120,
    popular: true,
    pricing: [
      { name: "Free", value: "2 min trial" },
      { name: "Starter", value: "$9 / mo" },
      { name: "Pro", value: "$29 / mo" },
    ],
    inputLabel: "Paste your git diff or patch",
    inputPlaceholder: "git diff HEAD~1",
    outputLabel: "Generated PR Description",
  },
  {
    slug: "bug-detector",
    name: "Bug Detector",
    icon: "🔍",
    description:
      "Paste your code and get a detailed bug report with severity scores, root causes, and fix suggestions instantly.",
    trialType: "tokens",
    trialValue: 500,
    popular: false,
    pricing: [
      { name: "Free", value: "500 tokens" },
      { name: "Pay-as-go", value: "$0.01 / scan" },
      { name: "Unlimited", value: "$19 / mo" },
    ],
    inputLabel: "Paste your code",
    inputPlaceholder: "Paste code snippet to analyze...",
    outputLabel: "Bug Report",
  },
  {
    slug: "code-explainer",
    name: "Code Explainer",
    icon: "⚡",
    description:
      "Get plain-English explanations of any codebase, function, or algorithm. Perfect for onboarding and documentation.",
    trialType: "time",
    trialValue: 120,
    popular: false,
    pricing: [
      { name: "Free", value: "2 min trial" },
      { name: "Basic", value: "$7 / mo" },
      { name: "Team", value: "$49 / mo" },
    ],
    inputLabel: "Paste code to explain",
    inputPlaceholder: "Paste code or snippet...",
    outputLabel: "Explanation",
  },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getAllTools(): Tool[] {
  return TOOLS;
}

/** Format trial for display (e.g. "2:00 mins" or "500 tokens free") */
export function getTrialDisplay(tool: Tool): string {
  if (tool.trialType === "time") {
    const mins = Math.floor(tool.trialValue / 60);
    const secs = tool.trialValue % 60;
    return `${mins}:${String(secs).padStart(2, "0")} mins`;
  }
  return `${tool.trialValue} tokens free`;
}
