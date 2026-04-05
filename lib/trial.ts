import { prisma } from "@/lib/db";

const TRIAL_SESSION_COOKIE = "tool_trial_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function getTrialSessionCookieName() {
  return TRIAL_SESSION_COOKIE;
}

export function getTrialSessionCookieMaxAge() {
  return COOKIE_MAX_AGE;
}

export interface TrialCheckResult {
  allowed: boolean;
  reason?: "expired" | "tokens_exhausted";
  sessionId: string;
}

/**
 * Get or create a trial session for this tool. Enforces server-side limits
 * so refresh does not reset the trial.
 */
export async function checkTrial(
  sessionId: string,
  toolSlug: string,
  trialType: "time" | "tokens",
  trialValue: number
): Promise<TrialCheckResult> {
  const now = new Date();
  const key = `${sessionId}:${toolSlug}`;

  let session = await prisma.trialSession.findUnique({
    where: { sessionId: key },
  });

  if (!session) {
    const expiresAt = new Date(now.getTime() + trialValue * 1000);
    session = await prisma.trialSession.create({
      data: {
        sessionId: key,
        toolSlug,
        tokensUsed: 0,
        expiresAt,
        expired: false,
      },
    });
  }

  if (session.expired) {
    return { allowed: false, reason: "expired", sessionId: key };
  }

  if (trialType === "time") {
    if (now > session.expiresAt) {
      await prisma.trialSession.update({
        where: { id: session.id },
        data: { expired: true },
      });
      return { allowed: false, reason: "expired", sessionId: key };
    }
  } else {
    if (session.tokensUsed >= trialValue) {
      return { allowed: false, reason: "tokens_exhausted", sessionId: key };
    }
  }

  return { allowed: true, sessionId: key };
}

/**
 * Add token usage to the trial session (call after a non-stream run with usage).
 */
export async function recordTrialUsage(
  sessionId: string,
  toolSlug: string,
  tokensUsed: number
): Promise<void> {
  const key = `${sessionId}:${toolSlug}`;
  await prisma.trialSession.updateMany({
    where: { sessionId: key },
    data: { tokensUsed: { increment: tokensUsed } },
  });
}
