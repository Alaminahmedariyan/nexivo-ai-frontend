import { publicServicesApi } from "@/lib/api/public/services";
import { publicPortfolioApi } from "@/lib/api/public/portfolio";
import { publicTestimonialsApi } from "@/lib/api/public/testimonials";

import { HeroSection } from "@/components/marketing/hero-section";
import { StatsBar } from "@/components/marketing/stats-bar";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { PortfolioPreview } from "@/components/marketing/portfolio-preview";
import { TestimonialSection } from "@/components/marketing/testimonial-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { ServicesShowcase } from "@/components/marketing/services-showcase";

export default async function HomePage() {
  const [services, portfolios, testimonials] = await Promise.all([
    publicServicesApi.getAll(),
    publicPortfolioApi.getAll(),
    publicTestimonialsApi.getFeatured().catch(() => []),
  ]);

  const featuredPortfolios = portfolios.filter((p) => p.isFeatured);
  const portfolioToShow = featuredPortfolios.length > 0 ? featuredPortfolios : portfolios;

  return (
    <div>
      <HeroSection />
      <StatsBar />
      <FeatureGrid />
      <ServicesShowcase services={services} />
      <PortfolioPreview portfolios={portfolioToShow} />
      <TestimonialSection testimonials={testimonials} />
      <FaqSection />
      <CtaBanner />
    </div>
  );
}