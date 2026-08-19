export type NotificationType = "LEAD" | "PROJECT" | "SYSTEM" | "AI";
export type NotificationEntityType = "LEAD" | "PROJECT" | "MILESTONE" | "CLIENT" | "PROPOSAL";

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  entityType: NotificationEntityType | null;
  entityId: string | null;
  isRead: boolean;
  readAt: string | null;
  link: string | null;
  createdAt: string;
};