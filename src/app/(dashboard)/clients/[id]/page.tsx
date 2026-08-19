"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useClient } from "@/hooks/use-clients";
import { Skeleton } from "@/components/ui/skeleton";
import { ClientInfoCard } from "@/components/dashboard/clients/client-info-card";
import { ClientProjectsList } from "@/components/dashboard/clients/client-projects-list";

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: client, isLoading, error } = useClient(id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error || !client) {
    return <p className="text-sm text-destructive">Client not found.</p>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/clients" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Clients
        </Link>
        <h1 className="text-xl font-semibold">{client.companyName ?? client.user?.name ?? "Client"}</h1>
      </div>

      <ClientInfoCard client={client} />
      <ClientProjectsList projects={client.projects} />
    </div>
  );
}