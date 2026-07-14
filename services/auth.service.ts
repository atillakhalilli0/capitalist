import BaseService from "./base.service";

import type {
  LoginRequest,
  LoginResponse,
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

  refreshToken(data: RefreshTokenRequest) {
    return this.post<RefreshTokenResponse>(
      "/auth/refresh-token",
      data
    );
  }

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