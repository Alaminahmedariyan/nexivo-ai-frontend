"use client";

import { format } from "date-fns";
import { useAdminApiKeys, useRevokeApiKey } from "@/hooks/use-admin-api-keys";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { CreateApiKeyDialog } from "@/components/dashboard/api-keys/create-api-key-dialog";

export default function ApiKeysPage() {
  const { data: apiKeys, isLoading, error } = useAdminApiKeys();
  const { mutate: revoke, isPending: isRevoking } = useRevokeApiKey();

  if (error) return <p className="text-sm text-destructive">Failed to load API keys.</p>;

  return (
    <div className="max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">API Keys</h1>
        <CreateApiKeyDialog />
      </div>

      {isLoading ? (
        <Skeleton className="h-40 w-full" />
      ) : !apiKeys || apiKeys.length === 0 ? (
        <p className="text-sm text-muted-foreground">No API keys yet.</p>
      ) : (
        <div className="space-y-3">
          {apiKeys.map((key) => (
            <Card key={key.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{key.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {key.prefix}••••••• — Created {format(new Date(key.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {key.isActive ? <Badge>Active</Badge> : <Badge variant="outline">Revoked</Badge>}
                  {key.isActive && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost">Revoke</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Revoke this API key?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Any automation tool using &quot;{key.name}&quot; will stop working
                            immediately. This cannot be undone from here — you&apos;d need to
                            create a new key.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={isRevoking}
                            onClick={() => revoke(key.id)}
                          >
                            Revoke
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}