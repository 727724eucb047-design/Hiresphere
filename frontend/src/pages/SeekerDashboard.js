import React, { useEffect, useMemo, useState } from "react";
import api from "../api";

const EMPTY_APPLICATION = {
  fullName: "",
  email: "",
  phone: "",
  skills: "",
  experience: "",
  resumeUrl: "",
  expectedSalary: "",
  noticePeriod: "",
  coverLetter: "",
};

const EMPTY_PROFILE = {
  fullName: "",
  about: "",
  skills: "",
  experience: "",
  education: "",
  location: "",
  resumeUrl: "",
  companyName: "",
};

export default function SeekerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(EMPTY_PROFILE);

  const [query, setQuery] = useState("");
  const [view, setView] = useState("jobs");

  const [selectedJob, setSelectedJob] = useState(null);
  const [applyData, setApplyData] = useState(EMPTY_APPLICATION);

  const [error, setError] = useState("");

  // Load jobs, applications and profile
  useEffect(() => {
    Promise.all([
      api.get("/jobs"),
      api.get("/applications/seeker"),
      api.get("/profiles/me"),
    ])
      .then(
        ([
          jobsResponse,
          applicationsResponse,
          profileResponse,
        ]) => {
          const jobsData = jobsResponse?.data;
          const applicationsData = applicationsResponse?.data;
          const profileData = profileResponse?.data;

          setJobs(
            Array.isArray(jobsData)
              ? jobsData
              : Array.isArray(jobsData?.content)
              ? jobsData.content
              : Array.isArray(jobsData?.jobs)
              ? jobsData.jobs
              : []
          );

          setApplications(
            Array.isArray(applicationsData)
              ? applicationsData
              : Array.isArray(applicationsData?.content)
              ? applicationsData.content
              : Array.isArray(applicationsData?.applications)
              ? applicationsData.applications
              : []
          );

          setProfile((previous) => ({
            ...previous,
            ...(profileData || {}),
          }));

          setError("");
        }
      )
      .catch(() => {
        setError("Failed to load seeker dashboard");
      });
  }, []);

  // T28 - Search jobs by title or location
  const filteredJobs = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return jobs;
    }

    return jobs.filter((job) => {
      const title = String(
        job.title || job.jobTitle || ""
      ).toLowerCase();

      const location = String(
        job.location || ""
      ).toLowerCase();

      return (
        title.includes(search) ||
        location.includes(search)
      );
    });
  }, [jobs, query]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // T29 - Update profile
  const updateProfile = async (event) => {
    event.preventDefault();

    try {
      const response = await api.put(
        "/profiles/me",
        profile
      );

      if (response?.data) {
        setProfile((previous) => ({
          ...previous,
          ...response.data,
        }));
      }

      setError("");
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  const openApplication = (job) => {
    setSelectedJob(job);

    setApplyData((previous) => ({
      ...previous,

      fullName:
        previous.fullName ||
        profile.fullName ||
        "",

      skills:
        previous.skills ||
        profile.skills ||
        "",

      experience:
        previous.experience ||
        profile.experience ||
        "",

      resumeUrl:
        previous.resumeUrl ||
        profile.resumeUrl ||
        "",
    }));
  };

  const handleApplyChange = (event) => {
    const { name, value } = event.target;

    setApplyData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // T30 - Submit job application
  const submitApplication = async (event) => {
    event.preventDefault();

    if (!selectedJob) {
      return;
    }

    try {
      const response = await api.post(
        `/applications/apply/${selectedJob.id}`,
        applyData
      );

      if (response?.data) {
        setApplications((previous) => [
          ...previous,
          response.data,
        ]);
      }

      setSelectedJob(null);
      setApplyData(EMPTY_APPLICATION);
      setError("");
    } catch (err) {
      setError("Failed to submit application");
    }
  };

  return (
    <main className="container">
      <h1>Seeker Dashboard</h1>

      <div className="actions">
        <button
          type="button"
          onClick={() => setView("jobs")}
        >
          Live Jobs
        </button>

        <button
          type="button"
          onClick={() => setView("applications")}
        >
          My Applications
        </button>

        <button
          type="button"
          onClick={() => setView("profile")}
        >
          Profile
        </button>
      </div>

      {error && (
        <div role="alert">
          {error}
        </div>
      )}

      {/* =========================
          T28 - LIVE JOBS
          ========================= */}
      {view === "jobs" && (
        <section>
          <h2>Live Jobs</h2>

          <label htmlFor="job-search">
            Search Jobs
          </label>

          <input
            id="job-search"
            name="search"
            type="search"
            aria-label="Search jobs"
            placeholder="Search jobs by title or location"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
          />

          {filteredJobs.map((job) => (
            <article
              className="card"
              key={job.id}
            >
              <h3>
                {job.title || job.jobTitle}
              </h3>

              <p>{job.location}</p>

              {job.description && (
                <p>{job.description}</p>
              )}

              <button
                type="button"
                onClick={() =>
                  openApplication(job)
                }
              >
                Apply
              </button>
            </article>
          ))}
        </section>
      )}

      {/* =========================
          MY APPLICATIONS
          ========================= */}
      {view === "applications" && (
        <section>
          <h2>My Applications</h2>

          {applications.map((application) => (
            <article
              className="card"
              key={application.id}
            >
              <h3>
                {application.job?.title ||
                  application.jobTitle ||
                  application.title ||
                  "Application"}
              </h3>

              {application.status && (
                <p>
                  Status: {application.status}
                </p>
              )}

              {application.matchScore !==
                undefined && (
                <p>
                  Match Score:{" "}
                  {application.matchScore}
                </p>
              )}
            </article>
          ))}
        </section>
      )}

      {/* =========================
          T29 - PROFILE
          ========================= */}
      {view === "profile" && (
        <section>
          <h2>Update My Profile</h2>

          <form
            className="form"
            onSubmit={updateProfile}
          >
            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              value={profile.fullName || ""}
              onChange={handleProfileChange}
            />

            <label htmlFor="about">
              About
            </label>

            <textarea
              id="about"
              name="about"
              value={profile.about || ""}
              onChange={handleProfileChange}
            />

            <label htmlFor="skills">
              Skills
            </label>

            <input
              id="skills"
              name="skills"
              value={profile.skills || ""}
              onChange={handleProfileChange}
            />

            <label htmlFor="experience">
              Experience
            </label>

            <input
              id="experience"
              name="experience"
              value={profile.experience || ""}
              onChange={handleProfileChange}
            />

            <label htmlFor="education">
              Education
            </label>

            <input
              id="education"
              name="education"
              value={profile.education || ""}
              onChange={handleProfileChange}
            />

            <label htmlFor="location">
              Location
            </label>

            <input
              id="location"
              name="location"
              value={profile.location || ""}
              onChange={handleProfileChange}
            />

            <label htmlFor="resumeUrl">
              Resume URL
            </label>

            <input
              id="resumeUrl"
              name="resumeUrl"
              value={profile.resumeUrl || ""}
              onChange={handleProfileChange}
            />

            <label htmlFor="companyName">
              Company Name
            </label>

            <input
              id="companyName"
              name="companyName"
              value={profile.companyName || ""}
              onChange={handleProfileChange}
            />

            <button
              type="submit"
              className="primary"
            >
              Update Profile
            </button>
          </form>
        </section>
      )}

      {/* =========================
          T30 - APPLY MODAL
          ========================= */}
      {selectedJob && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Apply for job"
        >
          <form
            className="form"
            onSubmit={submitApplication}
          >
            <h2>
              Apply for{" "}
              {selectedJob.title ||
                selectedJob.jobTitle}
            </h2>

            <label htmlFor="modalFullName">
              Full Name
            </label>

            <input
              id="modalFullName"
              name="fullName"
              type="text"
              value={applyData.fullName}
              onChange={handleApplyChange}
            />

            <label htmlFor="modalEmail">
              Email
            </label>

            <input
              id="modalEmail"
              name="email"
              type="email"
              value={applyData.email}
              onChange={handleApplyChange}
            />

            <label htmlFor="modalPhone">
              Phone
            </label>

            <input
              id="modalPhone"
              name="phone"
              type="text"
              value={applyData.phone}
              onChange={handleApplyChange}
            />

            <label htmlFor="modalSkills">
              Skills
            </label>

            <input
              id="modalSkills"
              name="skills"
              type="text"
              value={applyData.skills}
              onChange={handleApplyChange}
            />

            <label htmlFor="modalExp">
              Experience
            </label>

            <input
              id="modalExp"
              name="experience"
              type="text"
              value={applyData.experience}
              onChange={handleApplyChange}
            />

            <label htmlFor="modalResumeUrl">
              Resume URL
            </label>

            <input
              id="modalResumeUrl"
              name="resumeUrl"
              type="text"
              value={applyData.resumeUrl}
              onChange={handleApplyChange}
            />

            <label htmlFor="modalExpectedSalary">
              Expected Salary
            </label>

            <input
              id="modalExpectedSalary"
              name="expectedSalary"
              type="text"
              value={applyData.expectedSalary}
              onChange={handleApplyChange}
            />

            <label htmlFor="modalNoticePeriod">
              Notice Period
            </label>

            <input
              id="modalNoticePeriod"
              name="noticePeriod"
              type="text"
              value={applyData.noticePeriod}
              onChange={handleApplyChange}
            />

            <label htmlFor="modalCoverLetter">
              Cover Letter
            </label>

            <textarea
              id="modalCoverLetter"
              name="coverLetter"
              value={applyData.coverLetter}
              onChange={handleApplyChange}
            />

            <button
              type="submit"
              className="primary"
            >
              Submit Application
            </button>

            <button
              type="button"
              onClick={() =>
                setSelectedJob(null)
              }
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </main>
  );
}