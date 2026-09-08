import { apiClient } from "./client";
import type { SessionUser } from "@/types/user";
import type {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
  SendOtpInput,
  CheckOtpInput,
  VerifyEmailOtpInput,
  SignInWithOtpInput,
  ForgotPasswordOtpInput,
  ResetPasswordOtpInput,
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

  otp: {
    send: (payload: SendOtpInput) =>
      apiClient.post<null>("/v1/auth/otp/send", payload),

    check: (payload: CheckOtpInput) =>
      apiClient.post<null>("/v1/auth/otp/check", payload),

    verifyEmail: (payload: VerifyEmailOtpInput) =>
      apiClient.post<{ status: string; token?: string; user: SessionUser }>(
        "/v1/auth/otp/verify-email",
        payload,
      ),

    signIn: (payload: SignInWithOtpInput) =>
      apiClient.post<{ token: string; user: SessionUser }>(
        "/v1/auth/otp/sign-in",
        {
          email: payload.email,
          otp: payload.otp,
          name: payload.name || undefined,
          image: payload.image || undefined,
        },
      ),

    forgotPassword: (payload: ForgotPasswordOtpInput) =>
      apiClient.post<null>("/v1/auth/otp/forgot-password", payload),

    resetPassword: (payload: ResetPasswordOtpInput) =>
      apiClient.post<null>("/v1/auth/otp/reset-password", payload),
  },
};