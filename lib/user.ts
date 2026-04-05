import { prisma } from "@/lib/db";

/**
 * Upsert a User by Clerk ID. Call from webhook or when resolving auth in API routes.
 */
export async function upsertUserByClerkId(
  clerkId: string,
  email: string,
  stripeCustomerId?: string | null
) {
  return prisma.user.upsert({
    where: { clerkId },
    create: {
      clerkId,
      email,
      tokenBalance: 0,
      plan: "FREE",
      stripeCustomerId: stripeCustomerId ?? undefined,
    },
    update: {
      email,
      ...(stripeCustomerId !== undefined && { stripeCustomerId: stripeCustomerId ?? undefined }),
    },
  });
}

/**
 * Find user by Clerk ID. Returns null if not found.
 */
export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: { clerkId },
    include: { subscriptions: { where: { status: "active" }, orderBy: { currentPeriodEnd: "desc" }, take: 1 } },
  });
}
