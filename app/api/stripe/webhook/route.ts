import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { upsertUserByClerkId } from "@/lib/user";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const TOKEN_PACK_AMOUNT = 5000;

export async function POST(req: Request) {
  if (!WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const rawSession = event.data.object as Stripe.Checkout.Session;
        const session = await stripe.checkout.sessions.retrieve(rawSession.id, {
          expand: ["line_items.data.price"],
        });
        const clerkId = session.metadata?.clerkId as string | undefined;
        if (!clerkId) {
          console.warn("checkout.session.completed: no clerkId in metadata");
          break;
        }

        const customerId =
          typeof session.customer === "string" ? session.customer : session.customer?.id ?? undefined;
        const user = await upsertUserByClerkId(
          clerkId,
          session.customer_email ?? (session.customer_details as { email?: string } | null)?.email ?? "",
          customerId
        );

        if (session.mode === "payment") {
          // One-time (e.g. token pack)
          const priceId = session.line_items?.data?.[0]?.price?.id;
          const tokenPackPriceId = process.env.STRIPE_TOKEN_PACK_PRICE_ID;
          if (priceId && tokenPackPriceId && priceId === tokenPackPriceId) {
            await prisma.user.update({
              where: { id: user.id },
              data: { tokenBalance: { increment: TOKEN_PACK_AMOUNT } },
            });
          }
        } else if (session.mode === "subscription" && session.subscription) {
          const subId = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
          const subscription = await stripe.subscriptions.retrieve(subId) as Stripe.Subscription;
          const priceId = subscription.items.data[0]?.price?.id;
          const plan = planFromPriceId(priceId);
          const periodEnd = Number("current_period_end" in subscription ? (subscription as { current_period_end?: number }).current_period_end : 0);

          await prisma.subscription.create({
            data: {
              userId: user.id,
              stripeSubId: subscription.id,
              stripePriceId: priceId ?? "",
              plan,
              status: subscription.status ?? "active",
              currentPeriodEnd: new Date(periodEnd * 1000),
            },
          });
          await prisma.user.update({
            where: { id: user.id },
            data: { plan },
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const subRecord = await prisma.subscription.findUnique({
          where: { stripeSubId: subscription.id },
          include: { user: true },
        });
        if (!subRecord) break;

        const priceId = subscription.items.data[0]?.price?.id;
        const plan = planFromPriceId(priceId);
        const periodEnd = Number("current_period_end" in subscription ? (subscription as { current_period_end?: number }).current_period_end : 0);

        await prisma.subscription.update({
          where: { id: subRecord.id },
          data: {
            plan,
            status: subscription.status ?? "active",
            currentPeriodEnd: new Date(periodEnd * 1000),
          },
        });
        await prisma.user.update({
          where: { id: subRecord.userId },
          data: { plan },
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const subRecord = await prisma.subscription.findUnique({
          where: { stripeSubId: subscription.id },
        });
        if (!subRecord) break;

        await prisma.subscription.update({
          where: { id: subRecord.id },
          data: { status: "canceled" },
        });
        await prisma.user.update({
          where: { id: subRecord.userId },
          data: { plan: "FREE" },
        });
        break;
      }

      default:
        // Unhandled event type
        break;
    }
  } catch (err) {
    console.error("Stripe webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

function planFromPriceId(priceId: string | undefined): "FREE" | "STARTER" | "PRO" | "TEAM" {
  if (!priceId) return "FREE";
  const starter = process.env.STRIPE_STARTER_PRICE_ID;
  const pro = process.env.STRIPE_PRO_PRICE_ID;
  const team = process.env.STRIPE_TEAM_PRICE_ID;
  if (starter && priceId === starter) return "STARTER";
  if (pro && priceId === pro) return "PRO";
  if (team && priceId === team) return "TEAM";
  return "FREE";
}
