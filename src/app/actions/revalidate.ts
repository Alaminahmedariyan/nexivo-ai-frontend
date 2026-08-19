"use server";

import { revalidatePath } from "next/cache";

export async function revalidateMarketingPages() {
  revalidatePath("/services");
  revalidatePath("/services/[slug]", "page");
  revalidatePath("/portfolio");
  revalidatePath("/portfolio/[slug]", "page");
  revalidatePath("/"); // homepage shows both
}