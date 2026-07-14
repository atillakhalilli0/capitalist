export interface LoginRequest {
  email: string;
  password: string;
}

// Matches backend's RegisterCommand exactly (see swagger:
// components.schemas.RegisterCommand). firstName/lastName are optional
// there, and the endpoint has no documented response body, so treat it
// as void — after registering, send the user to /admin/login instead of
// assuming they're auto-logged-in.
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
}

export interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: UserProfile;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatar?: string | null;
  role: UserRole;
}

export type UserRole =
  | "SuperAdmin"
  | "Admin"
  | "Editor"
  | "Author"
  | "User";

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}