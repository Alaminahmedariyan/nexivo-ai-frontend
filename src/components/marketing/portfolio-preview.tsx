"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/shared/motion";
import type { Portfolio } from "@/types/portfolio";

export function PortfolioPreview({ portfolios }: { portfolios: Portfolio[] }) {
  if (portfolios.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <FadeIn className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Recent work</h2>
          <p className="mt-2 text-muted-foreground">A glimpse into what we&apos;ve shipped recently.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/portfolio">
            View all work <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </FadeIn>

      <StaggerGroup className="grid gap-5 md:grid-cols-3">
        {portfolios.slice(0, 3).map((portfolio) => (
          <StaggerItem key={portfolio.id}>
            <Link href={`/portfolio/${portfolio.slug}`} className="group block">
              <div className="relative aspect-video overflow-hidden rounded-2xl border">
                <Image
                  src={portfolio.thumbnail}
                  alt={portfolio.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="mt-3 font-medium">{portfolio.title}</h3>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}