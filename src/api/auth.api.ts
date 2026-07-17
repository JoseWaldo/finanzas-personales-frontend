import { apiClient } from "@/api/client";

interface SignUpInput {
  email: string;
  password: string;
  name: string;
}

interface SignInInput {
  email: string;
  password: string;
}

interface SessionResponse {
  user: {
    id: string;
    email: string;
    name: string;
    emailVerified: boolean;
    image?: string;
    createdAt: string;
    updatedAt: string;
  };
  session: {
    id: string;
    token: string;
    expiresAt: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export async function signUp(data: SignUpInput) {
  return apiClient<SessionResponse>("/api/v1/auth/sign-up/email", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function signIn(data: SignInInput) {
  return apiClient<SessionResponse>("/api/v1/auth/sign-in/email", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getSession() {
  return apiClient<SessionResponse | null>("/api/v1/auth/session", {
    method: "GET",
  });
}

export async function signOut() {
  return apiClient<void>("/api/v1/auth/sign-out", {
    method: "POST",
  });
}
