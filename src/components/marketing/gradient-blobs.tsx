export function GradientBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="animate-blob absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary/25 blur-[100px]" />
      <div className="animate-blob-slow absolute top-20 right-1/4 h-80 w-80 rounded-full bg-[oklch(0.65_0.17_200/0.2)] blur-[100px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-[size:32px_32px] opacity-40" />
    </div>
  );
}