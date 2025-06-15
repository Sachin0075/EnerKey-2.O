import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { getAllOrganizationsIDnName } from "../../services/DataServices/getAllOrganizationsIDnName";
import { toast } from "react-toastify";
import axios from "axios";

function EditUserModal({ open, handleClose, getAllUser, userId, OrgId }) {
  const [names, setNames] = useState([]);
  console.log(names);
  useEffect(() => {
    console.log("selected userId:", userId);
    console.log("selected OrgId:", OrgId);

    async function fetchNames() {
      const orgNames = await getAllOrganizationsIDnName();
      console.log("Fetched Organization Names:", orgNames);

      setNames(orgNames || []);
    }
    fetchNames();
  }, []);

  const [value, setValue] = useState({
    userName: "",
    email: "",
    contact: "",
    organization: "",

    role: "",
  });
  const [errors, setErrors] = useState({
    userName: false,
    email: false,
    contact: false,
    organization: false,
    role: false,
  });

  useEffect(() => {
    fetchUserDetails(userId, OrgId);
  }, []);
  async function fetchUserDetails(userId, OrgId) {
    try {
      const token = localStorage.getItem("token");
      const url = `https://localhost:7266/api/User/getUsersByOranizationId/${OrgId}`;
      const response = await axios.get(url, {
        headers: { Authorization: token },
      });

      const users = Array.isArray(response.data.data) ? response.data.data : [];
      const user = users.find((u) => u.id === userId);

      if (user) {
        setValue({
          userName: user.userName || "",
          email: user.email || "",
          contact: user.phoneNumber || "",
          organization: user.organizationId || "",
          role: user.role || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }
  const handleFieldChange = (e) => {
    const { name, value: val } = e.target;
    setValue((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => {
      let newErr = { ...prev };
      if (name === "userName") newErr.userName = !val.trim();
      if (name === "email") newErr.email = !/^\S+@\S+\.\S+$/.test(val);
      if (name === "contact") newErr.contact = !/^\d{10}$/.test(val);
      if (name === "organization") newErr.organization = !val;
      if (name === "password") newErr.password = !val.trim();
      if (name === "confirmPassword") {
        newErr.confirmPassword = !val.trim() || val !== value.password;
      }
      if (name === "role") newErr.role = !val;
      return newErr;
    });
  };

  const handleOrgChange = (event) => {
    setValue((prev) => ({ ...prev, organization: event.target.value }));
    setErrors((prev) => ({ ...prev, organization: false }));
  };

  const handleRoleChange = (event) => {
    setValue((prev) => ({ ...prev, role: event.target.value }));
    setErrors((prev) => ({ ...prev, role: false }));
  };

  const handleFieldBlur = (e) => {
    const { name, value: val } = e.target;
    setErrors((prev) => {
      let newErr = { ...prev };
      if (name === "userName") newErr.userName = !val.trim();
      if (name === "email") newErr.email = !/^\S+@\S+\.\S+$/.test(val);
      if (name === "contact") newErr.contact = !/^\d{10}$/.test(val);
      if (name === "organization") newErr.organization = !val;
      if (name === "password") newErr.password = !val.trim();
      if (name === "confirmPassword") {
        newErr.confirmPassword = !val.trim() || val !== value.password;
      }
      if (name === "role") newErr.role = !val;
      return newErr;
    });
  };

  const handleOrgBlur = (e) => {
    if (!e.target.value) {
      setErrors((prev) => ({ ...prev, organization: true }));
    }
  };

  const handleRoleBlur = (e) => {
    if (!e.target.value) {
      setErrors((prev) => ({ ...prev, role: true }));
    }
  };

  async function updateUser() {
    const payload = {
      userName: value.userName,
      email: value.email,
      phoneNumber: value.contact,
      role: value.role,
      organizationId: value.organization,
    };

    console.log("Payload:", payload);
    try {
      const url = `https://localhost:7266/api/User/updateUser/${userId}`;
      const token = localStorage.getItem("token");
      const response = await axios.put(url, payload, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 200) {
        toast.success("User updated successfully");
        getAllUser();
        handleClose();
      }
      console.log("User added  Response:", response.data);
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user. Please try again.");
      return;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  };

  return (
    <div>
      <Dialog open={open} onClose={() => handleClose}>
        <DialogTitle
          className="text-center text-2xl font-semibold"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Add User
          <CloseIcon
            onClick={handleClose}
            style={{ cursor: "pointer", fontSize: 24 }}
            data-testid="close-modal"
          />
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth component="form" onSubmit={handleSubmit}>
            <TextField
              label="User Name"
              name="userName"
              variant="outlined"
              margin="normal"
              fullWidth
              value={value.userName}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              error={errors.userName}
              helperText={errors.userName ? "User Name is required" : ""}
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={value.email}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              error={errors.email}
              helperText={errors.email ? "Enter a valid email" : ""}
            />
            <TextField
              label="Contact *"
              name="contact"
              variant="outlined"
              margin="normal"
              fullWidth
              value={value.contact}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              error={errors.contact}
              helperText={
                errors.contact ? "Enter a valid 10-digit contact number" : ""
              }
            />
            <FormControl sx={{ width: 300 }} error={errors.organization}>
              <InputLabel id="demo-single-name-label">
                Organization Name
              </InputLabel>
              <Select
                labelId="demo-single-name-label"
                id="demo-single-name"
                value={value.organization}
                onChange={handleOrgChange}
                onBlur={handleOrgBlur}
                input={<OutlinedInput label="  Organization Name" />}
              >
                {names &&
                  Object.entries(names).map(([id, name]) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
              {errors.organization && (
                <span style={{ color: "red", fontSize: 12, marginLeft: 14 }}>
                  Select Organization
                </span>
              )}
            </FormControl>

            <FormControl fullWidth margin="normal" error={errors.role}>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                value={value.role}
                onChange={handleRoleChange}
                onBlur={handleRoleBlur}
              >
                <MenuItem value={"customeradmin"}>Customer Admin</MenuItem>
                <MenuItem value={"RegisteredUser"}>Registered User</MenuItem>
              </Select>
              {errors.role && (
                <span style={{ color: "red", fontSize: 12, marginLeft: 14 }}>
                  Select Role
                </span>
              )}
            </FormControl>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditUserModal;
