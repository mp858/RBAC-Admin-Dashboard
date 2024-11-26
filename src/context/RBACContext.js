import React, { createContext, useState } from "react";
import { initialUsers, initialRoles } from "../data.js";

export const RBACContext = createContext();

export const RBACProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);

  return (
    <RBACContext.Provider value={{ users, setUsers, roles, setRoles }}>
      {children}
    </RBACContext.Provider>
  );
};
