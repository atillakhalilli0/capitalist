import type { BaseEntity } from "./common";

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  parentCategoryId?: string | null;
  parentCategoryName?: string | null;
  subCategories?: Category[];
  
  // Optional parameters for UI compatibility
  description?: string;
  image?: string;
  order?: number;
  isActive?: boolean;
}