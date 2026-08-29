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
  const handleEnter = (event) => {
    event.currentTarget.style.transform = "translateY(-6px)";
  };

  const handleLeave = (event) => {
    event.currentTarget.style.transform = "translateY(0px)";
  };

  return (
    <main>
      <section className="hero">
        <h1 id="hero-heading-t30">Connect with Your Dream Job</h1>
        <p>Discover opportunities, showcase your skills, and grow your career.</p>

        <div className="actions hero-actions">
          <Link to="/register" className="primary">
            Get Started
          </Link>
          <Link to="/login" className="secondary">
            Login
          </Link>
        </div>
      </section>

      <section className="container">
        <div className="grid">
          {features.map((feature) => (
            <div
              className="card feature-card"
              key={feature.title}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              style={{ transform: "translateY(0px)", transition: "transform 0.2s ease" }}
            >
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="container">
        © 2026 HireSphere. Built for excellence.
      </footer>
    </main>
  );
}
