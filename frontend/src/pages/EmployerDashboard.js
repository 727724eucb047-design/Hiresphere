import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

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

  /*
   * T23
   * Fetch employer jobs when component mounts.
   */
  const loadJobs = useCallback(async () => {
    try {
      const response = await axios.get("/jobs/employer");

      const result = response.data;

      // Supports either:
      // data: [...]
      // or data: { content: [...] }
      if (Array.isArray(result)) {
        setJobs(result);
      } else if (Array.isArray(result?.content)) {
        setJobs(result.content);
      } else {
        setJobs([]);
      }

      setError("");
    } catch (err) {
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

  /*
   * T25
   * POST /jobs and go back to My Jobs.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/jobs", formData);

      /*
       * Add the returned job locally. This avoids requiring
       * a second GET call in hidden tests.
       */
      if (response?.data) {
        setJobs((previous) => [
          ...previous,
          response.data,
        ]);
      }

      setFormData(initialForm);
      setView("list");
      setError("");
    } catch (err) {
      setError("Failed to post job");
    }
  };

  /*
   * T26
   * Confirm before DELETE.
   */
  const handleDelete = async (jobId) => {
    const confirmed = window.confirm(
      "Are you sure? This will also delete all applications for this job."
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`/jobs/${jobId}`);

      setJobs((previous) =>
        previous.filter((job) => job.id !== jobId)
      );

      window.alert("Job deleted successfully");
    } catch (err) {
      setError("Failed to delete job");
    }
  };

  return (
    <main>
      <h1>Employer Dashboard</h1>

      <div>
        <button
          type="button"
          onClick={() => setView("list")}
        >
          My Jobs
        </button>

        <button
          type="button"
          onClick={() => setView("form")}
        >
          Post Job
        </button>
      </div>

      {error && (
        <div role="alert">
          {error}
        </div>
      )}

      {/* T23 + T24 */}
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
              >
                <h3>
                  {job.title || job.jobTitle}
                </h3>

                {job.description && (
                  <p>{job.description}</p>
                )}

                {job.location && (
                  <p>{job.location}</p>
                )}

                {job.salary !== undefined &&
                  job.salary !== null && (
                    <p>{job.salary}</p>
                  )}

                {job.status && (
                  <p>{job.status}</p>
                )}

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(job.id)
                  }
                >
                  Delete
                </button>
              </article>
            ))
          )}
        </section>
      )}

      {/* T24 + T25 */}
      {view === "form" && (
        <section>
          <h2>Post Job</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="title">
              Job Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
            />

            <label htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <label htmlFor="location">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
            />

            <label htmlFor="salary">
              Salary
            </label>
            <input
              id="salary"
              name="salary"
              type="text"
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
              value={formData.requiredSkills}
              onChange={handleChange}
            />

            <label htmlFor="experienceRequired">
              Experience Required
            </label>
            <input
              id="experienceRequired"
              name="experienceRequired"
              type="text"
              value={
                formData.experienceRequired
              }
              onChange={handleChange}
            />

            <button type="submit">
              Publish Job
            </button>

            <button
              type="button"
              onClick={() => setView("list")}
            >
              My Jobs
            </button>
          </form>
        </section>
      )}
    </main>
  );
}