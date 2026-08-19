import { ApiError } from "@/types/api";

type ErrorDetail = { field?: string; message?: string };

const getFirstDetailMessage = (details: unknown): string | undefined => {
  if (!Array.isArray(details) || details.length === 0) {
    return undefined;
  }

  const first = details[0] as ErrorDetail | undefined;
  return first?.message;
};

export const getErrorMessage = (error: unknown, fallback = "Something went wrong."): string => {
  if (error instanceof ApiError) {
    return getFirstDetailMessage(error.details) ?? error.message ?? fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};