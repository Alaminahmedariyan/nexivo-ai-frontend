"use client";

import { use } from "react";
import { useMemo, useState } from "react";
import { Trash2, FileIcon, Search, X } from "lucide-react";
import { format } from "date-fns";

import { useSession } from "@/lib/auth/auth-client";
import {
  useDeleteProjectFile,
  useProjectFiles,
} from "@/hooks/use-project-files";
import { useMyProject } from "@/hooks/use-projects";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUploadButton } from "@/components/dashboard/projects/file-upload-button";

import type { ProjectFile } from "@/types/project-file";
import type { UserRole } from "@/types/user";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileRow({
  file,
  onDelete,
}: {
  file: Pick<
    ProjectFile,
    "id" | "name" | "url" | "size" | "uploadedAt"
  >;
  onDelete?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border p-3">
      <FileIcon className="h-5 w-5 shrink-0 text-muted-foreground" />

      <div className="flex-1 overflow-hidden">
        <a
          href={file.url}
          target="_blank"
          rel="noreferrer"
          className="block truncate text-sm font-medium hover:underline"
        >
          {file.name}
        </a>

        <p className="text-xs text-muted-foreground">
          {formatSize(file.size)} —{" "}
          {format(new Date(file.uploadedAt), "MMM d, yyyy")}
        </p>
      </div>

      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          aria-label={`Delete ${file.name}`}
        >
          <Trash2 className="h-4 w-4 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}

function FileSearch({
  value,
  onChange,
  resultCount,
  totalCount,
}: {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search files..."
          className="pl-9 pr-9"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {value && (
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {resultCount} of {totalCount}
        </span>
      )}
    </div>
  );
}

function AdminFilesView({ id }: { id: string }) {
  const { data: files, isLoading } = useProjectFiles(id);
  const { mutate: deleteFile } = useDeleteProjectFile(id);

  const [search, setSearch] = useState("");

  const filteredFiles = useMemo(() => {
    if (!files) return [];

    const query = search.trim().toLowerCase();

    if (!query) return files;

    return files.filter((file) =>
      file.name.toLowerCase().includes(query),
    );
  }, [files, search]);

  return (
    <Card className="max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Files</CardTitle>

        <FileUploadButton projectId={id} />
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : !files || files.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No files uploaded yet.
          </p>
        ) : (
          <>
            <FileSearch
              value={search}
              onChange={setSearch}
              resultCount={filteredFiles.length}
              totalCount={files.length}
            />

            {filteredFiles.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No files found for &quot;{search}&quot;.
              </p>
            ) : (
              <div className="space-y-2">
                {filteredFiles.map((file) => (
                  <FileRow
                    key={file.id}
                    file={file}
                    onDelete={() => deleteFile(file.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

function ClientFilesView({ id }: { id: string }) {
  const { data: project, isLoading } = useMyProject(id);

  const [search, setSearch] = useState("");

  const filteredFiles = useMemo(() => {
    const files = project?.files ?? [];
    const query = search.trim().toLowerCase();

    if (!query) return files;

    return files.filter((file) =>
      file.name.toLowerCase().includes(query),
    );
  }, [project?.files, search]);

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Files</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : !project?.files || project.files.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No files shared yet.
          </p>
        ) : (
          <>
            <FileSearch
              value={search}
              onChange={setSearch}
              resultCount={filteredFiles.length}
              totalCount={project.files.length}
            />

            {filteredFiles.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No files found for &quot;{search}&quot;.
              </p>
            ) : (
              <div className="space-y-2">
                {filteredFiles.map((file) => (
                  <FileRow key={file.id} file={file} />
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function ProjectFilesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: session, isPending } = useSession();

  if (isPending) {
    return <Skeleton className="h-40 w-full" />;
  }

  const userRole = (
    session?.user as {
      role?: UserRole;
    }
  )?.role;

  return userRole === "CLIENT" ? (
    <ClientFilesView id={id} />
  ) : (
    <AdminFilesView id={id} />
  );
}