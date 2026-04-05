import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "var(--accent)",
            colorBackground: "var(--surface)",
            colorText: "var(--text)",
            colorInputBackground: "var(--bg)",
            colorInputText: "var(--text)",
            borderRadius: "4px",
          },
        }}
      />
    </main>
  );
}
