import React, { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Tabs,
  Tab,
  Checkbox,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BoltIcon from "@mui/icons-material/Bolt";
import OpacityIcon from "@mui/icons-material/Opacity";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import axios from "axios";
import dayjs from "dayjs";

function SideSelections({
  orgIds = [],
  facilitiesByOrg = {},
  orgNames = {},
  facilityID = "",
  meterId,
  meterOptions,
  setMeterOptions,
  setMeterId,
  handleChange,
  tabValue,
  setTabValue,
  selectQuantity,
  setSelectQuantity,
  selectedQuantities,
  setSelectedQuantities,
  DateValue,
  setDateValue,
  periodOptions,
  selectedPeriod,
  setSelectedPeriod,
  selectedFrequency,
  setSelectedFrequency,
}) {
  console.log("meter options:", meterOptions);

  const quantityOptions = [
    {
      label: "Electricity",
      icon: <BoltIcon sx={{ color: "#a259e6", mr: 1 }} />,
      value: "Electricity",
    },
    {
      label: "Water",
      icon: <OpacityIcon sx={{ color: "#6ec6f3", mr: 1 }} />,
      value: "Water",
    },
    {
      label: "Gas",
      icon: <LocalFireDepartmentIcon sx={{ color: "#ff7b7b", mr: 1 }} />,
      value: "Gas",
    },
  ];

  const getMetersByFacility = React.useCallback(
    async (facilityId) => {
      console.log("Fetching meters for facility ID:", facilityId);

      try {
        const token = localStorage.getItem("token");
        const url = `https://localhost:7183/api/MeterDefination/getMeterByFacilityId/${facilityId}`; //id is working
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        if (response.status === 200) {
          setMeterOptions(response.data);
          console.log("Meters fetched successfully:", response.data);
        }
      } catch (error) {
        console.error("Error fetching meters:", error);
      }
    },
    [setMeterOptions]
  );
  useEffect(() => {
    if (facilityID) {
      getMetersByFacility(facilityID);
    }
  }, [facilityID, getMetersByFacility]);
  const handleQuantityToggle = (val) => {
    setSelectedQuantities((prev) => {
      const updated = prev.includes(val)
        ? prev.filter((v) => v !== val)
        : [...prev, val];
      console.log("setSelectedQuantities called with:", val);
      console.log("All selectedQuantities after update:", updated);
      return updated;
    });
  };
  // Set default facility on mount if not set
  useEffect(() => {
    if (!facilityID && Array.isArray(orgIds) && orgIds.length > 0) {
      const firstOrg = orgIds[0];
      const facilities = facilitiesByOrg[firstOrg];
      if (facilities && facilities.length > 0) {
        const firstFacilityId = facilities[0].facilityId || facilities[0];
        handleChange({ target: { value: firstFacilityId } });
      }
    }
  }, [facilityID, orgIds, facilitiesByOrg, handleChange]);

  return (
    <>
      <Box className="flex flex-col gap-2 mb-4  ">
        <Accordion className="w-[300px] ">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Facility</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth>
              <InputLabel id="facility-select-label">
                Choose Facility
              </InputLabel>
              <Select
                labelId="facility-select-label"
                id="facility-select"
                value={facilityID}
                label="Choose Facility"
                onChange={handleChange}
              >
                {Array.isArray(orgIds) &&
                  orgIds.map((orgId) => [
                    <MenuItem
                      key={`org-${orgId}`}
                      value=""
                      disabled
                      sx={{
                        fontWeight: "bold",
                        color: "red !important",
                        backgroundColor: "white ",
                      }}
                    >
                      {orgNames[orgId] || orgId}
                    </MenuItem>,
                    facilitiesByOrg[orgId]?.map((facilityObj) => (
                      <MenuItem
                        key={`facility-${orgId}-${
                          facilityObj.facilityId || facilityObj
                        }`}
                        value={facilityObj.facilityId || facilityObj}
                        sx={{ pl: 3 }}
                      >
                        {facilityObj.name || facilityObj}
                      </MenuItem>
                    )),
                  ])}
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>
        <Accordion className="w-[300px]">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Qaunity/Meter</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ width: "400px", height: "100%" }}>
            <Box component="section" className="flex flex-row gap-2 ">
              <Tabs
                value={tabValue}
                onChange={(_, newValue) => setTabValue(newValue)}
                aria-label="Quantities and Meters Tabs"
                sx={{ minHeight: 0 }}
              >
                <Tab
                  label="Quantities"
                  sx={{
                    minHeight: 0,
                  }}
                  onClick={() => setSelectQuantity(true)}
                />
                <Tab
                  label="Meters"
                  sx={{
                    minHeight: 0,
                  }}
                  onClick={() => setSelectQuantity(false)}
                />
              </Tabs>
            </Box>
            {selectQuantity ? (
              <div className="flex flex-col gap-1 mt-1">
                {quantityOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleQuantityToggle(option.value)}
                    className={`flex items-center cursor-pointer px-2 py-1 rounded border transition-all duration-200 w-40 h-9 select-none shadow-sm ${
                      selectedQuantities.includes(option.value)
                        ? "border-purple-400 bg-purple-50 shadow-purple-100"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {option.icon}
                    <span className="font-medium text-base flex-1">
                      {option.label}
                    </span>
                    <Checkbox
                      checked={selectedQuantities.includes(option.value)}
                      sx={{ pointerEvents: "none", p: 0.5 }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-1 mt-1">
                {meterOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleQuantityToggle(option.value)}
                    className={`flex items-center cursor-pointer px-2 py-1 rounded border transition-all duration-200 w-40 h-9 select-none shadow-sm ${
                      selectedQuantities.includes(option.value)
                        ? "border-purple-400 bg-purple-50 shadow-purple-100"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion className="w-[300px] ">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Time Period</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="flex flex-col justify-start gap-4 mb-3">
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="period-select-label">Period</InputLabel>
                <Select
                  labelId="period-select-label"
                  id="period-select"
                  label="Period"
                  value={selectedPeriod}
                  onChange={(e) => {
                    setSelectedPeriod(e.target.value);
                    // console.log("Selected period changed to:", e.target.value);
                  }}
                >
                  {Object.keys(periodOptions).map((key) => (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="frequency-select-label">Frequency</InputLabel>
                <Select
                  labelId="frequency-select-label"
                  id="frequency-select"
                  label="Frequency"
                  value={selectedFrequency}
                  onChange={(e) => setSelectedFrequency(e.target.value)}
                >
                  {periodOptions[selectedPeriod].map((freq) => (
                    <MenuItem key={freq} value={freq}>
                      {freq}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={DateValue ? dayjs(DateValue) : null}
                  onChange={(val) => setDateValue(val)}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion className="w-[300px] ">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Additional Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth>
              <InputLabel id="facility-select-label">
                Consumption Target
              </InputLabel>
              <Select
                labelId="consumption-select-label"
                id="consumption-select"
                value={facilityID}
                label="Consumption Target"
                onChange={handleChange}
              >
                <MenuItem value="MinConsumption">Min - Consumption</MenuItem>
                <MenuItem value="MaxConsumption">Max - Consumption</MenuItem>
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}

export default SideSelections;
