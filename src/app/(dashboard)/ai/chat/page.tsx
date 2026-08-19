"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddMessage, useConversation, useStartConversation } from "@/hooks/use-ai-conversations";
import { ChatMessageBubble } from "@/components/dashboard/ai/chat-message-bubble";
import { ConversationList } from "@/components/dashboard/ai/conversation-list";
import type { ChatRole } from "@/types/ai";

export default function AiChatPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [role, setRole] = useState<ChatRole>("user");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: conversation } = useConversation(activeId);
  const { mutate: startConversation, isPending: isStarting } = useStartConversation();
  const { mutate: addMessage, isPending: isSending } = useAddMessage(activeId);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages.length]);

  const handleSend = () => {
    if (!input.trim()) return;

    if (!activeId) {
      startConversation(
        { message: input },
        {
          onSuccess: (newConversation) => {
            setActiveId(newConversation.id);
            setInput("");
          },
        },
      );
      return;
    }

    addMessage({ role, content: input }, { onSuccess: () => setInput("") });
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      <div className="w-64 shrink-0 rounded-lg border">
        <div className="flex items-center justify-between border-b p-3">
          <p className="text-sm font-semibold">Conversations</p>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setActiveId(null)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ConversationList activeId={activeId} onSelect={setActiveId} />
      </div>

      <div className="flex flex-1 flex-col rounded-lg border">
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {!conversation ? (
            <p className="text-sm text-muted-foreground">Start a new conversation below.</p>
          ) : (
            conversation.messages.map((msg, i) => <ChatMessageBubble key={i} message={msg} />)
          )}
          <div ref={scrollRef} />
        </div>

        <div className="flex items-center gap-2 border-t p-3">
          <Select value={role} onValueChange={(v) => setRole(v as ChatRole)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">As User</SelectItem>
              <SelectItem value="assistant">As Assistant</SelectItem>
            </SelectContent>
          </Select>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            disabled={isStarting || isSending}
          />

          <Button onClick={handleSend} disabled={isStarting || isSending || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}