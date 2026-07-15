import BaseService from "./base.service";
import type { PagedResult } from "@/types/common";
import type { UserProfile } from "@/types/auth";
import type {
  User,
  UserFilter,
  CreateUserRequest,
  UpdateUserRequest,
  RolesPermissionsResponse,
} from "@/types/user";

class UserService extends BaseService {
  getAll(params?: UserFilter) {
    return this.get<PagedResult<User>>("/Users", { params });
  }

  getById(id: string) {
    return this.get<User>(`/Users/${id}`);
  }

  getProfile() {
    return this.get<UserProfile>("/Users/profile");
  }

  getRolesAndPermissions() {
    return this.get<RolesPermissionsResponse>("/Users/roles-permissions");
  }

  create(data: CreateUserRequest) {
    return this.post<User>("/Users", data);
  }

  update(id: string, data: UpdateUserRequest) {
    return this.put<User>(`/Users/${id}`, { id, ...data });
  }

  remove(id: string) {
    return this.delete<void>(`/Users/${id}`);
  }
}

export const userService = new UserService();
export default UserService;
