import React, { useState, useEffect, useContext } from "react";
import { RBACContext } from "../context/RBACContext";
import UserModal from "./UserModal";
import "../styles/UserManagement.css";

const UserManagement = () => {
  const { roles } = useContext(RBACContext);
  
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Load users from localStorage once when component mounts
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []); // This will only run once when the component first mounts

  // Save users to localStorage whenever the `users` state changes
  useEffect(() => {
    if (users.length) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]); // This will run every time users state changes

  const handleSave = (userData) => {
    // Check if the user already exists by email
    const existingUserIndex = users.findIndex((user) => user.email === userData.email);

    if (selectedUser) {
      // Editing an existing user
      if (existingUserIndex !== -1 && users[existingUserIndex].email !== selectedUser.email) {
        alert("A user with this email already exists.");
        return;
      }

      const updatedUsers = users.map((user) =>
        user.email === selectedUser.email ? { ...user, ...userData } : user
      );
      setUsers(updatedUsers);
    } else {
      // Adding a new user
      if (existingUserIndex !== -1) {
        alert("A user with this email already exists.");
        return;
      }

      const newUser = { ...userData, status: "Active" };
      setUsers([...users, newUser]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((user) => user.email !== email);
      setUsers(updatedUsers);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management">
      <div className="header">
        <h2>User Management</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => {
            setSelectedUser(null);
            setIsModalOpen(true);
          }}
        >
          + Add User
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(user.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          user={selectedUser}
          roles={roles}
        />
      )}
    </div>
  );
};

export default UserManagement;
