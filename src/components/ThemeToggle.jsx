import { useContext } from "react";
import { TeamContext } from "../context/TeamContext";

function ThemeToggle() {
  const { darkMode, toggleDarkMode } =
    useContext(TeamContext);

  return (
    <button
      className="theme-toggle"
      onClick={toggleDarkMode}
      type="button"
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default ThemeToggle;