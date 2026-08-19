"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import type { SessionUser } from "@/types/user";

export function Sidebar({ user }: { user: SessionUser }) {
  const pathname = usePathname();
  const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(user.role));

  // Preserve first-seen group order (Overview, Workspace, Content, AI, Admin)
  // instead of alphabetical, so the sidebar reads top-to-bottom logically.
  const groups: string[] = [];
  for (const item of visibleItems) {
    if (!groups.includes(item.group)) groups.push(item.group);
  }

  return (
    <aside className="relative flex w-64 shrink-0 flex-col border-r border-border/60 bg-gradient-to-b from-secondary/20 via-secondary/10 to-transparent">
      {/* subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/[0.07] to-transparent" />

      <Link
        href="/"
        className="relative flex items-center gap-2.5 px-5 py-6 transition-opacity hover:opacity-80"
      >
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 ring-1 ring-primary/20">
          N
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
        </div>
        <p className="text-base font-semibold tracking-tight">
          Nexivo <span className="text-primary">AI</span>
        </p>
      </Link>

      <nav className="relative flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        {groups.map((group) => (
          <div key={group}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
              {group}
            </p>
            <div className="space-y-0.5">
              {visibleItems
                .filter((item) => item.group === group)
                .map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors duration-200",
                        isActive
                          ? "font-medium text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active-pill"
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/[0.12] to-primary/[0.03]"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        >
                          <div className="absolute inset-y-1 left-0 w-[3px] rounded-full bg-primary" />
                        </motion.div>
                      )}
                      <item.icon
                        className={cn(
                          "relative z-10 h-4 w-4 shrink-0 transition-transform duration-200",
                          isActive ? "text-primary" : "group-hover:scale-110",
                        )}
                      />
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>

      {/* bottom fade so scroll feels premium, not abrupt */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background/80 to-transparent" />
    </aside>
  );
}