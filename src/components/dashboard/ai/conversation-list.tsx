"use client";

import { cn } from "@/lib/utils";
import { useConversations } from "@/hooks/use-ai-conversations";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

type ConversationListProps = {
  activeId: string | null;
  onSelect: (id: string) => void;
};

export function ConversationList({ activeId, onSelect }: ConversationListProps) {
  const { data, isLoading } = useConversations({ limit: 30 });
  const conversations = data?.data ?? [];

  return (
    <ScrollArea className="h-full">
      <div className="space-y-1 p-2">
        {isLoading ? (
          <Skeleton className="h-40 w-full" />
        ) : conversations.length === 0 ? (
          <p className="p-2 text-sm text-muted-foreground">No conversations yet.</p>
        ) : (
          conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={cn(
                "block w-full truncate rounded-md p-2 text-left text-sm hover:bg-secondary/50",
                activeId === c.id && "bg-secondary font-medium",
              )}
            >
              {c.title ?? "Untitled conversation"}
            </button>
          ))
        )}
      </div>
    </ScrollArea>
  );
}