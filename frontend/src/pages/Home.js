import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <h1 id="hero-heading-t30">Connect with Your Dream Job</h1>
        <p>Find opportunities and connect with employers.</p>
        <div className="actions" style={{ justifyContent: "center" }}>
          <Link to="/register" className="primary">Get Started</Link>
          <Link to="/login" className="secondary">Login</Link>
        </div>
      </section>
      <section className="container">
        <div className="grid">
          <div className="card"><h3>Skill Matching</h3><p>Connect skills with suitable opportunities.</p></div>
          <div className="card"><h3>Diverse Roles</h3><p>Explore roles across different careers.</p></div>
          <div className="card"><h3>Verified Profiles</h3><p>Work with trusted candidates and employers.</p></div>
        </div>
      </section>
      <footer className="container">© 2026 HireSphere. Built for excellence.</footer>
    </main>
  );
}

