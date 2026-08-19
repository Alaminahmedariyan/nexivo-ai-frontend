"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
});

export const { useSession, signIn, signUp, signOut, updateUser } = authClient;

export const forgetPassword = (authClient as any).forgetPassword;

export const resetPassword = authClient.resetPassword;