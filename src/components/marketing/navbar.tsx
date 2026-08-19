"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { NavAuthAction } from "./nav-auth-action";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ companyName }: { companyName: string }) {
  const pathname = usePathname();

  return (
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-[9999]
        w-full
        border-b
        border-border/40
        bg-background/85
        backdrop-blur-2xl
      "
    >
      <div className="site-container">
        <div className="flex h-[68px] items-center justify-between md:h-[72px]">

          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2 text-base font-semibold tracking-tight sm:text-lg"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="
                  absolute inset-0 rounded-full bg-primary
                  transition-all duration-300
                  group-hover:scale-125
                  group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.5)]
                "
              />
            </span>

            <span className="transition-opacity duration-300 group-hover:opacity-75">
              {companyName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={isActive}
                  className="nav-link"
                >
                  <span className="nav-link__glow" />

                  <span className="nav-link__indicator">
                    <span />
                  </span>

                  <span className="nav-link__text">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <NavAuthAction />
          </div>
        </div>
      </div>
    </header>
  );
}