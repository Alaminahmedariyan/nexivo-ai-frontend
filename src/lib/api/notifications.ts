import { apiClient } from "./client";
import type { Notification } from "@/types/notification";

export const notificationsApi = {
  getAll: () => apiClient.get<Notification[]>("/v1/notifications"),
  getUnreadCount: () => apiClient.get<{ count: number }>("/v1/notifications/unread-count"),
  markAsRead: (id: string) => apiClient.patch<Notification>(`/v1/notifications/${id}/read`),
  markAllAsRead: () => apiClient.patch("/v1/notifications/read-all"),
};