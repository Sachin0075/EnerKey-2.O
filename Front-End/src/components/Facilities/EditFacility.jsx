import { DialogTitle } from "@mui/joy";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  getAllCountries,
  getCitiesByCountryId,
} from "../../services/DataServices/CountryService";
import { toast } from "react-toastify";

function EditFacility({ facilityId, isModalopen, handleClose, handleAPi }) {
  const [facilityData, setFacilityData] = useState({});
  const [value, setValue] = useState({
    name: "",
    country: "",
    streetAddress: "",
    city: "",
    pinCode: "",
    targetA: "",
    targetB: "",
  });
  const [country, setCountry] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [error, setError] = useState({
    name: false,
    country: false,
    city: false,
    pinCode: false,
    targetA: false,
    targetB: false,
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
    async function fetchFacilityData() {
      try {
        const url = `https://localhost:7108/api/Facility/getFacilityByFacilityId/${facilityId}`;
        const token = localStorage.getItem("token");
        const response = await axios.get(url, {
          headers: { Authorization: token },
        });
        const data = response.data;
        setFacilityData(data);
        setValue({
          name: data.name || "",
          country: data.country || "",
          streetAddress: data.streetAddress || "",
          city: data.city || "",
          pinCode: data.pinCode || "",
          targetA: data.targetA || "",
          targetB: data.targetB || "",
        });
        console.log("facilitydata:", data);
      } catch (error) {
        console.error("Error fetching facility data:", error);
      }
    }
    fetchFacilityData();
  }, []);

  function handleChange(e) {
    const { name, value: val } = e.target;
    setValue((prev) => ({ ...prev, [name]: val }));
    setError((prev) => ({ ...prev, [name]: false }));
  }
  function handleBlur(e) {
    const { name, value: val } = e.target;
    if (val.trim() === "") {
      setError((prev) => ({ ...prev, [name]: true }));
    } else if (name === "pinCode" && !/^\d{6}$/.test(val)) {
      setError((prev) => ({ ...prev, pinCode: true }));
    } else if (
      (name === "country" || name === "city" || name === "organization") &&
      val === ""
    ) {
      setError((prev) => ({ ...prev, [name]: true }));
    } else if (name === "targetB" && val <= value.targetA) {
      setError((prev) => ({ ...prev, [name]: true }));
    }
  }
  async function updateFacility() {
    try {
      const url = `https://localhost:7108/api/Facility/updateFacilityByFacilityId/${facilityId}`;
      const token = localStorage.getItem("token");
      const response = await axios.put(url, value, {
        headers: { Authorization: token },
      });
      console.log("API response data:", response.data);
      if (response.status === 200) {
        toast.success("Facility updated successfully!");
        handleAPi();
        handleClose();
      }
    } catch (error) {
      toast.error("Error updating facility:", error);
    }
  }

  function next(e) {
    e.preventDefault();
    setValue((curr) => ({
      ...curr,
      name: curr.name,
      streetAddress: curr.streetAddress,
      country: curr.country,
      city: curr.city,
      pinCode: curr.pinCode,
      targetA: curr.targetA,
      targetB: curr.targetB,
    }));
    updateFacility();
    console.log("Submitted Data:", value);
  }
  return (
    <div>
      <Dialog open={isModalopen} onClose={handleClose} className="w-7xl">
        <DialogTitle sx={{ padding: 2 }}>Edit Facility </DialogTitle>
        <DialogContent>
          <form className="flex flex-col">
            <TextField
              label="Facility Name"
              name="name"
              error={error.name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={error.name ? "Facility name is required" : ""}
              value={value.name}
              variant="outlined"
              sx={{ marginTop: 1 }}
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
              name="streetAddress"
              onChange={handleChange}
              onBlur={handleBlur}
              error={error.streetAddress}
              helperText={
                error.streetAddress ? "Street address is required" : ""
              }
              value={
                facilityData.streetAddress === value.streetAddress
                  ? value.streetAddress
                  : facilityData.streetAddress
              }
              sx={{ marginTop: 1 }}
            />

            <TextField
              label="minimum-consumption"
              name="targetA"
              variant="outlined"
              value={value.targetA}
              onChange={handleChange}
              sx={{ marginTop: 1 }}
            />
            <TextField
              label="maximum-consumption"
              name="targetB"
              variant="outlined"
              value={value.targetB}
              onChange={handleChange}
              sx={{ marginTop: 1 }}
            />
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={next}
              >
                Save Changes
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditFacility;
