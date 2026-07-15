import type { UserStatus } from "./user";

/** Matches backend's LoginQuery exactly. */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Matches backend's RegisterCommand exactly. No documented response body —
 * treat as void and send the user to /admin/login after a successful call. */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
}

/** Matches backend's RefreshRequestDto exactly. */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/** Matches backend's LogoutRequest exactly. */
export interface LogoutRequest {
  refreshToken: string;
}

/** Matches backend's ChangePasswordRequest exactly (no confirmPassword field on the backend). */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

/** Matches backend's ForgotPasswordCommand exactly. */
export interface ForgotPasswordRequest {
  email: string;
}

/** Matches backend's ResetPasswordCommand exactly (no confirmPassword field on the backend). */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// ── Response shapes below are NOT documented in the openapi.json
// (paths only show "200: OK" with no schema). These are best-guess
// shapes based on common JWT-auth conventions — confirm against the
// real response and adjust.

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
  roleId: string;
  roleName: string;
  status: UserStatus;
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
