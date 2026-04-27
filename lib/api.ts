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

export async function authenticatedFetch<T>(
  path: string,
  searchParams?: Record<string, string>,
) {
  const url = new URL(path, API_BASE_URL);
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      "x-vercel-protection-bypass": process.env.VERCEL_PROTECTION_BYPASS || "",
    },
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
