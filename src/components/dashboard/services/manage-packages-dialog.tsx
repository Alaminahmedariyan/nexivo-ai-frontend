"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Layers, Plus, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useAdminService,
  useAddPackage,
  useDeletePackage,
} from "@/hooks/use-admin-services";

const schema = z.object({
  name: z.string().trim().min(2, "Package name must be at least 2 characters."),
  price: z.coerce.number().min(0, "Price cannot be negative."),
  features: z
    .array(
      z.object({
        label: z.string().trim().min(1, "Feature is required."),
      }),
    )
    .min(1, "Add at least one feature."),
});

type ManagePackagesDialogProps = {
  serviceId: string;
  serviceTitle: string;
};

export function ManagePackagesDialog({
  serviceId,
  serviceTitle,
}: ManagePackagesDialogProps) {
  const [open, setOpen] = useState(false);

  const { data: service, isLoading } = useAdminService(serviceId);

  const { mutate: addPackage, isPending: isAdding } =
    useAddPackage(serviceId);

  const { mutate: deletePackage, isPending: isDeleting } =
    useDeletePackage(serviceId);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      features: [{ label: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    const cleanedFeatures = values.features
      .map((feature) => ({
        label: feature.label.trim(),
      }))
      .filter((feature) => feature.label.length > 0);

    if (cleanedFeatures.length === 0) {
      form.setError("features", {
        type: "manual",
        message: "Add at least one feature.",
      });
      return;
    }

    addPackage(
      {
        name: values.name.trim(),
        price: values.price,
        features: cleanedFeatures,
      },
      {
        onSuccess: () => {
          form.reset({
            name: "",
            price: 0,
            features: [{ label: "" }],
          });
        },
      },
    );
  };

  const handleDeletePackage = (packageId: string) => {
    deletePackage(packageId);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5"
        >
          <Layers className="h-3.5 w-3.5" />
          Packages
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Packages — {serviceTitle}
          </DialogTitle>

          <DialogDescription>
            Manage pricing packages and included features for this service.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Existing Packages */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">
                  Existing Packages
                </h3>

                <p className="text-xs text-muted-foreground">
                  Review and manage your current pricing plans.
                </p>
              </div>

              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                {service?.packages?.length ?? 0}{" "}
                {(service?.packages?.length ?? 0) === 1
                  ? "Package"
                  : "Packages"}
              </span>
            </div>

            {isLoading ? (
              <div className="rounded-xl border bg-muted/20 p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Loading packages...
                </p>
              </div>
            ) : (service?.packages ?? []).length === 0 ? (
              <div className="rounded-xl border border-dashed bg-muted/10 p-8 text-center">
                <Layers className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />

                <p className="text-sm font-medium">
                  No packages yet
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Create your first pricing package below.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {service?.packages?.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="group rounded-xl border bg-muted/10 p-4 transition-colors hover:bg-muted/20"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold">
                            {pkg.name}
                          </p>

                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                            ${pkg.price}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {pkg.features.length}{" "}
                          {pkg.features.length === 1
                            ? "feature"
                            : "features"}{" "}
                          included
                        </p>

                        {pkg.features.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {pkg.features.slice(0, 4).map(
                              (feature, featureIndex) => (
                                <span
                                  key={`${pkg.id}-${featureIndex}`}
                                  className="rounded-md border bg-background px-2 py-1 text-[11px] text-muted-foreground"
                                >
                                  {feature.label}
                                </span>
                              ),
                            )}

                            {pkg.features.length > 4 && (
                              <span className="rounded-md border bg-background px-2 py-1 text-[11px] text-muted-foreground">
                                +{pkg.features.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={isDeleting}
                        onClick={() =>
                          handleDeletePackage(pkg.id)
                        }
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">
                          Delete {pkg.name}
                        </span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Add Package */}
          <section className="border-t pt-6">
            <div className="mb-5">
              <h3 className="text-sm font-semibold">
                Add New Package
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                Create a professional pricing package with included features.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Package Name + Price */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Package Name</FormLabel>

                        <FormControl>
                          <Input
                            placeholder="Starter"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (USD)</FormLabel>

                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="499"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <div>
                    <FormLabel>Included Features</FormLabel>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Add the key deliverables and capabilities included in
                      this package.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`features.${index}.label`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-start gap-2">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-muted/30 text-xs font-medium text-muted-foreground">
                                {index + 1}
                              </div>

                              <div className="min-w-0 flex-1">
                                <FormControl>
                                  <Input
                                    placeholder={
                                      index === 0
                                        ? "Responsive modern design"
                                        : "Production-ready implementation"
                                    }
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage className="mt-1" />
                              </div>

                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                disabled={fields.length === 1}
                                onClick={() => remove(index)}
                                className="shrink-0 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />

                                <span className="sr-only">
                                  Remove feature
                                </span>
                              </Button>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  {form.formState.errors.features?.message && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.features.message}
                    </p>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ label: "" })}
                    className="gap-1.5"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Feature
                  </Button>
                </div>

                {/* Submit */}
                <div className="border-t pt-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isAdding}
                  >
                    {isAdding ? (
                      "Creating Package..."
                    ) : (
                      <>
                        <Plus className="mr-1.5 h-4 w-4" />
                        Add Package
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}