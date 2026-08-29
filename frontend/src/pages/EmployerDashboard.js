import React, { useEffect, useState } from "react";
import api from "../api";

const EMPTY_JOB = {
  title: "",
  description: "",
  location: "",
  salary: "",
  requiredSkills: "",
  experienceRequired: "",
};

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [view, setView] = useState("list");
  const [formData, setFormData] = useState(EMPTY_JOB);
  const [editingId, setEditingId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  const loadJobs = async () => {
    try {
      const response = await api.get("/jobs/employer");
      setJobs(Array.isArray(response.data) ? response.data : []);
      setError("");
    } catch (err) {
      setError("Failed to load jobs");
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const openNewJob = () => {
    setEditingId(null);
    setFormData(EMPTY_JOB);
    setView("form");
  };

  const openEdit = (job) => {
    setEditingId(job.id);
    setFormData({
      title: job.title || "",
      description: job.description || "",
      location: job.location || "",
      salary: job.salary ?? "",
      requiredSkills: job.requiredSkills || "",
      experienceRequired: job.experienceRequired ?? "",
    });
    setView("form");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingId) {
        await api.put(`/jobs/${editingId}`, formData);
        alert("Job updated successfully!");
      } else {
        await api.post("/jobs", formData);
        alert("Job posted successfully");
      }

      await loadJobs();
      setView("list");
      setEditingId(null);
      setFormData(EMPTY_JOB);
    } catch (err) {
      setError("Failed to save job");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure? This will also delete all applications for this job."
    );

    if (!confirmed) return;

    try {
      await api.delete(`/jobs/${id}`);
      setJobs((previous) => previous.filter((job) => job.id !== id));
    } catch (err) {
      setError("Failed to delete job");
    }
  };

  const reviewApplications = async (jobId) => {
    try {
      const response = await api.get(`/applications/job/${jobId}`);
      setApplications(Array.isArray(response.data) ? response.data : []);
      setView("candidates");
    } catch (err) {
      setError("Failed to load applications");
    }
  };

  const updateStatus = async (applicationId, status) => {
    await api.put(
      `/applications/${applicationId}/status?status=${status}`
    );

    setApplications((previous) =>
      previous.map((application) =>
        application.id === applicationId
          ? { ...application, status }
          : application
      )
    );
  };

  if (view === "form") {
    return (
      <main className="container">
        <h1>Employer Dashboard</h1>
        <h2>{editingId ? "Edit Job" : "Post Job"}</h2>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="title">Job Title</label>
          <input
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />

          <label htmlFor="salary">Salary</label>
          <input
            id="salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
          />

          <label htmlFor="requiredSkills">Required Skills</label>
          <input
            id="requiredSkills"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
          />

          <label htmlFor="experienceRequired">Experience Required</label>
          <input
            id="experienceRequired"
            name="experienceRequired"
            type="number"
            value={formData.experienceRequired}
            onChange={handleChange}
          />

          <div className="actions">
            <button type="submit" className="primary">
              {editingId ? "Update Job" : "Publish Job"}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => setView("list")}
            >
              My Jobs
            </button>
          </div>
        </form>
      </main>
    );
  }

  if (view === "candidates") {
    return (
      <main className="container">
        <h1>Employer Dashboard</h1>
        <button type="button" onClick={() => setView("list")}>
          My Jobs
        </button>

        <h2>Candidates</h2>

        {applications.map((application) => (
          <div className="card" key={application.id}>
            <h3>{application.fullName}</h3>
            <p>Experience: {application.experience}</p>
            <p>Match Score: {application.matchScore}</p>
            <p>Status: {application.status}</p>

            <div className="actions">
              <button
                type="button"
                onClick={() =>
                  updateStatus(application.id, "REJECTED")
                }
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() =>
                  updateStatus(application.id, "SHORTLISTED")
                }
              >
                Shortlist
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }

  return (
    <main className="container">
      <h1>Employer Dashboard</h1>

      <div className="actions">
        <button type="button" onClick={() => setView("list")}>
          My Jobs
        </button>
        <button type="button" onClick={openNewJob}>
          Post Job
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <h2>My Jobs</h2>

      {jobs.map((job) => (
        <div className="card" key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <p>Experience: {job.experienceRequired}</p>
          <p>
            Applications:{" "}
            {job.applicationsCount ?? job.applicationCount ?? 0}
          </p>

          <div className="actions">
            <button type="button" onClick={() => openEdit(job)}>
              Edit
            </button>
            <button type="button" onClick={() => handleDelete(job.id)}>
              Delete
            </button>
            <button
              type="button"
              onClick={() => reviewApplications(job.id)}
            >
              Review
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}
