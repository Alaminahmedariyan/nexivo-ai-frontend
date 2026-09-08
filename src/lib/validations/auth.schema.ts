import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

// ---------- Reusable field schemas (mirrors backend auth.validation.ts) ----------

const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters.")
  .max(50, "Name must not exceed 50 characters.")
  .regex(/^[a-zA-Z\s.'-]+$/, "Name can only contain letters, spaces, and . ' -");

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Enter a valid email address.")
  .toLowerCase();

const phoneSchema = z
  .string()
  .trim()
  .refine((val) => val === "" || isValidPhoneNumber(val), {
    message: "Enter a valid phone number with country code (e.g. +8801712345678).",
  })
  .optional()
  .or(z.literal(""));

const strongPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .max(64, "Password must not exceed 64 characters.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character.")
  .refine((val) => !/\s/.test(val), "Password must not contain spaces.");

// ---------- Login ----------

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean().optional(),
});

// ---------- Register ----------

export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password."),
    phone: phoneSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// ---------- Forgot Password ----------

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// ---------- Reset Password ----------
// Note: `token` is not part of this schema — it comes from the URL query
// param on the reset-password page, not a visible form field.

export const resetPasswordSchema = z
  .object({
    newPassword: strongPasswordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// ---------- Change Password ----------

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: strongPasswordSchema,
    confirmNewPassword: z.string().min(1, "Please confirm your new password."),
    revokeOtherSessions: z.boolean().optional(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password.",
    path: ["newPassword"],
  });

// ---------- OTP ----------

export const sendOtpSchema = z.object({
  email: emailSchema,
  type: z.enum(["sign-in", "email-verification", "forget-password"]),
});

export const checkOtpSchema = z.object({
  email: emailSchema,
  type: z.enum(["sign-in", "email-verification", "forget-password"]),
  otp: z.string().length(6, "OTP must be exactly 6 digits."),
});

export const verifyEmailOtpSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6, "OTP must be exactly 6 digits."),
});

export const signInWithOtpSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6, "OTP must be exactly 6 digits."),
  name: nameSchema.optional().or(z.literal("")),
  image: z.string().url("Enter a valid image URL.").optional().or(z.literal("")),
});

export const forgotPasswordOtpSchema = z.object({
  email: emailSchema,
});

export const resetPasswordOtpSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6, "OTP must be exactly 6 digits."),
  password: strongPasswordSchema,
});

// ---------- Types ----------

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type CheckOtpInput = z.infer<typeof checkOtpSchema>;
export type VerifyEmailOtpInput = z.infer<typeof verifyEmailOtpSchema>;
export type SignInWithOtpInput = z.infer<typeof signInWithOtpSchema>;
export type ForgotPasswordOtpInput = z.infer<typeof forgotPasswordOtpSchema>;
export type ResetPasswordOtpInput = z.infer<typeof resetPasswordOtpSchema>;