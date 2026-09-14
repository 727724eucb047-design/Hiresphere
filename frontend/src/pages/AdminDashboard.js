import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    let mounted = true;

    const loadStats = async () => {
      try {
        const response = await api.get("/admin/stats");

        if (!mounted) return;

        const data =
          response?.data?.stats ||
          response?.data ||
          {};

        setStats(data);
        setError("");
      } catch (err) {
        if (mounted) {
          setError(
            "Failed to fetch dashboard statistics."
          );
        }
      }
    };

    loadStats();

    const loadJobs = async () => {
  try {
    const response = await api.get("/jobs");

    console.log("ADMIN JOBS:", response.data);

    if (mounted) {
      setJobs(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    }
  } catch (error) {
    console.error("Failed to load jobs:", error);
  }
};

loadJobs();
    const loadUsers = async () => {
  try {
    const response = await api.get("/admin/users");

    if (mounted) {
      setUsers(
        Array.isArray(response?.data)
          ? response.data
          : []
      );
    }
  } catch (err) {
    console.error("Failed to load users:", err);
  }
};

loadUsers();

    return () => {
      mounted = false;
    };
  }, []);
     const toggleBlockUser = async (user) => {
  try {
    const action = user.blocked
      ? "unblock"
      : "block";

    const response = await api.put(
      `/admin/users/${user.id}/${action}`
    );

    setUsers((previous) =>
      previous.map((item) =>
        item.id === user.id
          ? response.data
          : item
      )
    );

    <section className="admin-job-section">

  <h2>Job Management</h2>

  {jobs.length === 0 ? (
    <p>No jobs available.</p>
  ) : (
    <div className="admin-job-grid">

      {jobs.map((job) => (
        <div
          className="admin-job-card"
          key={job.id}
        >

          <div className="admin-job-top">

            <div>
              <span className="admin-job-label">
                JOB
              </span>

              <h3>
                {job.title}
              </h3>
            </div>

            <span
              className={
                job.active
                  ? "admin-active-status"
                  : "admin-inactive-status"
              }
            >
              {job.active ? "ACTIVE" : "INACTIVE"}
            </span>

          </div>

          <p>
            <strong>Location:</strong>{" "}
            {job.location || "Not specified"}
          </p>

          <p>
            <strong>Salary:</strong>{" "}
            ₹{job.salary} LPA
          </p>

          <p>
            <strong>Experience:</strong>{" "}
            {job.experienceRequired ?? 0} years
          </p>

          <p>
            <strong>Skills:</strong>{" "}
            {job.requiredSkills || "Not specified"}
          </p>

          <p>
            <strong>Employer:</strong>{" "}
            {job.employer?.username ||
              job.employerUsername ||
              "Employer"}
          </p>

          <button
            type="button"
            className="admin-delete-job-btn"
            onClick={() => deleteJob(job.id)}
          >
            Delete Job
          </button>

        </div>
      ))}

    </div>
  )}

</section>

    // Refresh statistics
    const statsResponse = await api.get(
      "/admin/stats"
    );

    setStats(
      statsResponse?.data?.stats ||
      statsResponse?.data ||
      {}
    );

    window.alert(
      user.blocked
        ? "User unblocked successfully!"
        : "User blocked successfully!"
    );
  } catch (err) {
    console.error(
      "Failed to update user:",
      err
    );

    window.alert(
      "Failed to update user"
    );
  }
};
  // Error state
  if (error) {
    return (
      <div
        role="alert"
        className="error-message"
      >
        {error}
      </div>
    );
  }

  // Loading state
  if (!stats) {
    return (
      <div>
        Loading dashboard metrics...
      </div>
    );
  }

  const metrics = [
    {
      label: "Total Users",
      value:
        stats.totalUsers ??
        stats.users ??
        0,
    },
    {
      label: "Employers",
      value:
        stats.totalEmployers ??
        stats.employers ??
        0,
    },
    {
      // IMPORTANT:
      // Test T21 expects "Job Seekers"
      // not "Total Job Seekers"
      label: "Job Seekers",
      value:
        stats.totalJobSeekers ??
        stats.jobSeekers ??
        stats.seekers ??
        0,
    },
    {
      label: "Total Jobs",
      value:
        stats.totalJobs ??
        stats.totalJobsPosted ??
        stats.jobs ??
        0,
    },
    {
      label: "Total Applications",
      value:
        stats.totalApplications ??
        stats.applications ??
        0,
    },
    {
      label: "Active Jobs",
      value:
        stats.activeJobs ??
        0,
    },
    {
      label: "Blocked Users",
      value:
        stats.blockedUsers ??
        0,
    },
  ];
  

  return (
    <main className="container">
      <h1>Admin Dashboard</h1>

      <h2>Admin Analytics Dashboard</h2>

      <div className="grid">
        {metrics.map((metric) => (
          <div
            className="card metric-card"
            key={metric.label}
            data-testid="metric-card"
          >
            <h3>{metric.label}</h3>

            <p>
              {Number(
                metric.value
              ).toLocaleString("en-US")}
            </p>
          </div>
        ))}
      </div>
      <h2>User Management</h2>

{users.length === 0 ? (
  <p>No users found.</p>
) : (
  <div className="grid">
    {users.map((user) => (
      <div
        className="card"
        key={user.id}
      >
        <h3>
          {user.fullName || user.username}
        </h3>

        <p>
          Username: {user.username}
        </p>

        <p>
          Role: {user.role}
        </p>

        <p>
          Status:{" "}
          {user.blocked
            ? "BLOCKED"
            : "ACTIVE"}
        </p>

        {/* Don't allow admin to block itself/other admins */}
        {user.role !== "ADMIN" && (
          <button
            type="button"
            onClick={() =>
              toggleBlockUser(user)
            }
          >
            {user.blocked
              ? "Unblock User"
              : "Block User"}
          </button>
        )}
      </div>
    ))}
  </div>
)}
    </main>
  );
}