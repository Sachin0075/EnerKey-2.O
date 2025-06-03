import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectSmall() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 180 }} size="small">
      <InputLabel id="demo-select-small-label ">Select Facility</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Select Facility"
        onChange={handleChange}
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
        <MenuItem value={"Ajantha"}>Ajantha</MenuItem>
        <MenuItem value={"Vertex"}>Vertex</MenuItem>
        <MenuItem value={"Ashoka"}>Ashoka</MenuItem>
        <MenuItem value={"Citrus"}>Citrus</MenuItem>
      </Select>
    </FormControl>
  );
}
