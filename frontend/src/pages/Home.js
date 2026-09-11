import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Find Jobs",
    text: "Explore job opportunities that match your skills.",
  },
  {
    title: "Easy Applications",
    text: "Apply for jobs and track your application status easily.",
  },
  {
    title: "Trusted Hiring",
    text: "Connect job seekers and employers through one platform.",
  },
];

export default function Home() {
  return (
    <main className="home-page">

      <section className="simple-hero">
        <div className="hero-content">
          <p className="hero-small">WELCOME TO HIRESPHERE</p>

          <h1 id="hero-heading-t30">
            Find the right job.
            <br />
            Build your future.
          </h1>

          <p className="hero-description">
            HireSphere helps job seekers discover opportunities
            and helps employers find the right candidates.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="home-primary-btn">
              Get Started
            </Link>

            <Link to="/login" className="home-secondary-btn">
              Login
            </Link>
          </div>
        </div>
      </section>

      <section className="home-features">
        {features.map((feature) => (
          <div className="home-feature-card" key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </section>

      <footer className="simple-footer">
        © 2026 HireSphere
      </footer>

    </main>
  );
}