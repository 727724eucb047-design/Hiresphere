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

  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

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

      const response = await api.post(
        "/jobs",
        formData
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

  const loadApplications = async (job) => {
    try {
      setError("");

      const response = await api.get(
        `/applications/job/${job.id}`
      );

      setApplications(
        Array.isArray(response?.data)
          ? response.data
          : []
      );

      setSelectedJob(job);
      setView("applications");
    } catch (error) {
      console.error(
        "Failed to load applications:",
        error
      );

      setError(
        "Failed to load applications"
      );
    }
  };

  const updateApplicationStatus = async (
    applicationId,
    status
  ) => {
    try {
      setError("");

      const response = await api.put(
        `/applications/${applicationId}/status`,
        null,
        {
          params: { status },
        }
      );

      setApplications((previous) =>
        previous.map((application) =>
          application.id === applicationId
            ? response.data
            : application
        )
      );

      window.alert(
        `Application ${status.toLowerCase()} successfully`
      );
    } catch (error) {
      console.error(
        "Failed to update application status:",
        error
      );

      setError(
        "Failed to update application status"
      );
    }
  };

  return (
    <main className="employer-dashboard-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="employer-dashboard-header">
        <div>
          <span className="employer-dashboard-label">
            HIRESPHERE EMPLOYER
          </span>

          <h1>
            Employer Dashboard
          </h1>

          <p>
            Post opportunities, manage your jobs,
            and review candidate applications.
          </p>
        </div>
      </section>

      <div className="employer-dashboard-content">

        {/* =========================
            DASHBOARD TOOLBAR
        ========================= */}

        <div className="employer-dashboard-toolbar">

          <div>
            <span>
              RECRUITMENT
            </span>

            <h2>
              {view === "list"
                ? "My Opportunities"
                : view === "form"
                ? "Create Opportunity"
                : "Candidate Applications"}
            </h2>
          </div>

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

        </div>

        {/* =========================
            ERROR MESSAGE
        ========================= */}

        {error && (
          <div
            role="alert"
            className="error-message"
          >
            {error}
          </div>
        )}

        {/* =========================
            MY JOBS
        ========================= */}

        {view === "list" && (
          <section className="employer-jobs-section">

            <h2>
              My Jobs
            </h2>

            {jobs.length === 0 ? (
              <p>
                No jobs posted yet.
              </p>
            ) : (
              <div className="employer-job-grid">

                {jobs.map((job) => (
                  <article
                    key={job.id}
                    data-testid={`job-${job.id}`}
                    className="card employer-job-card"
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
                        <strong>
                          Location:
                        </strong>{" "}
                        {job.location}
                      </p>
                    )}

                    {job.salary !== undefined &&
                      job.salary !== null &&
                      job.salary !== "" && (
                        <p>
                          <strong>
                            Salary:
                          </strong>{" "}
                          ₹{job.salary} LPA
                        </p>
                      )}

                    {job.requiredSkills && (
                      <p>
                        <strong>
                          Skills:
                        </strong>{" "}
                        {job.requiredSkills}
                      </p>
                    )}

                    {job.experienceRequired !==
                      undefined &&
                      job.experienceRequired !==
                        null &&
                      job.experienceRequired !==
                        "" && (
                        <p>
                          <strong>
                            Experience:
                          </strong>{" "}
                          {
                            job.experienceRequired
                          }{" "}
                          years
                        </p>
                      )}

                    {job.status && (
                      <p>
                        <strong>
                          Status:
                        </strong>{" "}
                        {job.status}
                      </p>
                    )}

                    <div className="job-actions">

                      {/* Keep button order:
                          Edit -> Delete -> View Applicants */}

                      <button
                        type="button"
                        onClick={() => {
                          // Edit functionality later
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

                      <button
                        type="button"
                        onClick={() =>
                          loadApplications(job)
                        }
                      >
                        View Applicants
                      </button>

                    </div>

                  </article>
                ))}

              </div>
            )}

          </section>
        )}

        {/* =========================
            POST JOB
        ========================= */}

        {view === "form" && (
          <section className="employer-form-section">

            <h2>
              Post a New Opportunity
            </h2>

            <form
              onSubmit={handleSubmit}
              className="employer-job-form"
            >

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
                value={formData.description}
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
                value={formData.requiredSkills}
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
                value={
                  formData.experienceRequired
                }
                onChange={handleChange}
              />

              <button type="submit">
                Publish Job
              </button>

            </form>

          </section>
        )}

        {/* =========================
            APPLICATIONS
        ========================= */}

        {view === "applications" && (
          <section className="employer-applications-section">

            <div className="employer-applications-heading">

              <div>
                <span>
                  CANDIDATES
                </span>

                <h2>
                  Applicants for{" "}
                  {selectedJob?.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setView("list")
                }
              >
                Back to My Jobs
              </button>

            </div>

            {applications.length === 0 ? (
              <p>
                No applications yet.
              </p>
            ) : (
              <div className="employer-application-grid">

                {applications.map(
                  (application) => (
                    <article
                      key={application.id}
                      className="card employer-application-card"
                    >

                      <h3>
                        {application.fullName ||
                          application.seeker
                            ?.fullName ||
                          "Applicant"}
                      </h3>

                      {application.email && (
                        <p>
                          <strong>
                            Email:
                          </strong>{" "}
                          {application.email}
                        </p>
                      )}

                      {application.phone && (
                        <p>
                          <strong>
                            Phone:
                          </strong>{" "}
                          {application.phone}
                        </p>
                      )}

                      {application.skills && (
                        <p>
                          <strong>
                            Skills:
                          </strong>{" "}
                          {application.skills}
                        </p>
                      )}

                      {application.experience !==
                        undefined && (
                        <p>
                          <strong>
                            Experience:
                          </strong>{" "}
                          {
                            application.experience
                          }
                        </p>
                      )}

                      {application.resumeUrl && (
                        <p>
                          <strong>
                            Resume:
                          </strong>{" "}
                          {
                            application.resumeUrl
                          }
                        </p>
                      )}

                      {application.expectedSalary && (
                        <p>
                          <strong>
                            Expected Salary:
                          </strong>{" "}
                          {
                            application.expectedSalary
                          }
                        </p>
                      )}

                      {application.noticePeriod && (
                        <p>
                          <strong>
                            Notice Period:
                          </strong>{" "}
                          {
                            application.noticePeriod
                          }
                        </p>
                      )}

                      {application.coverLetter && (
                        <p>
                          <strong>
                            Cover Letter:
                          </strong>{" "}
                          {
                            application.coverLetter
                          }
                        </p>
                      )}

                      {application.status && (
                        <p>
                          <strong>
                            Status:
                          </strong>{" "}
                          {application.status}
                        </p>
                      )}

                      <div className="job-actions">

                        <button
                          type="button"
                          onClick={() =>
                            updateApplicationStatus(
                              application.id,
                              "SHORTLISTED"
                            )
                          }
                        >
                          Shortlist
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateApplicationStatus(
                              application.id,
                              "REJECTED"
                            )
                          }
                        >
                          Reject
                        </button>

                      </div>

                    </article>
                  )
                )}

              </div>
            )}

          </section>
        )}

      </div>

    </main>
  );
}