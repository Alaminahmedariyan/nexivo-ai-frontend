export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUOTED"
  | "MEETING_SCHEDULED"
  | "NEGOTIATION"
  | "WON"
  | "LOST";

export type LeadSource =
  | "CONTACT_FORM"
  | "QUOTE_FORM"
  | "ORGANIC"
  | "GOOGLE"
  | "LINKEDIN"
  | "FACEBOOK"
  | "REFERRAL"
  | "OTHER";

export type BudgetRange =
  | "UNDER_1K"
  | "RANGE_1K_5K"
  | "RANGE_5K_10K"
  | "RANGE_10K_25K"
  | "ABOVE_25K"
  | "NOT_SURE";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceId: string | null;
  message: string;
  budget: BudgetRange;
  status: LeadStatus;
  source: LeadSource;
  assignedToId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateLeadInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceId?: string;
  message: string;
  budget?: BudgetRange;
  source?: LeadSource;
};

export type LeadSortField =
  | "createdAt"
  | "updatedAt"
  | "name"
  | "email"
  | "company"
  | "status";

export type LeadSortOrder = "asc" | "desc";

export type LeadFilters = {
  search?: string;
  status?: LeadStatus;
  source?: LeadSource;
  page?: number;
  limit?: number;
  sortBy?: LeadSortField;
  sortOrder?: LeadSortOrder;
};