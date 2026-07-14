import BaseService from "./base.service";

import type { Category } from "@/types/category";
import type {
  PaginationParams,
  PaginatedResponse,
} from "@/types/api";

class CategoryService extends BaseService {
  getAll(params?: PaginationParams) {
    return this.get<PaginatedResponse<Category>>(
      "/categories",
      {
        params,
      }
    );
  }

  getList() {
    return this.get<Category[]>(
      "/categories/list"
    );
  }

  getById(id: string) {
    return this.get<Category>(
      `/categories/${id}`
    );
  }

  getBySlug(slug: string) {
    return this.get<Category>(
      `/categories/slug/${slug}`
    );
  }

  create(
    data: Omit<
      Category,
      "id" | "createdAt" | "updatedAt"
    >
  ) {
    return this.post<Category>(
      "/categories",
      data
    );
  }

  update(
    id: string,
    data: Partial<Category>
  ) {
    return this.put<Category>(
      `/categories/${id}`,
      data
    );
  }

  remove(id: string) {
    return super.delete<void>(
      `/categories/${id}`
    );
  }
}

export const categoryService =
  new CategoryService();