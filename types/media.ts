// TODO: confirm actual numeric values with the backend (schema only says "type: integer").
export enum MediaType {
  IMAGE = 0,
  VIDEO = 1,
  AUDIO = 2,
  DOCUMENT = 3,
}

export interface MediaFile {
  id: string;
  url: string;
  altText?: string | null;
  fileName?: string;
  contentType?: string;
  type?: MediaType;
  size?: number;
  createdAt?: string;
}

/** GET /api/Media query params — names must match exactly. */
export interface MediaFilter {
  pageNumber?: number;
  pageSize?: number;
  type?: MediaType;
  searchQuery?: string;
}
