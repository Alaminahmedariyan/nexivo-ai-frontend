"use client";

import { Star, Trash2 } from "lucide-react";
import { useAdminTestimonials, useDeleteTestimonial } from "@/hooks/use-admin-testimonials";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TestimonialFormDialog } from "@/components/dashboard/testimonials/testimonial-form-dialog";

export default function TestimonialsPage() {
  const { data, isLoading, error } = useAdminTestimonials();
  const { mutate: deleteTestimonial } = useDeleteTestimonial();

  if (error) return <p className="text-sm text-destructive">Failed to load testimonials.</p>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Testimonials</h1>
        <TestimonialFormDialog />
      </div>

      {isLoading ? (
        <Skeleton className="h-40 w-full" />
      ) : !data?.data || data.data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No testimonials yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data.data.map((t) => (
            <Card key={t.id}>
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  ))}
                  {t.isFeatured && <Badge className="ml-2">Featured</Badge>}
                </div>
                <p className="line-clamp-3 text-sm text-muted-foreground">&quot;{t.content}&quot;</p>
                <p className="mt-3 text-sm font-medium">{t.clientName}</p>
                {(t.role || t.company) && (
                  <p className="text-xs text-muted-foreground">
                    {[t.role, t.company].filter(Boolean).join(" at ")}
                  </p>
                )}
                <div className="mt-3 flex justify-end gap-2">
                  <TestimonialFormDialog testimonial={t} trigger={<button className="rounded-md px-3 py-1.5 text-sm hover:bg-secondary">Edit</button>} />
                  <Button variant="ghost" size="icon" onClick={() => deleteTestimonial(t.id)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}