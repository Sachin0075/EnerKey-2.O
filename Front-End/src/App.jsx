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
import ProtectedRoute from "./components/ProtectedRoute";
import NotAuthorized from "./components/NotAuthorized";
import { getJwtSub } from "./services/JWT/getJwtSub";

function AppComponent() {
  const hideNavbar = ["/login", "/forgot"];
  const [auth, setAuth] = useState({
    isUserAuthenticated: false,
    role: "",
    loading: true,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const shouldHide = hideNavbar.includes(location.pathname);
  const [name, setName] = useState("");

  useEffect(() => {
    if (shouldHide) {
      setAuth((prev) => ({ ...prev, loading: false }));
      return;
    }

    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      toast.error("You have been Logged Out. Please login again.", {
        position: "top-right",
        autoClose: 2000,
      });
      setAuth({ isUserAuthenticated: false, role: "", loading: false });
      navigate("/login");
      return;
    }
    const role = getJwtRole();
    if (!role) {
      localStorage.removeItem("token");
      setAuth({ isUserAuthenticated: false, role: "", loading: false });
      navigate("/login");
      return;
    }
    setAuth({ isUserAuthenticated: true, role, loading: false });
    const sub = getJwtSub(token);
    if (sub) {
      setName(sub);
    } else {
      console.error("Failed to retrieve user name from token.");
      location.reload();
    }
  }, [location, navigate, shouldHide]);

  if (auth.loading) return null;

  return (
    <>
      {!shouldHide && <NavBar name={name} role={auth.role} />}
      <Routes>
        <Route
          path="/"
          element={
            auth.isUserAuthenticated ? (
              <Dashboard role={auth.role} name={name} />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              isAuthenticated={auth.isUserAuthenticated}
              resource="dashboard"
              userRole={auth.role}
            >
              <Dashboard role={auth.role} name={name} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization"
          element={
            <ProtectedRoute
              isAuthenticated={auth.isUserAuthenticated}
              resource="organization"
              userRole={auth.role}
            >
              <Organization role={auth.role} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/facilities"
          element={
            <ProtectedRoute
              isAuthenticated={auth.isUserAuthenticated}
              resource="facilities"
              userRole={auth.role}
            >
              <Facilities role={auth.role} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute
              isAuthenticated={auth.isUserAuthenticated}
              resource="users"
              userRole={auth.role}
            >
              <Users role={auth.role} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute
              isAuthenticated={auth.isUserAuthenticated}
              resource="reports"
              userRole={auth.role}
            >
              <Reports role={auth.role} />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
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
