import React, { useContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useInRouterContext,
} from "react-router-dom";

import "./App.css";

import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import SeekerDashboard from "./pages/SeekerDashboard";

export function PrivateRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppContent() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/employer-dashboard"
          element={
            <PrivateRoute allowedRoles={["EMPLOYER"]}>
              <EmployerDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/seeker-dashboard"
          element={
            <PrivateRoute allowedRoles={["JOB_SEEKER"]}>
              <SeekerDashboard />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  const insideRouter = useInRouterContext();

  if (insideRouter) {
    return <AppContent />;
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}