"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { authClient } from "@/lib/auth/auth-client";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { NotificationBell } from "@/components/dashboard/notifications/notification-bell";
import { NAV_ITEMS } from "@/lib/constants";
import type { SessionUser } from "@/types/user";

export function Topbar({ user }: { user: SessionUser }) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(user.role),
  );

  const results =
    query.trim().length > 0
      ? visibleItems.filter((item) =>
          item.label
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        )
      : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
  }, []);

  const handleSelect = (href: string) => {
    router.push(href);
    setQuery("");
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleLogout = async () => {
    await authClient.signOut();

    router.push("/login");
    router.refresh();
  };

  const initials =
    user.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border/60 bg-background/70 px-6 py-3 backdrop-blur-xl [box-shadow:0_1px_0_0_rgba(0,0,0,0.02),0_4px_16px_-8px_rgba(0,0,0,0.06)]">
      {/* Search */}
      <div
        ref={containerRef}
        className="relative hidden md:block md:w-72"
      >
        <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/30 px-3 py-1.5 text-sm text-muted-foreground transition-colors focus-within:border-primary/50 focus-within:bg-background hover:border-border">
          <Search className="h-3.5 w-3.5 shrink-0" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search..."
            className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
          />

          {!query && (
            <kbd className="ml-auto shrink-0 rounded border border-border/60 bg-background px-1.5 py-0.5 text-[10px] font-medium">
              ⌘K
            </kbd>
          )}
        </div>

        {isOpen && query.trim().length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-border/60 bg-popover shadow-lg">
            {results.length > 0 ? (
              <ul className="max-h-72 overflow-y-auto py-1">
                {results.map((item) => (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item.href)}
                      className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-secondary/60"
                    >
                      <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-3 text-sm text-muted-foreground">
                No results for &quot;{query}&quot;
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-1.5">
        <div className="rounded-lg p-1.5 transition-colors hover:bg-secondary/60">
          <NotificationBell />
        </div>

        <div className="rounded-lg p-1.5 transition-colors hover:bg-secondary/60">
          <ThemeToggle />
        </div>

        <div className="mx-1 h-6 w-px bg-border/60" />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2.5 transition-colors hover:bg-secondary/60">
            <Avatar className="h-8 w-8 ring-2 ring-transparent ring-offset-2 ring-offset-background transition-all hover:ring-primary/30">
              <AvatarImage
                src={user.image ?? undefined}
                alt={user.name}
              />

              <AvatarFallback className="bg-gradient-to-br from-primary/90 to-primary/60 font-semibold text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>

            <span className="text-sm font-medium">
              {user.name}
            </span>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48 rounded-xl"
          >
            <DropdownMenuItem
              onClick={() =>
                router.push("/settings/profile")
              }
            >
              My Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}