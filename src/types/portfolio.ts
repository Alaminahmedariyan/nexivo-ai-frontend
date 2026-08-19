export type PortfolioImage = { id: string; url: string; alt: string | null; order: number };
export type Technology = { id: string; name: string; icon: string | null };

export type Portfolio = {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  liveUrl: string | null;
  isFeatured: boolean;
  order: number;
  images?: PortfolioImage[];
  technologies?: { technology: Technology }[];
  service?: { id: string; title: string; slug: string } | null;
};

export type CreatePortfolioInput = {
  title: string;
  description: string;
  thumbnail: string;
  liveUrl?: string;
  serviceId?: string;
  isFeatured?: boolean;
  order?: number;
  technologyIds?: string[];
};

export type UpdatePortfolioInput = Partial<CreatePortfolioInput>;