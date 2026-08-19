import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { adminServicesApi } from "@/lib/api/admin-services";

import type {
  CreatePackageInput,
  CreateServiceInput,
  UpdateServiceInput,
} from "@/types/service";

import { ApiError } from "@/types/api";

import { revalidateMarketingPages } from "@/app/actions/revalidate";

export const serviceKeys = {
  all: ["admin-services"] as const,

  detail: (id: string) =>
    [...serviceKeys.all, "detail", id] as const,
};

export function useAdminServices() {
  return useQuery({
    queryKey: serviceKeys.all,
    queryFn: adminServicesApi.getAll,
  });
}

export function useAdminService(id: string) {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: () => adminServicesApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateServiceInput) =>
      adminServicesApi.create(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: serviceKeys.all,
      });

      await revalidateMarketingPages();

      toast.success("Service created successfully.");
    },

    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateService(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateServiceInput) =>
      adminServicesApi.update(id, payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: serviceKeys.all,
      });

      await queryClient.invalidateQueries({
        queryKey: serviceKeys.detail(id),
      });

      await revalidateMarketingPages();

      toast.success("Service updated successfully.");
    },

    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      adminServicesApi.delete(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: serviceKeys.all,
      });

      await revalidateMarketingPages();

      toast.success("Service deleted successfully.");
    },

    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}

export function useAddPackage(serviceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePackageInput) =>
      adminServicesApi.addPackage(serviceId, payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: serviceKeys.detail(serviceId),
      });

      await queryClient.invalidateQueries({
        queryKey: serviceKeys.all,
      });

      await revalidateMarketingPages();

      toast.success("Package added successfully.");
    },

    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}

export function useDeletePackage(serviceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (packageId: string) =>
      adminServicesApi.deletePackage(packageId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: serviceKeys.detail(serviceId),
      });

      await queryClient.invalidateQueries({
        queryKey: serviceKeys.all,
      });

      await revalidateMarketingPages();

      toast.success("Package removed successfully.");
    },

    onError: (error: ApiError) => {
      toast.error(error.message);
    },
  });
}