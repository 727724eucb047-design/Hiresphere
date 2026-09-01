import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function formatRole(role) {
  if (!role) return "";

  return role
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    if (logout) {
      logout();
    }

    navigate("/");
  };

  return (
    <nav role="navigation">
      <button type="button" onClick={() => navigate("/")}>
        HireSphere
      </button>

      {!user ? (
        <div>
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>

          <button type="button" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      ) : (
        <div>
          <span>{user.username || user.email}</span>
          <span>{formatRole(user.role)}</span>

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}