import type { BaseEntity } from "./common";

// TODO: confirm actual numeric values with the backend (schema only says "type: integer").
export enum ContactRequestStatus {
  NEW = 0,
  IN_PROGRESS = 1,
  RESOLVED = 2,
  CLOSED = 3,
}

export interface ContactRequest extends BaseEntity {
  fullName: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: ContactRequestStatus;
  adminNote?: string | null;
}

/** Matches backend's CreateContactRequestCommand exactly. */
export interface CreateContactRequest {
  fullName: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}

/** Matches backend's HandleContactRequestRequest exactly. */
export interface HandleContactRequest {
  newStatus: ContactRequestStatus;
  adminNote?: string | null;
}

/** GET /api/ContactRequests query params — names must match exactly. */
export interface ContactRequestFilter {
  pageNumber?: number;
  pageSize?: number;
  status?: ContactRequestStatus;
  searchQuery?: string;
}
