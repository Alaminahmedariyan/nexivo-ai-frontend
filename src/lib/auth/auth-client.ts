"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string", required: false },
        phone: { type: "string", required: false },
      },
    }),
  ],
});

export const { useSession, signIn, signUp, signOut, updateUser } = authClient;

export const forgetPassword = (authClient as any).forgetPassword;

export const resetPassword = authClient.resetPassword;