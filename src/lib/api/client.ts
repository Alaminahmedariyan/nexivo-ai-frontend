import {
  ApiError,
  ApiErrorResponse,
  ApiSuccessResponse,
  QueryMeta,
} from "@/types/api";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

function prepareRequestBody(body: unknown) {
  if (body === undefined) {
    return {
      body: undefined,
      isFormData: false,
    };
  }

  if (body instanceof FormData) {
    return {
      body,
      isFormData: true,
    };
  }

  return {
    body: JSON.stringify(body),
    isFormData: false,
  };
}

function prepareHeaders(
  headers: HeadersInit | undefined,
  isFormData: boolean,
) {
  const finalHeaders = new Headers(headers);

  // Do not manually set Content-Type for FormData.
  // Browser automatically adds multipart boundary.
  if (
    !isFormData &&
    !finalHeaders.has("Content-Type")
  ) {
    finalHeaders.set(
      "Content-Type",
      "application/json",
    );
  }

  return finalHeaders;
}

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    body,
    headers,
    ...rest
  } = options;

  const prepared =
    prepareRequestBody(body);

  const res = await fetch(`/api${path}`, {
    ...rest,
    credentials: "include",
    headers: prepareHeaders(
      headers,
      prepared.isFormData,
    ),
    body: prepared.body,
  });

  const json =
    (await res
      .json()
      .catch(() => null)) as
      | ApiSuccessResponse<T>
      | ApiErrorResponse
      | null;

  if (
    !res.ok ||
    !json ||
    !json.success
  ) {
    const errorJson =
      json as ApiErrorResponse | null;

    throw new ApiError(
      errorJson?.message ??
        "Something went wrong.",
      res.status,
      errorJson?.errorCode,
      errorJson?.details,
    );
  }

  return json.data;
}

async function requestWithMeta<T>(
  path: string,
  options: RequestOptions = {},
): Promise<{
  data: T;
  meta: QueryMeta;
}> {
  const {
    body,
    headers,
    ...rest
  } = options;

  const prepared =
    prepareRequestBody(body);

  const res = await fetch(`/api${path}`, {
    ...rest,
    credentials: "include",
    headers: prepareHeaders(
      headers,
      prepared.isFormData,
    ),
    body: prepared.body,
  });

  const json =
    (await res
      .json()
      .catch(() => null)) as
      | ApiSuccessResponse<T>
      | ApiErrorResponse
      | null;

  if (
    !res.ok ||
    !json ||
    !json.success
  ) {
    const errorJson =
      json as ApiErrorResponse | null;

    throw new ApiError(
      errorJson?.message ??
        "Something went wrong.",
      res.status,
      errorJson?.errorCode,
      errorJson?.details,
    );
  }

  if (!json.meta) {
    throw new ApiError(
      "Pagination metadata is missing from the server response.",
      res.status,
    );
  }

  return {
    data: json.data,
    meta: json.meta,
  };
}

export const apiClient = {
  get: <T>(
    path: string,
    options?: RequestOptions,
  ) =>
    request<T>(path, {
      ...options,
      method: "GET",
    }),

  post: <T>(
    path: string,
    body?: unknown,
    options?: RequestOptions,
  ) =>
    request<T>(path, {
      ...options,
      method: "POST",
      body,
    }),

  patch: <T>(
    path: string,
    body?: unknown,
    options?: RequestOptions,
  ) =>
    request<T>(path, {
      ...options,
      method: "PATCH",
      body,
    }),

  put: <T>(
    path: string,
    body?: unknown,
    options?: RequestOptions,
  ) =>
    request<T>(path, {
      ...options,
      method: "PUT",
      body,
    }),

  delete: <T>(
    path: string,
    options?: RequestOptions,
  ) =>
    request<T>(path, {
      ...options,
      method: "DELETE",
    }),

  getWithMeta: <T>(
    path: string,
    options?: RequestOptions,
  ) =>
    requestWithMeta<T>(
      path,
      options,
    ),
};