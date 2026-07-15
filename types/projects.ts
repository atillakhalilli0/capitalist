export interface Project {
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