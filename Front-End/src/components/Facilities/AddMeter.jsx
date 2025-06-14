import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function AddMeter({ isModalopen, handleClose, facilityId }) {
  const [value, setValue] = useState({
    meterName: "",
    readingType: "",
    quantityType: "",
    maxMeterValue: "",
  });
  const [Error, setError] = useState({
    meterName: false,
    readingType: false,
    quantityType: false,
    maxMeterValue: false,
  });
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    const allfilled = Object.values(value).every((val) => val.trim() !== "");
    // Meter name must be at least 3 characters and no errors
    const noErrors =
      value.meterName.trim().length >= 3 &&
      !Object.values(Error).some((err) => err);
    setIsFilled(allfilled && noErrors);
  }, [value, Error]);

  function handleChange(e) {
    const { name, value: val } = e.target;
    setValue((curr) => ({ ...curr, [name]: val }));
    if (name === "meterName") {
      setError((curr) => ({
        ...curr,
        meterName: val.trim().length < 3,
      }));
    } else {
      setError((curr) => ({ ...curr, [name]: val === "" }));
    }
  }

  function handleBlur(e) {
    const { name, value: val } = e.target;
    if (name === "meterName") {
      setError((prev) => ({ ...prev, meterName: val.trim().length < 3 }));
    } else if (val.trim() === "") {
      setError((prev) => ({ ...prev, [name]: true }));
    }
  }

  async function addMeter() {
    const payload = {
      name: value.meterName,
      readingType: value.readingType,
      maxMeterValue: value.maxMeterValue,
      consumedQuantityId: value.quantityType,
      facilityId: facilityId,
    };
    console.log("payload is", payload);
    const url = "https://localhost:7183/api/MeterDefination/addMeter";
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: token,
        },
      });
      console.log("API Response:", response.data);
      if (response.status === 201) {
        toast.success("Meter added successfully");
        handleClose();
      } else {
        toast.error("Failed to add meter");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 409 &&
        error.response.data?.detail === "Meter name already exists"
      ) {
        setError((curr) => ({ ...curr, meterName: true }));
        toast.error("Meter name already exists. Please use a different name.");
      } else {
        toast.error("Failed to add meter");
      }
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submittted Data:", value);
    addMeter();
  }
  console.log("Facility ID:", facilityId);
  return (
    <div>
      <Dialog open={isModalopen} onClose={handleClose} className="w-7xl">
        <DialogTitle>Add Meter</DialogTitle>
        <DialogContent>
          <FormControl>
            <TextField
              sx={{ marginTop: 1 }}
              disabled
              id="outlined-disabled"
              label="Number of Main Meters"
              defaultValue="1"
            />
            <TextField
              sx={{ marginTop: 1 }}
              disabled
              id="outlined-disabled"
              label="Meter Type"
              defaultValue="Main Meter"
            />
            <TextField
              sx={{ marginTop: 1 }}
              required
              name="meterName"
              id="outlined-required"
              label="Meter Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={value.meterName}
              error={Error.meterName}
              helperText={
                Error.meterName
                  ? value.meterName.trim().length < 3
                    ? "Meter Name must be at least 3 characters"
                    : "Enter Meter Name"
                  : ""
              }
            />
            <FormControl sx={{ marginTop: 1 }} error={Error.readingType}>
              <InputLabel id="demo-simple-select-label">
                Select Reading Meter
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Reading Type"
                name="readingType"
                value={value.readingType}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              >
                <MenuItem value="Manual">Manual</MenuItem>
                <MenuItem value="Automatic">Automatic</MenuItem>
              </Select>
              {Error.readingType && (
                <FormHelperText>Select Reading Type</FormHelperText>
              )}
            </FormControl>

            <FormControl sx={{ marginTop: 1 }} error={Error.quantityType}>
              <InputLabel id="demo-simple-select-label">
                Select Quantity Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Quantity Type"
                value={value.quantityType}
                name="quantityType"
                required
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="1">Electricity</MenuItem>
                <MenuItem value="2">Water</MenuItem>
                <MenuItem value="3">Gas</MenuItem>
              </Select>
              {Error.quantityType && (
                <FormHelperText>Select Quantity Type</FormHelperText>
              )}
            </FormControl>

            <TextField
              sx={{ marginTop: 1 }}
              type="number"
              label="Maximum Meter value"
              name="maxMeterValue"
              required
              onChange={handleChange}
              id="outlined-required"
              value={value.maxMeterValue}
              onBlur={handleBlur}
              error={Error.maxMeterValue}
              helperText={
                Error.maxMeterValue ? "Enter Maximum Meter Value" : ""
              }
            />

            <Button
              disabled={!isFilled}
              variant={isFilled ? "contained" : "outlined"}
              sx={{ marginTop: 1 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddMeter;
