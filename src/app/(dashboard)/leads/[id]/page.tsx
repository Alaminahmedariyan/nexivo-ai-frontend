"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLead } from "@/hooks/use-leads";
import { Skeleton } from "@/components/ui/skeleton";
import { LeadStatusSelect } from "@/components/dashboard/leads/lead-status-select";
import { LeadInfoCard } from "@/components/dashboard/leads/lead-info-card";
import { LeadMessageCard } from "@/components/dashboard/leads/lead-message-card";


export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: lead, isLoading, error } = useLead(id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error || !lead) {
    return <p className="text-sm text-destructive">Lead not found.</p>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/leads" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Leads
        </Link>

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{lead.name}</h1>
          <LeadStatusSelect lead={lead} />
        </div>
      </div>

      <LeadInfoCard lead={lead} />
      <LeadMessageCard message={lead.message} />
    </div>
  );
}