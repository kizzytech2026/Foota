
import React from "react";
import { BrowserRouter, Link, NavLink, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Squad from "./pages/Squad";
import Matches from "./pages/Matches";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="topbar">
          <Link to="/" className="logo">Foota</Link>
          <div className="topbar-right">
            <span className="team-name">TeamHub FC</span>
          </div>
        </header>
        <div className="app-layout">
          <aside className="sidebar">
            <nav className="navigation">
              <NavLink
                to="/" end className={({ isActive }) => isActive ? "nav-link active": "nav-link"}>
                Dashboard
              </NavLink>
              <NavLink
                to="/squad" className={({ isActive }) => isActive? "nav-link active": "nav-link"}>
                Squad
              </NavLink>
              <NavLink
                to="/matches" className={({ isActive }) => isActive ? "nav-link active":"nav-link"}>
                Matches
              </NavLink>
              <NavLink
                to="/statistics" className={({ isActive }) => isActive ? "nav-link active": "nav-link"}>
                Statistics
              </NavLink>

              <NavLink
                to="/settings" className={({ isActive }) => isActive ? "nav-link active":"nav-link"}>
                Settings
              </NavLink>
            </nav>
          </aside>

          <main className="main-content">
              <Routes>
              <Route path="/" element={<Dashboard />}/>
              <Route path="/squad" element={<Squad />}/>
              <Route path="/matches" element={<Matches />}/>
              <Route path="/statistics" element={<Statistics />}/>
              <Route path="/settings" element={<Settings />}/> 
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;