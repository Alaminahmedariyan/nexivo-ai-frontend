import { create } from "zustand";

type SidebarStore = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

// Zustand is only for ephemeral UI state like this — server data
// (leads, projects...) always lives in TanStack Query's cache, never here.
export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));