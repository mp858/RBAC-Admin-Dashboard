import React, { useState } from "react";
import UserManagement from "./UserManagement";
import RoleManagement from "./RoleManagement";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState("Users");

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <button
          className={currentSection === "Users" ? "active" : ""}
          onClick={() => setCurrentSection("Users")}
        >
          Users
        </button>
        <button
          className={currentSection === "Roles" ? "active" : ""}
          onClick={() => setCurrentSection("Roles")}
        >
          Roles
        </button>
      </div>
      <div className="content">
        {currentSection === "Users" && <UserManagement />}
        {currentSection === "Roles" && <RoleManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
