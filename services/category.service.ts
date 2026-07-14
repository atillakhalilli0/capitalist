import BaseService from "./base.service";
import type { Category } from "@/types/category";

class CategoryService extends BaseService {
  async getAll() {
    const res = await this.get<{ value: Category[]; count: number }>("/Categories");
    return res.value;
  }

  async getList() {
    return this.getAll();
  }

  async getById(id: string) {
    const list = await this.getAll();
    return list.find((item) => item.id === id) ?? null;
  }

  async getBySlug(slug: string) {
    const list = await this.getAll();
    return list.find((item) => item.slug === slug) ?? null;
  }

  create(data: { name: string; parentCategoryId?: string | null }) {
    return this.post<Category>("/Categories", data);
  }

  update(id: string, data: { name: string; parentCategoryId?: string | null }) {
    return this.put<Category>(`/Categories/${id}`, {
      id,
      ...data,
    });
  }

  remove(id: string) {
    return this.delete<void>(`/Categories/${id}`);
  }
}

export const categoryService = new CategoryService();
export default CategoryService;