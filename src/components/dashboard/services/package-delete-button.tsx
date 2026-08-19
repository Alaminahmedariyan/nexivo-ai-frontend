"use client";

import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useDeletePackage } from "@/hooks/use-admin-services";

type PackageDeleteButtonProps = {
  serviceId: string;
  packageId: string;
  packageName: string;
};

export function PackageDeleteButton({
  serviceId,
  packageId,
  packageName,
}: PackageDeleteButtonProps) {
  const { mutate, isPending } = useDeletePackage(serviceId);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          className="h-8 w-8 shrink-0 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}

          <span className="sr-only">
            Delete {packageName}
          </span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete &quot;{packageName}&quot;?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will permanently remove this pricing package and its
            configured features. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={() => mutate(packageId)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "Deleting..." : "Delete Package"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}