import BaseService from "./base.service";
import type { PagedResult } from "@/types/common";
import type {
  Comment,
  CommentFilter,
  CreateCommentRequest,
  ModerateCommentRequest,
} from "@/types/comment";

class CommentService extends BaseService {
  getAll(params?: CommentFilter) {
    return this.get<PagedResult<Comment>>("/Comments", { params });
  }

  getById(id: string) {
    return this.get<Comment>(`/Comments/${id}`);
  }

  getByArticle(articleId: string, publicOnly = true) {
    return this.get<Comment[]>(`/Comments/article/${articleId}`, {
      params: { publicOnly },
    });
  }

  create(data: CreateCommentRequest) {
    return this.post<Comment>("/Comments", data);
  }

  remove(id: string) {
    return this.delete<void>(`/Comments/${id}`);
  }

  moderate(id: string, data: ModerateCommentRequest) {
    return this.post<void>(`/Comments/${id}/moderate`, data);
  }
}

export const commentService = new CommentService();
export default CommentService;
