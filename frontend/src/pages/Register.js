// src/pages/Register.js

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "JOB_SEEKER",
    fullName: "",
    username: "",
    password: "",
    companyName: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      username: formData.username,
      password: formData.password,
      fullName: formData.fullName,
      role: formData.role,
      companyName:
        formData.role === "EMPLOYER"
          ? formData.companyName
          : "",
    };

    try {
      const response = await api.post(
        "/auth/register",
        payload
      );

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

      login(userData, token);

      const role = String(
        userData?.role ||
          formData.role ||
          ""
      )
        .trim()
        .toUpperCase()
        .replace(/^ROLE_/, "");

      if (role === "JOB_SEEKER") {
        navigate("/seeker-dashboard");
      } else if (role === "EMPLOYER") {
        navigate("/employer-dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
  console.error("Registration failed:", error);

  console.log("Status:", error?.response?.status);
  console.log("Backend response:", error?.response?.data);

  window.alert(
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "Registration failed"
  );
}
  };

  return (
  <main className="register-page">

    <section className="register-left-panel">

      <div className="register-brand-box">

        <span className="register-small-label">
          HIRESPHERE
        </span>

        <h1>
          Create your account.
          <br />
          Start building your
          <span> future.</span>
        </h1>

        <p>
          Join HireSphere to explore jobs, connect with employers,
          and manage your career journey in one place.
        </p>

        <div className="register-highlight">

          <div>
            <strong>Discover</strong>
            <span>Opportunities</span>
          </div>

          <div>
            <strong>Apply</strong>
            <span>With Ease</span>
          </div>

          <div>
            <strong>Grow</strong>
            <span>Your Career</span>
          </div>

        </div>

      </div>

    </section>

    <section className="register-right-panel">

      <form
        className="register-form-card"
        onSubmit={handleSubmit}
      >

        <div className="register-form-heading">
          <span>CREATE ACCOUNT</span>

          <h2>Join HireSphere</h2>

          <p>
            Enter your details to create your account.
          </p>
        </div>

        <div className="register-field">
          <label htmlFor="role">
            Role
          </label>

          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="JOB_SEEKER">
              JOB_SEEKER
            </option>

            <option value="EMPLOYER">
              EMPLOYER
            </option>

            <option value="ADMIN">
              ADMIN
            </option>
          </select>
        </div>

        <div className="register-field">
          <label htmlFor="fullName">
            Full Name
          </label>

          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="register-field">
          <label htmlFor="username">
            Username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            placeholder="Choose a username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="register-field">
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {formData.role === "EMPLOYER" && (
          <div className="register-field">
            <label htmlFor="companyName">
              Company Name
            </label>

            <input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Enter company name"
              required
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
        )}

        <button
          id="register-btn-t27"
          type="submit"
          className="register-submit-btn"
        >
          Create Account
        </button>

        <p className="register-footer-text">
          Create your HireSphere account and get started.
        </p>

      </form>

    </section>

  </main>
);
}