export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface ApiError {
  title: string;
  status: number;
  detail?: string;
  errors?: Record<string, string[]>;
}

export interface UploadResponse {
  fileName: string;
  fileUrl: string;
  contentType: string;
  size: number;
}

export interface IdResponse {
  id: string;
}

export interface StatusResponse {
  success: boolean;
}

export interface DateRange {
  from?: string;
  to?: string;
}