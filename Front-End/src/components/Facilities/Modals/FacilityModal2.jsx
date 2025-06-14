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
import axios from "axios";
// import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function FacilityModal2({
  value,
  handlePageChange,
  open,
  handleClose,
  setValue,
  getAllFacilities,
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
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    setValue((curr) => ({ ...curr, type: "Main meter" }));
  }, []);
  useEffect(() => {
    const requiredMeterFields = [
      "metername",
      "readingType",
      "maxMeterValue",
      "consumedQuantityId",
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
    if (name === "metername" && value.toString().trim().length < 3) {
      setError((prev) => ({ ...prev, metername: true }));
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setValue((curr) => ({ ...curr, [name]: value }));
    setError((curr) => ({ ...curr, [name]: false }));
  }
  async function createFacility() {
    try {
      const url = "https://localhost:7108/api/Facility/addFacility";
      const token = localStorage.getItem("token");
      const facilityResponse = await axios.post(url, value, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("API response data:", facilityResponse.data);
      if (facilityResponse.status === 201) {
        const facilityID = facilityResponse.data.facilityId;
        setValue((prev) => ({ ...prev, facilityId: facilityID }));
        // console.log("Submitting meter readings:", facilityResponse.data);
        toast.success("Facility added successfully!");
        // Create meter after facility is created
        await createMeter(facilityID);
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  }

  async function createMeter(facilityId) {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        name: value.metername,
        type: value.type,
        readingType: value.readingType,
        maxMeterValue: value.maxMeterValue,
        consumedQuantityId: value.consumedQuantityId,
        facilityId: facilityId || value.facilityId,
      };

      const meterResponse = await axios.post(
        "https://localhost:7183/api/MeterDefination/addMeter",
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (meterResponse.status === 201) {
        toast.success("Meter added successfully!");
        handleClose();
        getAllFacilities();
        setSubmitError("");
      }
    } catch (error) {
      setSubmitError(error?.response?.data?.title || "Failed to add meter");
      toast.error(error?.response?.data?.title || "Failed to add meter");
    }
  }

  async function handleSubmit() {
    // e.preventDefault();
    await createFacility();
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
              helperText={
                error.metername
                  ? "Enter Meter name and it should be more than 3 characters"
                  : ""
              }
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

            {submitError && (
              <span style={{ color: "red", fontSize: 14, marginBottom: 8 }}>
                {submitError}
              </span>
            )}

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
