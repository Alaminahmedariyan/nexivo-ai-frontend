"use client";

import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  emailOTPClient,
  oauthPopupClient,
} from "better-auth/client/plugins";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/auth`;
  }
  return `${process.env.NEXT_PUBLIC_APP_URL}/api/auth`;
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
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