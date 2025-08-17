import React from "react";
import NewsDashboard from "./components/NewsDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function App() {
  return (
    <div className="d-flex min-vh-100 app-main-bg" >
      {/* Sidebar */}
      <div className="sidebar custom-sidebar d-flex flex-column justify-content-between p-3" style={{ minHeight: "100vh" }}>
  <div>
    <div className="sidebar-header mb-4 d-flex align-items-center">
  <div className="nexa-logo me-2 d-flex align-items-center justify-content-center">
    {/* You can use an image or initials */}
    {<img src="/logo.svg" alt="News Nexa Logo" className="rounded-circle me-2" width="40" height="40" />}
  </div>
  <span className="fw-bold fs-4 nexa-title">News Nexa</span>
</div>
    <ul className="nav nav-pills flex-column">
      <li className="nav-item mb-2" key="dashboard">
        <button className="nav-link sidebar-link active">
          <i className="bi bi-house-door me-2"></i> Dashboard
        </button>
      </li>
      <li className="nav-item mb-2" key="analytics">
        <button className="nav-link sidebar-link">
          <i className="bi bi-bar-chart me-2"></i> Analytics
        </button>
      </li>
      <li className="nav-item mb-2" key="settings">
        <button className="nav-link sidebar-link">
          <i className="bi bi-gear me-2"></i> Settings
        </button>
      </li>
    </ul>
  </div>
  <div className="sidebar-footer mt-4">
    <small className="text-muted">© 2025 News Nexa</small>
  </div>
</div>

      {/* Main content */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: "240px" }}>
        <NewsDashboard />
      </div>
    </div>
  );
}

export default App;