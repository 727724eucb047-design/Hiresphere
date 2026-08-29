import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/authenticate", { username, password });
      const userData = res.data.user || {
        username,
        email: res.data.email,
        fullName: res.data.fullName,
        role: res.data.role,
      };
      login(userData, res.data.token);
      if (res.data.role === "JOB_SEEKER") navigate("/seeker-dashboard");
      else if (res.data.role === "EMPLOYER") navigate("/employer-dashboard");
      else if (res.data.role === "ADMIN") navigate("/admin-dashboard");
      else navigate("/");
    } catch {
      alert("Invalid credentials / Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="primary">Log In</button>
    </form>
  );
}

