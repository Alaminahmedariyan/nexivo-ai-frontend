import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const PEOPLE = [
  { initials: "AK", color: "bg-[oklch(0.7_0.17_280)]" },
  { initials: "MR", color: "bg-[oklch(0.7_0.14_200)]" },
  { initials: "SJ", color: "bg-[oklch(0.75_0.16_60)]" },
  { initials: "TH", color: "bg-[oklch(0.7_0.2_25)]" },
];

export function AvatarStack({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {PEOPLE.map((p) => (
          <Avatar key={p.initials} className="h-9 w-9 border-2 border-background">
            <AvatarFallback className={`${p.color} text-xs font-semibold text-white`}>
              {p.initials}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}