import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Reports from "./Pages/Reports";
import Users from "./Pages/Users";
import Facilities from "./Pages/Facilities";
import Organization from "./Pages/Organization";
import Dashboard from "./Pages/Dashboard";
import NavBar from "./components/NavBar";
import ForgotPassword from "./components/ForgotPassword";

function AppComponent() {
  const hideNavbar = ["/login", "/forgot"];
  const location = useLocation();
  const shouldHide = hideNavbar.includes(location.pathname);
  return (
    <>
      {!shouldHide && <NavBar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppComponent />;
    </Router>
  );
}

export default App;
