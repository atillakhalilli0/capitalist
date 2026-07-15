import BaseService from "./base.service";
import type { Project, CreateProjectRequest, UpdateProjectRequest } from "@/types/project";

class ProjectService extends BaseService {
  getAll() {
    return this.get<Project[]>("/SpecialProjects");
  }

  getById(id: string) {
    return this.get<Project>(`/SpecialProjects/${id}`);
  }

  create(data: CreateProjectRequest) {
    return this.post<Project>("/SpecialProjects", data);
  }

  update(id: string, data: UpdateProjectRequest) {
    return this.put<Project>(`/SpecialProjects/${id}`, { id, ...data });
  }

  remove(id: string) {
    return this.delete<void>(`/SpecialProjects/${id}`);
  }
}

export const projectService = new ProjectService();
export default ProjectService;
