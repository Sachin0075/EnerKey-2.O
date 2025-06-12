import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";

export default function FacilityDropDown({
  facilitiesByOrgID,
  orgNames,
  setSelectedFacilityID,
}) {
  const orgIds = Object.keys(facilitiesByOrgID);
  const [facility, setFacility] = useState("");

  useEffect(() => {
    if (orgIds.length > 0) {
      const firstOrgId = orgIds[0];
      const facilities = facilitiesByOrgID[firstOrgId];
      if (facilities && facilities.length > 0) {
        setFacility(facilities[0].facilityId);
        setSelectedFacilityID &&
          setSelectedFacilityID(facilities[0].facilityId);
      }
    }
  }, [facilitiesByOrgID, setSelectedFacilityID]);

  const handleChange = (event) => {
    setFacility(event.target.value);
    setSelectedFacilityID && setSelectedFacilityID(event.target.value);
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
            {orgNames && orgNames[orgId]
              ? orgNames[orgId]
              : `Organization ${orgId}`}
          </MenuItem>,
          facilitiesByOrgID[orgId].map((facilityObj) => (
            <MenuItem
              key={orgId + facilityObj.facilityId}
              value={facilityObj.facilityId}
              sx={{ pl: 3 }}
            >
              {facilityObj.name}
            </MenuItem>
          )),
        ])}
      </Select>
    </FormControl>
  );
}
