"use client";

import { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Overview", suffix: "" },
  { label: "Milestones", suffix: "/milestones" },
  { label: "Timeline", suffix: "/timeline" },
  { label: "Files", suffix: "/files" },
];

export default function ProjectDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const pathname = usePathname();
  const base = `/projects/${id}`;

  return (
    <div>
      <nav className="mb-4 flex gap-1 border-b">
        {TABS.map((tab) => {
          const href = `${base}${tab.suffix}`;
          const isActive = pathname === href;
          return (
            <Link
              key={tab.label}
              href={href}
              className={cn(
                "border-b-2 px-3 pb-2 text-sm",
                isActive
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
      {children}
    </div>
  );
}