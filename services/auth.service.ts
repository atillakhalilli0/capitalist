import BaseService from "./base.service";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/types/auth";

class AuthService extends BaseService {
  login(data: LoginRequest) {
    return this.post<LoginResponse>("/Auth/login", data);
  }

  register(data: RegisterRequest) {
    return this.post<void>("/Auth/register", data);
  }

  refreshToken(data: RefreshTokenRequest) {
    return this.post<RefreshTokenResponse>("/Auth/refresh", data);
  }

  logout(data: LogoutRequest) {
    return this.post<void>("/Auth/logout", data);
  }

  changePassword(data: ChangePasswordRequest) {
    return this.post<void>("/Auth/change-password", data);
  }

  forgotPassword(data: ForgotPasswordRequest) {
    return this.post<void>("/Auth/forgot-password", data);
  }

  resetPassword(data: ResetPasswordRequest) {
    return this.post<void>("/Auth/reset-password", data);
  }
}

export const authService = new AuthService();
export default AuthService;
