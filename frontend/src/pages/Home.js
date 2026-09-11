// src/pages/Home.js

import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Skill Matching",
    text: "Match your skills with the right opportunities.",
  },
  {
    title: "Diverse Roles",
    text: "Explore opportunities across multiple career paths.",
  },
  {
    title: "Verified Profiles",
    text: "Connect through trusted candidate and employer profiles.",
  },
];

export default function Home() {
  return (
    <main className="home-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">
            Build Your Career with HireSphere
          </span>

          <h1 id="hero-heading-t30">
            Connect with Your
            <span> Dream Job</span>
          </h1>

          <p>
            Discover the right opportunities, showcase your skills,
            and connect with employers who are looking for talent like you.
          </p>

          <div className="hero-buttons">
            <Link
              to="/register"
              className="primary-btn"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="secondary-btn"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-box">
            <div className="hero-icon">💼</div>

            <h2>Find Your Next Opportunity</h2>

            <p>
              Explore jobs, apply easily, and track your
              applications in one place.
            </p>

            <div className="hero-stats">
              <div>
                <strong>Jobs</strong>
                <span>Explore Roles</span>
              </div>

              <div>
                <strong>Easy</strong>
                <span>Applications</span>
              </div>

              <div>
                <strong>Smart</strong>
                <span>Hiring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <div className="section-heading">
          <span>WHY HIRESPHERE?</span>

          <h2>
            Everything You Need for Your Career
          </h2>

          <p>
            HireSphere connects job seekers and employers through
            one simple recruitment platform.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card feature-card"
            >
              <div className="feature-number">
                0{index + 1}
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

      {/* CTA */}
      <section className="home-cta">
        <div>
          <h2>
            Ready to Start Your Career Journey?
          </h2>

          <p>
            Create your HireSphere account and discover opportunities today.
          </p>
        </div>

        <Link
          to="/register"
          className="cta-btn"
        >
          Create Account
        </Link>
      </section>

      <footer className="home-footer">
        <div>
          <strong>HireSphere</strong>
          <span>Smart Recruitment. Better Opportunities.</span>
        </div>

        <p>
          © 2026 HireSphere. Built for excellence.
        </p>
      </footer>
    </main>
  );
}