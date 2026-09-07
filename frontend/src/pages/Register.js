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
    <main className="container">
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <h1>Register</h1>

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

        <label htmlFor="fullName">
          Full Name
        </label>

        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Full Name"
          required
          value={formData.fullName}
          onChange={handleChange}
        />

        <label htmlFor="username">
          Username
        </label>

        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="password">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        {formData.role === "EMPLOYER" && (
          <>
            <label htmlFor="companyName">
              Company Name
            </label>

            <input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Company Name"
              required
              value={formData.companyName}
              onChange={handleChange}
            />
          </>
        )}

        <button
          id="register-btn-t27"
          type="submit"
        >
          Register
        </button>
      </form>
    </main>
  );
}