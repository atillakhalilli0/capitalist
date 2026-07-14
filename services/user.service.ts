import BaseService from "./base.service";
import { authService } from "./auth.service";
import type { User } from "@/types/user";
import type { UserProfile } from "@/types/auth";
import type { PaginatedResponse, PaginationParams } from "@/types/api";

export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {}

class UserService extends BaseService {
  async getAll(params?: PaginationParams) {
    try {
      const profile = await this.getProfile();
      const user: User = {
        id: profile.id,
        name: profile.fullName.split(" ")[0] || "Admin",
        surname: profile.fullName.split(" ").slice(1).join(" ") || "",
        email: profile.email,
        role: profile.role as any,
        avatar: profile.avatar || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        items: [user],
        pageNumber: 1,
        pageSize: 10,
        totalCount: 1,
        totalPages: 1,
        hasPreviousPage: false,
        hasNextPage: false,
      } as PaginatedResponse<User>;
    } catch {
      return {
        items: [] as User[],
        pageNumber: 1,
        pageSize: 10,
        totalCount: 0,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false,
      } as PaginatedResponse<User>;
    }
  }

  async getById(id: string) {
    const profile = await this.getProfile();
    return {
      id: profile.id,
      name: profile.fullName.split(" ")[0] || "Admin",
      surname: profile.fullName.split(" ").slice(1).join(" ") || "",
      email: profile.email,
      role: profile.role as any,
      avatar: profile.avatar || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as User;
  }

  getProfile() {
    return this.get<UserProfile>("/Users/profile");
  }

  create(data: CreateUserRequest) {
    // Map user creation to register on the backend Auth controller
    return authService.register({
      username: data.fullName.toLowerCase().replace(/[^a-z0-9]+/g, ""),
      email: data.email,
      password: data.password,
      firstName: data.fullName.split(" ")[0],
      lastName: data.fullName.split(" ").slice(1).join(" ") || "",
    }).then(() => {
      return {
        id: "00000000-0000-0000-0000-000000000000",
        name: data.fullName.split(" ")[0],
        surname: data.fullName.split(" ").slice(1).join(" ") || "",
        email: data.email,
        role: data.role as any,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as User;
    });
  }

  update(id: string, data: UpdateUserRequest) {
    // Backend doesn't support updating users, resolve immediately
    return Promise.resolve({
      id,
      name: data.fullName ? data.fullName.split(" ")[0] : "",
      surname: data.fullName ? data.fullName.split(" ").slice(1).join(" ") : "",
      email: data.email || "",
      role: data.role as any,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as User);
  }

  remove(id: string) {
    // Backend doesn't support deleting users, resolve immediately
    return Promise.resolve();
  }
}

export const userService = new UserService();
export default UserService;