import { atom } from "jotai";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string;
}

export interface AuthSession {
  id: string;
  expiresAt: string;
  userId: string;
}

export const userAtom = atom<AuthUser | null>(null);
export const sessionAtom = atom<AuthSession | null>(null);
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);
