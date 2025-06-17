import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

const FacilitySelect = ({ facilityID, handleChange, names }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="facility-select-label">Consumption Target</InputLabel>
      <Select
        labelId="facility-select-label"
        id="facility-multi-select"
        multiple
        value={facilityID}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={facilityID.includes(name)} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FacilitySelect;
