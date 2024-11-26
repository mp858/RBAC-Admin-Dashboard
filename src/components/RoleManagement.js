import React, { useState, useEffect } from "react";
import RoleModal from "./RoleModal";
import "../styles/RoleManagement.css";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  // Load roles from localStorage when component mounts
  useEffect(() => {
    // Retrieve roles from localStorage and parse it as an array, if no roles exist, initialize as empty array
    const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setRoles(storedRoles);
  }, []);

  // Save roles to localStorage whenever the roles state changes
  useEffect(() => {
    if (roles.length > 0) {
      // Sync the roles state with localStorage
      localStorage.setItem("roles", JSON.stringify(roles));
    }
  }, [roles]); // This will be called whenever roles state changes

  // Handle saving a new role or updating an existing one
  const handleSave = (roleData) => {
    if (roleData.name) {
      // Check if the role already exists (compare by name, case insensitive)
      const updatedRoles = roles.map((role) =>
        role.name.toLowerCase() === roleData.name.toLowerCase() ? roleData : role
      );

      if (!roles.some(role => role.name.toLowerCase() === roleData.name.toLowerCase())) {
        // Add the new role if it doesn't exist
        setRoles((prevRoles) => [...prevRoles, roleData]);
      } else {
        // Update the role if it exists
        setRoles(updatedRoles);
      }
    }
    setIsModalOpen(false);
  };

  // Handle deleting a role
  const handleDelete = (roleName) => {
    setRoles((prevRoles) =>
      prevRoles.filter((role) => role.name.toLowerCase() !== roleName.toLowerCase())
    );
  };

  // Filter roles based on search term
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="role-management">
      <div className="header">
        <h2>Role Management</h2>
        <input
          type="text"
          placeholder="Search by role name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => {
            setSelectedRole(null); // Clear selected role for adding a new one
            setIsModalOpen(true);
          }}
        >
          + Add Role
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map((role) => (
            <tr key={role.name.toLowerCase()}>
              <td>{role.name}</td>
              <td>{role.permissions.join(", ")}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedRole(role); // Set selected role for editing
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(role.name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        role={selectedRole}
      />
    </div>
  );
};

export default RoleManagement;


