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
    return this.post<LoginResponse>("/Auth/login", data);
  }

  register(data: RegisterRequest) {
    return this.post<void>("/Auth/register", data);
  }

  refreshToken(data: RefreshTokenRequest) {
    return this.post<RefreshTokenResponse>("/Auth/refresh", {
      refreshToken: data.refreshToken,
    });
  }

  logout() {
    return Promise.resolve();
  }

  me() {
    return this.get<UserProfile>("/Users/profile");
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