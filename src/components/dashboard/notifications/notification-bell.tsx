"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMarkAllAsRead, useNotifications, useUnreadCount } from "@/hooks/use-notifications";
import { NotificationItem } from "./notification-item";

export function NotificationBell() {
  const { data: notifications, isLoading } = useNotifications();
  const { data: unread } = useUnreadCount();
  const { mutate: markAllAsRead, isPending } = useMarkAllAsRead();

  const count = unread?.count ?? 0;
  const recent = notifications?.slice(0, 8) ?? [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          {count > 0 && (
            <Badge className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full p-0.5 text-[10px]">
              {count > 9 ? "9+" : count}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <p className="text-sm font-semibold">Notifications</p>
          {count > 0 && (
            <button
              onClick={() => markAllAsRead()}
              disabled={isPending}
              className="text-xs text-muted-foreground hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        <ScrollArea className="h-80">
          {isLoading ? (
            <p className="p-4 text-center text-sm text-muted-foreground">Loading...</p>
          ) : recent.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">No notifications yet.</p>
          ) : (
            <div className="p-1">
              {recent.map((n) => (
                <NotificationItem key={n.id} notification={n} />
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="border-t p-2 text-center">
          <Link href="/notifications" className="text-xs text-muted-foreground hover:underline">
            View all
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}