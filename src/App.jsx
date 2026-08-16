import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Squad from "./pages/Squad";
import Matches from "./pages/Matches";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/squad" element={<Squad />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
    </BrowserRouter>
  );
}
export default App;