import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { ArrowBigRightDash } from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Organization", path: "/organization" },
  { name: "Facilities", path: "/facilities" },
  { name: "Users", path: "/users" },
  { name: "Reports", path: "/reports" },
];

const Navbar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = React.useState(location.pathname);

  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

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
              gap: 1.2, // small gap between buttons
              height: "100%", // ensure vertical alignment
            }}
          >
            {navItems.map((item) => {
              const isActive = activePath === item.path;
              return (
                <Button
                  style={{
                    paddingBottom: "16px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    minWidth: "unset",
                    overflow: "hidden",
                    height: "40px", // match icon/name height
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
                height: "40px", // match nav button height
              }}
            >
              <span
                style={{
                  color: "white",
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Sachin
              </span>
              <div style={{ marginLeft: 8 }}>
                <PersonIcon style={{ color: "white" }} />
              </div>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
