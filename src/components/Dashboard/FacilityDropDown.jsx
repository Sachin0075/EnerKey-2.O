import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import { getAllFacilitiesGroupedByOrg } from "../../services/FacilityService";
import { getAllOrganizationsIDnName } from "../../services/getAllOrganizationsIDnName";
import { useState } from "react";

export default function SelectSmall() {
  const [facilitiesByOrg, setFacilitiesByOrg] = React.useState({});
  const [orgNames, setOrgNames] = React.useState({}); // orgs is { id: name, ... }

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
  const [facility, setFacility] = useState("");

  const handleChange = (event) => {
    setFacility(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 180 }} size="small">
      <InputLabel id="demo-select-small-label ">Choose Facility</InputLabel>
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
  );
}
