import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { ArrowBigRightDash } from "lucide-react";
import Popover from "@mui/material/Popover";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { canAccess } from "../permissions";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Organization", path: "/organization" },
  { name: "Facilities", path: "/facilities" },
  { name: "Users", path: "/users" },
  { name: "Reports", path: "/reports" },
];

const Navbar = ({ role, name }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = React.useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  // Popover state
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;

  return (
    <AppBar
      className="max-h-[50px]"
      position="sticky"
      sx={{ backgroundColor: "#015CBB" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <div>
            <h1>
              <Link
                to="/"
                className="fa-solid fa-seedling text-white pb-3 pr-1 emsname text-xl cursor-pointer"
              >
                EMS
              </Link>
            </h1>
          </div>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              gap: 1.2,
              height: "100%",
            }}
          >
            {navItems
              .filter((item) => canAccess(role, item.name.toLowerCase()))
              .map((item) => {
                const isActive = activePath === item.path;
                return (
                  <Button
                    style={{
                      paddingBottom: "16px",
                      paddingLeft: "8px",
                      paddingRight: "8px",
                      minWidth: "unset",
                      overflow: "hidden",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    key={item.name}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    onClick={() => setActivePath(item.path)}
                    sx={{
                      position: "relative",
                      overflow: "visible",
                      textTransform: "none",
                      width: "auto",
                      maxWidth: 100,
                      minWidth: 40,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "none",
                      boxShadow: "none",
                      "& span.navbar-underline": {
                        position: "relative",
                        display: "inline-block",
                      },
                      "& span.navbar-underline::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: -2,
                        height: "2px",
                        backgroundColor: isActive ? "#2890FF" : "transparent",
                        width: "100%",
                        transform: isActive
                          ? "translateX(0)"
                          : "translateX(-100%)",
                        transition:
                          "transform 0.3s ease, background-color 0.3s ease",
                      },
                      "&:hover span.navbar-underline::after": !isActive
                        ? {
                            transform: "translateX(0)",
                            backgroundColor: "#2890FF",
                          }
                        : {},
                    }}
                  >
                    <span className="navbar-underline">{item.name}</span>
                  </Button>
                );
              })}
            <div style={{ flex: 1 }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: 16,
                paddingBottom: 16,
                height: "40px",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                {name.toUpperCase()}
              </span>
              <div style={{ marginLeft: 8 }}>
                <PersonIcon
                  style={{ color: "white" }}
                  className="cursor-pointer"
                  aria-describedby={id}
                  onClick={handleIconClick}
                />
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  slotProps={{
                    paper: {
                      sx: {
                        width: "200px",
                      },
                    },
                  }}
                >
                  <Button
                    fullWidth
                    sx={{
                      cursor: "context-menu",
                      justifyContent: "flex-start",
                      color: "#015CBB",
                    }}
                  >
                    Role : {role}
                  </Button>
                  <Button
                    fullWidth
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                      setActivePath("/login");
                      toast.info("Logged out successfully", {
                        position: "top-right",
                        autoClose: 2000,
                      });
                      handlePopoverClose();
                    }}
                    sx={{ justifyContent: "flex-start", color: "#015CBB" }}
                  >
                    Logout
                  </Button>
                  <Button
                    fullWidth
                    onClick={() => {
                      // handle change password logic here
                      handlePopoverClose();
                    }}
                    sx={{ justifyContent: "flex-start", color: "#015CBB" }}
                  >
                    Change password
                  </Button>
                </Popover>
              </div>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
