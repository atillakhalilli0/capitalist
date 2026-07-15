import BaseService from "./base.service";
import type { Tag, CreateTagRequest, UpdateTagRequest } from "@/types/tag";

class TagService extends BaseService {
  getAll() {
    return this.get<Tag[]>("/Tags");
  }

  getById(id: string) {
    return this.get<Tag>(`/Tags/${id}`);
  }

  create(data: CreateTagRequest) {
    return this.post<Tag>("/Tags", data);
  }

  update(id: string, data: UpdateTagRequest) {
    return this.put<Tag>(`/Tags/${id}`, { id, ...data });
  }

  remove(id: string) {
    return this.delete<void>(`/Tags/${id}`);
  }
}

export const tagService = new TagService();
export default TagService;
