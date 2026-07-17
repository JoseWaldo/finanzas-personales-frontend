import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { getSession, signIn, signUp, signOut } from "@/api/auth.api";
import { userAtom, sessionAtom } from "@/stores/auth.atom";
import type { LoginInput, RegisterInput } from "@/features/auth/schemas/auth.schema";

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);
  const [session, setSession] = useAtom(sessionAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession()
      .then((data) => {
        if (data) {
          setUser(data.user);
          setSession(data.session);
        }
      })
      .catch(() => {
        setUser(null);
        setSession(null);
      })
      .finally(() => setIsLoading(false));
  }, [setUser, setSession]);

  const login = useCallback(async (data: LoginInput) => {
    const result = await signIn(data);
    setUser(result.user);
    setSession(result.session);
    return result;
  }, [setUser, setSession]);

  const register = useCallback(async (data: RegisterInput) => {
    const result = await signUp(data);
    setUser(result.user);
    setSession(result.session);
    return result;
  }, [setUser, setSession]);

  const logout = useCallback(async () => {
    await signOut();
    setUser(null);
    setSession(null);
  }, [setUser, setSession]);

  return {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
}
