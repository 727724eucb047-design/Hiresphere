import React, { useState } from "react";
import { Link } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Java Developer",
    location: "Chennai",
    salary: "₹7 LPA",
    experience: "Fresher",
    skills: "Java • Spring Boot • REST API",
  },
  {
    id: 2,
    title: "Frontend Developer",
    location: "Bangalore",
    salary: "₹8 LPA",
    experience: "1 Year",
    skills: "ReactJS • JavaScript • CSS",
  },
  {
    id: 3,
    title: "Software Engineer",
    location: "Coimbatore",
    salary: "₹6 LPA",
    experience: "Fresher",
    skills: "Java • SQL • OOP",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      job.skills
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesLocation =
      job.location
        .toLowerCase()
        .includes(location.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  return (
    <main className="portal-home">

      {/* HERO */}

      <section className="portal-hero">

        <div className="portal-hero-inner">

          <span className="portal-eyebrow">
            HIRESPHERE RECRUITMENT PLATFORM
          </span>

          <h1 id="hero-heading-t30">
            Your Career Starts
            <span> Here.</span>
          </h1>

          <p>
            Search opportunities, connect with employers,
            and take the next step in your career.
          </p>

          {/* SEARCH BAR */}

          <div className="portal-search-box">

            <div className="portal-search-field">
              <span>⌕</span>

              <div>
                <label>WHAT</label>

                <input
                  type="text"
                  placeholder="Job title or skills"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="portal-search-divider" />

            <div className="portal-search-field">
              <span>⌖</span>

              <div>
                <label>WHERE</label>

                <input
                  type="text"
                  placeholder="City or location"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                />
              </div>
            </div>

            <button
              className="portal-search-button"
              type="button"
            >
              Search Jobs
            </button>

          </div>

          <div className="portal-quick-info">

            <div>
              <strong>3</strong>
              <span>Active Jobs</span>
            </div>

            <div>
              <strong>3+</strong>
              <span>Career Roles</span>
            </div>

            <div>
              <strong>Easy</strong>
              <span>Applications</span>
            </div>

          </div>

        </div>

      </section>


      {/* JOBS */}

      <section className="portal-jobs">

        <div className="portal-section-header">

          <div>
            <span>OPPORTUNITIES</span>

            <h2>Explore Latest Jobs</h2>

            <p>
              Find opportunities matching your skills
              and career interests.
            </p>
          </div>

          <Link to="/login">
            View All Jobs →
          </Link>

        </div>


        <div className="portal-job-grid">

          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (

              <article
                className="portal-job-card"
                key={job.id}
              >

                <div className="portal-job-header">

                  <div className="portal-company-icon">
                    {job.title.charAt(0)}
                  </div>

                  <span className="portal-active">
                    ACTIVE
                  </span>

                </div>

                <h3>{job.title}</h3>

                <p className="portal-job-place">
                  {job.location}
                </p>

                <div className="portal-job-meta">

                  <span>{job.salary}</span>

                  <span>{job.experience}</span>

                </div>

                <p className="portal-job-skills">
                  {job.skills}
                </p>

                <Link
                  to="/login"
                  className="portal-view-job"
                >
                  View Job
                  <span>→</span>
                </Link>

              </article>

            ))
          ) : (

            <div className="portal-no-jobs">
              No matching jobs found.
            </div>

          )}

        </div>

      </section>


      {/* USERS */}

      <section className="portal-users">

        <div className="portal-users-title">

          <span>ONE PLATFORM</span>

          <h2>Built for Everyone in Hiring</h2>

          <p>
            HireSphere provides dedicated functionality
            for every user role.
          </p>

        </div>


        <div className="portal-user-grid">

          <div className="portal-user-card">

            <div className="portal-role-icon">
              JS
            </div>

            <h3>Job Seekers</h3>

            <p>
              Search available jobs, maintain your
              profile and submit applications.
            </p>

            <Link to="/register">
              Find Jobs →
            </Link>

          </div>


          <div className="portal-user-card">

            <div className="portal-role-icon">
              EM
            </div>

            <h3>Employers</h3>

            <p>
              Create job opportunities and manage
              your job postings through one dashboard.
            </p>

            <Link to="/register">
              Start Hiring →
            </Link>

          </div>


          <div className="portal-user-card">

            <div className="portal-role-icon">
              AD
            </div>

            <h3>Administrator</h3>

            <p>
              Monitor users, jobs, applications
              and overall recruitment activity.
            </p>

            <Link to="/login">
              Admin Login →
            </Link>

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section className="portal-how">

        <div className="portal-how-title">
          <span>SIMPLE PROCESS</span>
          <h2>How HireSphere Works</h2>
        </div>

        <div className="portal-steps">

          <div>
            <strong>01</strong>
            <h3>Create Account</h3>
            <p>
              Register securely with your
              appropriate user role.
            </p>
          </div>

          <div className="portal-step-line" />

          <div>
            <strong>02</strong>
            <h3>Discover</h3>
            <p>
              Search jobs or create job
              opportunities.
            </p>
          </div>

          <div className="portal-step-line" />

          <div>
            <strong>03</strong>
            <h3>Connect</h3>
            <p>
              Apply and manage the recruitment
              process through HireSphere.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="portal-cta">

        <div>
          <span>START YOUR JOURNEY</span>

          <h2>
            Ready for your next opportunity?
          </h2>

          <p>
            Create your HireSphere account
            and get started.
          </p>
        </div>

        <Link to="/register">
          Create Account
        </Link>

      </section>


      {/* FOOTER */}

      <footer className="portal-footer">

        <div>
          <strong>HireSphere</strong>

          <p>
            Connecting talent with opportunity.
          </p>
        </div>

        <div>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <span>
          © 2026 HireSphere
        </span>

      </footer>

    </main>
  );
}