import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    role: "JOB_SEEKER",
    fullName: "",
    username: "",
    password: "",
    companyName: "",
  });

  const change = (e) => setForm((old) => ({ ...old, [e.target.id]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", form);
      if (res.data?.token) {
        const userData = res.data.user || {
          username: form.username,
          fullName: form.fullName,
          companyName: form.companyName,
          role: res.data.role || form.role,
        };
        login(userData, res.data.token);
        const role = userData.role;
        if (role === "JOB_SEEKER") navigate("/seeker-dashboard");
        else if (role === "EMPLOYER") navigate("/employer-dashboard");
        else if (role === "ADMIN") navigate("/admin-dashboard");
        else navigate("/");
      } else {
        navigate("/login");
      }
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={submit} className="form">
      <h1>Register</h1>
      <label htmlFor="role">Role</label>
      <select id="role" value={form.role} onChange={change}>
        <option value="JOB_SEEKER">JOB_SEEKER</option>
        <option value="EMPLOYER">EMPLOYER</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      <label htmlFor="fullName">Full Name</label>
      <input id="fullName" required value={form.fullName} onChange={change} />

      <label htmlFor="username">Username</label>
      <input id="username" required value={form.username} onChange={change} />

      <label htmlFor="password">Password</label>
      <input id="password" type="password" required value={form.password} onChange={change} />

      {form.role === "EMPLOYER" && (
        <>
          <label htmlFor="companyName">Company Name</label>
          <input id="companyName" required value={form.companyName} onChange={change} />
        </>
      )}

      <button id="register-btn-127" type="submit" className="primary">Register</button>
    </form>
  );
}

