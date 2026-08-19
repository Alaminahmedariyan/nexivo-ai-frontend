import { ApiError, type ApiErrorResponse, type ApiSuccessResponse } from "@/types/api";

// Used ONLY in Server Components / generateMetadata / generateStaticParams —
// these run on the Next.js server, so relative "/api/..." paths (which rely
// on the rewrite proxy resolving against the browser's current origin)
// don't work here. This calls the backend directly instead.
export async function serverFetch<T>(
  path: string,
  options: RequestInit & { revalidate?: number } = {},
): Promise<T> {
  const { revalidate, ...fetchOptions } = options;

  const res = await fetch(`${process.env.BACKEND_URL}/api${path}`, {
    ...fetchOptions,
    headers: { "Content-Type": "application/json", ...fetchOptions.headers },
    next: revalidate !== undefined ? { revalidate } : undefined,
  });

  const json = (await res.json().catch(() => null)) as
    | ApiSuccessResponse<T>
    | ApiErrorResponse
    | null;

  if (!res.ok || !json || !json.success) {
    const errorJson = json as ApiErrorResponse | null;
    throw new ApiError(errorJson?.message ?? "Failed to load data.", res.status);
  }

  return json.data;
}