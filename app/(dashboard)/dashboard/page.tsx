import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-[var(--bg)] p-8">
      <div className="mx-auto max-w-[800px]">
        <h1 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-[var(--text)]">
          Account
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          You&apos;re signed in. Use the menu above to manage your profile or sign out.
        </p>
      </div>
    </div>
  );
}
