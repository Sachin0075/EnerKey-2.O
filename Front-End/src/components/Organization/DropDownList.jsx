import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DropDownList({
  Title,
  name,
  MenuItems,
  className,
  sx,
  value,
  onChange,
}) {
  return (
    <FormControl
      sx={{ minWidth: 180, ...sx }}
      size="small"
      className={className}
    >
      <InputLabel id={`select-${Title}-label`}>Select {Title}</InputLabel>
      <Select
        name={name}
        labelId={`select-${Title}-label`}
        id={`select-${Title}`}
        value={value}
        label={`Select ${Title}`}
        onChange={onChange}
      >
        {/* <MenuItem value=""></MenuItem>
          <em>None</em>
        </MenuItem> */}

        {MenuItems.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
