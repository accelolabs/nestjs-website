import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";
import { login as loginRequest, me, registerDummy as registerDummyRequest } from "../api/authApi";

const STORAGE_TOKEN_KEY = "auth_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(() => Boolean(localStorage.getItem(STORAGE_TOKEN_KEY)));

  const login = useCallback(async (input) => {
    try {
      setAuthLoading(true);
      const payload = await loginRequest(input);
      localStorage.setItem(STORAGE_TOKEN_KEY, payload.accessToken);
      setToken(payload.accessToken);
      const actualUser = await me(payload.accessToken);
      setUser(actualUser);
      return actualUser;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const registerDummy = useCallback(async (input = {}) => {
    return registerDummyRequest(input);
  }, []);

  const refreshMe = useCallback(async () => {
    const currentToken = localStorage.getItem(STORAGE_TOKEN_KEY);
    if (!currentToken) {
      setUser(null);
      setToken(null);
      setAuthLoading(false);
      return null;
    }

    const currentUser = await me(currentToken);
    setUser(currentUser);
    setToken(currentToken);
    setAuthLoading(false);
    return currentUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    setToken(null);
    setUser(null);
    setAuthLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      authLoading,
      setUser,
      login,
      registerDummy,
      refreshMe,
      logout,
    }),
    [user, token, authLoading, login, registerDummy, refreshMe, logout],
  );

  useEffect(() => {
    if (!token) {
      setAuthLoading(false);
      return;
    }
    Promise.resolve()
      .then(() => refreshMe())
      .catch(() => {
        logout();
      });
  }, [token, refreshMe, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
