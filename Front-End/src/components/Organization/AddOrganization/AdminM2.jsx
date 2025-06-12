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
import { toast } from "react-toastify";

const TOKEN = localStorage.getItem("token");
export default function AdminM2({
  setPage,
  value,
  setValue,
  handleOrgDataChange,
  handleClose,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [apiError, setApiError] = useState("");
  const [orgCreated, setOrgCreated] = useState(false);

  const validateName = (name) => /^[A-Za-z\s]+$/.test(name.trim());
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateContact = (contact) => /^\d{10,15}$/.test(contact.trim());
  const validatePassword = (password) => password.length >= 8;

  const [error, setError] = useState({
    adminname: false,
    adminemail: false,
    admincontact: false,
    adminpassword: false,
    adminconfirmPassword: false,
  });

  const [helper, setHelper] = useState({
    adminname: "",
    adminemail: "",
    admincontact: "",
    adminpassword: "",
    adminconfirmPassword: "",
  });
  const payload = {
    name: value?.organization,
    contact: value?.contact,
    email: value?.email,
    country: value?.country,
    city: value?.city,
    postalCode: value?.postalCode,
    streetAddress: value?.address,
  };
  useEffect(() => {
    const allFilled = Object.values(value).every((val) => val.trim() !== "");
    const isNameValid = validateName(value.adminname);
    const isEmailValid = validateEmail(value.adminemail);
    const isContactValid = validateContact(value.admincontact);
    const isPasswordValid = validatePassword(value.adminpassword);
    const isPasswordMatch = value.adminpassword === value.adminconfirmPassword;
    setIsFilled(
      allFilled &&
        isNameValid &&
        isEmailValid &&
        isContactValid &&
        isPasswordValid &&
        isPasswordMatch
    );
  }, [value]);
  useEffect(() => {
    const requiredMeterFields = [
      "adminname",
      "adminemail",
      "admincontact",
      "adminpassword",
      "adminconfirmPassword",
    ];
    const allFilled = requiredMeterFields.every((key) => {
      const val = value[key];
      return val !== undefined && val !== null && val.toString().trim() !== "";
    });
    setIsFilled(allFilled);
  }, [value]);

  async function createOrganizationAPI() {
    try {
      const API_URL =
        "https://localhost:7162/api/Organization/createorganization";
      const response = await axios.post(API_URL, payload, {
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
      });
      console.log("Response from API:", response.data);
      toast.success("Organization created successfully");
      // Store orgId in value for later use
      setValue((prev) => ({ ...prev, _orgId: response.data.organizationId }));
      return response.data.organizationId;
    } catch (error) {
      if (
        error.response &&
        error.response.status === 409 &&
        error.response.data &&
        error.response.data.detail
      ) {
        setApiError(error.response.data.detail);
      } else if (
        error.response &&
        error.response.data &&
        Array.isArray(error.response.data.error)
      ) {
        setApiError(
          error.response.data.error.map((e) => e.description).join(" | ")
        );
      } else {
        setApiError("An error occurred");
      }
      console.error(error);
      return null;
    }
  }
  async function createAdminAPI(orgID) {
    try {
      const responseAdmin = await axios.post(
        "https://localhost:7266/api/User/register",
        {
          userName: value.adminname,
          phoneNumber: value.admincontact,
          email: value.adminemail,
          password: value.adminpassword,
          confirmPassword: value.adminconfirmPassword,
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
      if (
        responseAdmin.data &&
        Array.isArray(responseAdmin.data.error) &&
        responseAdmin.data.error.length > 0
      ) {
        setApiError(
          responseAdmin.data.error.map((e) => e.description).join(" | ")
        );
        return false;
      }
      setApiError("");
      toast.success("Admin added successfully");
      handleClose();
      return true;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        Array.isArray(error.response.data.error)
      ) {
        setApiError(
          error.response.data.error.map((e) => e.description).join(" | ")
        );
      } else {
        setApiError("An error occurred");
      }
      console.error(error);
      return false;
    }
  }

  const handleChange = (e) => {
    const { name, value: fieldValue } = e.target;
    // Compute the next state for both password fields
    const nextValue = { ...value, [name]: fieldValue };
    setValue(nextValue);
    setError((prev) => ({ ...prev, [name]: "" }));
    handleOrgDataChange(nextValue);

    // Always use the latest values for comparison
    const pwd = nextValue.adminpassword || "";
    const conf = nextValue.adminconfirmPassword || "";

    if (name === "adminpassword" || name === "adminconfirmPassword") {
      // Password length validation
      if (nextValue[name].length < 8) {
        setError((prev) => ({ ...prev, [name]: true }));
        setHelper((prev) => ({
          ...prev,
          [name]: "Password must be at least 8 characters",
        }));
      } else {
        setError((prev) => ({ ...prev, [name]: false }));
        setHelper((prev) => ({
          ...prev,
          [name]: "",
        }));
      }

      // Password match validation
      if (pwd && conf) {
        if (pwd !== conf) {
          setError((prev) => ({ ...prev, adminconfirmPassword: true }));
          setHelper((prev) => ({
            ...prev,
            adminconfirmPassword: "Passwords must match",
          }));
        } else {
          setError((prev) => ({ ...prev, adminconfirmPassword: false }));
          setHelper((prev) => ({
            ...prev,
            adminconfirmPassword: "",
          }));
        }
      } else {
        setError((prev) => ({ ...prev, adminconfirmPassword: false }));
        setHelper((prev) => ({
          ...prev,
          adminconfirmPassword: "",
        }));
      }
    }

    if (
      name === "adminname" &&
      fieldValue.trim() !== "" &&
      !validateName(fieldValue)
    ) {
      setError((prev) => ({ ...prev, adminname: true }));
      setHelper((prev) => ({
        ...prev,
        adminname: "Name should contain only letters and spaces",
      }));
    }
    if (
      name === "adminemail" &&
      fieldValue.trim() !== "" &&
      !validateEmail(fieldValue)
    ) {
      setError((prev) => ({ ...prev, adminemail: true }));
      setHelper((prev) => ({
        ...prev,
        adminemail: "Enter a valid Email",
      }));
    }
    if (
      name === "admincontact" &&
      fieldValue.trim() !== "" &&
      !validateContact(fieldValue)
    ) {
      setError((prev) => ({ ...prev, admincontact: true }));
      setHelper((prev) => ({
        ...prev,
        admincontact: "Contact must be 10-15 digits",
      }));
    }
    if (
      name === "adminpassword" &&
      fieldValue.trim() !== "" &&
      !validatePassword(fieldValue)
    ) {
      setError((prev) => ({ ...prev, adminpassword: true }));
      setHelper((prev) => ({
        ...prev,
        adminpassword: "Password must be at least 8 characters",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setError((prev) => ({ ...prev, [name]: true }));
      setHelper((prev) => ({
        ...prev,
        [name]: "This field is required",
      }));
    } else if (name === "adminemail" && !validateEmail(value)) {
      setError((prev) => ({ ...prev, adminemail: true }));
      setHelper((prev) => ({
        ...prev,
        adminemail: "Enter a valid Email",
      }));
    } else if (
      name === "adminconfirmPassword" &&
      value !== value.adminpassword
    ) {
      setError((prev) => ({ ...prev, [name]: true }));
      setHelper((prev) => ({
        ...prev,
        [name]: "Passwords must match",
      }));
    }
    // Field-specific validation
    if (name === "adminname" && !validateName(value)) {
      setError((prev) => ({ ...prev, adminname: true }));
      setHelper((prev) => ({
        ...prev,
        adminname: "Name should contain only letters and spaces",
      }));
    }
    if (name === "adminemail" && !validateEmail(value)) {
      setError((prev) => ({ ...prev, adminemail: true }));
      setHelper((prev) => ({
        ...prev,
        adminemail: "Enter a valid Email",
      }));
    }
    if (name === "admincontact" && !validateContact(value)) {
      setError((prev) => ({ ...prev, admincontact: true }));
      setHelper((prev) => ({
        ...prev,
        admincontact: "Contact must be 10-15 digits",
      }));
    }
    if (name === "adminpassword" && !validatePassword(value)) {
      setError((prev) => ({ ...prev, adminpassword: true }));
      setHelper((prev) => ({
        ...prev,
        adminpassword: "Password must be at least 8 characters",
      }));
    }
    if (name === "adminconfirmPassword") {
      if (value !== value.adminpassword) {
        setError((prev) => ({ ...prev, adminconfirmPassword: true }));
        setHelper((prev) => ({
          ...prev,
          adminconfirmPassword: "Passwords must match",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    // Only create org if not already created
    let orgId = null;
    if (!orgCreated) {
      orgId = await createOrganizationAPI();
      if (orgId) {
        setOrgCreated(true);
      } else {
        return; // Stop if org creation failed
      }
    } else {
      // If org already created, get orgId from previous success
      orgId = value._orgId || null;
      if (!orgId) {
        setApiError("Organization ID not found. Please refresh and try again.");
        return;
      }
    }
    if (orgId) {
      await createAdminAPI(orgId);
    }
  };

  return (
    <Box className="flex flex-col gap-4 w-full max-w-sm">
      {apiError && (
        <Box
          sx={{
            color: "red",
            mb: 1,
            fontWeight: "bold",
            whiteSpace: "pre-line",
          }}
        >
          {apiError.split(" | ").map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </Box>
      )}
      <TextField
        name="adminname"
        label="Admin name*"
        variant="outlined"
        value={value.adminname}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error.adminname}
        helperText={helper.adminname}
      />

      <TextField
        name="adminemail"
        label="Email*"
        variant="outlined"
        value={value.adminemail}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error.adminemail}
        helperText={helper.adminemail}
      />

      <TextField
        name="admincontact"
        label="Contact*"
        variant="outlined"
        value={value.admincontact}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error.admincontact}
        helperText={helper.admincontact}
      />

      <FormControl variant="outlined" error={error.adminpassword}>
        <InputLabel htmlFor="outlined-password">Password*</InputLabel>
        <OutlinedInput
          id="outlined-password"
          name="adminpassword"
          type={showPassword ? "text" : "password"}
          value={value.adminpassword}
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
        <FormHelperText>{helper.adminpassword}</FormHelperText>
      </FormControl>

      <FormControl variant="outlined" error={error.adminconfirmPassword}>
        <InputLabel htmlFor="outlined-confirm-password">
          Confirm Password*
        </InputLabel>
        <OutlinedInput
          id="outlined-confirm-password"
          name="adminconfirmPassword"
          type={showPasswordConfirm ? "text" : "password"}
          value={value.adminconfirmPassword}
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
        <FormHelperText>{helper.adminconfirmPassword}</FormHelperText>
      </FormControl>
      <div className="flex justify-between mt-4">
        <Button
          onClick={() => setPage(1)}
          variant="outlined"
          color="secondary"
          disabled={orgCreated}
        >
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
