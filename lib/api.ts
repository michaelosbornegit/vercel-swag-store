const API_BASE_URL = process.env.API_BASE_URL;

type ApiMetadata = {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

type ApiErrorBody = {
  code: string;
  message: string;
  details: unknown;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details: unknown = null,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export type ApiResponse<T> =
  | { success: true; data: T; meta?: ApiMetadata }
  | { success: false; error: ApiErrorBody };

type AuthFetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  searchParams?: Record<string, string>;
  headers?: Record<string, string>;
  body?: unknown;
};

export async function authenticatedFetch<T>(
  path: string,
  options: AuthFetchOptions = {},
) {
  const url = new URL(path, API_BASE_URL);
  if (options.searchParams) {
    for (const [key, value] of Object.entries(options.searchParams)) {
      url.searchParams.append(key, value);
    }
  }

  const headers: Record<string, string> = {
    "x-vercel-protection-bypass": process.env.VERCEL_PROTECTION_BYPASS ?? "",
    ...options.headers,
  };

  let requestBody: string | undefined;
  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
    requestBody = JSON.stringify(options.body);
  }

  const response = await fetch(url.toString(), {
    method: options.method ?? "GET",
    headers,
    body: requestBody,
  });

  const body = (await response.json()) as ApiResponse<T>;

  if (!body.success) {
    throw new ApiError(
      response.status,
      body.error.code,
      body.error.message,
      body.error.details,
    );
  }

  return { data: body.data, meta: body.meta };
}
