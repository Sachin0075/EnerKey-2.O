import { DialogContent } from "@mui/joy";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

function AddAdmin({ isModalopen, handleClose, orgID }) {
  const [isFilled, setIsFilled] = useState(false);

  async function handleAPI() {
    const token = localStorage.getItem("token");
    const baseurl = "https://localhost:7266/api/User/register";
    const payload = {
      userName: value.adminName,
      phoneNumber: value.phonenumber,
      email: value.email,
      password: value.Password,
      confirmPassword: value.confirmPassword,
      role: "customeradmin",
      organizationId: orgID,
    };
    try {
      const response = await axios.post(baseurl, payload, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Response from API:", response.data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  const [value, setvalue] = useState({
    adminName: "",
    email: "",
    phonenumber: "",
    Password: "",
    confirmPassword: "",
  });
  const [Error, setError] = useState({
    adminName: "",
    email: "",
    phonenumber: "",
    Password: "",
    confirmPassword: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setvalue((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  function handleBlur(e) {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setError((prev) => ({ ...prev, [name]: true }));
    } else if (name === "email" && !validateEmail(value)) {
      setError((prev) => ({ ...prev, email: true }));
    } else if (name === "confirmPassword" && value != value.Password) {
      setError((prev) => ({ ...prev, [name]: true }));
    }
  }
  useEffect(() => {
    const allFilled = Object.values(value).every((val) => val.trim() !== "");
    const isEmailValid = validateEmail(value.email);
    const isPasswordMatch = value.Password === value.confirmPassword;
    setIsFilled(allFilled && isEmailValid && isPasswordMatch);
  }, [value]);

  return (
    <div>
      <Dialog open={isModalopen} onClose={handleClose}>
        <DialogTitle>Add Admins</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Box className=" flex flex-col m-5 gap-5">
            <TextField
              sx={{ height: "60px", width: "450px" }}
              id="outlined-basic"
              label="Admin Name"
              variant="outlined"
              onChange={handleChange}
              name="adminName"
              error={Error.adminName}
              helperText={Error.adminName ? "Enter Admin name" : ""}
              onBlur={handleBlur}
            />

            <TextField
              label="Email"
              variant="outlined"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Error.email}
              helperText={Error.email ? "Enter a valid Email" : ""}
              sx={{ height: "60px", width: "450px" }}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              error={Error.phonenumber}
              helperText={Error.phonenumber ? "Enter Phone Number" : ""}
              name="phonenumber"
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ height: "60px", width: "450px" }}
            />
            <TextField
              label="Password"
              type="password"
              name="Password"
              variant="outlined"
              sx={{ height: "60px", width: "450px" }}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Error.Password}
              helperText={Error.Password ? "Enter Password" : ""}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              sx={{ height: "60px", width: "450px" }}
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Error.confirmPassword}
              helperText={
                Error.confirmPassword ? "Confirm Password does not match" : ""
              }
            />
          </Box>
          <Box className="flex justify-end gap-3 m-5">
            <Button
              variant="outlined"
              className="bg-gray-300 px-4 py-2 rounded-md"
              onClick={handleClose}
            >
              Cancel
              <CancelIcon />
            </Button>
            <Button
              variant={isFilled ? "contained" : "outlined"}
              className="bg-blue-500 px-4 py-2 text-white rounded-md"
              disabled={!isFilled}
              onClick={handleAPI}
            >
              Add Admin
              <AddIcon />
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default AddAdmin;
