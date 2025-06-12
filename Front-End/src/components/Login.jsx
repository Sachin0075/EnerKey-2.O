import React, { useState } from "react";
import styles from "../components/Login.module.css"; // import as styles object
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const [isFilled, setIsFilled] = useState(false);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [Error, setError] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsFilled(
      value.email !== "" &&
        value.password !== "" &&
        !Error.email &&
        !Error.password
    );
  }, [value, Error]);

  async function handleSubmit() {
    if (!isFilled) return;
    const url = "https://localhost:7266/api/User/login";
    const payload = {
      email: value.email,
      password: value.password,
    };
    try {
      const response = await axios.post(url, payload);
      const token = response.data.token;
      if (response.status === 200 && token) {
        toast("Login successful! 🐦‍🔥", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        toast.error("Login failed. Please check your credentials.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }
  function handleBlur(e) {
    const { name, value } = e.target;
    if (name === "email") {
      setError((curr) => ({ ...curr, email: validateEmail(value) }));
    }
    if (name === "password") {
      setError((curr) => ({ ...curr, password: validatePassword(value) }));
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setValue((curr) => ({ ...curr, [name]: value }));
    setError((curr) => ({ ...curr, [name]: false }));
  }

  function validateEmail(value) {
    return !emailRegex.test(value);
  }
  function validatePassword(value) {
    return value.length < 6;
  }

  return (
    <div
      className={`${styles.loginBodyBG} ${styles.main} pt-14 flex justify-around`}
    >
      <div className={styles["login-main"]}>
        <div className={styles.ems}>
          <h1>
            <i
              id="logo"
              className="fa-solid fa-seedling text-7xl text-white emsname"
            >
              EMS
            </i>
          </h1>
        </div>{" "}
        <div
          className={`${styles.login} border-0 rounded-2xl min-h-96 min-w-96`}
          style={{
            padding: "40px",
            backgroundColor: "#ffffff",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <div style={{ marginBottom: "32px", textAlign: "center" }}>
            <h2
              style={{
                color: "#1a202c",
                fontSize: "28px",
                fontWeight: "700",
                margin: 0,
                marginBottom: "8px",
              }}
            >
              Sign
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: "16px",
                margin: 0,
                fontWeight: "400",
              }}
            >
              Sign in to your account
            </p>
          </div>

          <form
            autoComplete="on"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            <TextField
              required
              name="email"
              autoComplete="email"
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              size="medium"
              onChange={handleChange}
              onBlur={handleBlur}
              value={value.email}
              error={Error.email}
              helperText={
                Error.email ? "Please enter a valid email address" : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#f8fafc",
                  borderRadius: 3,
                  height: "56px",
                  "&:hover": {
                    backgroundColor: "#f1f5f9",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b82f6",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#ffffff",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2563eb",
                    borderWidth: 2,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e2e8f0",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#64748b",
                  fontWeight: 500,
                  "&.Mui-focused": {
                    color: "#2563eb",
                  },
                },
                "& .MuiFormHelperText-root": {
                  marginLeft: 0,
                  marginTop: "8px",
                },
              }}
            />

            <TextField
              required
              name="password"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              fullWidth
              size="medium"
              value={value.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Error.password}
              helperText={
                Error.password ? "Password must be at least 6 characters" : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#f8fafc",
                  borderRadius: 3,
                  height: "56px",
                  "&:hover": {
                    backgroundColor: "#f1f5f9",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b82f6",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#ffffff",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2563eb",
                    borderWidth: 2,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e2e8f0",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#64748b",
                  fontWeight: 500,
                  "&.Mui-focused": {
                    color: "#2563eb",
                  },
                },
                "& .MuiFormHelperText-root": {
                  marginLeft: 0,
                  marginTop: "8px",
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                        tabIndex={-1}
                        sx={{
                          color: "#64748b",
                          "&:hover": {
                            color: "#2563eb",
                            backgroundColor: "rgba(37, 99, 235, 0.04)",
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              size="large"
              fullWidth
              disabled={!isFilled}
              type="submit"
              sx={{
                mt: 2,
                py: 2,
                borderRadius: 3,
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 600,
                height: "56px",
                backgroundColor: isFilled ? "#2563eb" : "#e2e8f0",
                color: isFilled ? "#ffffff" : "#94a3b8",
                boxShadow: isFilled
                  ? "0 4px 12px rgba(37, 99, 235, 0.4)"
                  : "none",
                "&:hover": {
                  backgroundColor: isFilled ? "#1d4ed8" : "#e2e8f0",
                  boxShadow: isFilled
                    ? "0 8px 20px rgba(37, 99, 235, 0.5)"
                    : "none",
                },
                "&:disabled": {
                  backgroundColor: "#e2e8f0",
                  color: "#94a3b8",
                },
                "&:active": {
                  transform: "translateY(1px)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              Sign In
            </Button>

            <Button
              variant="text"
              sx={{
                mt: 1,
                textTransform: "none",
                color: "#64748b",
                fontSize: "14px",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "rgba(100, 116, 139, 0.04)",
                  color: "#2563eb",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              Forgot Password?
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
