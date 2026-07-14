import BaseService from "./base.service";

import type { User } from "@/types/user";
import type { UserProfile } from "@/types/auth";
import type {
  PaginatedResponse,
  PaginationParams,
} from "@/types/api";

export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
}

export interface UpdateUserRequest
  extends Partial<CreateUserRequest> {}

class UserService extends BaseService {
  getAll(params?: PaginationParams) {
    return this.get<PaginatedResponse<User>>(
      "/users",
      {
        params,
      }
    );
  }

  getById(id: string) {
    return this.get<User>(`/users/${id}`);
  }

  getProfile() {
    return this.get<UserProfile>("/users/profile");
  }

  create(data: CreateUserRequest) {
    return this.post<User>(
      "/users",
      data
    );
  }

  update(
    id: string,
    data: UpdateUserRequest
  ) {
    return this.put<User>(
      `/users/${id}`,
      data
    );
  }

  remove(id: string) {
    return super.delete<void>(
      `/users/${id}`
    );
  }
}

export const userService = new UserService();