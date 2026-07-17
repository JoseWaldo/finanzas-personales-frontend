export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  token: string;
  expiresAt: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
