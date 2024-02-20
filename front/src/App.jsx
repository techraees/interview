import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home Route
import Home from "./home/Home";
import About from "./home/_components/About";

// Dashboard Pages
import Dashboard from "./dashboard/Dashboard";
import DashboardHome from "./dashboard/_components/DashboardHome";
import MemberShip from "./dashboard/_components/MemberShip";
import Contact from "./dashboard/_components/Contact";
import PrintPage from "./dashboard/_components/PrintPage";
import Notification from "./dashboard/_components/Notification";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="membership" element={<MemberShip />} />
          <Route path="contact" element={<Contact />} />
          <Route path="printpage" element={<PrintPage />} />
          <Route path="notification" element={<Notification />} />
        </Route>
        <Route path="/" element={<Home />}>
          <Route index element={<About />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
