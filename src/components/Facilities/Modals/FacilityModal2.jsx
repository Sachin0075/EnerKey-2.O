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
  Stack,
} from "@mui/material";
// import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

function FacilityModal2({
  value,
  handlePageChange,
  open,
  handleClose,
  setValue,
}) {
  const [error, setError] = useState({
    metername: false,
    type: false,
    readingType: false,
    maxMeterValue: false,
    consumedQuantityId: false,
  });

  // Add a state to track if all meter fields are filled
  const [isMeterFill, setIsMeterFill] = useState(false);

  useEffect(() => {
    setValue((curr) => ({ ...curr, type: "Main meter" }));
  }, []);
  useEffect(() => {
    const requiredMeterFields = [
      "metername",
      "readingType",
      "maxMeterValue",
      "consumedQuantityId",
      // "type" // Uncomment if 'type' is required
    ];
    const allFilled = requiredMeterFields.every((key) => {
      const val = value[key];
      return val !== undefined && val !== null && val.toString().trim() !== "";
    });
    setIsMeterFill(allFilled);
  }, [value]);

  function handleBack() {
    handlePageChange(1);
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setError((prev) => ({ ...prev, [name]: true }));
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setValue((curr) => ({ ...curr, [name]: value }));
    setError((curr) => ({ ...curr, [name]: false }));
  }

  async function handleSubmit(e) {
    console.log("Submitting meter readings:", value);
    e.preventDefault();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add meter Readings</DialogTitle>
        <DialogContent className="w-[300px] pt-6" style={{ paddingTop: 32 }}>
          <FormControl className="flex flex-col gap-4">
            <TextField
              disabled
              id="outlined-disabled"
              label="Number of Meters"
              type="number"
              defaultValue="1"
              fullWidth
            />
            <TextField
              disabled
              id="outlined-disabled"
              label="Meter Type"
              name="type"
              value={value.type}
              defaultValue="Main meter"
              fullWidth
            />
            <TextField
              id="outlined"
              error={error.metername}
              helperText={error.metername ? "Enter Meter name" : ""}
              name="metername"
              value={value.metername}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Meter name"
              fullWidth
            />

            <FormControl>
              <InputLabel id="reading-type-label">Reading Type</InputLabel>
              <Select
                label="Reading Type"
                labelId="reading-type-label"
                name="readingType"
                value={value.readingType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error.readingType}
                fullWidth
              >
                <MenuItem value="Automatic">Automatic</MenuItem>
                <MenuItem value="Manual">Manual</MenuItem>
              </Select>
              {error.readingType && (
                <span style={{ color: "red", fontSize: 12, marginLeft: 14 }}>
                  Select Reading Type
                </span>
              )}
            </FormControl>

            <FormControl>
              <InputLabel id="quantity-type-label">Quantity Type</InputLabel>
              <Select
                label="Quantity Type"
                labelId="quantity-type-label"
                name="consumedQuantityId"
                value={value.consumedQuantityId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={error.consumedQuantityId}
                fullWidth
                displayEmpty
              >
                <MenuItem value="1">Water</MenuItem>
                <MenuItem value="2">Gas</MenuItem>
                <MenuItem value="3">Electricity</MenuItem>
              </Select>
              {error.consumedQuantityId && (
                <span style={{ color: "red", fontSize: 12, marginLeft: 14 }}>
                  Select Quantity Type
                </span>
              )}
            </FormControl>

            <TextField
              error={error.maxMeterValue}
              helperText={error.maxMeterValue ? "Enter Max meter" : ""}
              label="Max Meter value"
              name="maxMeterValue"
              type="number"
              value={value.maxMeterValue}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />

            <Stack direction={"row"} spacing={2} className="mt-4">
              <Button variant="outlined" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={!isMeterFill}>
                Submit
              </Button>
            </Stack>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FacilityModal2;
