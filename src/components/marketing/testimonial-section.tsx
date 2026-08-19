"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/shared/motion";
import type { Testimonial } from "@/types/testimonial";

export function TestimonialSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-y bg-secondary/20">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Loved by our clients</h2>
          <p className="mt-4 text-muted-foreground">Real feedback from teams we&apos;ve worked with.</p>
        </FadeIn>

        <StaggerGroup className="grid gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <StaggerItem key={t.id}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="glow-border flex h-full flex-col rounded-2xl border bg-card p-7"
              >
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">&quot;{t.content}&quot;</p>
                <div className="mt-6 flex items-center gap-3 border-t pt-4">
                  {t.avatarUrl ? (
                    <Image
                      src={t.avatarUrl}
                      alt={t.clientName}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {t.clientName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{t.clientName}</p>
                    {(t.role || t.company) && (
                      <p className="text-xs text-muted-foreground">{[t.role, t.company].filter(Boolean).join(" at ")}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}