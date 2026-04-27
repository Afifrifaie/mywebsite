"use client";

import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-3xl px-4">
      <nav className="flex items-center justify-between rounded-full border border-border bg-surface/80 px-5 py-2.5 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.1)] backdrop-blur-md">
        <Link
          href="#top"
          className="font-display text-base font-semibold tracking-tight text-foreground"
        >
          Afif<span className="text-accent">.</span>
        </Link>
        <ul className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-3 py-1.5 text-muted transition-colors hover:bg-accent-50 hover:text-accent"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
