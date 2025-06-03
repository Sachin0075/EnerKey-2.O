import React, { useEffect, useState } from "react";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import DropDownList from "../DropDownList.jsx";
import { ArrowBigRightDash } from "lucide-react";

export default function OrganizationM1({
  setPage,
  orgdata,
  handleOrgDataChange,
}) {
  const MenuItems = ["India", "USA", "Canada", "UK", "Australia"];
  const CityItems = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
  ];
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
  function handleDropDownChange(e) {
    const { name, value } = e.target;
    setValue((curr) => ({ ...curr, [name]: value }));
    setError((curr) => ({ ...curr, [name]: false }));
    handleOrgDataChange({ ...orgdata, [name]: value });
  }
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

      <DropDownList
        name={"country"}
        className="w-96"
        Title="Country"
        MenuItems={MenuItems}
        value={value.country}
        onChange={handleDropDownChange}
      />

      <DropDownList
        name={"city"}
        className="w-96"
        Title="City"
        MenuItems={CityItems}
        value={value.city}
        onChange={handleDropDownChange}
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
