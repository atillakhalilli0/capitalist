import type { BaseEntity } from "./common";

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  parentCategoryId?: string | null;
  parentCategoryName?: string | null;
  subCategories?: Category[];
}

/** Matches backend's CreateCategoryCommand exactly. */
export interface CreateCategoryRequest {
  name: string;
  parentCategoryId?: string | null;
}

/** Matches backend's UpdateCategoryCommand exactly (id is added by the service from the URL param). */
export interface UpdateCategoryRequest {
  name: string;
  parentCategoryId?: string | null;
}
