import { useAtom } from "jotai";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getSession, signIn, signUp, signOut } from "@/api/auth.api";
import { userAtom, sessionAtom } from "@/stores/auth.atom";
import type { LoginInput, RegisterInput } from "@/features/auth/schemas/auth.schema";

const SESSION_QUERY_KEY = ["session"];

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);
  const [session, setSession] = useAtom(sessionAtom);
  const queryClient = useQueryClient();

  const { isLoading } = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: getSession,
    staleTime: 5 * 60 * 1000,
    retry: false,
    select: (data) => {
      if (data) {
        setUser(data.user);
        setSession(data.session);
      } else {
        setUser(null);
        setSession(null);
      }
      return data;
    },
  });

  const login = useCallback(async (data: LoginInput) => {
    const result = await signIn(data);
    setUser(result.user);
    queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
    return result;
  }, [setUser, queryClient]);

  const register = useCallback(async (data: RegisterInput) => {
    const result = await signUp(data);
    setUser(result.user);
    queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY });
    return result;
  }, [setUser, queryClient]);

  const logout = useCallback(async () => {
    await signOut();
    setUser(null);
    setSession(null);
    queryClient.setQueryData(SESSION_QUERY_KEY, null);
  }, [setUser, setSession, queryClient]);

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
