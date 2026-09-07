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
  const handleEnter = (event) => {
    event.currentTarget.style.transform = "scale(1.05)";
  };

  const handleLeave = (event) => {
    event.currentTarget.style.transform = "scale(1)";
  };

  return (
    <main>
      <section>
        <h1 id="hero-heading-t30">
          Connect with Your Dream Job
        </h1>

        <p>
          Discover opportunities, showcase your skills,
          and grow your career.
        </p>

        <Link to="/register">
          Get Started
        </Link>

        <Link to="/login">
          Login
        </Link>
      </section>

      <section>
        {features.map((feature) => (
          <div
            key={feature.title}
            className="card feature-card"
            style={{
              transform: "scale(1)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={handleEnter}
            onMouseOver={handleEnter}
            onMouseLeave={handleLeave}
            onMouseOut={handleLeave}
          >
            <h3>{feature.title}</h3>

            <p>{feature.text}</p>
          </div>
        ))}
      </section>

      <footer>
        © 2026 HireSphere. Built for excellence.
      </footer>
    </main>
  );
}