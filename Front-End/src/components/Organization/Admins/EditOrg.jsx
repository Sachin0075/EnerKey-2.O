import { DialogContent } from "@mui/joy";
import React, { useEffect, useState } from "react";
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
import axios from "axios";

//pending api handle...
function EditAdmin({ isModalopen, handleClose, orgId }) {
  const [isFilled, setIsFilled] = useState(false);
  const [organizations, setOrganizations] = useState({
    orgName: "",
    orgEMail: "",
    orgPhoneNumber: "",
  });
  const [value, setValue] = useState({
    adminName: "",
    email: "",
    phonenumber: "",
    Password: "",
    confirmPassword: "",
  });
  const [Error, setError] = useState({
    adminName: false,
    email: false,
    phonenumber: false,
    Password: false,
    confirmPassword: false,
  });
  useEffect(() => {
    async function handleAPI() {
      try {
        //first ill take the data from backend using get and render it

        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://localhost:7162/api/Organization/getallorganizations`,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response from API:", response.data);

        // Find the organization by orgId (works for both array and array in data)
        const orgList = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data.data)
          ? response.data.data
          : [];
        const foundOrg = orgList.find(
          (org) => String(org.organizationId) === String(orgId)
        );
        setOrganizations({
          orgName: foundOrg?.name || "",
          orgEMail: foundOrg?.email || "",
          orgPhoneNumber: foundOrg?.contact || "",
        });
        setValue((prev) => ({
          ...prev,
          adminName: foundOrg?.name || "",
          email: foundOrg?.email || "",
          phonenumber: foundOrg?.contact || "",
        }));
      } catch (error) {
        console.log(error);
      }
    }
    handleAPI();
  }, [orgId]);

  async function handleSubmit() {
    const token = localStorage.getItem("token");
    const url = `https://localhost:7162/api/Organization/updateorganization/${orgId}`;
    const response = await axios.put(
      url,
      {
        name: "HelloOrg",
        contact: "9110232822",
        email: "Sachina@gmail.com",
        country: "India",
        city: "Kadri",
        postalCode: "575002",
        streetAddress: "Kadri, Mangalore",
      },
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  }

  function handleChange(e) {
    const { name, value: val } = e.target;
    setValue((prev) => ({ ...prev, [name]: val }));
    setError((prev) => ({ ...prev, [name]: false }));
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function handleBlur(e) {
    const { name, value: val } = e.target;
    if (val.trim() === "") {
      setError((prev) => ({ ...prev, [name]: true }));
    } else if (name === "email" && !validateEmail(val)) {
      setError((prev) => ({ ...prev, email: true }));
    } else if (name === "confirmPassword" && val !== value.Password) {
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
        <DialogTitle>Edit Organization</DialogTitle>
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
          <Box className="flex flex-col m-5 gap-5">
            <TextField
              sx={{ height: "60px", width: "450px" }}
              id="edit-admin-name"
              label="Admin Name"
              variant="outlined"
              onChange={handleChange}
              name="adminName"
              value={value.adminName}
              error={Error.adminName}
              helperText={Error.adminName ? "Enter Admin name" : ""}
              onBlur={handleBlur}
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={value.email}
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
              value={organizations.orgPhoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              sx={{ height: "60px", width: "450px" }}
            />
            <TextField
              label="Password"
              type="password"
              name="Password"
              value={value.Password}
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
              value={value.confirmPassword}
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
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditAdmin;
