import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";

import { publicPortfolioApi } from "@/lib/api/public/portfolio";
import { PageHero } from "@/components/marketing/page-hero";
import {
  FadeIn,
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/motion";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const portfolio = await publicPortfolioApi.getBySlug(slug);

    return {
      title: `${portfolio.title} | Nexivo AI`,
      description: portfolio.description.slice(0, 160),
    };
  } catch {
    return {
      title: "Project Not Found",
    };
  }
}

export default async function PortfolioDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  let portfolio;

  try {
    portfolio = await publicPortfolioApi.getBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div>
      <PageHero
        icon="briefcase"
        eyebrow={portfolio.service?.title ?? "Case study"}
        title={portfolio.title}
        subtitle={portfolio.description}
      />

      <div className="mx-auto max-w-4xl px-4 py-16">
        <FadeIn className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-secondary/30 p-5">
          <div className="flex flex-wrap gap-2">
            {(portfolio.technologies ?? []).map(
              ({ technology }) => (
                <span
                  key={technology.id}
                  className="rounded-full border bg-card px-3 py-1 text-xs font-medium"
                >
                  {technology.name}
                </span>
              ),
            )}
          </div>

          {portfolio.liveUrl && (
            <a
              href={portfolio.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              View live site
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </FadeIn>

        {portfolio.images && portfolio.images.length > 0 && (
          <StaggerGroup className="mt-10 space-y-6">
            {portfolio.images.map((image) => (
              <StaggerItem key={image.id}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border shadow-lg">
                  <Image
                    src={image.url}
                    alt={image.alt ?? portfolio.title}
                    fill
                    sizes="(max-width: 896px) 100vw, 896px"
                    className="object-cover"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}

        <FadeIn className="mt-16 flex flex-col items-center rounded-2xl border bg-secondary/20 p-10 text-center">
          <p className="text-lg font-semibold">
            Want something like this for your business?
          </p>

          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-1 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Start your project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}