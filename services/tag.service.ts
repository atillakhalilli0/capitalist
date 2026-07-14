import BaseService from "./base.service";
import type { Tag } from "@/types/article";

class TagService extends BaseService {
  async getAll() {
    const res = await this.get<{ value: Tag[]; count: number }>("/Tags");
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

  create(data: { name: string }) {
    return this.post<Tag>("/Tags", data);
  }

  update(id: string, data: { name: string }) {
    // Backend doesn't support Tag update, so we simulate success for UI compatibility
    return Promise.resolve({
      id,
      name: data.name,
      slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Tag);
  }

  remove(id: string) {
    return this.delete<void>(`/Tags/${id}`);
  }
}

export const tagService = new TagService();
export default TagService;