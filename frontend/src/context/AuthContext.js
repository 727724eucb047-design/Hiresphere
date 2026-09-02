import React, {
  createContext,
  useState,
} from "react";

export const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken || null);

    if (userData) {
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      if (userData.role) {
        localStorage.setItem("role", userData.role);
      }
    }

    if (authToken) {
      localStorage.setItem("token", authToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}