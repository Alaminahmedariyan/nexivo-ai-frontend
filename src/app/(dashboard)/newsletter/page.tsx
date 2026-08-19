"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Mail } from "lucide-react";
import { useAdminNewsletterSubscribers } from "@/hooks/use-newsletter";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewsletterPage() {
  const [filter, setFilter] = useState<string>("ALL");
  const isActive = filter === "ALL" ? undefined : filter === "true";

  const { data: subscribers, isLoading, error } = useAdminNewsletterSubscribers(isActive);

  if (error) return <p className="text-sm text-destructive">Failed to load subscribers.</p>;

  return (
    <div className="max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Newsletter Subscribers</h1>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Unsubscribed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : !subscribers || subscribers.length === 0 ? (
        <p className="text-sm text-muted-foreground">No subscribers yet.</p>
      ) : (
        <div className="space-y-2">
          {subscribers.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{sub.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {format(new Date(sub.createdAt), "MMM d, yyyy")}
                </span>
                <Badge variant={sub.isActive ? "default" : "outline"}>
                  {sub.isActive ? "Active" : "Unsubscribed"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}