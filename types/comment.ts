import type { BaseEntity } from "./common";

// TODO: confirm actual numeric values with the backend (schema only says "type: integer").
export enum CommentStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
  SPAM = 3,
}

export interface Comment extends BaseEntity {
  articleId: string;
  userId: string;
  userFullName?: string;
  content: string;
  parentCommentId?: string | null;
  status: CommentStatus;
  replies?: Comment[];
}

/** Matches backend's CreateCommentRequest exactly. */
export interface CreateCommentRequest {
  articleId: string;
  content: string;
  parentCommentId?: string | null;
}

/** Matches backend's ModerateCommentRequest exactly. */
export interface ModerateCommentRequest {
  newStatus: CommentStatus;
}

/** GET /api/Comments query params — names must match exactly. */
export interface CommentFilter {
  pageNumber?: number;
  pageSize?: number;
  status?: CommentStatus;
  articleId?: string;
  userId?: string;
  searchQuery?: string;
}
