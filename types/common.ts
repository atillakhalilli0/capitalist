// ─────────────────────────────────────────────────────────────────────────
// NOTE: The provided openapi.json only documents request bodies (Commands),
// not response schemas ("200": { "description": "OK" } with no `content`).
// The shapes below (PagedResult, ApiError, etc.) are the standard ASP.NET
// Core conventions this backend appears to follow (PageNumber/PageSize in,
// items/totalCount/... out). Verify against a real response once you can
// hit the API — adjust field names here if they differ.
// ─────────────────────────────────────────────────────────────────────────

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/** Generic paged result — used by endpoints that accept PageNumber/PageSize (or page/pageSize). */
export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
}

/** ASP.NET Core ProblemDetails / validation error shape. */
export interface ApiError {
  title: string;
  status: number;
  detail?: string;
  errors?: Record<string, string[]>;
}

export interface DateRange {
  from?: string;
  to?: string;
}
