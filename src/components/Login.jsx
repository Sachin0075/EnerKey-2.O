import React, { useState } from "react";
import styles from "../components/Login.module.css"; // import as styles object
import "@fortawesome/fontawesome-free/css/all.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleEmailChange(event) {
    setEmail(event.target.value);
    if (emailTouched) {
      validateEmail(event.target.value);
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    if (passwordTouched) {
      validatePassword(event.target.value);
    }
  }

  function handleEmailBlur() {
    setEmailTouched(true);
    validateEmail(email);
  }

  function handlePasswordBlur() {
    setPasswordTouched(true);
    validatePassword(password);
  }

  function validateEmail(value) {
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  }

  function validatePassword(value) {
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  }

  const isFormValid =
    !emailError &&
    !passwordError &&
    emailRegex.test(email) &&
    password.length >= 6;

  return (
    <div
      className={`${styles.loginBodyBG} ${styles.main} pt-44 flex justify-around`}
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
          className={`${styles.login} p-8 border-0 rounded-xl min-h-72 max-h-90 min-w-80`}
        >
          <h5
            className={`${styles.signinhead} text-blue-400 text-xl text-center font-bold`}
          >
            Sign In
          </h5>

          <input
            required
            placeholder="Email*"
            type="email"
            className={`${styles.focuscolorchange} bg-white border-1 p-1 rounded`}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            value={email}
          />
          <div className="h-6">
            {emailTouched && emailError && (
              <p className="text-red-500">{emailError}</p>
            )}
          </div>

          <input
            required
            type="password"
            placeholder="Password*"
            className={`${styles.focuscolorchange} bg-white border-1 p-1 rounded outline-none`}
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          <div className="h-6">
            {passwordTouched && passwordError && (
              <p className="text-red-500">{passwordError}</p>
            )}
          </div>

          <button
            className={`${
              styles.signinbtn
            } text-xl border-1 rounded-xl p-1 transition-all duration-300 ${
              isFormValid
                ? "!bg-blue-500 hover:bg-green-600 text-white"
                : "!bg-[#CFD3DF] !text-[#8A8D96] cursor-not-allowed"
            }`}
            style={{ cursor: isFormValid ? "pointer" : "not-allowed" }}
            disabled={!isFormValid}
          >
            Sign In
          </button>

          <div className="text-blue-400 cursor-pointer hover:underline">
            Forgot Password?
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
