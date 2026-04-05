export type TrialType = "time" | "tokens";

export interface ToolPricingRow {
  name: string;
  value: string;
}

export interface Tool {
  slug: string;
  name: string;
  icon: string;
  description: string;
  trialType: TrialType;
  /** Time in seconds (e.g. 120) or token count (e.g. 500) */
  trialValue: number;
  pricing: ToolPricingRow[];
  popular?: boolean;
  /** Label for the input field (e.g. "Paste your git diff here") */
  inputLabel: string;
  /** Placeholder for the input textarea */
  inputPlaceholder: string;
  /** Optional: output section label */
  outputLabel?: string;
}
