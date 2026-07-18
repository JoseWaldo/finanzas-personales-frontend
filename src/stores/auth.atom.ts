import { atom } from "jotai";

import type { User, Session } from "@/types";

export const userAtom = atom<User | null>(null);
export const sessionAtom = atom<Session | null>(null);
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);
