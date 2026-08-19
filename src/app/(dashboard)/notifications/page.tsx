"use client";

import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { NOTIFICATION_TYPE_LABELS } from "@/lib/constants";
import { useMarkAllAsRead, useMarkAsRead, useNotifications } from "@/hooks/use-notifications";
import Link from "next/link";

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useNotifications();
  const { mutate: markAsRead } = useMarkAsRead();
  const { mutate: markAllAsRead, isPending } = useMarkAllAsRead();

  const hasUnread = notifications?.some((n) => !n.isRead);

  return (
    <div className="max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Notifications</h1>
        {hasUnread && (
          <button
            onClick={() => markAllAsRead()}
            disabled={isPending}
            className="text-sm text-muted-foreground hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : !notifications || notifications.length === 0 ? (
        <p className="text-sm text-muted-foreground">No notifications yet.</p>
      ) : (
        <div className="space-y-1">
          {notifications.map((notification) => {
            const content = (
              <div
                className={cn(
                  "flex gap-3 rounded-md border p-4 text-sm",
                  !notification.isRead && "border-primary/30 bg-accent/30",
                )}
                onClick={() => !notification.isRead && markAsRead(notification.id)}
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="font-medium">{notification.title}</p>
                    <Badge variant="outline" className="text-[10px]">
                      {NOTIFICATION_TYPE_LABELS[notification.type] ?? notification.type}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{notification.message}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            );

            return notification.link ? (
              <Link key={notification.id} href={notification.link} className="block">
                {content}
              </Link>
            ) : (
              <div key={notification.id}>{content}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
