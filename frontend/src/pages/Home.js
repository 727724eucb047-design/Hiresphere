import React, { useState } from "react";
import { Link } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Java Developer",
    location: "Chennai",
    salary: "7 LPA",
    skills: "Java • Spring Boot • REST API",
  },
  {
    id: 2,
    title: "Frontend Developer",
    location: "Bangalore",
    salary: "8 LPA",
    skills: "ReactJS • JavaScript • CSS",
  },
  {
    id: 3,
    title: "Software Engineer",
    location: "Coimbatore",
    salary: "6 LPA",
    skills: "Java • SQL • OOP",
  },
];

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const searchText = keyword.toLowerCase();
    const locationText = location.toLowerCase();

    const matchesKeyword =
      job.title.toLowerCase().includes(searchText) ||
      job.skills.toLowerCase().includes(searchText);

    const matchesLocation =
      job.location.toLowerCase().includes(locationText);

    return matchesKeyword && matchesLocation;
  });

  return (
    <main className="hs-home">

      {/* HERO */}
      <section className="hs-hero">

        <div className="hs-hero-left">

          <div className="hs-small-heading">
            YOUR CAREER. YOUR FUTURE.
          </div>

          <h1 id="hero-heading-t30">
            Find Your Next
            <span> Opportunity.</span>
          </h1>

          <p className="hs-hero-description">
            Discover career opportunities, connect with
            employers, and manage your job applications
            through one simple recruitment platform.
          </p>

          {/* SEARCH */}
          <div className="hs-search">

            <div className="hs-search-input">
              <label>JOB / SKILLS</label>

              <input
                type="text"
                placeholder="Java, React, Developer..."
                value={keyword}
                onChange={(e) =>
                  setKeyword(e.target.value)
                }
              />
            </div>

            <div className="hs-search-input">
              <label>LOCATION</label>

              <input
                type="text"
                placeholder="Chennai, Bangalore..."
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />
            </div>

            <button type="button">
              Search Jobs
            </button>

          </div>

          <div className="hs-popular">
            <strong>Popular:</strong>
            <span>Java</span>
            <span>React</span>
            <span>Spring Boot</span>
          </div>

        </div>


        {/* HERO RIGHT */}
        <div className="hs-hero-right">

          <div className="hs-career-card">

            <div className="hs-card-badge">
              HIRESPHERE
            </div>

            <h2>
              One platform.
              <br />
              Three possibilities.
            </h2>

            <div className="hs-role-row">
              <div className="hs-role-number">01</div>

              <div>
                <strong>Job Seeker</strong>
                <p>
                  Discover and apply for opportunities.
                </p>
              </div>
            </div>

            <div className="hs-role-row">
              <div className="hs-role-number">02</div>

              <div>
                <strong>Employer</strong>
                <p>
                  Create and manage job postings.
                </p>
              </div>
            </div>

            <div className="hs-role-row">
              <div className="hs-role-number">03</div>

              <div>
                <strong>Administrator</strong>
                <p>
                  Monitor and manage the platform.
                </p>
              </div>
            </div>

            <Link
              to="/register"
              className="hs-card-button"
            >
              Create Your Account →
            </Link>

          </div>

        </div>

      </section>


      {/* JOBS */}
      <section className="hs-jobs">

        <div className="hs-section-top">

          <div>
            <span>LATEST OPPORTUNITIES</span>
            <h2>Jobs You May Like</h2>
          </div>

          <Link to="/login">
            Explore all jobs →
          </Link>

        </div>

        <div className="hs-job-grid">

          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (

              <article
                className="hs-job-card"
                key={job.id}
              >

                <div className="hs-job-card-top">

                  <div className="hs-job-letter">
                    {job.title.charAt(0)}
                  </div>

                  <span className="hs-active">
                    ACTIVE
                  </span>

                </div>

                <h3>{job.title}</h3>

                <p className="hs-location">
                  {job.location}
                </p>

                <div className="hs-job-info">
                  <span>₹ {job.salary}</span>
                  <span>{job.skills}</span>
                </div>

                <Link to="/login">
                  View Opportunity
                  <span>→</span>
                </Link>

              </article>

            ))
          ) : (

            <div className="hs-no-jobs">
              <h3>No jobs found</h3>
              <p>
                Try another job title, skill or location.
              </p>
            </div>

          )}

        </div>

      </section>


      {/* PATH SECTION */}
      <section className="hs-path">

        <div className="hs-path-heading">
          <span>CHOOSE YOUR PATH</span>

          <h2>
            HireSphere works for both sides
            of recruitment.
          </h2>
        </div>

        <div className="hs-path-grid">

          <div className="hs-path-card seeker">

            <span>FOR CANDIDATES</span>

            <h2>
              Looking for your
              next opportunity?
            </h2>

            <p>
              Create your profile, explore available
              jobs and submit applications from your
              seeker dashboard.
            </p>

            <Link to="/register">
              Find Your Job →
            </Link>

          </div>


          <div className="hs-path-card employer">

            <span>FOR EMPLOYERS</span>

            <h2>
              Looking for the
              right candidate?
            </h2>

            <p>
              Create job opportunities and manage
              your recruitment activities through
              the employer dashboard.
            </p>

            <Link to="/register">
              Start Hiring →
            </Link>

          </div>

        </div>

      </section>


      {/* BENEFITS */}
      <section className="hs-benefits">

        <div className="hs-benefit">
          <div>01</div>

          <section>
            <h3>Easy Applications</h3>
            <p>
              Apply for opportunities through
              a simple application process.
            </p>
          </section>
        </div>

        <div className="hs-benefit">
          <div>02</div>

          <section>
            <h3>Secure Access</h3>
            <p>
              Role-based authentication protects
              seeker, employer and admin functions.
            </p>
          </section>
        </div>

        <div className="hs-benefit">
          <div>03</div>

          <section>
            <h3>Centralized Hiring</h3>
            <p>
              Jobs, applications and recruitment
              activities are managed in one system.
            </p>
          </section>
        </div>

      </section>


      {/* CTA */}
      <section className="hs-cta">

        <div>
          <span>JOIN HIRESPHERE</span>

          <h2>
            Your next opportunity
            starts here.
          </h2>
        </div>

        <div className="hs-cta-actions">

          <Link
            to="/register"
            className="hs-cta-primary"
          >
            Create Account
          </Link>

          <Link
            to="/login"
            className="hs-cta-secondary"
          >
            Login
          </Link>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="hs-footer">

        <div>
          <strong>HireSphere</strong>

          <p>
            Connecting talent with opportunity.
          </p>
        </div>

        <div className="hs-footer-links">
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