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
    const { id, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      fullName: formData.fullName,
      username: formData.username,
      password: formData.password,
      role: formData.role,
      companyName:
        formData.role === "EMPLOYER" ? formData.companyName : "",
    };

    try {
      const response = await api.post("/auth/register", payload);
      const data = response.data || {};

      const userData = data.user || {
        username: data.username || formData.username,
        email: data.email || data.username || formData.username,
        fullName: data.fullName || formData.fullName,
        role: data.role || formData.role,
        companyName: formData.companyName,
      };

      if (data.token) {
        login(userData, data.token);
      }

      const role = userData.role;

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
      alert("Registration failed");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Register</h1>

      <label htmlFor="role">Role</label>
      <select id="role" value={formData.role} onChange={handleChange}>
        <option value="JOB_SEEKER">JOB_SEEKER</option>
        <option value="EMPLOYER">EMPLOYER</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      <label htmlFor="fullName">Full Name</label>
      <input
        id="fullName"
        required
        value={formData.fullName}
        onChange={handleChange}
      />

      <label htmlFor="username">Username</label>
      <input
        id="username"
        required
        value={formData.username}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        required
        value={formData.password}
        onChange={handleChange}
      />

      {formData.role === "EMPLOYER" && (
        <>
          <label htmlFor="companyName">Company Name</label>
          <input
            id="companyName"
            required
            value={formData.companyName}
            onChange={handleChange}
          />
        </>
      )}

      <button id="register-btn-127" type="submit" className="primary">
        Register
      </button>
    </form>
  );
}
