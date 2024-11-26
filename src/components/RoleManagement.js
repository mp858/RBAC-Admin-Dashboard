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


// import React, { useContext, useState } from "react";
// import { RBACContext } from "../context/RBACContext";
// import RoleModal from "./RoleModal";
// import "../styles/RoleManagement.css";

// const RoleManagement = () => {
//   const { roles, setRoles } = useContext(RBACContext);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRole, setSelectedRole] = useState(null);

//   const handleSave = (roleData) => {
//     if (roleData.id) {
//       setRoles(roles.map((role) => (role.id === roleData.id ? roleData : role)));
//     } else {
//       setRoles([...roles, { id: Date.now(), ...roleData }]);
//     }
//     setIsModalOpen(false);
//   };

//   const handleDelete = (id) => {
//     setRoles(roles.filter((role) => role.id !== id));
//   };

//   const filteredRoles = roles.filter((role) =>
//     role.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="role-management">
//       <div className="header">
//         <h2>Role Management</h2>
//         <input
//           type="text"
//           placeholder="Search by role name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={() => { setSelectedRole(null); setIsModalOpen(true); }}>
//           + Add Role
//         </button>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Role Name</th>
//             <th>Permissions</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredRoles.map((role) => (
//             <tr key={role.id}>
//               <td>{role.name}</td>
//               <td>{role.permissions.join(", ")}</td>
//               <td>
//                 <button onClick={() => { setSelectedRole(role); setIsModalOpen(true); }}>
//                   Edit
//                 </button>
//                 <button onClick={() => handleDelete(role.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <RoleModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSave}
//         role={selectedRole}
//       />
//     </div>
//   );
// };

// export default RoleManagement;


// import React, { useState, useEffect } from "react";
// import "../styles/RoleManagement.css";

// const RoleManagement = () => {
//   const [roles, setRoles] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isExpanded, setIsExpanded] = useState(true);

//   useEffect(() => {
//     const savedRoles = JSON.parse(localStorage.getItem("roles")) || [];
//     setRoles(savedRoles);
//   }, []);

//   const saveToLocalStorage = (updatedRoles) => {
//     localStorage.setItem("roles", JSON.stringify(updatedRoles));
//     setRoles(updatedRoles);
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//   };

//   const handleAddRole = () => {
//     const name = prompt("Enter role name:");
//     if (name) {
//       const newRole = {
//         id: Date.now(),
//         name,
//         permissions: ["Read"],
//       };
//       saveToLocalStorage([...roles, newRole]);
//     }
//   };

//   const handleEditRole = (role) => {
//     const updatedName = prompt("Update role name:", role.name);
//     if (updatedName) {
//       const updatedRoles = roles.map((r) =>
//         r.id === role.id ? { ...r, name: updatedName } : r
//       );
//       saveToLocalStorage(updatedRoles);
//     }
//   };

//   const handleDeleteRole = (id) => {
//     const updatedRoles = roles.filter((role) => role.id !== id);
//     saveToLocalStorage(updatedRoles);
//   };

//   const filteredRoles = roles.filter((role) =>
//     role.name.toLowerCase().includes(searchTerm)
//   );

//   return (
//     <div className="role-management">
//       <div className="header">
//         <h2>
//           Roles
//           <button
//             className="expand-collapse-btn"
//             onClick={() => setIsExpanded(!isExpanded)}
//           >
//             {isExpanded ? "-" : "+"}
//           </button>
//         </h2>
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search roles..."
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//         </div>
//       </div>
//       {isExpanded && (
//         <div>
//           <button className="add-btn" onClick={handleAddRole}>
//             Add Role
//           </button>
//           <table>
//             <thead>
//               <tr>
//                 <th>Role Name</th>
//                 <th>Permissions</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRoles.map((role) => (
//                 <tr key={role.id}>
//                   <td>{role.name}</td>
//                   <td>{role.permissions.join(", ")}</td>
//                   <td>
//                     <button onClick={() => handleEditRole(role)}>Edit</button>
//                     <button onClick={() => handleDeleteRole(role.id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoleManagement;
