import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import "../styles/themeswitcher.css";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-switcher" onClick={toggleTheme}>
      {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
    </div>
  );
};

export default ThemeSwitcher;
