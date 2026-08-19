import { apiClient } from "./client";
import type { SessionUser } from "@/types/user";

export type UpdateProfileInput = {
  name?: string;
  phone?: string;
  image?: File | null;
};

export const userApi = {
  getMe: () => apiClient.get<SessionUser & { phone: string | null }>("/v1/users/me"),

  updateMe: (payload: UpdateProfileInput) => {
    // Backend expects multipart/form-data (multer's imageUpload.single("image")),
    // so text fields + the file all go through FormData instead of JSON —
    // JSON.stringify can't carry a File/binary payload.
    const formData = new FormData();

    if (payload.name !== undefined) {
      formData.append("name", payload.name);
    }
    if (payload.phone !== undefined) {
      formData.append("phone", payload.phone);
    }
    if (payload.image) {
      formData.append("image", payload.image);
    }

    return apiClient.patch<SessionUser>("/v1/users/me", formData);
  },
};