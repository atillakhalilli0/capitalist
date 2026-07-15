import type { Article } from "./article";

export interface Bookmark {
  articleId: string;
  article?: Article;
  createdAt: string;
}

/** Matches backend's AddBookmarkRequest exactly. */
export interface AddBookmarkRequest {
  articleId: string;
}

export interface BookmarkFilter {
  page?: number;
  pageSize?: number;
}
