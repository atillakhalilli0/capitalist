import BaseService, {
  ApiListResponse,
} from "./base.service";

export interface SpecialProject {
  id: string;
  title: string;
  description: string | null;
  layoutData: string;
  status?: number;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProjectRequest {
  title: string;
  description?: string | null;
  layoutData: string;
}

export interface UpdateProjectRequest
  extends CreateProjectRequest {
  status?: number;
}

class ProjectService extends BaseService {
  async getAll() {
    return this.get<ApiListResponse<SpecialProject>>(
      "/SpecialProjects"
    );
  }

  async getList() {
    const res = await this.getAll();
    return res.value;
  }

  async getById(id: string) {
    const list = await this.getList();
    return (
      list.find((item) => item.id === id) ?? null
    );
  }

  async getBySlug(slug: string) {
    const list = await this.getList();

    return (
      list.find(
        (item) =>
          item.slug === slug ||
          item.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-") === slug
      ) ?? null
    );
  }

  create(data: CreateProjectRequest) {
    return this.post(
      "/SpecialProjects",
      data
    );
  }

  update(
    id: string,
    data: UpdateProjectRequest
  ) {
    return this.put(
      `/SpecialProjects/${id}`,
      {
        id,
        ...data,
      }
    );
  }
}

export const projectService =
  new ProjectService();

export default ProjectService;