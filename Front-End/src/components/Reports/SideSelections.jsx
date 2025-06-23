import React, { useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemText from "@mui/material/ListItemText";
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
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
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
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function SideSelections({
  consumptionTargets,
  setConsumptionTargets,
  orgIds = [],
  facilitiesByOrg = {},
  orgNames = {},
  facilityID = "",
  meterOptions,
  setMeterOptions,
  handleChange,
  tabValue,
  setTabValue,
  selectQuantity,
  setSelectQuantity,
  selectedQuantities,
  setSelectedQuantities,
  selectedMeters: selectedMetersProp,
  setSelectedMeters: setSelectedMetersProp,
  inspectionDateValue,
  setInspectionDateValue,
  ComparisonDateValue,
  setComparisonDateValue,
  periodOptions,
  selectedPeriod,
  setSelectedPeriod,
  selectedFrequency,
  setSelectedFrequency,
}) {
  // console.log("meter options:", meterOptions);
  const names = ["Min-Consumption", "Max-Consumption"];
  const quantityOptions = React.useMemo(
    () => [
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
    ],
    []
  );

  // console.log("Meter options:", meterOptions);

  // const [selectedMetersState, setSelectedMetersState] = React.useState([]);

  const getMetersByFacility = React.useCallback(
    async (facilityId) => {
      console.log("Fetching meters for facility ID:", facilityId);
      console.log("selectedMeters:", selectedMeters);

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
  console.log("Selected Meter type is ", meterOptions);

  useEffect(() => {
    if (facilityID) {
      getMetersByFacility(facilityID);
    }
  }, [facilityID, getMetersByFacility]);
  // When user selects a meter, clear selectedQuantities to ensure only one mode is active
  const handleMeterToggle = (val) => {
    setSelectedQuantities([]); // Clear quantities when meters are selected
    setSelectedMeters((prev) => {
      const updated = prev.includes(val)
        ? prev.filter((v) => v !== val)
        : [...prev, val];
      return updated;
    });
  };

  // When user selects a quantity, clear selectedMeters to ensure only one mode is active
  const handleQuantityToggle = (val) => {
    setSelectedMeters([]); // Clear meters when quantities are selected
    setSelectedQuantities((prev) => {
      const updated = prev.includes(val)
        ? prev.filter((v) => v !== val)
        : [...prev, val];
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

  // Local state for selectedMeters if not provided by parent
  const [localSelectedMeters, setLocalSelectedMeters] = React.useState([]);
  const selectedMeters =
    selectedMetersProp !== undefined ? selectedMetersProp : localSelectedMeters;
  const setSelectedMeters =
    setSelectedMetersProp !== undefined
      ? setSelectedMetersProp
      : setLocalSelectedMeters;

  // Select the first meter as default when tab changes to 1
  useEffect(() => {
    if (tabValue === 1 && meterOptions && meterOptions.length > 0) {
      setSelectedMeters([meterOptions[0].id]);
    }
  }, [tabValue, meterOptions, setSelectedMeters]);

  // Select the first quantity as default when tab changes to 0
  useEffect(() => {
    if (tabValue === 0 && quantityOptions && quantityOptions.length > 0) {
      setSelectedQuantities([quantityOptions[0].value]);
    }
  }, [tabValue, quantityOptions, setSelectedQuantities]);

  // Clear the other selection when tab changes
  useEffect(() => {
    if (tabValue === 0) {
      setSelectedMeters([]); // Clear meters when switching to quantities tab
    } else if (tabValue === 1) {
      setSelectedQuantities([]); // Clear quantities when switching to meters tab
    }
  }, [tabValue, setSelectedMeters, setSelectedQuantities]);

  return (
    <>
      <Box
        className="flex flex-col gap-2 mb-4 w-[450px] "
        sx={{ overflowY: "auto", height: "80vh", overflowX: "hidden" }}
      >
        <Accordion
          className="w-[300px]"
          sx={{
            boxShadow: "none",
            borderBottom: "1px solid #e0e0e0",
            "&:not(:last-child)": {
              // borderBottom: "none",
            },
            "&:before": {
              display: "none",
            },
          }}
        >
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
        <Accordion
          sx={{
            boxShadow: "none",
            borderBottom: "1px solid #e0e0e0",
            "&:not(:last-child)": {
              // borderBottom: "none",
            },
            "&:before": {
              display: "none",
            },
          }}
          className="w-[300px]"
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Quanity/Meter</Typography>
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
                <div className="flex items-center mb-1">
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Meter type
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="All"
                        control={<Radio />}
                        label="All"
                      />
                      <FormControlLabel
                        value="Virtual"
                        control={<Radio />}
                        label="Virtual"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                {meterOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleMeterToggle(option.id)}
                    className={`flex items-center cursor-pointer px-3 py-2 rounded-lg border transition-all duration-200 w-56 h-12 select-none shadow-sm mb-1 hover:shadow-md hover:border-purple-300 ${
                      (selectedMeters || []).includes(option.id)
                        ? "border-purple-500 bg-purple-50 shadow-purple-100"
                        : "border-gray-200 bg-white"
                    }`}
                    style={{ gap: 12 }}
                  >
                    <Checkbox
                      checked={(selectedMeters || []).includes(option.id)}
                      icon={
                        <span style={{ fontWeight: "bold", fontSize: 18 }}>
                          {option.readingType === "Automatic"
                            ? "A"
                            : option.readingType === "Manual"
                            ? "M"
                            : "V"}
                        </span>
                      }
                      checkedIcon={
                        <span
                          style={{
                            color: "#a259e6",
                            fontWeight: "bold",
                            border: "2px solid #a259e6",
                            borderRadius: "0%",
                            padding: "2px 4px",
                            fontSize: 18,
                          }}
                        >
                          {option.readingType === "Automatic"
                            ? "A"
                            : option.readingType === "Manual"
                            ? "M"
                            : "V"}
                        </span>
                      }
                      sx={{
                        color: (selectedMeters || []).includes(option.id)
                          ? "#a259e6"
                          : "#bdbdbd",
                        "&.Mui-checked": {
                          color: "#a259e6",
                        },
                        mr: 1.5,
                      }}
                    />

                    <span
                      className="font-semibold text-base flex-1"
                      style={{
                        color: (selectedMeters || []).includes(option.id)
                          ? "#6c3aad"
                          : "#333",
                        letterSpacing: 0.2,
                      }}
                    >
                      {option.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            boxShadow: "none",
            borderBottom: "1px solid #e0e0e0",
            "&:not(:last-child)": {
              // borderBottom: "none",
            },
            "&:before": {
              display: "none",
            },
          }}
          className="w-[300px] "
        >
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
                  label="Inspection Period"
                  value={
                    inspectionDateValue ? dayjs(inspectionDateValue) : null
                  }
                  onChange={(val) =>
                    setInspectionDateValue(
                      val ? dayjs(val).utc().startOf("day").toISOString() : null
                    )
                  }
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Comparison Period"
                  name="Comparison Period"
                  value={
                    ComparisonDateValue ? dayjs(ComparisonDateValue) : null
                  }
                  onChange={(val) =>
                    setComparisonDateValue(
                      val ? dayjs(val).utc().startOf("day").toISOString() : null
                    )
                  }
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            boxShadow: "none",
            borderBottom: "1px solid #e0e0e0",
            "&:not(:last-child)": {
              borderBottom: "none",
            },
            "&:before": {
              display: "none",
            },
          }}
          className="w-[300px] "
        >
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
                multiple
                value={consumptionTargets}
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;
                  setConsumptionTargets(
                    typeof value === "string" ? value.split(",") : value
                  );
                }}
                input={<OutlinedInput label="Consumption Target" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name == "Min-Consumption" ? "targetA" : "targetB"}
                    value={name == "Min-Consumption" ? "targetA" : "targetB"}
                  >
                    <Checkbox
                      checked={consumptionTargets.includes(
                        name == "Min-Consumption" ? "targetA" : "targetB"
                      )}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}

export default SideSelections;
