"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUploadProjectFile } from "@/hooks/use-project-files";

export function FileUploadButton({ projectId }: { projectId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUploadProjectFile(projectId);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) mutate(file);
          e.target.value = "";
        }}
      />
      <Button size="sm" variant="outline" onClick={() => inputRef.current?.click()} disabled={isPending}>
        <Upload className="mr-1 h-4 w-4" /> {isPending ? "Uploading..." : "Upload file"}
      </Button>
    </>
  );
}