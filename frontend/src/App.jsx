import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import History from "./pages/History";
import About from "./pages/About";

export default function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/assessment"
        element={<Assessment />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/reports"
        element={<Reports />}
      />

      <Route
        path="/history"
        element={<History />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}