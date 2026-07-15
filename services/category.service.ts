import BaseService from "./base.service";
import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from "@/types/category";

class CategoryService extends BaseService {
  getAll() {
    return this.get<Category[]>("/Categories");
  }

  getById(id: string) {
    return this.get<Category>(`/Categories/${id}`);
  }

  create(data: CreateCategoryRequest) {
    return this.post<Category>("/Categories", data);
  }

  update(id: string, data: UpdateCategoryRequest) {
    return this.put<Category>(`/Categories/${id}`, { id, ...data });
  }

  remove(id: string) {
    return this.delete<void>(`/Categories/${id}`);
  }
}

export const categoryService = new CategoryService();
export default CategoryService;
