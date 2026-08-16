import { useContext } from "react";
import { TeamContext } from "../context/TeamContext";

function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useContext(TeamContext);

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default ThemeToggle;