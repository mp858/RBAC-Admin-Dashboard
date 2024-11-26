import React from "react";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { RBACProvider } from "./context/RBACContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/App.css";
import "./styles/themes.css";

const App = () => {
  return (
    <ThemeProvider>
      <RBACProvider>
        <div className="App">
          <ThemeSwitcher />
          <h1>RBAC Admin Dashboard</h1>
          <UserManagement />
          <RoleManagement />
        </div>
      </RBACProvider>
    </ThemeProvider>
  );
};

export default App;
