import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  FormHelperText,
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const API_URL = "https://localhost:7162/api/Organization/createorganization";
const TOKEN = localStorage.getItem("token");
export default function AdminM2({ setPage, orgdata, setOrgdata }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [values, setValues] = useState({
    adminname: "",
    adminemail: "",
    admincontact: "",
    adminpassword: "",
    adminconfirmPassword: "",
  });

  const [error, setError] = useState({
    adminname: false,
    adminemail: false,
    admincontact: false,
    adminpassword: false,
    adminconfirmPassword: false,
  });

  useEffect(() => {
    const allFilled = Object.values(values).every((val) => val.trim() !== "");
    const isEmailValid = validateEmail(values.adminemail);
    const isPasswordMatch =
      values.adminpassword === values.adminconfirmPassword;
    setIsFilled(allFilled && isEmailValid && isPasswordMatch);
  }, [values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: false }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setError((prev) => ({ ...prev, [name]: true }));
    } else if (name === "adminemail" && !validateEmail(value)) {
      setError((prev) => ({ ...prev, adminemail: true }));
    } else if (
      name === "adminconfirmPassword" &&
      value !== values.adminpassword
    ) {
      setError((prev) => ({ ...prev, adminconfirmPassword: true }));
    }
  };

  async function handleCreateAdmin() {
    const payload = {
      name: orgdata?.organization,
      contact: orgdata?.contact,
      email: orgdata?.email,
      country: orgdata?.country,
      city: orgdata?.city,
      postalCode: orgdata?.postalCode,
      streetAddress: orgdata?.address,
    };
    try {
      const response = await axios.post(API_URL, payload, {
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
      });
      console.log("Response from API:", response.data);
      const orgID = await response.data.organizationId;

      const responseAdmin = await axios.post(
        "https://localhost:7266/api/User/register",
        {
          userName: values.adminname,
          phoneNumber: values.admincontact,
          email: values.adminemail,
          password: values.adminpassword,
          confirmPassword: values.adminconfirmPassword,
          role: "customeradmin",
          organizationId: orgID,
        },
        {
          headers: {
            Authorization: TOKEN,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from Admin API:", responseAdmin.data);
    } catch (error) {
      if (error.response) {
        // Log backend error details for easier debugging
        console.error(
          "API responded with error:",
          error.response.status,
          error.response.data
        );
        alert(JSON.stringify(error.response.data)); // Optional: show error in UI
      } else {
        console.error("Error creating organization:", error);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (typeof setOrgdata === "function") {
      setOrgdata((prev) => ({
        ...prev,
        admin: {
          adminname: values.adminname,
          adminemail: values.adminemail,
          admincontact: values.admincontact,
          adminpassword: values.adminpassword,
        },
      }));
    } else {
      console.warn("setOrgdata is not a function");
    }

    handleCreateAdmin();
    setPage(1);

    console.log({
      ...orgdata,
      admin: {
        adminname: values.adminname,
        adminemail: values.adminemail,
        admincontact: values.admincontact,
        adminpassword: values.adminpassword,
      },
    });
  };

  return (
    <Box className="flex flex-col gap-4 w-full max-w-sm">
      <TextField
        name="adminname"
        label="Admin name*"
        variant="outlined"
        value={values.adminname}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error.adminname}
        helperText={error.adminname ? "Enter Admin name" : ""}
      />

      <TextField
        name="adminemail"
        label="Email*"
        variant="outlined"
        value={values.adminemail}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error.adminemail}
        helperText={error.adminemail ? "Enter a valid Email" : ""}
      />

      <TextField
        name="admincontact"
        label="Contact*"
        variant="outlined"
        value={values.admincontact}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error.admincontact}
        helperText={error.admincontact ? "Enter Contact" : ""}
      />

      <FormControl variant="outlined" error={error.adminpassword}>
        <InputLabel htmlFor="outlined-password">Password*</InputLabel>
        <OutlinedInput
          id="outlined-password"
          name="adminpassword"
          type={showPassword ? "text" : "password"}
          value={values.adminpassword}
          onChange={handleChange}
          onBlur={handleBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((s) => !s)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password*"
        />
        <FormHelperText>
          {error.adminpassword ? "Enter Password" : ""}
        </FormHelperText>
      </FormControl>

      <FormControl variant="outlined" error={error.adminconfirmPassword}>
        <InputLabel htmlFor="outlined-confirm-password">
          Confirm Password*
        </InputLabel>
        <OutlinedInput
          id="outlined-confirm-password"
          name="adminconfirmPassword"
          type={showPasswordConfirm ? "text" : "password"}
          value={values.adminconfirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPasswordConfirm((s) => !s)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password*"
        />
        <FormHelperText>
          {error.adminconfirmPassword
            ? "Passwords must match and not be empty"
            : ""}
        </FormHelperText>
      </FormControl>
      <div className="flex justify-between mt-4">
        <Button onClick={() => setPage(1)} variant="outlined" color="secondary">
          Back
        </Button>

        <Button
          disabled={!isFilled}
          variant={isFilled ? "contained" : "outlined"}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </Box>
  );
}
