import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Smart Job Discovery",
    text: "Find opportunities that match your skills and career goals.",
  },
  {
    title: "Simple Applications",
    text: "Apply quickly and track your application status in one place.",
  },
  {
    title: "Better Hiring",
    text: "Employers can post jobs and manage applicants efficiently.",
  },
];

export default function Home() {
  return (
    <main className="gradient-home">

      <section className="gradient-hero">
        <div className="gradient-overlay"></div>

        <div className="gradient-content">

          <p className="gradient-label">
            WELCOME TO HIRESPHERE
          </p>

          <h1 id="hero-heading-t30">
            Your Future Starts
            <span> Here.</span>
          </h1>

          <p className="gradient-subtitle">
            Discover opportunities, showcase your skills,
            and connect with the right employers.
          </p>

          <div className="gradient-actions">
            <Link
              to="/register"
              className="gradient-primary-btn"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="gradient-secondary-btn"
            >
              Login
            </Link>
          </div>

        </div>
      </section>

      <section className="gradient-features">

        <div className="gradient-heading">
          <p>WHY HIRESPHERE</p>

          <h2>
            One Platform. Better Opportunities.
          </h2>
        </div>

        <div className="gradient-grid">
          {features.map((feature, index) => (
            <div
              className="gradient-card"
              key={feature.title}
            >
              <div className="gradient-icon">
                {index + 1}
              </div>

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.text}
              </p>
            </div>
          ))}
        </div>

      </section>

      <section className="gradient-cta">

        <h2>
          Start Your Career Journey Today
        </h2>

        <p>
          Join HireSphere and connect with opportunities
          that match your future.
        </p>

        <Link
          to="/register"
          className="gradient-cta-btn"
        >
          Create Account
        </Link>

      </section>

      <footer className="gradient-footer">
        © 2026 HireSphere. Built for excellence.
      </footer>

    </main>
  );
}