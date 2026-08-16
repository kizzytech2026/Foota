import { useContext } from "react";
import { TeamContext } from "../context/TeamContext";

function Layout({ children }) {
  const { darkMode } = useContext(TeamContext);

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      {children}
    </div>
  );
}

export default Layout;