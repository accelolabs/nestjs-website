import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";
import { login as loginRequest, me, registerDummy as registerDummyRequest } from "../api/authApi";

const STORAGE_TOKEN_KEY = "auth_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_TOKEN_KEY));
  const [user, setUser] = useState(null);

  const login = useCallback(async (input) => {
    const payload = await loginRequest(input);
    localStorage.setItem(STORAGE_TOKEN_KEY, payload.accessToken);
    setToken(payload.accessToken);
    const actualUser = await me(payload.accessToken);
    setUser(actualUser);
    return actualUser;
  }, []);

  const registerDummy = useCallback(async (input = {}) => {
    return registerDummyRequest(input);
  }, []);

  const refreshMe = useCallback(async () => {
    const currentToken = localStorage.getItem(STORAGE_TOKEN_KEY);
    if (!currentToken) {
      setUser(null);
      setToken(null);
      return null;
    }

    const currentUser = await me(currentToken);
    setUser(currentUser);
    setToken(currentToken);
    return currentUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, setUser, login, registerDummy, refreshMe, logout }),
    [user, token, login, registerDummy, refreshMe, logout],
  );

  useEffect(() => {
    if (!token) return;
    Promise.resolve()
      .then(() => refreshMe())
      .catch(() => {
        logout();
      });
  }, [token, refreshMe, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
