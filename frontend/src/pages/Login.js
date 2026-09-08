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

  console.log("LOGIN BUTTON CLICKED");
  console.log("Username:", username);

  try {
    const response = await api.post("/auth/authenticate", {
      username,
      password,
    });

    console.log("LOGIN RESPONSE:", response.data);

    const data = response?.data || {};

    const token =
      data.token ||
      data.accessToken ||
      data.jwt ||
      null;

    const userData = data.user
      ? data.user
      : {
          username: data.username,
          fullName: data.fullName,
          role: data.role,
        };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    login(userData, token);

    const role = String(userData?.role || "")
      .trim()
      .toUpperCase()
      .replace(/^ROLE_/, "");

      console.log("Going to role dashboard:", role);
console.log("Stored user:", localStorage.getItem("user"));

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
    console.error("LOGIN FAILED:", error);
    console.log("STATUS:", error?.response?.status);
    console.log("BACKEND RESPONSE:", error?.response?.data);

    window.alert(
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Invalid credentials / Login failed"
    );
  }
};

  return (
    <main className="container">
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <h1>Welcome Back</h1>

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

        <button
          type="submit"
          id="login-btn"
        >
          Log In
        </button>
      </form>
    </main>
  );
}