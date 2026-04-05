import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#tools", label: "Tools" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <nav
      className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-6 py-6 md:px-[60px]"
      style={{
        background: "linear-gradient(to bottom, rgba(4,4,8,0.9), transparent)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Link
        href="/"
        className="font-[family-name:var(--font-syne)] text-[22px] font-extrabold tracking-[-0.5px] text-[var(--text)] no-underline"
      >
        samkit<span className="text-[var(--accent)]">.ai</span>
      </Link>
      <ul className="flex list-none gap-8 md:gap-10">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="font-[family-name:var(--font-dm-mono)] text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--muted)] no-underline transition-colors duration-300 hover:text-[var(--text)]"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="#contact"
        className="font-[family-name:var(--font-dm-mono)] border border-[var(--accent)] bg-transparent px-6 py-2.5 text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--accent)] no-underline transition-all duration-300 hover:bg-[var(--accent)] hover:text-white"
      >
        Hire Me
      </Link>
    </nav>
  );
}
