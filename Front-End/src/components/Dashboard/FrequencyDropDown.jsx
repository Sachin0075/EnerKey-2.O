import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FrequencyDropDown({ frequency, setFrequency }) {
  const handleChange = (event) => {
    setFrequency(event.target.value);
  };

  return (
    <FormControl sx={{ m: 2, minWidth: 180 }} size="small">
      <InputLabel id="demo-select-small-label ">Select Frequency</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={frequency}
        label="Select Frequency"
        onChange={handleChange}
      >
        <MenuItem value={"Year"}>Year</MenuItem>
        <MenuItem value={"Quarter"}>Quarter</MenuItem>
        <MenuItem value={"Month"}>Month</MenuItem>
        <MenuItem value={"Week"}>Week</MenuItem>
      </Select>
    </FormControl>
  );
}
