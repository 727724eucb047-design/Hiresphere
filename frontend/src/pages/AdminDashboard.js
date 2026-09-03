import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadStats = async () => {
      try {
        const response = await api.get("/admin/stats");

        if (!mounted) return;

        // Supports:
        // response.data = { totalUsers: ... }
        // response.data = { stats: { totalUsers: ... } }
        const data = response?.data?.stats || response?.data || {};

        setStats(data);
        setError("");
      } catch (err) {
        if (mounted) {
          setError("Failed to load dashboard statistics");
        }
      }
    };

    loadStats();

    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return (
      <div role="alert" className="error-message">
        {error}
      </div>
    );
  }

  if (!stats) {
    return <div>Loading dashboard statistics...</div>;
  }

  const metrics = [
    {
      label: "Total Users",
      value: stats.totalUsers ?? stats.users ?? 0,
    },
    {
      label: "Total Employers",
      value:
        stats.totalEmployers ??
        stats.employers ??
        0,
    },
    {
      label: "Total Job Seekers",
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
      value: stats.activeJobs ?? 0,
    },
    {
      label: "Blocked Users",
      value: stats.blockedUsers ?? 0,
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
            <p>{metric.value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}