export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "TEAM_MEMBER"
  | "CLIENT"
  | "USER";

export type UserSortField =
  | "createdAt"
  | "name"
  | "email";

export type UserSortOrder = "asc" | "desc";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
  phone: string | null;
  isActive: boolean;
};

export type ManagedUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  phone: string | null;
  role: UserRole;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
};

export type UserFilters = {
  search?: string;
  role?: UserRole;
  isActive?: boolean;
  sortBy?: UserSortField;
  sortOrder?: UserSortOrder;
  page?: number;
  limit?: number;
};