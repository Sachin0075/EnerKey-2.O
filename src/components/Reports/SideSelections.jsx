import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { getAllFacilitiesGroupedByOrg } from "../../services/FacilityService";
import { getAllOrganizationsIDnName } from "../../services/getAllOrganizationsIDnName";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Checkbox from "@mui/material/Checkbox";
import BoltIcon from "@mui/icons-material/Bolt";
import OpacityIcon from "@mui/icons-material/Opacity";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

function SideSelections() {
  const [facility, setFacility] = useState("");
  const [facilitiesByOrg, setFacilitiesByOrg] = useState({});
  const [orgNames, setOrgNames] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [selectQuantity, setSelectQuantity] = useState(true);
  const [selectedQuantities, setSelectedQuantities] = useState(["Electricity"]);
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  useEffect(() => {
    async function fetchFacilitiesAndOrgs() {
      const grouped = await getAllFacilitiesGroupedByOrg();
      setFacilitiesByOrg(grouped);
      const orgs = await getAllOrganizationsIDnName();
      setOrgNames(orgs); // orgs is { id: name, ... }
    }
    fetchFacilitiesAndOrgs();
  }, []);

  const orgIds = Object.keys(facilitiesByOrg);

  const handleChange = (event) => {
    setFacility(event.target.value);
  };

  const meterOptions = [
    {
      label: "meter beta",
      value: "meter beta",
    },
    {
      label: "meter alpha",
      value: "meter alpha",
    },
    {
      label: "meter gamma",
      value: "meter gamma",
    },
  ];

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

  const handleQuantityToggle = (value) => {
    setSelectedQuantities((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

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
                value={facility}
                label="Choose Facility"
                onChange={handleChange}
              >
                {orgIds.map((orgId) => [
                  <MenuItem
                    key={orgId}
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
                  facilitiesByOrg[orgId].map((name) => (
                    <MenuItem key={orgId + name} value={name} sx={{ pl: 3 }}>
                      {name}
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
                  defaultValue={"Year"}
                >
                  <MenuItem value="Year">Year</MenuItem>
                  <MenuItem value="Quarter">Quarter</MenuItem>
                  <MenuItem value="Month">Month</MenuItem>
                  <MenuItem value="Week">Week</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="year-select-label">Frequency</InputLabel>
                <Select
                  labelId="Frequency-select-label"
                  id="Frequency-select"
                  label="Frequency"
                  defaultValue={"Month"}
                >
                  <MenuItem value="Month">Month</MenuItem>
                  <MenuItem value="Day">Day</MenuItem>
                  <MenuItem value="Week">Week</MenuItem>
                </Select>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      width: "100%",
                      marginTop: 2,
                    }}
                  >
                    <DatePicker
                      label="Uncontrolled picker"
                      defaultValue={dayjs("2022-04-17")}
                    />
                    <DatePicker
                      label="Controlled picker"
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                    />
                  </Box>
                </LocalizationProvider>
              </FormControl>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion className="w-[300px]">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Additional Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel>Consumtion-Target</InputLabel>
              <Select label="Consumtion-Target">
                <MenuItem value="Min-Consumption">Min-Consumption</MenuItem>
                <MenuItem value="Max-Consumption">Max-Consumption</MenuItem>
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}

export default SideSelections;
