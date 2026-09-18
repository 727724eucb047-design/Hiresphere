import React from "react";
import { Link } from "react-router-dom";

const jobs = [
  {
    title: "Java Developer",
    location: "Chennai",
    salary: "7 LPA",
    skills: "Java • Spring Boot",
  },
  {
    title: "Frontend Developer",
    location: "Bangalore",
    salary: "8 LPA",
    skills: "ReactJS • JavaScript",
  },
  {
    title: "Software Engineer",
    location: "Coimbatore",
    salary: "6 LPA",
    skills: "Java • SQL",
  },
];

export default function Home() {
  return (
    <main className="hire-home">

      {/* HERO SECTION */}
      <section className="hire-hero">
        <div className="hire-hero-content">

          <div className="hire-badge">
            SMART RECRUITMENT PLATFORM
          </div>

          <h1 id="hero-heading-t30">
            Find the Right Job.
            <span> Build Your Future.</span>
          </h1>

          <p className="hire-description">
            HireSphere connects talented job seekers
            with employers through a simple, secure,
            and efficient hiring platform.
          </p>

          <div className="hire-actions">
            <Link
              to="/register"
              className="hire-primary-btn"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="hire-secondary-btn"
            >
              Login
            </Link>
          </div>

          <div className="hire-highlights">
            <div>
              <strong>Easy</strong>
              <span>Job Applications</span>
            </div>

            <div>
              <strong>Secure</strong>
              <span>Role-Based Access</span>
            </div>

            <div>
              <strong>Fast</strong>
              <span>Hiring Process</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="hire-hero-card">

          <div className="hire-card-top">
            <div>
              <span>HIRING MADE SIMPLE</span>
              <h2>Explore Opportunities</h2>
            </div>

            <div className="hire-live">
              ACTIVE
            </div>
          </div>

          <p className="hire-card-description">
            Discover opportunities that match your
            skills and career goals.
          </p>

          <div className="hire-mini-feature">
            <div className="hire-feature-icon">
              01
            </div>

            <div>
              <strong>Search Jobs</strong>
              <span>
                Find opportunities across locations
                and roles.
              </span>
            </div>
          </div>

          <div className="hire-mini-feature">
            <div className="hire-feature-icon">
              02
            </div>

            <div>
              <strong>Apply Easily</strong>
              <span>
                Submit applications directly through
                HireSphere.
              </span>
            </div>
          </div>

          <div className="hire-mini-feature">
            <div className="hire-feature-icon">
              03
            </div>

            <div>
              <strong>Manage Recruitment</strong>
              <span>
                Employers can create and manage job
                opportunities.
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* JOB SECTION */}
      <section className="hire-jobs-section">

        <div className="hire-section-heading">
          <span>AVAILABLE OPPORTUNITIES</span>

          <h2>Featured Jobs</h2>

          <p>
            Explore some of the opportunities
            available through HireSphere.
          </p>
        </div>

        <div className="hire-job-grid">
          {jobs.map((job) => (
            <div
              className="hire-job-card"
              key={job.title}
            >
              <div className="hire-job-top">
                <div className="hire-job-icon">
                  {job.title.charAt(0)}
                </div>

                <span className="hire-job-status">
                  ACTIVE
                </span>
              </div>

              <h3>{job.title}</h3>

              <p className="hire-job-location">
                {job.location}
              </p>

              <div className="hire-job-details">
                <span>{job.salary}</span>
                <span>{job.skills}</span>
              </div>

              <Link
                to="/login"
                className="hire-job-link"
              >
                View Opportunity →
              </Link>
            </div>
          ))}
        </div>

      </section>

      {/* WHY HIRESPHERE */}
      <section className="hire-features">

        <div className="hire-section-heading">
          <span>WHY HIRESPHERE</span>

          <h2>
            One Platform for Smarter Recruitment
          </h2>

          <p>
            Designed for job seekers, employers,
            and administrators.
          </p>
        </div>

        <div className="hire-feature-grid">

          <div className="hire-feature-card">
            <div className="hire-feature-number">
              01
            </div>

            <h3>For Job Seekers</h3>

            <p>
              Browse jobs, manage your profile,
              apply for opportunities, and view
              your applications.
            </p>
          </div>

          <div className="hire-feature-card">
            <div className="hire-feature-number">
              02
            </div>

            <h3>For Employers</h3>

            <p>
              Create job postings and manage
              recruitment activities from a
              dedicated employer dashboard.
            </p>
          </div>

          <div className="hire-feature-card">
            <div className="hire-feature-number">
              03
            </div>

            <h3>For Administrators</h3>

            <p>
              Monitor users, jobs, applications,
              and overall platform activity.
            </p>
          </div>

        </div>
      </section>

      {/* PROCESS */}
      <section className="hire-process">

        <div className="hire-section-heading">
          <span>HOW IT WORKS</span>

          <h2>
            Start Your Journey in Three Steps
          </h2>
        </div>

        <div className="hire-process-grid">

          <div>
            <strong>01</strong>
            <h3>Create Account</h3>
            <p>
              Register as a job seeker or employer.
            </p>
          </div>

          <div>
            <strong>02</strong>
            <h3>Explore</h3>
            <p>
              Browse jobs or create new job
              opportunities.
            </p>
          </div>

          <div>
            <strong>03</strong>
            <h3>Connect</h3>
            <p>
              Apply for jobs and manage the
              recruitment process.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="hire-cta">
        <div>
          <span>GET STARTED TODAY</span>

          <h2>
            Your next opportunity starts here.
          </h2>

          <p>
            Join HireSphere and experience a simpler
            recruitment process.
          </p>
        </div>

        <Link
          to="/register"
          className="hire-cta-btn"
        >
          Create Account →
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="hire-footer">

        <div>
          <strong>HireSphere</strong>

          <p>
            Connecting talent with opportunity.
          </p>
        </div>

        <span>
          © 2026 HireSphere
        </span>

      </footer>

    </main>
  );
}