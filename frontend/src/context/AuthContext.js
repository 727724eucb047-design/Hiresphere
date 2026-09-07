import React, {
  createContext,
  useCallback,
  useState,
} from "react";

export const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

/**
 * Normalize backend role values so the frontend
 * consistently uses:
 *
 * ADMIN
 * EMPLOYER
 * JOB_SEEKER
 */
const normalizeRole = (role) => {
  if (!role) {
    return null;
  }

  const normalized = String(role)
    .trim()
    .toUpperCase()
    .replace(/^ROLE_/, "");

  // Handle possible backend variations
  if (normalized === "ADMIN") {
    return "ADMIN";
  }

  if (normalized === "EMPLOYER") {
    return "EMPLOYER";
  }

  if (
    normalized === "JOB_SEEKER" ||
    normalized === "JOBSEEKER" ||
    normalized === "SEEKER"
  ) {
    return "JOB_SEEKER";
  }

  return normalized;
};

const getStoredUser = () => {
  try {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    const parsedUser = JSON.parse(savedUser);

    if (!parsedUser || typeof parsedUser !== "object") {
      return null;
    }

    return {
      ...parsedUser,
      role: normalizeRole(parsedUser.role),
    };
  } catch (error) {
    console.error("Failed to load user from localStorage:", error);
    return null;
  }
};

const getStoredToken = () => {
  try {
    return localStorage.getItem("token") || null;
  } catch (error) {
    console.error("Failed to load token from localStorage:", error);
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(getStoredToken);

  /**
   * Login
   *
   * @param {Object} userData - logged-in user information
   * @param {string} authToken - JWT/authentication token
   */
  const login = useCallback((userData, authToken) => {
    if (!userData) {
      return;
    }

    const normalizedUser = {
      ...userData,
      role: normalizeRole(userData.role),
    };

    setUser(normalizedUser);
    setToken(authToken || null);

    try {
      localStorage.setItem(
        "user",
        JSON.stringify(normalizedUser)
      );

      if (normalizedUser.role) {
        localStorage.setItem(
          "role",
          normalizedUser.role
        );
      } else {
        localStorage.removeItem("role");
      }

      if (authToken) {
        localStorage.setItem("token", authToken);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error(
        "Failed to save authentication data:",
        error
      );
    }
  }, []);

  /**
   * Logout
   */
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);

    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    } catch (error) {
      console.error(
        "Failed to clear authentication data:",
        error
      );
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;