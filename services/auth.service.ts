import BaseService from "./base.service";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UserProfile,
} from "@/types/auth";

class AuthService extends BaseService {
  login(data: LoginRequest) {
    return this.post<LoginResponse>("/auth/login", data);
  }

  // Backend returns 200 with no body here - it does NOT log the user in
  // (no tokens come back), so callers should redirect to /admin/login
  // after this resolves rather than treating it like login().
  register(data: RegisterRequest) {
    return this.post<void>("/auth/register", data);
  }

  // Backend route is POST /api/Auth/refresh, and it only accepts
  // { refreshToken }, not { accessToken, refreshToken }.
  refreshToken(data: RefreshTokenRequest) {
    return this.post<RefreshTokenResponse>("/auth/refresh", {
      refreshToken: data.refreshToken,
    });
  }

  // TODO: these routes are not present in the backend swagger yet
  // (/api/Auth has only register, login, refresh). Calling these will
  // 404 until the backend implements them - remove this comment once
  // they exist, or wire them to their real endpoints if they already
  // exist under a different path.
  logout() {
    return this.post<void>("/auth/logout");
  }

  me() {
    return this.get<UserProfile>("/auth/me");
  }

  changePassword(data: ChangePasswordRequest) {
    return this.post<void>(
      "/auth/change-password",
      data
    );
  }

  forgotPassword(data: ForgotPasswordRequest) {
    return this.post<void>(
      "/auth/forgot-password",
      data
    );
  }

  resetPassword(data: ResetPasswordRequest) {
    return this.post<void>(
      "/auth/reset-password",
      data
    );
  }
}

export const authService = new AuthService();