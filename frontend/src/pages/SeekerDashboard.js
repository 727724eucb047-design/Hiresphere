import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SeekerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get("/api/jobs")
      .then((res) => setJobs(Array.isArray(res.data) ? res.data : res.data?.content || []))
      .catch(() => setJobs([]));
    axios.get("/api/applications/seeker")
      .then((res) => setApplications(Array.isArray(res.data) ? res.data : res.data?.content || []))
      .catch(() => setApplications([]));
  }, []);

  const apply = async (jobId) => {
    try {
      await axios.post("/api/applications", { jobId });
      const res = await axios.get("/api/applications/seeker");
      setApplications(Array.isArray(res.data) ? res.data : res.data?.content || []);
    } catch {
      alert("Application failed");
    }
  };

  const filtered = jobs.filter((job) =>
    `${job.jobTitle || job.title || ""} ${job.location || ""} ${job.requiredSkills || ""}`
      .toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="container">
      <h1>Seeker Dashboard</h1>
      <input
        placeholder="Search opportunities..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid" style={{ marginTop: 20 }}>
        <section>
          <h2>Live Jobs</h2>
          {filtered.map((job) => (
            <div className="card" key={job.id}>
              <h3>{job.jobTitle || job.title}</h3>
              <p>{job.location}</p>
              <p>{job.description}</p>
              <button onClick={() => apply(job.id)}>Apply</button>
            </div>
          ))}
        </section>
        <section>
          <h2>My Applications</h2>
          {applications.map((app) => (
            <div className="card" key={app.id}>
              {app.jobTitle || app.job?.jobTitle || app.job?.title}
              <div>{app.status}</div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}