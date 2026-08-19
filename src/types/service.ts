export type ServiceFeature = {
  label: string;
  icon?: string;
  highlight?: boolean;
};

export type ServicePackage = {
  id: string;
  serviceId?: string;
  name: string;
  price: string;
  features: ServiceFeature[];
  order: number;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string | null;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
  packages?: ServicePackage[];
};

export type CreateServiceInput = {
  title: string;
  description: string;
  icon?: string;
  order?: number;
};

export type UpdateServiceInput = Partial<{
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}>;

export type CreatePackageInput = {
  name: string;
  price: number;
  features: ServiceFeature[];
  order?: number;
};