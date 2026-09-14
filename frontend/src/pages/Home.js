import React from "react";
import { Link } from "react-router-dom";

const jobs = [
  {
    title: "Java Developer",
    location: "Chennai",
    salary: "7 LPA",
  },
  {
    title: "Frontend Developer",
    location: "Bangalore",
    salary: "8 LPA",
  },
  {
    title: "Software Engineer",
    location: "Coimbatore",
    salary: "6 LPA",
  },
];

export default function Home() {
  return (
    <main className="tech-home">
      <section className="tech-hero">
        <div className="tech-left">
          <div className="tech-badge">
            SMART RECRUITMENT PLATFORM
          </div>

          <h1 id="hero-heading-t30">
            Connect with Your Dream Job
          </h1>

          <p className="tech-description">
            HireSphere connects talented job seekers
            with employers through a simple and
            efficient recruitment platform.
          </p>

          <div className="tech-actions">
            <Link
              to="/register"
              className="tech-primary"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="tech-secondary"
            >
              Login →
            </Link>
          </div>

          <div className="tech-stats">
            <div>
              <strong>Easy</strong>
              <span>Applications</span>
            </div>

            <div>
              <strong>Smart</strong>
              <span>Job Search</span>
            </div>

            <div>
              <strong>Fast</strong>
              <span>Hiring</span>
            </div>
          </div>
        </div>

        <div className="tech-right">
          <div className="tech-job-panel">
            <div className="tech-panel-header">
              <div>
                <span>AVAILABLE OPPORTUNITIES</span>
                <h2>Recommended Jobs</h2>
              </div>

              <div className="tech-live">
                LIVE
              </div>
            </div>

            <div className="tech-job-list">
              {jobs.map((job) => (
                <div
                  className="tech-job-card"
                  key={job.title}
                >
                  <div className="tech-job-logo">
                    {job.title.charAt(0)}
                  </div>

                  <div className="tech-job-info">
                    <h3>{job.title}</h3>

                    <p>
                      {job.location}
                      <span>•</span>
                      {job.salary}
                    </p>
                  </div>

                  <div className="tech-arrow">
                    →
                  </div>
                </div>
              ))}
            </div>

            <div className="tech-panel-bottom">
              <span>
                New opportunities added regularly
              </span>

              <strong>Explore →</strong>
            </div>
          </div>

          <div className="tech-floating tech-floating-one">
            <span>✓</span>

            <div>
              <strong>Application Sent</strong>
              <small>Successfully</small>
            </div>
          </div>

          <div className="tech-floating tech-floating-two">
            <strong>3+</strong>
            <span>Career Paths</span>
          </div>
        </div>
      </section>

      <section className="tech-features">
        <div className="tech-feature-heading">
          <span>WHY HIRESPHERE</span>

          <h2>
            Everything you need to
            <br />
            build your career.
          </h2>
        </div>

        <div className="tech-feature-grid">
          <div
            className="tech-feature card"
            onMouseOver={(event) => {
              event.currentTarget.style.transform =
                "translateY(-5px)";
            }}
            onMouseOut={(event) => {
              event.currentTarget.style.transform =
                "translateY(0)";
            }}
          >
            <div>01</div>

            <h3>Skill Matching</h3>

            <p>
              Discover opportunities matching your
              skills and career interests.
            </p>
          </div>

          <div
            className="tech-feature card"
            onMouseOver={(event) => {
              event.currentTarget.style.transform =
                "translateY(-5px)";
            }}
            onMouseOut={(event) => {
              event.currentTarget.style.transform =
                "translateY(0)";
            }}
          >
            <div>02</div>

            <h3>Diverse Roles</h3>

            <p>
              Explore different roles and career
              opportunities across industries.
            </p>
          </div>

          <div
            className="tech-feature card"
            onMouseOver={(event) => {
              event.currentTarget.style.transform =
                "translateY(-5px)";
            }}
            onMouseOut={(event) => {
              event.currentTarget.style.transform =
                "translateY(0)";
            }}
          >
            <div>03</div>

            <h3>Verified Profiles</h3>

            <p>
              Stay updated on shortlisted and rejected
              applications.
            </p>
          </div>
        </div>
      </section>

      <footer className="tech-footer">
        <strong>HireSphere</strong>

        <p>
          Connecting talent with opportunity.
        </p>

        <span>
          © 2026 HireSphere
        </span>
      </footer>
    </main>
  );
}