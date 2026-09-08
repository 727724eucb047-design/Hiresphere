// src/pages/EmployerDashboard.js

import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import api from "../api";

const initialForm = {
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
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  const loadJobs = useCallback(async () => {
    try {
      setError("");

      const response = await api.get(
        "/jobs/employer"
      );

      const result = response?.data;

      if (Array.isArray(result)) {
        setJobs(result);
      } else if (Array.isArray(result?.content)) {
        setJobs(result.content);
      } else if (Array.isArray(result?.jobs)) {
        setJobs(result.jobs);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error(
        "Failed to load employer jobs:",
        error
      );

      setJobs([]);
      setError("Failed to load jobs");
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

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
    setError("");

    const payload = {
      ...formData,

      // If user enters 7, backend receives 700000
      salary: formData.salary
        ? Number(formData.salary) * 100000
        : null,

      // Convert experience to integer
      experienceRequired: formData.experienceRequired
        ? Number(formData.experienceRequired)
        : null,
    };

    const response = await api.post(
      "/jobs",
      payload
    );

    if (response?.data) {
      const createdJob =
        response.data.job ||
        response.data;

      setJobs((previous) => [
        ...previous,
        createdJob,
      ]);
    }

    window.alert(
      "Job posted successfully!"
    );

    setFormData(initialForm);

    setView("list");
  } catch (error) {
    console.error(
      "Failed to post job:",
      error
    );

    console.log(
      "Status:",
      error?.response?.status
    );

    console.log(
      "Backend response:",
      error?.response?.data
    );

    setError("Failed to post job");
    window.alert("Failed to post job");
  }
};

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm(
      "Are you sure? This will also delete all applications for this job."
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(
        `/jobs/${jobId}`
      );

      setJobs((previous) =>
        previous.filter(
          (job) => job.id !== jobId
        )
      );

      window.alert(
        "Job deleted successfully"
      );
    } catch (error) {
      console.error(
        "Failed to delete job:",
        error
      );

      setError("Failed to delete job");
    }
  };

  return (
    <main className="container">
      <h1>Employer Dashboard</h1>

      {/* View controls */}
      <div className="dashboard-actions">
        <button
          type="button"
          onClick={() => {
            setError("");
            setView("list");
          }}
        >
          My Jobs
        </button>

        <button
          type="button"
          onClick={() => {
            setError("");
            setView("form");
          }}
        >
          Post Job
        </button>
      </div>

      {/* Error */}
      {error && (
        <div role="alert">
          {error}
        </div>
      )}

      {/* =========================
          MY JOBS
          ========================= */}
      {view === "list" && (
        <section>
          <h2>My Jobs</h2>

          {jobs.length === 0 ? (
            <p>No jobs posted yet.</p>
          ) : (
            jobs.map((job) => (
              <article
                key={job.id}
                data-testid={`job-${job.id}`}
                className="card"
              >
                <h3>
                  {job.title ||
                    job.jobTitle ||
                    "Untitled Job"}
                </h3>

                {job.description && (
                  <p>
                    {job.description}
                  </p>
                )}

                {job.location && (
                  <p>
                    {job.location}
                  </p>
                )}

                {job.salary !== undefined &&
                  job.salary !== null &&
                  job.salary !== "" && (
                    <p>
                      {job.salary}
                    </p>
                  )}

                {job.requiredSkills && (
                  <p>
                    {job.requiredSkills}
                  </p>
                )}

                {job.experienceRequired && (
                  <p>
                    {job.experienceRequired}
                  </p>
                )}

                {job.status && (
                  <p>
                    {job.status}
                  </p>
                )}

                <div className="job-actions">
                  <button
                    type="button"
                    onClick={() => {
                      // Edit functionality can be
                      // implemented later.
                    }}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(job.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      )}

      {/* =========================
          POST JOB
          ========================= */}
      {view === "form" && (
        <section>
          <h2>
            Post a New Opportunity
          </h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="jobTitle">
              Job Title
            </label>

            <input
              id="jobTitle"
              name="title"
              type="text"
              placeholder="Job Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={
                formData.description
              }
              onChange={handleChange}
              required
            />

            <label htmlFor="location">
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <label htmlFor="salary">
  Salary (LPA)
</label>

<input
  id="salary"
  name="salary"
  type="number"
  step="0.1"
  min="0"
  placeholder="Example: 7"
  value={formData.salary}
  onChange={handleChange}
/>

            <label htmlFor="requiredSkills">
              Required Skills
            </label>

            <input
              id="requiredSkills"
              name="requiredSkills"
              type="text"
              placeholder="Required Skills"
              value={
                formData.requiredSkills
              }
              onChange={handleChange}
            />

            <label htmlFor="experienceRequired">
              Experience Required
            </label>

            <input
  id="experienceRequired"
  name="experienceRequired"
  type="number"
  min="0"
  placeholder="Example: 1"
  value={formData.experienceRequired}
  onChange={handleChange}
/>
            <button type="submit">
              Publish Job
            </button>
          </form>
        </section>
      )}
    </main>
  );
}