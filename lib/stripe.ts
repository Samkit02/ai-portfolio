import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY;
if (!secret) {
  console.warn("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(secret ?? "", {
  typescript: true,
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export type CheckoutMode = "payment" | "subscription";

export interface CreateCheckoutSessionOptions {
  /** Clerk user ID (stored in metadata for webhook) */
  clerkId: string;
  /** User email (for Stripe customer) */
  email: string;
  /** Stripe Price ID (e.g. price_xxx for token pack or subscription) */
  priceId: string;
  mode: CheckoutMode;
  /** Existing Stripe customer ID to reuse (optional) */
  stripeCustomerId?: string | null;
  /** Success URL after payment */
  successUrl?: string;
  /** Cancel URL if user abandons */
  cancelUrl?: string;
}

/**
 * Create a Stripe Checkout session. Returns the session URL for redirect.
 */
export async function createCheckoutSession(
  options: CreateCheckoutSessionOptions
): Promise<{ url: string }> {
  const {
    clerkId,
    email,
    priceId,
    mode,
    stripeCustomerId,
    successUrl = `${APP_URL}/dashboard`,
    cancelUrl = `${APP_URL}/dashboard`,
  } = options;

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode,
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: stripeCustomerId ? undefined : email,
    customer: stripeCustomerId ?? undefined,
    metadata: { clerkId },
    subscription_data:
      mode === "subscription"
        ? { metadata: { clerkId }, trial_period_days: undefined }
        : undefined,
  };

  const session = await stripe.checkout.sessions.create(sessionParams);

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  return { url: session.url };
}
