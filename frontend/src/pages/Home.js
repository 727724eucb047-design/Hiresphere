import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    number: "01",
    title: "Discover Opportunities",
    text: "Explore career opportunities that match your skills and interests.",
  },
  {
    number: "02",
    title: "Apply with Ease",
    text: "Apply for jobs and keep track of your applications from one place.",
  },
  {
    number: "03",
    title: "Connect with Talent",
    text: "Employers can post opportunities and manage suitable candidates.",
  },
];

export default function Home() {
  return (
    <main className="corporate-home">

      <section className="corporate-hero">

        <div className="corporate-hero-left">

          <div className="corporate-tag">
            HIRESPHERE
          </div>

          <h1 id="hero-heading-t30">
            Where talent meets
            <span> opportunity.</span>
          </h1>

          <p>
            A smarter hiring platform designed to connect
            talented candidates with the right employers.
          </p>

          <div className="corporate-actions">

            <Link
              to="/register"
              className="corporate-primary"
            >
              Get Started →
            </Link>

            <Link
              to="/login"
              className="corporate-secondary"
            >
              Login
            </Link>

          </div>

        </div>

        <div className="corporate-hero-right">

          <div className="career-card">

            <div className="career-card-top">
              <span>CAREER OPPORTUNITIES</span>
              <div className="online-dot"></div>
            </div>

            <h2>
              Find a role that matches your potential.
            </h2>

            <div className="career-item">
              <div className="career-symbol">J</div>

              <div>
                <strong>Java Developer</strong>
                <span>Backend Development</span>
              </div>

              <b>→</b>
            </div>

            <div className="career-item">
              <div className="career-symbol">F</div>

              <div>
                <strong>Frontend Developer</strong>
                <span>Web Development</span>
              </div>

              <b>→</b>
            </div>

            <div className="career-item">
              <div className="career-symbol">S</div>

              <div>
                <strong>Software Engineer</strong>
                <span>Technology</span>
              </div>

              <b>→</b>
            </div>

          </div>

        </div>

      </section>

      <section className="corporate-features">

        <div className="corporate-heading">
          <p>WHY CHOOSE HIRESPHERE</p>

          <h2>
            Built for better hiring
          </h2>
        </div>

        <div className="corporate-feature-grid">

          {features.map((feature) => (
            <div
              className="corporate-feature"
              key={feature.title}
            >
              <span>{feature.number}</span>

              <h3>{feature.title}</h3>

              <p>{feature.text}</p>
            </div>
          ))}

        </div>

      </section>

      <footer className="corporate-footer">

        <strong>HireSphere</strong>

        <span>
          © 2026 HireSphere. All rights reserved.
        </span>

      </footer>

    </main>
  );
}