"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { useMarkAsRead } from "@/hooks/use-notifications";
import type { Notification } from "@/types/notification";

export function NotificationItem({ notification }: { notification: Notification }) {
  const { mutate: markAsRead } = useMarkAsRead();

  const content = (
    <div
      className={cn(
        "flex gap-3 rounded-md p-3 text-sm hover:bg-secondary/50",
        !notification.isRead && "bg-accent/40",
      )}
      onClick={() => !notification.isRead && markAsRead(notification.id)}
    >
      <div className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", !notification.isRead ? "bg-primary" : "bg-transparent")} />
      <div className="flex-1">
        <p className="font-medium">{notification.title}</p>
        <p className="text-muted-foreground">{notification.message}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );

  return notification.link ? (
    <Link href={notification.link} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}