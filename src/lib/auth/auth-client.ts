"use client";

import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  emailOTPClient,
  oauthPopupClient,
} from "better-auth/client/plugins";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";
const AUTH_BASE_URL = `${BACKEND_URL}/api/auth`;

export const authClient = createAuthClient({
  baseURL: AUTH_BASE_URL,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string", required: false },
        phone: { type: "string", required: false },
      },
    }),
    emailOTPClient(),
    oauthPopupClient(),
  ],
});

export const { useSession, signIn, signUp, signOut, updateUser } = authClient;

export const resetPassword = authClient.resetPassword;