export type FileCategory = "IMAGE" | "DOCUMENT" | "VIDEO" | "ARCHIVE" | "OTHER";

export type ProjectFile = {
  id: string;
  projectId: string;
  url: string;
  name: string;
  category: FileCategory;
  mimeType: string;
  size: number;
  uploadedAt: string;
  uploadedBy: { id: string; name: string } | null;
};