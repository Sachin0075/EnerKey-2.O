import {
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
import { getAllOrganizationsName } from "../../services/getAllOrganizationsIDnName";

function AddUserModal({ open, handleClose }) {
  const [names, setNames] = useState([]);

  useEffect(() => {
    async function fetchNames() {
      const orgNames = await getAllOrganizationsName();
      setNames(orgNames || []);
    }
    if (open) fetchNames();
  }, [open]);

  const [personName, setPersonName] = useState("");
  const [form, setForm] = useState({
    userName: "",
    email: "",
    contact: "",
    organization: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errors, setErrors] = useState({
    userName: false,
    email: false,
    contact: false,
    organization: false,
    password: false,
    confirmPassword: false,
    role: false,
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleOrgChange = (event) => {
    setPersonName(event.target.value);
    setForm((prev) => ({ ...prev, organization: event.target.value }));
    setErrors((prev) => ({ ...prev, organization: false }));
  };

  const handleRoleChange = (event) => {
    setForm((prev) => ({ ...prev, role: event.target.value }));
    setErrors((prev) => ({ ...prev, role: false }));
  };

  const validate = () => {
    let valid = true;
    let newErrors = { ...errors };
    if (!form.userName.trim()) {
      newErrors.userName = true;
      valid = false;
    }
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = true;
      valid = false;
    }
    if (!form.contact.trim() || !/^\d{10}$/.test(form.contact)) {
      newErrors.contact = true;
      valid = false;
    }
    if (!form.organization) {
      newErrors.organization = true;
      valid = false;
    }
    if (!form.password.trim()) {
      newErrors.password = true;
      valid = false;
    }
    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = true;
      valid = false;
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = true;
      valid = false;
    }
    if (!form.role) {
      newErrors.role = true;
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit logic here
      alert("User added successfully!");
      handleClose();
    }
  };

  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    let error = false;
    if (name === "userName" && value.trim() === "") error = true;
    if (name === "email" && (!value.trim() || !/^\S+@\S+\.\S+$/.test(value)))
      error = true;
    if (name === "contact" && (!value.trim() || !/^\d{10}$/.test(value)))
      error = true;
    if (name === "password" && value.trim() === "") error = true;
    if (
      name === "confirmPassword" &&
      (value.trim() === "" || value !== form.password)
    )
      error = true;
    setErrors((prev) => ({ ...prev, [name]: error }));
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
              value={form.userName}
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
              value={form.email}
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
              value={form.contact}
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
                value={personName}
                onChange={handleOrgChange}
                onBlur={handleOrgBlur}
                input={<OutlinedInput label="  Organization Name" />}
              >
                {Array.isArray(names) && names.length > 0 ? (
                  Object.values(names).map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">
                    No organizations found
                  </MenuItem>
                )}
              </Select>
              {errors.organization && (
                <span style={{ color: "red", fontSize: 12, marginLeft: 14 }}>
                  Select Organization
                </span>
              )}
            </FormControl>
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={form.password}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              error={errors.password}
              helperText={errors.password ? "Password is required" : ""}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={form.confirmPassword}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              error={errors.confirmPassword}
              helperText={
                errors.confirmPassword
                  ? form.confirmPassword &&
                    form.password &&
                    form.confirmPassword !== form.password
                    ? "Passwords do not match"
                    : "Confirm Password is required"
                  : ""
              }
            />
            <FormControl fullWidth margin="normal" error={errors.role}>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                value={form.role}
                onChange={handleRoleChange}
                onBlur={handleRoleBlur}
              >
                <MenuItem value={"Admin"}>Customer Admin</MenuItem>
                <MenuItem value={"User"}>Registered User</MenuItem>
              </Select>
              {errors.role && (
                <span style={{ color: "red", fontSize: 12, marginLeft: 14 }}>
                  Select Role
                </span>
              )}
            </FormControl>
            <button type="submit" style={{ display: "none" }}></button>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddUserModal;
