// Mirrors your Express backend response envelope

export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  meta?: QueryMeta;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errorCode?: string;
  details?: unknown;
};

export type QueryMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export class ApiError extends Error {
  statusCode: number;
  errorCode?: string;
  details?: unknown;

  constructor(
    message: string,
    statusCode: number,
    errorCode?: string,
    details?: unknown,
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
  }
}