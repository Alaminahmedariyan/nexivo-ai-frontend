export type Testimonial = {
  id: string;
  clientId: string | null;
  clientName: string;
  role: string | null;
  company: string | null;
  avatarUrl: string | null;
  content: string;
  rating: number;
  isFeatured: boolean;
  order: number;
  createdAt: string;
};

export type CreateTestimonialInput = {
  clientId?: string;
  clientName: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  content: string;
  rating?: number;
  isFeatured?: boolean;
  order?: number;
};

export type UpdateTestimonialInput = Partial<CreateTestimonialInput>;