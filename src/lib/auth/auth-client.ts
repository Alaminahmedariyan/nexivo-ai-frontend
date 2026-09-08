"use client";

import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  emailOTPClient,
  oauthPopupClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "/api/auth",
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