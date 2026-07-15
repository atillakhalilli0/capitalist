import BaseService from "./base.service";
import type { PagedResult } from "@/types/common";
import type {
  Article,
  ArticleFilter,
  ArticleVersion,
  CreateArticleRequest,
  UpdateArticleRequest,
  PublishArticleRequest,
  RollbackArticleRequest,
} from "@/types/article";

class ArticleService extends BaseService {
  getAll(params?: ArticleFilter) {
    return this.get<PagedResult<Article>>("/Articles", { params });
  }

  getById(id: string) {
    return this.get<Article>(`/Articles/${id}`);
  }

  create(data: CreateArticleRequest) {
    return this.post<Article>("/Articles", data);
  }

  update(id: string, data: UpdateArticleRequest) {
    return this.put<Article>(`/Articles/${id}`, { id, ...data });
  }

  remove(id: string) {
    return this.delete<void>(`/Articles/${id}`);
  }

  publish(id: string, data: PublishArticleRequest) {
    return this.post<void>(`/Articles/${id}/publish`, data);
  }

  rollback(id: string, data: RollbackArticleRequest) {
    return this.post<void>(`/Articles/${id}/rollback`, data);
  }

  getVersions(id: string) {
    return this.get<ArticleVersion[]>(`/Articles/${id}/versions`);
  }
}

export const articleService = new ArticleService();
export default ArticleService;
