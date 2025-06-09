import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
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
import { Bounce, toast, ToastContainer } from "react-toastify";
import { isTokenExpired } from "./services/JWT/isTokenExpired";
import { getJwtRole } from "./services/JWT/getJwtRole";

function AppComponent() {
  const hideNavbar = ["/login", "/forgot"];
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [Role, setRole] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const shouldHide = hideNavbar.includes(location.pathname);
  useEffect(() => {
    if (shouldHide) {
      return;
    }
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      toast.error("You have been Logged Out. Please login again.", {
        position: "top-right",
        autoClose: 2000,
      });

      navigate("/login");
    } else {
      setIsUserAuthenticated(true);
      setRole(getJwtRole());
      console.log("Role:", getJwtRole());
    }
  }, [location, navigate, shouldHide]);
  return (
    <>
      {!shouldHide && <NavBar role={Role} />}

      <Routes>
        <Route
          path="/"
          element={isUserAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Router>
  );
}

export default App;
