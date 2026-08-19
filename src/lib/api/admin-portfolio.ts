import { apiClient } from "./client";

import type {
  CreatePortfolioInput,
  Portfolio,
  Technology,
  UpdatePortfolioInput,
} from "@/types/portfolio";

export const adminPortfolioApi = {
  getAll: () =>
    apiClient.get<Portfolio[]>("/v1/portfolios?limit=50"),

  getBySlug: (slug: string) =>
    apiClient.get<Portfolio>(
      `/v1/portfolios/slug/${slug}`,
    ),

  create: (payload: CreatePortfolioInput) =>
    apiClient.post<Portfolio>(
      "/v1/portfolios",
      payload,
    ),

  update: (
    id: string,
    payload: UpdatePortfolioInput,
  ) =>
    apiClient.patch<Portfolio>(
      `/v1/portfolios/${id}`,
      payload,
    ),

  delete: (id: string) =>
    apiClient.delete(`/v1/portfolios/${id}`),

  addImage: (
    portfolioId: string,
    payload: {
      url: string;
      alt?: string;
      order?: number;
    },
  ) =>
    apiClient.post(
      `/v1/portfolios/${portfolioId}/images`,
      payload,
    ),

  removeImage: (imageId: string) =>
    apiClient.delete(
      `/v1/portfolios/images/${imageId}`,
    ),

  addTechnology: (
    portfolioId: string,
    technologyId: string,
  ) =>
    apiClient.post(
      `/v1/portfolios/${portfolioId}/technologies/${technologyId}`,
    ),

  removeTechnology: (
    portfolioId: string,
    technologyId: string,
  ) =>
    apiClient.delete(
      `/v1/portfolios/${portfolioId}/technologies/${technologyId}`,
    ),
};

export const technologiesApi = {
  getAll: () =>
    apiClient.get<Technology[]>("/v1/technologies"),
};