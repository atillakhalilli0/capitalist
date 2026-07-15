import BaseService from "./base.service";
import type { PagedResult } from "@/types/common";
import type { Bookmark, BookmarkFilter, AddBookmarkRequest } from "@/types/bookmark";

class BookmarkService extends BaseService {
  getAll(params?: BookmarkFilter) {
    return this.get<PagedResult<Bookmark>>("/Bookmarks", { params });
  }

  add(data: AddBookmarkRequest) {
    return this.post<Bookmark>("/Bookmarks", data);
  }

  remove(articleId: string) {
    return this.delete<void>(`/Bookmarks/${articleId}`);
  }
}

export const bookmarkService = new BookmarkService();
export default BookmarkService;
