import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { registerLicense } from "@syncfusion/ej2-base";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Reports from "./Pages/Reports";
import Users from "./Pages/Users";
import Facilities from "./Pages/Facilities";
import Organization from "./Pages/Organization";
import Dashboard from "./Pages/Dashboard";
import NavBar from "./components/NavBar";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NNaF1cWWhPYVJzWmFZfVtgd19CaFZVR2Y/P1ZhSXxWdkBiX35bdHxRQGhUVkd9XUs="
);

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
