import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { publicServicesApi } from "@/lib/api/public/services";
import { PageHero } from "@/components/marketing/page-hero";
import {
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/motion";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const service = await publicServicesApi.getBySlug(slug);

    return {
      title: `${service.title} | Nexivo AI`,
      description: service.description.slice(0, 160),
    };
  } catch {
    return {
      title: "Service Not Found",
    };
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  let service;

  try {
    service = await publicServicesApi.getBySlug(slug);
  } catch {
    notFound();
  }

  const packages = service.packages ?? [];
  const middleIndex = Math.floor(packages.length / 2);

  return (
    <div>
      <PageHero
        icon="layers"
        eyebrow="Service"
        title={service.title}
        subtitle={service.description}
      />

      {packages.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 py-20">
          <StaggerGroup className="grid gap-6 md:grid-cols-3">
            {packages.map((pkg, i) => {
              const isRecommended =
                i === middleIndex && packages.length > 1;

              return (
                <StaggerItem key={pkg.id}>
                  <div
                    className={cn(
                      "relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300",
                      isRecommended
                        ? "border-primary bg-card shadow-xl shadow-primary/15 md:-translate-y-3"
                        : "glow-border bg-card",
                    )}
                  >
                    {isRecommended && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Most popular
                      </span>
                    )}

                    <h3 className="text-lg font-semibold">
                      {pkg.name}
                    </h3>

                    <p className="mt-2 text-3xl font-bold tracking-tight">
                      ${pkg.price}
                      <span className="text-sm font-normal text-muted-foreground">
                        {" "}
                        one-time
                      </span>
                    </p>

                    <ul className="mt-6 flex-1 space-y-3">
                      {pkg.features.map((feature, fi) => (
                        <li
                          key={fi}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                          <span
                            className={
                              feature.highlight
                                ? "font-medium"
                                : "text-muted-foreground"
                            }
                          >
                            {feature.label}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className={cn(
                        "mt-6 inline-flex items-center justify-center gap-1 rounded-md px-4 py-2.5 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]",
                        isRecommended
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "border bg-secondary/50 text-foreground hover:bg-secondary",
                      )}
                    >
                      Get started
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      )}

      <div className="border-t bg-secondary/20 py-16 text-center">
        <p className="text-muted-foreground">
          Not sure which package fits?
        </p>

        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-1 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Talk to us
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}