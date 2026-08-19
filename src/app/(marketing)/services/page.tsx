import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { publicServicesApi } from "@/lib/api/public/services";
import { PageHero } from "@/components/marketing/page-hero";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/motion";

export const metadata: Metadata = {
  title: "Services | Nexivo AI",
  description:
    "Explore our web development, AI automation, and design services.",
};

export default async function ServicesPage() {
  const services = await publicServicesApi.getAll();

  return (
    <div>
      <PageHero
        icon="layers"
        eyebrow="What we offer"
        title="Services built to move fast"
        subtitle="From landing pages to full AI-powered platforms — every engagement is scoped around clear milestones and real outcomes."
      />

      <div className="mx-auto max-w-6xl px-4 py-20">
        {services.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No services published yet.
          </p>
        ) : (
          <StaggerGroup className="grid gap-5 md:grid-cols-2">
            {services.map((service, i) => (
              <StaggerItem key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  className="glow-border group flex h-full flex-col rounded-2xl border bg-card p-7"
                >
                  <span className="text-sm font-medium text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h2 className="mt-3 text-xl font-semibold">
                    {service.title}
                  </h2>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    View details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </div>
  );
}