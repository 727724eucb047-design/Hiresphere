import React, { useEffect, useMemo, useState } from "react";
import api from "../api";

const EMPTY_APPLICATION = {
  fullName: "",
  email: "",
  phone: "",
  skills: "",
  experience: "",
  resumeUrl: "",
  coverLetter: "",
  expectedSalary: "",
  noticePeriod: "",
};

export default function SeekerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState({
    fullName: "",
    about: "",
    skills: "",
    resumeUrl: "",
    companyName: "",
  });
  const [query, setQuery] = useState("");
  const [view, setView] = useState("jobs");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyData, setApplyData] = useState(EMPTY_APPLICATION);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.get("/jobs"),
      api.get("/applications/seeker"),
      api.get("/profiles/me"),
    ])
      .then(([jobsResponse, applicationsResponse, profileResponse]) => {
        setJobs(Array.isArray(jobsResponse.data) ? jobsResponse.data : []);
        setApplications(
          Array.isArray(applicationsResponse.data)
            ? applicationsResponse.data
            : []
        );
        setProfile((previous) => ({
          ...previous,
          ...(profileResponse.data || {}),
        }));
      })
      .catch(() => {
        setError("Failed to load seeker dashboard");
      });
  }, []);

  const filteredJobs = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return jobs;

    return jobs.filter((job) => {
      const title = (job.title || "").toLowerCase();
      const location = (job.location || "").toLowerCase();
      return title.includes(search) || location.includes(search);
    });
  }, [jobs, query]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const updateProfile = async (event) => {
    event.preventDefault();

    try {
      const response = await api.put("/profiles/me", profile);
      setProfile((previous) => ({
        ...previous,
        ...(response.data || {}),
      }));
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  const openApplication = (job) => {
    setSelectedJob(job);
    setApplyData((previous) => ({
      ...previous,
      fullName: previous.fullName || profile.fullName || "",
      skills: previous.skills || profile.skills || "",
      resumeUrl: previous.resumeUrl || profile.resumeUrl || "",
    }));
  };

  const handleApplyChange = (event) => {
    const { name, value } = event.target;
    setApplyData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submitApplication = async (event) => {
    event.preventDefault();

    if (!selectedJob) return;

    try {
      const response = await api.post(
        `/applications/apply/${selectedJob.id}`,
        applyData
      );

      if (response.data) {
        setApplications((previous) => [...previous, response.data]);
      }

      setSelectedJob(null);
      setApplyData(EMPTY_APPLICATION);
      alert("Application submitted successfully!");
    } catch (err) {
      setError("Failed to submit application");
    }
  };

  return (
    <main className="container">
      <h1>Seeker Dashboard</h1>

      <div className="actions">
        <button type="button" onClick={() => setView("jobs")}>
          Live Jobs
        </button>
        <button type="button" onClick={() => setView("applications")}>
          My Applications
        </button>
        <button type="button" onClick={() => setView("profile")}>
          Profile
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {view === "jobs" && (
        <section>
          <h2>Live Jobs</h2>

          <input
            aria-label="Search jobs"
            placeholder="Search jobs by title or location"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          {filteredJobs.map((job) => (
            <div className="card" key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.location}</p>
              <p>{job.description}</p>
              <button type="button" onClick={() => openApplication(job)}>
                Apply
              </button>
            </div>
          ))}
        </section>
      )}

      {view === "applications" && (
        <section>
          <h2>My Applications</h2>

          {applications.map((application) => (
            <div className="card" key={application.id}>
              <h3>
                {application.job?.title ||
                  application.jobTitle ||
                  "Application"}
              </h3>
              <p>Status: {application.status}</p>
              <p>Match Score: {application.matchScore}</p>
            </div>
          ))}
        </section>
      )}

      {view === "profile" && (
        <section>
          <h2>My Profile</h2>

          <form className="form" onSubmit={updateProfile}>
            <label htmlFor="profile-fullName">Full Name</label>
            <input
              id="profile-fullName"
              name="fullName"
              value={profile.fullName || ""}
              onChange={handleProfileChange}
            />

            <label htmlFor="profile-about">About</label>
            <textarea
              id="profile-about"
              name="about"
              value={profile.about || ""}
              onChange={handleProfileChange}
            />

            <label htmlFor="profile-skills">Skills</label>
            <input
              id="profile-skills"
              name="skills"
              value={profile.skills || ""}
              onChange={handleProfileChange}
            />

            <label htmlFor="profile-resumeUrl">Resume URL</label>
            <input
              id="profile-resumeUrl"
              name="resumeUrl"
              value={profile.resumeUrl || ""}
              onChange={handleProfileChange}
            />

            <label htmlFor="profile-companyName">Company Name</label>
            <input
              id="profile-companyName"
              name="companyName"
              value={profile.companyName || ""}
              onChange={handleProfileChange}
            />

            <button type="submit" className="primary">
              Update Profile
            </button>
          </form>
        </section>
      )}

      {selectedJob && (
        <div role="dialog" aria-modal="true" aria-label="Apply for job">
          <form className="form" onSubmit={submitApplication}>
            <h2>Apply for {selectedJob.title}</h2>

            {[
              ["fullName", "Full Name", "text"],
              ["email", "Email", "email"],
              ["phone", "Phone", "text"],
              ["skills", "Skills", "text"],
              ["experience", "Experience", "number"],
              ["resumeUrl", "Resume URL", "text"],
              ["expectedSalary", "Expected Salary", "number"],
              ["noticePeriod", "Notice Period", "text"],
            ].map(([name, label, type]) => (
              <label key={name}>
                {label}
                <input
                  name={name}
                  type={type}
                  value={applyData[name]}
                  onChange={handleApplyChange}
                />
              </label>
            ))}

            <label>
              Cover Letter
              <textarea
                name="coverLetter"
                value={applyData.coverLetter}
                onChange={handleApplyChange}
              />
            </label>

            <div className="actions">
              <button type="submit" className="primary">
                Submit Application
              </button>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
