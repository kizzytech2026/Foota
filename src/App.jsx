import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Squad from "./pages/Squad";
import Matches from "./pages/Matches";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";

function App() {
  return(
    <BrowserRouter>
    <Layout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/squad" element={<Squad />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
    </Layout>
    </BrowserRouter>
  );
}
export default App;