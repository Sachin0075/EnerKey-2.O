import React, { useEffect, useState } from "react";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import DropDownList from "../DropDownList.jsx";
import { ArrowBigRightDash } from "lucide-react";

export default function AddFacility() {
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
    Facility: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    assignOrganization: "",
    minConsumptonTarget: "",
    maxConsumptonTarget: "",
  });
  const [error, setError] = useState({
    Facility: false,
    country: false,
    city: false,
    address: false,
    postalCode: false,
    assignOrganization: false,
    minConsumptonTarget: false,
    maxConsumptonTarget: false,
  });

  const [age, setAge] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setValue((curr) => ({ ...curr, [name]: value }));
    setError((curr) => ({ ...curr, [name]: false }));
    setAge(e.target.value);
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
  useEffect(() => {
    const allfilled = Object.values(value).every((val) => val.trim() !== "");
    const isEmailValid = validateEmail(value.email);
    setIsFilled(allfilled && isEmailValid);
  }, [value]);
  function handleDropDownChange(e) {
    const { name, value } = e.target;
    setValue((curr) => ({ ...curr, [name]: value }));
    setError((curr) => ({ ...curr, [name]: false }));
  }
  return (
    <FormControl className="gap-4">
      <TextField
        required
        placeholder="Enter your Facility name"
        label="Facility Name"
        className="w-96"
        error={error.Facility}
        helperText={error.Facility ? "Enter Facility name" : ""}
        onChange={handleChange}
        onBlur={handleBlur}
        name="organization"
        value={value.Facility}
      />

      <InputLabel id="demo-simple-select-autowidth-label">Country</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={age}
        onChange={handleChange}
        autoWidth
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={20}>India</MenuItem>
        <MenuItem value={21}>USA</MenuItem>
        <MenuItem value={22}>Finland</MenuItem>
      </Select>

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
          onClick={() => console.log("Previous step")}
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
