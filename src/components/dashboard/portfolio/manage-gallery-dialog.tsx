"use client";

import { useState } from "react";
import Image from "next/image";
import { Images, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  useAdminPortfolioDetail,
  useAddPortfolioImage,
  useRemovePortfolioImage,
  useAddPortfolioTechnology,
  useRemovePortfolioTechnology,
  useTechnologies,
} from "@/hooks/use-admin-portfolio";

export function ManageGalleryDialog({ portfolioId, slug, title }: { portfolioId: string; slug: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [techSelect, setTechSelect] = useState("");

  const { data: portfolio } = useAdminPortfolioDetail(slug);
  const { data: technologies } = useTechnologies();
  const { mutate: addImage, isPending: isAddingImage } = useAddPortfolioImage(slug, portfolioId);
  const { mutate: removeImage } = useRemovePortfolioImage(slug);
  const { mutate: addTechnology } = useAddPortfolioTechnology(slug, portfolioId);
  const { mutate: removeTechnology } = useRemovePortfolioTechnology(slug, portfolioId);

  const linkedTechIds = new Set((portfolio?.technologies ?? []).map((t) => t.technology.id));
  const availableTechnologies = (technologies ?? []).filter((t) => !linkedTechIds.has(t.id));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Images className="mr-1 h-3.5 w-3.5" /> Gallery
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Gallery &amp; Tech — {title}</DialogTitle></DialogHeader>

        <div>
          <p className="mb-2 text-sm font-medium">Images</p>
          <div className="grid grid-cols-3 gap-2">
            {(portfolio?.images ?? []).map((img) => (
              <div key={img.id} className="group relative aspect-square overflow-hidden rounded-md border">
                <Image src={img.url} alt={img.alt ?? ""} fill sizes="120px" className="object-cover" />
                <button
                  onClick={() => removeImage(img.id)}
                  className="absolute right-1 top-1 rounded-full bg-black/60 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <Button
              size="sm"
              disabled={!imageUrl || isAddingImage}
              onClick={() => { addImage({ url: imageUrl }); setImageUrl(""); }}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="mb-2 text-sm font-medium">Technologies</p>
          <div className="mb-3 flex flex-wrap gap-2">
            {(portfolio?.technologies ?? []).map(({ technology }) => (
              <Badge key={technology.id} variant="outline" className="gap-1">
                {technology.name}
                <button onClick={() => removeTechnology(technology.id)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <select
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              value={techSelect}
              onChange={(e) => setTechSelect(e.target.value)}
            >
              <option value="">Select technology...</option>
              {availableTechnologies.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <Button size="sm" disabled={!techSelect} onClick={() => { addTechnology(techSelect); setTechSelect(""); }}>
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}