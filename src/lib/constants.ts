import type { UserRole } from "@/types/user";
import { LayoutDashboard, Target, Users, FolderKanban, Receipt, Layers, Briefcase, Star, MessageSquare, FileText, Activity, Workflow, Shield, Settings, KeyRound, type LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  group: string;
  roles: UserRole[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, group: "Overview", roles: ["SUPER_ADMIN", "ADMIN", "TEAM_MEMBER", "CLIENT"] },
  { label: "Leads", href: "/leads", icon: Target, group: "Workspace", roles: ["SUPER_ADMIN", "ADMIN", "TEAM_MEMBER"] },
  { label: "Clients", href: "/clients", icon: Users, group: "Workspace", roles: ["SUPER_ADMIN", "ADMIN", "TEAM_MEMBER"] },
  { label: "Projects", href: "/projects", icon: FolderKanban, group: "Workspace", roles: ["SUPER_ADMIN", "ADMIN", "TEAM_MEMBER", "CLIENT"] },
  { label: "Invoices", href: "/invoices", icon: Receipt, group: "Workspace", roles: ["SUPER_ADMIN", "ADMIN", "TEAM_MEMBER"] },
  { label: "My Invoices", href: "/my-invoices", icon: Receipt, group: "Workspace", roles: ["CLIENT"] },
  { label: "Services", href: "/dashboard/services", icon: Layers, group: "Content", roles: ["SUPER_ADMIN", "ADMIN"] },
  { label: "Portfolio", href: "/dashboard/portfolio", icon: Briefcase, group: "Content", roles: ["SUPER_ADMIN", "ADMIN"] },
  { label: "Testimonials", href: "/testimonials", icon: Star, group: "Content", roles: ["SUPER_ADMIN", "ADMIN"] },
  { label: "AI Chat", href: "/ai/chat", icon: MessageSquare, group: "AI", roles: ["SUPER_ADMIN", "ADMIN", "TEAM_MEMBER"] },
  { label: "AI Proposals", href: "/ai/proposals", icon: FileText, group: "AI", roles: ["SUPER_ADMIN", "ADMIN", "TEAM_MEMBER"] },
  { label: "AI Usage", href: "/ai/usage", icon: Activity, group: "AI", roles: ["SUPER_ADMIN", "ADMIN"] },
  { label: "Automations", href: "/ai/automations", icon: Workflow, group: "AI", roles: ["SUPER_ADMIN", "ADMIN", "TEAM_MEMBER"] },
  { label: "Users", href: "/users", icon: Shield, group: "Admin", roles: ["SUPER_ADMIN"] },
  { label: "Site Settings", href: "/settings/site", icon: Settings, group: "Admin", roles: ["SUPER_ADMIN", "ADMIN"] },
  { label: "API Keys", href: "/settings/api-keys", icon: KeyRound, group: "Admin", roles: ["SUPER_ADMIN"] },
];

export const LEAD_STATUS_LABELS: Record<string, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUOTED: "Quoted",
  MEETING_SCHEDULED: "Meeting Scheduled",
  NEGOTIATION: "Negotiation",
  WON: "Won",
  LOST: "Lost",
};

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  PLANNING: "Planning",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  COMPLETED: "Completed",
  ON_HOLD: "On Hold",
  CANCELLED: "Cancelled",
};

export const NOTIFICATION_TYPE_LABELS: Record<string, string> = {
  LEAD: "Lead",
  PROJECT: "Project",
  SYSTEM: "System",
  AI: "AI",
};