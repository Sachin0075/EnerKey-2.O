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
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import {
  getAllCountries,
  getCitiesByCountryId,
} from "../../services/DataServices/CountryService";
import { toast } from "react-toastify";

function EditOrganization({
  isModalopen,
  handleClose,
  orgId,
  fetchOrganizations,
}) {
  const [isFilled, setIsFilled] = useState(false);
  const [country, setCountry] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [selectedID, setSelectedID] = useState(null);

  const [value, setValue] = useState({
    organizationName: "",
    email: "",
    phonenumber: "",
    country: "",
    city: "",
    address: "",
    pinCode: "",
  });
  const [error, setError] = useState({
    organizationName: false,
    email: false,
    phonenumber: false,
    country: false,
    city: false,
    address: false,
    pinCode: false,
  });

  useEffect(() => {
    async function fetchCountries() {
      const country = await getAllCountries();
      setCountry(country);
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchCities() {
      const cities = await getCitiesByCountryId(selectedID);
      setCityNames(cities);
    }
    fetchCities();
  }, [selectedID]);
  useEffect(() => {
    async function handleAPI() {
      try {
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

        setValue((prev) => ({
          ...prev,
          organizationName: foundOrg?.name || "",
          email: foundOrg?.email || "",
          phonenumber: foundOrg?.contact || "",
          country: foundOrg.country || "",
          city: foundOrg.city || "",
          address: foundOrg.streetAddress || "",
          pinCode: foundOrg.postalCode || "",
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
    const payload = {
      name: value.organizationName,
      contact: value.phonenumber,
      email: value.email,
      country: value.country,
      city: value.city,
      postalCode: value.pinCode,
      streetAddress: value.address,
    };
    // console.log(value); // Log the updated form values
    try {
      const response = await axios.put(url, payload, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Updated Successfully");
        handleClose();
        fetchOrganizations();
      }
    } catch (error) {
      toast.error(error);
    }
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
              label="Organization Name"
              variant="outlined"
              onChange={handleChange}
              name="organizationName"
              value={value.organizationName}
              error={error.organizationName}
              helperText={error.organizationName ? "Enter Admin name" : ""}
              onBlur={handleBlur}
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={value.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={error.email}
              helperText={error.email ? "Enter a valid Email" : ""}
              sx={{ height: "60px", width: "450px" }}
            />
            <FormControl sx={{ width: "440px" }} error={error.country}>
              <InputLabel id="country-select-label">Country</InputLabel>
              <Select
                labelId="country-select-label"
                id="country-select"
                label="Country"
                name="country"
                value={value.country}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error.country}
                displayEmpty
                sx={{ marginTop: 1 }}
              >
                {country.map((country) => (
                  <MenuItem
                    key={country.id}
                    value={country.name}
                    onClick={() => setSelectedID(country.id)}
                  >
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              {error.country && (
                <span style={{ color: "red", fontSize: 12, marginLeft: 14 }}>
                  Select Country
                </span>
              )}
            </FormControl>
            <FormControl sx={{ width: "440px" }} error={error.city}>
              <InputLabel id="city-select-label">City</InputLabel>
              <Select
                labelId="city-select-label"
                id="city-select"
                label="City"
                name="city"
                value={value.city}
                sx={{ marginTop: 1 }}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error.city}
                displayEmpty
              >
                {cityNames.map((city, index) => (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
              {error.city && (
                <span style={{ color: "red", fontSize: 12, marginLeft: 14 }}>
                  Select City
                </span>
              )}
            </FormControl>
            <TextField
              label="Address"
              variant="outlined"
              name="address"
              value={value.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={error.address}
              helperText={error.address ? "Enter a address" : ""}
              sx={{ height: "60px", width: "450px" }}
            />
            <TextField
              label="pincode"
              variant="outlined"
              name="pinCode"
              value={value.pinCode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={error.pinCode}
              helperText={error.pinCode ? "Enter a proper PinCode " : ""}
              sx={{ height: "60px", width: "450px" }}
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

export default EditOrganization;
