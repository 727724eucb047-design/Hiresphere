import React from "react";
import JobList from "../components/job/JobList";

export default function EmployerDashboard() {
  return (
    <main className="container">
      <h1>Employer Dashboard</h1>
      <JobList isAdmin={false} />
    </main>
  );
}
