import { apiClient } from "./client";
import type { SessionUser } from "@/types/user";
import type {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
} from "@/lib/validations/auth.schema";

export const authApi = {
  register: (payload: RegisterInput) =>
    apiClient.post<SessionUser>("/v1/auth/register", {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      phone: payload.phone || undefined,
    }),

  login: (payload: LoginInput) =>
    apiClient.post<SessionUser>("/v1/auth/login", {
      email: payload.email,
      password: payload.password,
      rememberMe: payload.rememberMe,
    }),

  logout: () => apiClient.post<null>("/v1/auth/logout"),

  forgotPassword: (payload: ForgotPasswordInput & { redirectTo: string }) =>
    apiClient.post<null>("/v1/auth/forgot-password", payload),

  resetPassword: (payload: ResetPasswordInput & { token: string }) =>
    apiClient.post<null>("/v1/auth/reset-password", payload),

  changePassword: (payload: ChangePasswordInput) =>
    apiClient.post<null>("/v1/auth/change-password", payload),
};