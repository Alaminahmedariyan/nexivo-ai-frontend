import { apiClient } from "./client";
import type { SessionUser } from "@/types/user";

export type UpdateProfileInput = {
  name?: string;
  phone?: string;
  image?: File | null;
};

export const profileApi = {
  getMe: () =>
    apiClient.get<SessionUser>("/v1/users/me"),

  update: (payload: UpdateProfileInput) => {
    const formData = new FormData();

    const data: {
      name?: string;
      phone?: string;
    } = {};

    if (payload.name !== undefined) {
      data.name = payload.name;
    }

    if (payload.phone !== undefined) {
      data.phone = payload.phone;
    }

    formData.append("data", JSON.stringify(data));

    if (payload.image) {
      formData.append("image", payload.image);
    }

    return apiClient.patch<SessionUser>(
      "/v1/users/me",
      formData,
    );
  },
};