import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Search Jobs",
    text: "Browse opportunities based on your skills and interests.",
  },
  {
    title: "Apply Easily",
    text: "Submit applications and track your progress in one place.",
  },
  {
    title: "Hire Smarter",
    text: "Employers can post jobs and manage applicants efficiently.",
  },
];

export default function Home() {
  return (
    <main className="job-home">

      <section className="job-hero">
        <div className="job-hero-content">

          <p className="job-label">
            YOUR CAREER STARTS HERE
          </p>

          <h1 id="hero-heading-t30">
            Find the job that
            <span> fits your future.</span>
          </h1>

          <p className="job-subtitle">
            Discover opportunities, connect with employers,
            and take the next step in your career with HireSphere.
          </p>

          <div className="job-search-box">
            <input
              type="text"
              placeholder="Job title or skill"
            />

            <input
              type="text"
              placeholder="Location"
            />

            <button type="button">
              Search Jobs
            </button>
          </div>

          <div className="job-home-actions">
            <Link
              to="/register"
              className="job-register-btn"
            >
              Create Account
            </Link>

            <Link
              to="/login"
              className="job-login-btn"
            >
              Login
            </Link>
          </div>

        </div>
      </section>

      <section className="job-features">

        <div className="job-section-title">
          <p>WHY HIRESPHERE</p>

          <h2>
            Everything you need to move forward
          </h2>
        </div>

        <div className="job-feature-grid">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="job-feature-card"
            >
              <div className="job-feature-icon">
                {index + 1}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.text}</p>
            </div>
          ))}
        </div>

      </section>

      <footer className="job-footer">
        <div>
          <strong>HireSphere</strong>
          <p>Connecting talent with opportunities.</p>
        </div>

        <span>
          © 2026 HireSphere
        </span>
      </footer>

    </main>
  );
}