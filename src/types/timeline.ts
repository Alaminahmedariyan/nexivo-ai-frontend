export type TimelineEntry = {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  statusDate: string;
  updatedBy: { id: string; name: string };
};

export type CreateTimelineInput = {
  title: string;
  description?: string;
  statusDate?: string;
};