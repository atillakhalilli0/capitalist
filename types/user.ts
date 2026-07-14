import type { BaseEntity } from "./common";

export enum UserRole {
  AUTHOR = "AUTHOR",
  EDITOR = "EDITOR",
  CHIEF_EDITOR = "CHIEF_EDITOR",
  SUPERADMIN = "SUPERADMIN",
}

export interface SocialLinks {
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
}

export interface User extends BaseEntity {
  name: string;

  surname: string;

  email: string;

  avatar?: string;

  role: UserRole;

  bio?: string;

  socialLinks?: SocialLinks;
}