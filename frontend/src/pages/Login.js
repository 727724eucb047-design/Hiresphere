// src/pages/Login.js
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

      const data = response?.data || {};
      const userData = data.user || data;

      login(userData, data.token);

      const role =
        userData?.role ||
        data?.role;

      if (role === "JOB_SEEKER") {
        navigate("/seeker-dashboard");
      } else if (role === "EMPLOYER") {
        navigate("/employer-dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      window.alert("Invalid credentials / Login failed");
    }
  };

  return (
    <main className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label htmlFor="username">
          Username
        </label>

        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) =>
            setUsername(event.target.value)
          }
        />

        <label htmlFor="password">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
        />

        <button type="submit">
          Log In
        </button>
      </form>
    </main>
  );
}