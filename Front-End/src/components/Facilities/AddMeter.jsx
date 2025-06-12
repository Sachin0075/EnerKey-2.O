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
    setIsFilled(allfilled);
  }, [value]);
  function handleChange(e) {
    const { name, value } = e.target;
    setValue((curr) => ({ ...curr, [name]: value }));
    setError((curr) => ({ ...curr, [name]: value === "" }));
  }
  function handleBlur(e) {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setError((prev) => ({ ...prev, [name]: true }));
    }
  }

  async function handleApi() {
    const payload = {
      name: "DummyMeter",
      type: "Main Meter",
      readingType: "Manual",
      maxMeterValue: 500,
      consumedQuantityId: 1,
      facilityId: "e20b26fb-7f15-4386-9c3c-649d6474e506",
    };
    const url = "https://localhost:7183/api/MeterDefination/addMeter";
    const token = localStorage.getItem("token");
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: token,
      },
    });
    console.log("API Response:", response.data);
    if (response.status === 201) {
      toast.success("Meter added successfully");
    } else {
      toast.error("Failed to add meter");
    }
  }
  function handleSubmit() {
    console.log("Submittted Data:", value);
    handleApi();

    handleClose();
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
              helperText={Error.meterName ? "Enter Meter Name" : ""}
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
                <MenuItem value="Manual">Water</MenuItem>
                <MenuItem value="Automatic">Gas</MenuItem>
                <MenuItem value="Automatic">Electricity</MenuItem>
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
