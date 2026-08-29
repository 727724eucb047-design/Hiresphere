import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    api
      .get("/admin/stats")
      .then((response) => {
        if (active) {
          setStats(response.data);
          setError("");
        }
      })
      .catch(() => {
        if (active) {
          setError("Failed to load dashboard metrics.");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!stats) {
    return <div className="loading">Loading dashboard metrics.</div>;
  }

  const metrics = [
    ["Total Users", stats.totalUsers],
    ["Total Employers", stats.totalEmployers ?? stats.employers],
    ["Total Job Seekers", stats.totalJobSeekers ?? stats.jobSeekers],
    ["Total Jobs Posted", stats.totalJobsPosted ?? stats.totalJobs],
    ["Total Applications", stats.totalApplications],
    ["Active Jobs", stats.activeJobs],
    ["Blocked Users", stats.blockedUsers],
  ];

  return (
    <main className="container">
      <h1>Admin Analytics Dashboard</h1>

      <div className="grid">
        {metrics.map(([label, value]) => (
          <div className="card metric-card" key={label}>
            <h3>{label}</h3>
            <p>{value ?? 0}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
