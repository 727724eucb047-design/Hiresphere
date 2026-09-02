// src/pages/EmployerDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const emptyJob = {
  title: "",
  description: "",
  location: "",
  salary: "",
  requiredSkills: "",
  experienceRequired: "",
};

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [view, setView] = useState("jobs");
  const [formData, setFormData] = useState(emptyJob);

  useEffect(() => {
    axios
      .get("/jobs/employer")
      .then((response) => {
        setJobs(response.data || []);
      })
      .catch(() => {});
  }, []);

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/jobs", formData);

      if (response.data) {
        setJobs((previous) => [...previous, response.data]);
      }

      setFormData(emptyJob);
      setView("jobs");
    } catch (error) {
      window.alert("Failed to post job");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure? This will also delete all applications for this job."
    );

    if (!confirmed) return;

    await axios.delete(`/jobs/${id}`);

    setJobs((previous) =>
      previous.filter((job) => job.id !== id)
    );
  };

  return (
    <main>
      <h1>Employer Dashboard</h1>

      <button type="button" onClick={() => setView("jobs")}>
        My Jobs
      </button>

      <button type="button" onClick={() => setView("form")}>
        Post Job
      </button>

      {view === "jobs" && (
        <section>
          <h2>My Jobs</h2>

          {jobs.map((job) => (
            <article key={job.id}>
              <h3>{job.title || job.jobTitle}</h3>
              <p>{job.location}</p>

              <button
                type="button"
                onClick={() => handleDelete(job.id)}
              >
                Delete
              </button>
            </article>
          ))}
        </section>
      )}

      {view === "form" && (
        <form onSubmit={handleSubmit}>
          <h2>Post Job</h2>

          <label htmlFor="title">Job Title</label>
          <input
            id="title"
            name="title"
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
            value={formData.salary}
            onChange={handleChange}
          />

          <label htmlFor="requiredSkills">
            Required Skills
          </label>
          <input
            id="requiredSkills"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
          />

          <label htmlFor="experienceRequired">
            Experience Required
          </label>
          <input
            id="experienceRequired"
            name="experienceRequired"
            value={formData.experienceRequired}
            onChange={handleChange}
          />

          <button type="submit">Publish Job</button>
        </form>
      )}
    </main>
  );
}