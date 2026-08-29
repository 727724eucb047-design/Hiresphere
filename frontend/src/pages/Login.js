import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/auth/authenticate", {
        username,
        password,
      });

      const data = response.data || {};
      const userData = data.user || {
        username: data.username || username,
        email: data.email || data.username || username,
        fullName: data.fullName || "",
        role: data.role,
      };

      login(userData, data.token);

      if (userData.role === "JOB_SEEKER") {
        navigate("/seeker-dashboard");
      } else if (userData.role === "EMPLOYER") {
        navigate("/employer-dashboard");
      } else if (userData.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Invalid credentials / Login failed");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Login</h1>

      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        required
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button type="submit" className="primary">
        Log In
      </button>
    </form>
  );
}
