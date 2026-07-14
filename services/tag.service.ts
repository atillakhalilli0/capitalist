import BaseService from "./base.service";

import type { Tag } from "@/types/article";
import type {
  PaginatedResponse,
  PaginationParams,
} from "@/types/api";

export interface CreateTagRequest {
  name: string;
  slug: string;
  description?: string;
}

export interface UpdateTagRequest
  extends Partial<CreateTagRequest> {}

class TagService extends BaseService {
  getAll(params?: PaginationParams) {
    return this.get<PaginatedResponse<Tag>>(
      "/tags",
      {
        params,
      }
    );
  }

  getList() {
    return this.get<Tag[]>("/tags/list");
  }

  getById(id: string) {
    return this.get<Tag>(`/tags/${id}`);
  }

  getBySlug(slug: string) {
    return this.get<Tag>(
      `/tags/slug/${slug}`
    );
  }

  create(data: CreateTagRequest) {
    return this.post<Tag>(
      "/tags",
      data
    );
  }

  update(
    id: string,
    data: UpdateTagRequest
  ) {
    return this.put<Tag>(
      `/tags/${id}`,
      data
    );
  }

  remove(id: string) {
    return super.delete<void>(
      `/tags/${id}`
    );
  }
}

export const tagService = new TagService();