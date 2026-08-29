import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    axios.get("/api/admin/stats")
      .then((res) => mounted && setStats(res.data))
      .catch(() => mounted && setError("Failed to load dashboard metrics."))
    return () => { mounted = false; };
  }, []);

  if (!stats && !error) return <div className="loading">Loading dashboard metrics.</div>;
  if (error) return <div className="error-message">{error}</div>;

  const cards = [
    ["Total Users", stats.totalUsers],
    ["Employers", stats.employers],
    ["Job Seekers", stats.jobSeekers],
    ["Total Jobs", stats.totalJobs],
    ["Total Applications", stats.totalApplications],
    ["Active Jobs", stats.activeJobs],
    ["Blocked Users", stats.blockedUsers],
  ];

  return (
    <main className="container">
      <h1>Admin Analytics Dashboard</h1>
      <div className="grid">
        {cards.map(([label, value]) => (
          <div className="card" key={label}><h3>{label}</h3><strong>{value ?? 0}</strong></div>
        ))}
      </div>
    </main>
  );
}