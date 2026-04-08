import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function buildMockUser(partial = {}) {
  return {
    id: "u1",
    name: partial.name ?? "Test User",
    phone: partial.phone ?? "+123456789",
    email: partial.email ?? "test@example.com",
    birthday: partial.birthday ?? "1995-05-20"
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (payload = {}) => {
    const user = buildMockUser(payload);
    localStorage.setItem("auth_user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
