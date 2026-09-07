import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function formatRole(role) {
  if (!role) return "";

  return String(role)
    .replace(/^ROLE_/i, "")
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav role="navigation">
      <Link to="/" className="brand">
        HireSphere
      </Link>

      {!user ? (
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <div className="nav-links">
          <span>
            {user.username || user.email}
            {user.role && ` (${user.role})`}
          </span>

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}