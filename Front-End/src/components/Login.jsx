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
        setTimeout(() => navigate("/"), 1200);
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
        </div>
        <div
          className={`${styles.login} p-8 border-0 rounded-xl min-h-72 max-h-96 min-w-80`}
        >
          <h5
            className={`${styles.signinhead} text-blue-400 text-xl text-center font-bold`}
          >
            Sign In
          </h5>

          <form
            autoComplete="on"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            style={{ display: "flex", flexDirection: "column", gap: 15 }}
          >
            <TextField
              required
              name="email"
              autoComplete="email"
              placeholder="Email*"
              type="email"
              className={`${styles.focuscolorchange} bg-white border-1 h-14 p-1  rounded`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={value.email}
              error={Error.email}
            />
            {Error.email && (
              <FormHelperText error>Enter a valid email</FormHelperText>
            )}

            <TextField
              required
              name="password"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              className={`${styles.focuscolorchange} bg-white border-1 p-1 h-14 rounded outline-none`}
              value={value.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Error.password}
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
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            {Error.password && (
              <FormHelperText error sx={{ ml: 1 }}>
                Password must be at least 6 characters
              </FormHelperText>
            )}

            <Button
              className="rounded-2xl"
              variant="contained"
              color={isFilled ? "primary" : "disabled"}
              style={{
                cursor: isFilled ? "pointer" : "not-allowed",
                border: "1px solid black",
              }}
              disabled={!isFilled}
              type="submit"
            >
              Sign In
            </Button>

            <Button className="text-blue-400 cursor-pointer  hover:underline">
              Forgot Password?
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
