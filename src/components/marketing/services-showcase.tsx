"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/shared/motion";
import type { Service } from "@/types/service";

export function ServicesShowcase({ services }: { services: Service[] }) {
  return (
    <section className="border-y bg-secondary/20">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What we build for you</h2>
          <p className="mt-4 text-muted-foreground">
            From landing pages to full-scale platforms — pick a service, or let us design a custom package.
          </p>
        </FadeIn>

        <StaggerGroup className="grid gap-5 md:grid-cols-3">
          {services.slice(0, 3).map((service, i) => (
            <StaggerItem key={service.id}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                <Link href={`/services/${service.slug}`} className="glow-border group flex h-full flex-col rounded-2xl border bg-card p-7">
                  <span className="text-sm font-medium text-primary">0{i + 1}</span>
                  <h3 className="mt-3 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">{service.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {services.length === 0 && <p className="text-center text-sm text-muted-foreground">Services coming soon.</p>}
      </div>
    </section>
  );
}