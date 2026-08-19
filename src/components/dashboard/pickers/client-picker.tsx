"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { clientsApi } from "@/lib/api/clients";
import { useDebouncedValue } from "@/hooks/use-devounced";

type ClientPickerProps = {
  value?: string;
  onChange: (clientId: string | undefined) => void;
  placeholder?: string;
};

export function ClientPicker({ value, onChange, placeholder = "Select a client..." }: ClientPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["client-picker", debouncedSearch],
    queryFn: () => clientsApi.getAll({ search: debouncedSearch || undefined, limit: 20 }),
    enabled: open,
  });

  const clients = data?.data ?? [];
  const selected = clients.find((c) => c.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          className="w-full justify-between font-normal"
        >
          <span className={cn("truncate", !selected && !value && "text-muted-foreground")}>
            {selected?.companyName ?? selected?.user?.name ?? selected?.lead?.name ?? (value ? "Selected client" : placeholder)}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search clients..." value={search} onValueChange={setSearch} />
          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <CommandEmpty>No clients found.</CommandEmpty>
                <CommandGroup>
                  {clients.map((client) => (
                    <CommandItem
                      key={client.id}
                      value={client.id}
                      onSelect={() => {
                        onChange(client.id === value ? undefined : client.id);
                        setOpen(false);
                      }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === client.id ? "opacity-100" : "opacity-0")} />
                      <div>
                        <p className="text-sm">{client.companyName ?? client.user?.name ?? client.lead?.name ?? "Unnamed client"}</p>
                        {(client.user?.email ?? client.lead?.email) && (
                          <p className="text-xs text-muted-foreground">{client.user?.email ?? client.lead?.email}</p>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}