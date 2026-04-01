"use client";

import Link from "next/link";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#gear", label: "Gear/Process" },
  { href: "#contact", label: "Contact" },
  { href: "#signup", label: "Signup" },
];

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black/20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/50">
              AC MUSIC
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Thirty years of songs, finally heard.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/70">
              I&apos;ve been writing songs since the early &apos;90s. Most lived
              only in my head, on four-track tapes, or in demos that never went
              anywhere. Now, with AI as my co-producer, I&apos;m finally hearing
              them the way I always imagined. Not for the industry. For me,
              my family, and my children someday.
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-white/70">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
