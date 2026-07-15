import type { BaseEntity } from "./common";

// TODO: confirm actual numeric values with the backend (schema only says "type: integer").
export enum UserStatus {
  ACTIVE = 0,
  INACTIVE = 1,
  BANNED = 2,
  PENDING = 3,
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

/** GET /api/Users/roles-permissions response — adjust once you can see the real payload. */
export interface RolesPermissionsResponse {
  roles: Role[];
  permissions: string[];
}

export interface User extends BaseEntity {
  username: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  status: UserStatus;
  roleId: string;
  roleName?: string;
}

/** Matches backend's CreateUserCommand exactly. */
export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  roleId: string;
  status: UserStatus;
}

/** Matches backend's UpdateUserCommand exactly (id is added by the service from the URL param). */
export interface UpdateUserRequest {
  firstName?: string | null;
  lastName?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  status: UserStatus;
  roleId: string;
}

/** GET /api/Users query params — names must match exactly. */
export interface UserFilter {
  pageNumber?: number;
  pageSize?: number;
  searchQuery?: string;
  roleName?: string;
  status?: UserStatus;
}
