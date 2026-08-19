export type Client = {
  id: string;
  userId: string | null;
  leadId: string | null;
  companyName: string | null;
  createdAt: string;
  updatedAt: string;
  user?: { id: string; name: string; email: string } | null;
  lead?: { id: string; name: string; email: string } | null;
  projects?: { id: string; title: string; status: string }[];
};

export type ClientFilters = {
  page?: number;
  limit?: number;
  search?: string;
};