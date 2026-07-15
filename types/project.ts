// TODO: confirm actual numeric values with the backend (schema only says "type: integer").
export enum SpecialProjectStatus {
  DRAFT = 0,
  PUBLISHED = 1,
  ARCHIVED = 2,
}

export interface Project {
  id: string;
  title: string;
  slug?: string;
  description?: string | null;
  layoutData: string;
  status: SpecialProjectStatus;
  createdAt?: string;
  updatedAt?: string;
}

/** Matches backend's CreateSpecialProjectCommand exactly. */
export interface CreateProjectRequest {
  title: string;
  description?: string | null;
  layoutData: string;
}

/** Matches backend's UpdateSpecialProjectCommand exactly (id added by the service from the URL param). */
export interface UpdateProjectRequest {
  title: string;
  description?: string | null;
  layoutData: string;
  status: SpecialProjectStatus;
}
