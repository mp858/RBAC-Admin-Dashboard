import React, { useState, useEffect } from "react";
import "../styles/UserModal.css";

const UserModal = ({ isOpen, onClose, onSave, user, roles }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });
  const [localRoles, setLocalRoles] = useState([]);

  // Fetch roles from localStorage if they are not passed as props
  useEffect(() => {
      // Retrieve roles from localStorage if no roles are passed
      const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];
      setLocalRoles(storedRoles);
    

    // If a user is being edited, set the form data to the user's details
    if (user) {
      setFormData(user);
    } else {
      setFormData({ name: "", email: "", role: "", status: "Active" });
    }
  }, [user, roles]); // Re-run when `user` or `roles` change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{user ? "Edit User" : "Add User"}</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </label>
            <label>
              Role:
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                {localRoles.map((role) => (
                  <option key={role.name.toLowerCase()} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Status:
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
          </form>
        </div>
        <div className="modal-footer">
          <button className="save-button" onClick={handleSubmit}>
            Save
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;




