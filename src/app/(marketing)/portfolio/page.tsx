import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { publicPortfolioApi } from "@/lib/api/public/portfolio";
import { PageHero } from "@/components/marketing/page-hero";
import { StaggerGroup, StaggerItem } from "@/components/shared/motion";

export const metadata: Metadata = { 
  title: "Portfolio | Nexivo AI" 
};

export default async function PortfolioPage() {
  const portfolios = await publicPortfolioApi.getAll().catch(() => []);

  return (
    <div>
      <PageHero
        icon="briefcase"
        eyebrow="Our work"
        title="Projects we're proud of"
        subtitle="A selection of products, platforms, and experiences we've shipped for our clients."
      />

      <div className="mx-auto max-w-6xl px-4 py-20">
        {portfolios.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No projects published yet.
          </p>
        ) : (
          <StaggerGroup className="grid gap-6 md:grid-cols-3">
            {portfolios.map((portfolio) => (
              <StaggerItem key={portfolio.id}>
                <Link href={`/portfolio/${portfolio.slug}`} className="group block">
                  <div className="relative aspect-video overflow-hidden rounded-2xl border">
                    <Image
                      src={portfolio.thumbnail}
                      alt={portfolio.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    
                    {portfolio.isFeatured && (
                      <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-medium text-primary-foreground">
                        Featured
                      </span>
                    )}
                  </div>

                  <h2 className="mt-3 font-medium transition-colors group-hover:text-primary">
                    {portfolio.title}
                  </h2>

                  {portfolio.service && (
                    <p className="text-sm text-muted-foreground">
                      {portfolio.service.title}
                    </p>
                  )}
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </div>
  );
}