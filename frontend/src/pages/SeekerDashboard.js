import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

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
  email: "",
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
  const [profile, setProfile] = useState(
    EMPTY_PROFILE
  );

  const [query, setQuery] = useState("");
  const [view, setView] = useState("jobs");

  const [selectedJob, setSelectedJob] =
    useState(null);

  const [applyData, setApplyData] = useState(
    EMPTY_APPLICATION
  );

  const [error, setError] = useState("");

  /* =============================
     LOAD DASHBOARD DATA
  ============================== */

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
          const jobsData =
            jobsResponse?.data;

          const applicationsData =
            applicationsResponse?.data;

          const profileData =
            profileResponse?.data;

          setJobs(
            Array.isArray(jobsData)
              ? jobsData
              : Array.isArray(
                  jobsData?.content
                )
              ? jobsData.content
              : Array.isArray(
                  jobsData?.jobs
                )
              ? jobsData.jobs
              : []
          );

          setApplications(
            Array.isArray(
              applicationsData
            )
              ? applicationsData
              : Array.isArray(
                  applicationsData?.content
                )
              ? applicationsData.content
              : Array.isArray(
                  applicationsData?.applications
                )
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
        setError(
          "Failed to load seeker dashboard"
        );
      });
  }, []);

  /* =============================
     SEARCH
  ============================== */

  const filteredJobs = useMemo(() => {
    const search = query
      .trim()
      .toLowerCase();

    if (!search) {
      return jobs;
    }

    return jobs.filter((job) => {
      const title = String(
        job.title ||
          job.jobTitle ||
          ""
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

  /* =============================
     PROFILE
  ============================== */

  const handleProfileChange = (event) => {
    const { name, value } =
      event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const updateProfile = async (
    event
  ) => {
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

      window.alert(
        "Profile updated successfully!"
      );
    } catch (err) {
      setError(
        "Failed to update profile"
      );
    }
  };

  /* =============================
     OPEN APPLICATION
  ============================== */

  const openApplication = (job) => {
    setSelectedJob(job);

    setApplyData((previous) => ({
      ...previous,

      fullName:
        previous.fullName ||
        profile.fullName ||
        "Applicant User",

      email:
        previous.email ||
        profile.email ||
        profile.username ||
        "applicant_user",

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

  const handleApplyChange = (
    event
  ) => {
    const { name, value } =
      event.target;

    setApplyData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =============================
     SUBMIT APPLICATION
  ============================== */

  const submitApplication = async (
    event
  ) => {
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
      setApplyData(
        EMPTY_APPLICATION
      );
      setError("");

      window.alert(
        "Applied successfully!"
      );
    } catch (err) {
      setError(
        "Failed to submit application"
      );
    }
  };

  /* =============================
     WITHDRAW APPLICATION
  ============================== */

  const withdrawApplication = async (
    applicationId
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to withdraw this application?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(
        `/applications/${applicationId}`
      );

      setApplications((previous) =>
        previous.filter(
          (application) =>
            application.id !==
            applicationId
        )
      );

      window.alert(
        "Application withdrawn successfully!"
      );
    } catch (error) {
      console.error(
        "Failed to withdraw application:",
        error
      );

      setError(
        "Failed to withdraw application"
      );
    }
  };

  return (
    <main className="seeker-dashboard-page">

      {/* =============================
          HEADER
      ============================== */}

      <section className="seeker-dashboard-header">
        <div>
          <span className="seeker-dashboard-label">
            HIRESPHERE CANDIDATE
          </span>

          <h1>
            Job Seeker Dashboard
          </h1>

          <p>
            Discover opportunities, track
            applications, and build your
            professional profile.
          </p>
        </div>
      </section>

      <div className="seeker-dashboard-content">

        {/* =============================
            TOOLBAR
        ============================== */}

        <div className="seeker-dashboard-toolbar">

          <div>
            <span>
              CAREER CENTER
            </span>

            <h2>
              {view === "jobs"
                ? "Explore Opportunities"
                : view ===
                  "applications"
                ? "My Applications"
                : "My Profile"}
            </h2>
          </div>

          <div className="actions">

            <button
              type="button"
              className={
                view === "jobs"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setView("jobs")
              }
            >
              Live Jobs
            </button>

            <button
              type="button"
              className={
                view ===
                "applications"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setView(
                  "applications"
                )
              }
            >
              My Applications
            </button>

            <button
              type="button"
              className={
                view === "profile"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setView("profile")
              }
            >
              Profile
            </button>

          </div>
        </div>

        {/* =============================
            ERROR
        ============================== */}

        {error && (
          <div
            role="alert"
            className="seeker-error-message"
          >
            {error}
          </div>
        )}

        {/* =============================
            LIVE JOBS
        ============================== */}

        {view === "jobs" && (
          <section className="seeker-jobs-section">

            <div className="seeker-search-area">

              <div>
                <span>
                  AVAILABLE ROLES
                </span>

                <h2>
                  Live Jobs
                </h2>
              </div>

              <div className="seeker-search-box">

                <label
                  htmlFor="job-search"
                >
                  Search Jobs
                </label>

                <input
                  id="job-search"
                  name="search"
                  type="search"
                  aria-label="Search jobs"
                  placeholder="Search opportunities..."
                  value={query}
                  onChange={(event) =>
                    setQuery(
                      event.target.value
                    )
                  }
                />

              </div>

            </div>

            {filteredJobs.length ===
            0 ? (
              <div className="seeker-empty-state">
                <h3>
                  No opportunities found
                </h3>

                <p>
                  Try another job title
                  or location.
                </p>
              </div>
            ) : (
              <div className="seeker-job-grid">

                {filteredJobs.map(
                  (job) => (
                    <article
                      className="card seeker-job-card"
                      key={job.id}
                    >

                      <div className="seeker-job-card-top">

                        <div>
                          <span className="seeker-job-badge">
                            OPEN ROLE
                          </span>

                          <h3>
                            {job.title ||
                              job.jobTitle ||
                              "Untitled Job"}
                          </h3>
                        </div>

                      </div>

                      {job.location && (
                        <p className="seeker-job-location">
                          <strong>
                            Location:
                          </strong>{" "}
                          {
                            job.location
                          }
                        </p>
                      )}

                      {job.description && (
                        <p className="seeker-job-description">
                          {
                            job.description
                          }
                        </p>
                      )}

                      {job.salary !==
                        undefined &&
                        job.salary !==
                          null &&
                        job.salary !==
                          "" && (
                          <p>
                            <strong>
                              Salary:
                            </strong>{" "}
                            ₹{job.salary}{" "}
                            LPA
                          </p>
                        )}

                      {job.requiredSkills && (
                        <p>
                          <strong>
                            Skills:
                          </strong>{" "}
                          {
                            job.requiredSkills
                          }
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

                      <button
                        type="button"
                        className="seeker-apply-btn"
                        onClick={() =>
                          openApplication(
                            job
                          )
                        }
                      >
                        Apply Now
                      </button>

                    </article>
                  )
                )}

              </div>
            )}

          </section>
        )}

        {/* =============================
            MY APPLICATIONS
        ============================== */}

        {view ===
          "applications" && (
          <section className="seeker-applications-section">

            <div className="seeker-section-heading">

              <span>
                APPLICATION TRACKER
              </span>

              <h2>
                My Applications
              </h2>

              <p>
                Track the progress of
                your submitted job
                applications.
              </p>

            </div>

            {applications.length ===
            0 ? (
              <div className="seeker-empty-state">

                <h3>
                  No applications yet
                </h3>

                <p>
                  Apply for a job and it
                  will appear here.
                </p>

              </div>
            ) : (
              <div className="seeker-application-grid">

                {applications.map(
                  (application) => (
                    <article
                      className="card seeker-application-card"
                      key={
                        application.id
                      }
                    >

                      <div className="seeker-application-card-header">

                        <div>
                          <span>
                            APPLICATION
                          </span>

                          <h3>
                            {application
                              .job
                              ?.title ||
                              application.jobTitle ||
                              application.title ||
                              "Application"}
                          </h3>
                        </div>

                        {application.status && (
                          <span
                            className={`seeker-status seeker-status-${String(
                              application.status
                            ).toLowerCase()}`}
                          >
                            {
                              application.status
                            }
                          </span>
                        )}

                      </div>

                      {application
                        .job
                        ?.location && (
                        <p>
                          <strong>
                            Location:
                          </strong>{" "}
                          {
                            application
                              .job
                              .location
                          }
                        </p>
                      )}

                      {application.status && (
                        <p>
                          <strong>
                            Status:
                          </strong>{" "}
                          {
                            application.status
                          }
                        </p>
                      )}

                      {application.matchScore !==
                        undefined && (
                        <p>
                          <strong>
                            Match Score:
                          </strong>{" "}
                          {
                            application.matchScore
                          }
                        </p>
                      )}

                      <button
                        type="button"
                        className="seeker-withdraw-btn"
                        onClick={() =>
                          withdrawApplication(
                            application.id
                          )
                        }
                      >
                        Withdraw Application
                      </button>

                    </article>
                  )
                )}

              </div>
            )}

          </section>
        )}

        {/* =============================
            PROFILE
        ============================== */}

        {view === "profile" && (
          <section className="seeker-profile-section">

            <div className="seeker-section-heading">

              <span>
                PROFESSIONAL PROFILE
              </span>

              <h2>
                Update My Profile
              </h2>

              <p>
                Keep your career
                information updated so
                employers can understand
                your skills and
                experience.
              </p>

            </div>

            <form
              className="form seeker-profile-form"
              onSubmit={
                updateProfile
              }
            >

              <div className="seeker-form-grid">

                <div className="seeker-form-group">

                  <label
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    value={
                      profile.fullName ||
                      ""
                    }
                    onChange={
                      handleProfileChange
                    }
                    placeholder="Enter your full name"
                  />

                </div>

                <div className="seeker-form-group">

                  <label
                    htmlFor="skills"
                  >
                    Skills
                  </label>

                  <input
                    id="skills"
                    name="skills"
                    value={
                      profile.skills ||
                      ""
                    }
                    onChange={
                      handleProfileChange
                    }
                    placeholder="Java, React, SQL..."
                  />

                </div>

                <div className="seeker-form-group">

                  <label
                    htmlFor="experience"
                  >
                    Experience
                  </label>

                  <input
                    id="experience"
                    name="experience"
                    value={
                      profile.experience ||
                      ""
                    }
                    onChange={
                      handleProfileChange
                    }
                    placeholder="Example: 1"
                  />

                </div>

                <div className="seeker-form-group">

                  <label
                    htmlFor="education"
                  >
                    Education
                  </label>

                  <input
                    id="education"
                    name="education"
                    value={
                      profile.education ||
                      ""
                    }
                    onChange={
                      handleProfileChange
                    }
                    placeholder="Degree / Institution"
                  />

                </div>

                <div className="seeker-form-group">

                  <label
                    htmlFor="location"
                  >
                    Location
                  </label>

                  <input
                    id="location"
                    name="location"
                    value={
                      profile.location ||
                      ""
                    }
                    onChange={
                      handleProfileChange
                    }
                    placeholder="Your location"
                  />

                </div>

                <div className="seeker-form-group">

                  <label
                    htmlFor="resumeUrl"
                  >
                    Resume URL
                  </label>

                  <input
                    id="resumeUrl"
                    name="resumeUrl"
                    value={
                      profile.resumeUrl ||
                      ""
                    }
                    onChange={
                      handleProfileChange
                    }
                    placeholder="Resume link"
                  />

                </div>

                <div className="seeker-form-group">

                  <label
                    htmlFor="companyName"
                  >
                    Company Name
                  </label>

                  <input
                    id="companyName"
                    name="companyName"
                    value={
                      profile.companyName ||
                      ""
                    }
                    onChange={
                      handleProfileChange
                    }
                    placeholder="Current company if any"
                  />

                </div>

              </div>

              <div className="seeker-form-group seeker-about-group">

                <label
                  htmlFor="about"
                >
                  About
                </label>

                <textarea
                  id="about"
                  name="about"
                  value={
                    profile.about ||
                    ""
                  }
                  onChange={
                    handleProfileChange
                  }
                  placeholder="Write a short professional summary..."
                />

              </div>

              <button
                type="submit"
                className="primary seeker-save-profile-btn"
              >
                Save Profile
              </button>

            </form>

          </section>
        )}

      </div>

      {/* =============================
          APPLY MODAL
      ============================== */}

      {selectedJob && (
        <div
          className="seeker-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Apply for job"
        >

          <form
            className="form seeker-application-form"
            onSubmit={
              submitApplication
            }
          >

            <div className="seeker-modal-heading">

              <span>
                JOB APPLICATION
              </span>

              <h2>
                Apply for{" "}
                {selectedJob.title ||
                  selectedJob.jobTitle}
              </h2>

              <p>
                Complete your details
                before submitting the
                application.
              </p>

            </div>

            <div className="seeker-form-grid">

              <div className="seeker-form-group">

                <label
                  htmlFor="modalFullName"
                >
                  Full Name
                </label>

                <input
                  id="modalFullName"
                  name="fullName"
                  type="text"
                  value={
                    applyData.fullName
                  }
                  onChange={
                    handleApplyChange
                  }
                />

              </div>

              <div className="seeker-form-group">

                <label
                  htmlFor="modalEmail"
                >
                  Email
                </label>

                <input
                  id="modalEmail"
                  name="email"
                  type="email"
                  value={
                    applyData.email
                  }
                  onChange={
                    handleApplyChange
                  }
                />

              </div>

              <div className="seeker-form-group">

                <label
                  htmlFor="modalPhone"
                >
                  Phone
                </label>

                <input
                  id="modalPhone"
                  name="phone"
                  type="text"
                  value={
                    applyData.phone
                  }
                  onChange={
                    handleApplyChange
                  }
                />

              </div>

              <div className="seeker-form-group">

                <label
                  htmlFor="modalSkills"
                >
                  Skills
                </label>

                <input
                  id="modalSkills"
                  name="skills"
                  type="text"
                  value={
                    applyData.skills
                  }
                  onChange={
                    handleApplyChange
                  }
                />

              </div>

              <div className="seeker-form-group">

                <label
                  htmlFor="modalExp"
                >
                  Experience
                </label>

                <input
                  id="modalExp"
                  name="experience"
                  type="text"
                  value={
                    applyData.experience
                  }
                  onChange={
                    handleApplyChange
                  }
                />

              </div>

              <div className="seeker-form-group">

                <label
                  htmlFor="modalResumeUrl"
                >
                  Resume URL
                </label>

                <input
                  id="modalResumeUrl"
                  name="resumeUrl"
                  type="text"
                  value={
                    applyData.resumeUrl
                  }
                  onChange={
                    handleApplyChange
                  }
                />

              </div>

              <div className="seeker-form-group">

                <label
                  htmlFor="modalExpectedSalary"
                >
                  Expected Salary
                </label>

                <input
                  id="modalExpectedSalary"
                  name="expectedSalary"
                  type="text"
                  value={
                    applyData.expectedSalary
                  }
                  onChange={
                    handleApplyChange
                  }
                />

              </div>

              <div className="seeker-form-group">

                <label
                  htmlFor="modalNoticePeriod"
                >
                  Notice Period
                </label>

                <input
                  id="modalNoticePeriod"
                  name="noticePeriod"
                  type="text"
                  value={
                    applyData.noticePeriod
                  }
                  onChange={
                    handleApplyChange
                  }
                />

              </div>

            </div>

            <div className="seeker-form-group">

              <label
                htmlFor="modalCoverLetter"
              >
                Cover Letter
              </label>

              <textarea
                id="modalCoverLetter"
                name="coverLetter"
                value={
                  applyData.coverLetter
                }
                onChange={
                  handleApplyChange
                }
                placeholder="Tell the employer why you are suitable for this role..."
              />

            </div>

            <div className="seeker-modal-actions">

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

            </div>

          </form>

        </div>
      )}

    </main>
  );
}