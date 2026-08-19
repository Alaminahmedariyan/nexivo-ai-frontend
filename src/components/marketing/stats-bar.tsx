import { CountUp } from "@/components/shared/count-up";
import { StaggerGroup, StaggerItem } from "@/components/shared/motion";

const STATS = [
  { value: 40, suffix: "+", label: "Projects delivered" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 3, suffix: "x", label: "Faster with AI tooling" },
  { value: 24, suffix: "/7", label: "Support & monitoring" },
];

export function StatsBar() {
  return (
    <section className="border-b bg-secondary/30">
      <StaggerGroup className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
        {STATS.map((stat) => (
          <StaggerItem key={stat.label} className="text-center">
            <p className="text-3xl font-bold tracking-tight md:text-4xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}