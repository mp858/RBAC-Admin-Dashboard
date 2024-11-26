import React, { useState, useEffect } from "react";
import "../styles/RoleModal.css";

const RoleModal = ({ isOpen, onClose, onSave, role }) => {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState({
    Read: false,
    Write: false,
    Delete: false,
  });

  useEffect(() => {
    if (role) {
      setRoleName(role.name);
      const newPermissions = { Read: false, Write: false, Delete: false };
      role.permissions.forEach((perm) => (newPermissions[perm] = true));
      setPermissions(newPermissions);
    } else {
      setRoleName("");
      setPermissions({ Read: false, Write: false, Delete: false });
    }
  }, [role]);

  const handlePermissionChange = (perm) => {
    setPermissions({ ...permissions, [perm]: !permissions[perm] });
  };

  const handleSave = () => {
    const selectedPermissions = Object.keys(permissions).filter(
      (perm) => permissions[perm]
    );
    if (!roleName.trim()) {
      alert("Role name cannot be empty.");
      return;
    }
    onSave({
      name: roleName.trim(),
      permissions: selectedPermissions,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="role-modal-overlay">
      <div className="role-modal">
        <h3>{role ? "Edit Role" : "Add Role"}</h3>
        <div className="form-group">
          <label>Role Name</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Permissions</label>
          <div className="permissions">
            {Object.keys(permissions).map((perm) => (
              <div key={perm} className="checkbox-group">
                <input
                  type="checkbox"
                  id={perm}
                  checked={permissions[perm]}
                  onChange={() => handlePermissionChange(perm)}
                />
                <label htmlFor={perm}>{perm}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>{role ? "Save Changes" : "Add Role"}</button>
        </div>
      </div>
    </div>
  );
};

export default RoleModal;


