import type { BaseEntity } from "./common";

export interface Category extends BaseEntity {
  name: string;

  slug: string;

  description?: string;

  image?: string;

  order: number;

  isActive: boolean;

  parentId?: string;

  parent?: Category | null;

  children?: Category[];
}