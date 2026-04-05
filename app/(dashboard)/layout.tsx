import { Nav } from "@/components/layout/Nav";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <div className="flex justify-end px-6 pt-4 md:px-[60px]">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "ring-2 ring-[var(--border)]",
            },
          }}
        />
      </div>
      {children}
    </>
  );
}
