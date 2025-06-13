import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  getAllCountries,
  getCitiesByCountryId,
} from "../../../services/DataServices/CountryService";

function FacilityModal1({
  open,
  handleClose,
  handlePageChange,
  organizations,
  setOrganizations,
  value,
  setValue,
}) {
  const [error, setError] = useState({
    name: false,
    streetAddress: false,
    city: false,
    country: false,
    pinCode: false,
    targetA: false,
    targetB: false,
    organizationId: false,
  });

  const [isFill, setIsFill] = useState(false);
  const [country, setCountry] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [selectedID, setSelectedID] = useState(null);

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
    async function fetchOrganizations() {
      try {
        const geturl =
          "https://localhost:7162/api/Organization/getallorganizations";
        const token = localStorage.getItem("token");
        const getallresponse = await axios.get(geturl, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (getallresponse.status === 200) {
          let orgArray = Array.isArray(getallresponse.data)
            ? getallresponse.data
            : Array.isArray(getallresponse.data.data)
            ? getallresponse.data.data
            : [];
          const orgKeyValue = orgArray.reduce((acc, org) => {
            acc[org.organizationId] = org.name;
            return acc;
          }, {});
          setOrganizations(orgKeyValue);
        } else {
          setOrganizations({});
        }
      } catch (error) {
        console.error("Error adding facility:", error);
      }
    }
    fetchOrganizations();
  }, []);
  useEffect(() => {
    const requiredFields = [
      "name",
      "streetAddress",
      "city",
      "country",
      "pinCode",
      "targetA",
      "targetB",
      "organizationId",
    ];
    const allFilled = requiredFields.every((key) => {
      const val = value[key];
      if (key === "pinCode") return /^\d{6}$/.test(val);
      if (["targetA", "targetB"].includes(key)) {
        return val !== "" && val !== null && !isNaN(val);
      }
      return val !== undefined && val !== null && val.toString().trim() !== "";
    });
    setIsFill(allFilled);
  }, [value]);

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
    }
  }

  function next() {
    setValue((curr) => ({
      ...curr,
      metername: curr.metername || "",
      readingType: curr.readingType || "",
      maxMeterValue: curr.maxMeterValue || "",
      consumedQuantityId: curr.consumedQuantityId || "",
      type: curr.type || "",
    }));
    handlePageChange(2);
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Facility</DialogTitle>
        <DialogContent
          sx={{ width: "500px", height: "600px" }}
          style={{ paddingTop: 32 }}
        >
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TextField
              variant="outlined"
              id="outlined-basic"
              label="Facility Name"
              className="mt-2"
              helperText={error.name ? "Enter Facility name" : ""}
              onChange={handleChange}
              error={error.name}
              name="name"
              value={value.name}
              onBlur={handleBlur}
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
              id="filled-textarea"
              label="Address"
              placeholder="Placeholder"
              onBlur={handleBlur}
              onChange={handleChange}
              name="streetAddress"
              value={value.streetAddress}
              error={error.streetAddress}
              helperText={error.streetAddress ? "Enter Email Address" : ""}
              multiline
              variant="outlined"
            />
            <TextField
              id="outlined-number"
              label="Pin code"
              name="pinCode"
              value={value.pinCode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={error.pinCode}
              helperText={error.pinCode ? "Enter a valid 6-digit Pin Code" : ""}
              type="number"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <FormControl sx={{ width: "440px" }} error={error.organizationId}>
              <InputLabel id="org-select-label">Organization</InputLabel>
              <Select
                labelId="org-select-label"
                id="org-select"
                label="Organization"
                name="organizationId"
                value={organizations[value.organizationId] || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error.organizationId}
                displayEmpty
              >
                {Object.entries(organizations).map(([id, name]) => (
                  <MenuItem key={id} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              {error.organizationId && (
                <span style={{ color: "red", fontSize: 12, marginLeft: 14 }}>
                  Select Organization
                </span>
              )}
            </FormControl>
            <TextField
              id="outlined-number"
              label="Minimum Consumption"
              type="number"
              name="targetA"
              value={value.targetA}
              onChange={handleChange}
              onBlur={handleBlur}
              error={error.targetA}
              helperText={error.targetA ? "Enter Minimum Consumption" : ""}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              id="outlined-number"
              label="Maximum Consumption"
              type="number"
              name="targetB"
              value={value.targetB}
              onChange={handleChange}
              onBlur={handleBlur}
              error={error.targetB}
              helperText={error.targetB ? "Enter Maximum Consumption" : ""}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <Button
              variant={isFill ? "contained" : "outlined"}
              disabled={!isFill}
              onClick={next}
            >
              Next
            </Button>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FacilityModal1;
