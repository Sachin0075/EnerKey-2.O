import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import DropDownList from "../DropDownList.jsx";
import { ArrowBigRightDash } from "lucide-react";
import Autocomplete from "@mui/material/Autocomplete";
import {
  getAllCountries,
  getCitiesByCountryId,
} from "../../../services/DataServices/CountryService";

export default function OrganizationM1({
  setPage,
  orgdata,
  handleOrgDataChange,
}) {
  const [countries, setCountries] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [cityNames, setCityNames] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const [value, setValue] = useState({
    organization: "",
    email: "",
    contact: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
  });
  const [error, setError] = useState({
    organization: false,
    email: false,
    contact: false,
    country: false,
    city: false,
    address: false,
    postalCode: false,
  });
  useEffect(() => {
    async function fetchCountries() {
      const countriesData = await getAllCountries();
      setCountries(countriesData);
    }
    fetchCountries();
  }, []);
  useEffect(() => {
    async function fetchCities() {
      if (!cityId) {
        setCityNames([]);
        return;
      }
      try {
        const cities = await getCitiesByCountryId(cityId);
        setCityNames(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCityNames([]);
      }
    }
    fetchCities();
  }, [cityId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValue((curr) => ({ ...curr, [name]: value }));
    setError((curr) => ({ ...curr, [name]: false }));
    handleOrgDataChange({ ...orgdata, [name]: value });
  }

  const handleBlur = (e) => {
    const { name, value: val } = e.target;
    if (val.trim() === "" || (name === "email" && !validateEmail(val))) {
      setError((prev) => ({ ...prev, [name]: true }));
    }
  };

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  function handleSubmit() {
    handleOrgDataChange({ ...orgdata, ...value });
    setPage(1);

    //backend call to add organization
    // reset form data
  }
  useEffect(() => {
    const allfilled = Object.values(value).every((val) => val.trim() !== "");
    const isEmailValid = validateEmail(value.email);
    setIsFilled(allfilled && isEmailValid);
  }, [value]);

  return (
    <FormControl className="gap-4">
      <TextField
        required
        placeholder="Enter your organization name"
        label="Organization"
        className="w-96"
        error={error.organization}
        helperText={error.organization ? "Enter Organization name" : ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="organization"
        value={value.organization}
      />
      <TextField
        className="w-96"
        required
        placeholder="Enter your email"
        type="email"
        label="Email"
        name="email"
        value={value.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error.email}
        helperText={error.email ? "Enter a valid Email" : ""}
      />
      <TextField
        className="w-96"
        required
        inputMode="numeric"
        // pattern="[0-9]*"
        type="text"
        label="Contact"
        name="contact"
        value={value.contact}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error.contact}
        helperText={error.contact ? "Enter Contact" : ""}
      />
      <Autocomplete
        options={countries}
        getOptionLabel={(option) => option.name || ""}
        value={countries.find((c) => c.name === value.country) || null}
        onChange={(event, newValue) => {
          setValue((curr) => ({
            ...curr,
            country: newValue ? newValue.name : "",
            city: "", // reset city when country changes
          }));
          setError((curr) => ({ ...curr, country: false }));
          handleOrgDataChange({
            ...orgdata,
            country: newValue ? newValue.name : "",
            city: "",
          });
          setCityId(newValue ? newValue.id : null); // set cityId based on selected country
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            className="w-96"
            error={error.country}
            helperText={error.country ? "Select a country" : ""}
            required
          />
        )}
        isOptionEqualToValue={(option, value) => option.name === value.name}
      />

      <Autocomplete
        options={cityNames}
        getOptionLabel={(option) => option || ""}
        value={value.city || null}
        onChange={(event, newValue) => {
          setValue((curr) => ({
            ...curr,
            city: newValue || "",
          }));
          setError((curr) => ({ ...curr, city: false }));
          handleOrgDataChange({
            ...orgdata,
            city: newValue || "",
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
            className="w-96"
            error={error.city}
            helperText={error.city ? "Select a city" : ""}
            required
          />
        )}
        disabled={!cityNames.length}
      />

      <TextField
        placeholder="Enter Address"
        minRows={2}
        name="address"
        value={value.address}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error.address}
        helperText={error.address ? "Enter Address" : ""}
        label="Address"
        className="w-96"
      />
      <TextField
        className="w-96"
        required
        type="text"
        inputMode="numeric"
        label="Postal Code"
        name="postalCode"
        value={value.postalCode}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error.postalCode}
        helperText={error.postalCode ? "Enter Postal Code" : ""}
      />
      <Stack direction="row" spacing={2}>
        <Button
          onClick={handleSubmit}
          disabled={!isFilled}
          variant={isFilled ? "contained" : "outlined"}
          endIcon={<ArrowBigRightDash />}
        >
          Next
        </Button>
      </Stack>
    </FormControl>
  );
}
