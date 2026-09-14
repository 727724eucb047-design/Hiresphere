// src/pages/Login.js

import React, { useContext, useState } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

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
  window.location.href = "/seeker-dashboard";
  } else if (role === "EMPLOYER") {
  window.location.href = "/employer-dashboard";
  } else if (role === "ADMIN") {
  window.location.href = "/admin-dashboard";
  } else {
  window.location.href = "/";
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
  <main className="login-page">

    <section className="login-left-panel">

      <div className="login-brand-box">
        <span className="login-small-label">
          HIRESPHERE
        </span>

        <h1>
          Welcome back.
          <br />
          Your next opportunity
          <span> starts here.</span>
        </h1>

        <p>
          Login to explore jobs, manage applications,
          and continue your career journey.
        </p>

        <div className="login-highlight">
          <div>
            <strong>Smart</strong>
            <span>Job Search</span>
          </div>

          <div>
            <strong>Easy</strong>
            <span>Applications</span>
          </div>

          <div>
            <strong>Fast</strong>
            <span>Hiring</span>
          </div>
        </div>
      </div>

    </section>

    <section className="login-right-panel">

      <form
        className="login-form-card"
        onSubmit={handleSubmit}
      >

        <div className="login-form-heading">
          <span>WELCOME BACK</span>
          <h2>Login to HireSphere</h2>
          <p>
            Enter your account details to continue.
          </p>
        </div>

        <div className="login-field">
          <label htmlFor="username">
            Username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
          />
        </div>

        <div className="login-field">
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />
        </div>

        <button
          type="submit"
          id="login-btn"
          className="login-submit-btn"
        >
          Log In
        </button>

        <p className="login-footer-text">
          Secure access to your HireSphere account
        </p>

      </form>

    </section>

  </main>
);
}