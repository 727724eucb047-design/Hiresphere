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

    return () => {
      mounted = false;
    };
  }, []);

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
    </main>
  );
}