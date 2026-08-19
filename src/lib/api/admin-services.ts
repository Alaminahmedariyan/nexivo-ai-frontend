import { apiClient } from "./client";

import type {
  CreatePackageInput,
  CreateServiceInput,
  Service,
  ServicePackage,
  UpdateServiceInput,
} from "@/types/service";

export const adminServicesApi = {
  getAll: () =>
    apiClient.get<Service[]>("/v1/services?limit=50"),

  getById: (id: string) =>
    apiClient.get<Service>(`/v1/services/${id}`),

  create: (payload: CreateServiceInput) =>
    apiClient.post<Service>("/v1/services", payload),

  update: (id: string, payload: UpdateServiceInput) =>
    apiClient.patch<Service>(`/v1/services/${id}`, payload),

  delete: (id: string) =>
    apiClient.delete(`/v1/services/${id}`),

  addPackage: (serviceId: string, payload: CreatePackageInput) =>
    apiClient.post<ServicePackage>(
      `/v1/services/${serviceId}/packages`,
      payload,
    ),

  deletePackage: (packageId: string) =>
    apiClient.delete(`/v1/services/packages/${packageId}`),
};