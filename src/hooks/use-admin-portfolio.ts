import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  adminPortfolioApi,
  technologiesApi,
} from "@/lib/api/admin-portfolio";

import type {
  CreatePortfolioInput,
  UpdatePortfolioInput,
} from "@/types/portfolio";

import { ApiError } from "@/types/api";
import { revalidateMarketingPages } from "@/app/actions/revalidate";

const portfolioKeys = {
  all: ["admin-portfolio"] as const,

  detail: (slug: string) =>
    [...portfolioKeys.all, slug] as const,
};

export function useAdminPortfolios() {
  return useQuery({
    queryKey: portfolioKeys.all,
    queryFn: adminPortfolioApi.getAll,
  });
}

export function useAdminPortfolioDetail(slug: string) {
  return useQuery({
    queryKey: portfolioKeys.detail(slug),
    queryFn: () => adminPortfolioApi.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useTechnologies() {
  return useQuery({
    queryKey: ["technologies"],
    queryFn: technologiesApi.getAll,
  });
}

export function useCreatePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePortfolioInput) =>
      adminPortfolioApi.create(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.all,
      });

      revalidateMarketingPages();

      toast.success("Portfolio item created.");
    },

    onError: (error: ApiError) =>
      toast.error(error.message),
  });
}

export function useUpdatePortfolio(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePortfolioInput) =>
      adminPortfolioApi.update(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.all,
      });

      revalidateMarketingPages();

      toast.success("Portfolio item updated.");
    },

    onError: (error: ApiError) =>
      toast.error(error.message),
  });
}

export function useDeletePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      adminPortfolioApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: portfolioKeys.all,
      });

      revalidateMarketingPages();

      toast.success("Portfolio item deleted.");
    },

    onError: (error: ApiError) =>
      toast.error(error.message),
  });
}

export function useAddPortfolioImage(
  portfolioSlug: string,
  portfolioId: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      url: string;
      alt?: string;
      order?: number;
    }) =>
      adminPortfolioApi.addImage(
        portfolioId,
        payload,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          portfolioKeys.detail(portfolioSlug),
      });

      queryClient.invalidateQueries({
        queryKey: portfolioKeys.all,
      });

      revalidateMarketingPages();

      toast.success("Image added.");
    },

    onError: (error: ApiError) =>
      toast.error(error.message),
  });
}

export function useRemovePortfolioImage(
  portfolioSlug: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageId: string) =>
      adminPortfolioApi.removeImage(imageId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          portfolioKeys.detail(portfolioSlug),
      });

      queryClient.invalidateQueries({
        queryKey: portfolioKeys.all,
      });

      revalidateMarketingPages();

      toast.success("Image removed.");
    },

    onError: (error: ApiError) =>
      toast.error(error.message),
  });
}

export function useAddPortfolioTechnology(
  portfolioSlug: string,
  portfolioId: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (technologyId: string) =>
      adminPortfolioApi.addTechnology(
        portfolioId,
        technologyId,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          portfolioKeys.detail(portfolioSlug),
      });

      queryClient.invalidateQueries({
        queryKey: portfolioKeys.all,
      });

      revalidateMarketingPages();

      toast.success("Technology added.");
    },

    onError: (error: ApiError) =>
      toast.error(error.message),
  });
}

export function useRemovePortfolioTechnology(
  portfolioSlug: string,
  portfolioId: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (technologyId: string) =>
      adminPortfolioApi.removeTechnology(
        portfolioId,
        technologyId,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          portfolioKeys.detail(portfolioSlug),
      });

      queryClient.invalidateQueries({
        queryKey: portfolioKeys.all,
      });

      revalidateMarketingPages();

      toast.success("Technology removed.");
    },

    onError: (error: ApiError) =>
      toast.error(error.message),
  });
}