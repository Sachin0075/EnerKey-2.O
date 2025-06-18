import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import getProfile from "../../services/JWT/getProfile";

export default function FacilityDropDown({
  facilitiesByOrgID,
  orgNames,
  setSelectedFacilityID,
  role,
}) {
  const orgIds = Object.keys(facilitiesByOrgID);
  const [facility, setFacility] = useState("");
  const [filteredOrgIds, setFilteredOrgIds] = useState(orgIds);

  useEffect(() => {
    async function filterFacilities() {
      if (role === "superadmin") {
        setFilteredOrgIds(orgIds);
        if (orgIds.length > 0) {
          const firstOrgId = orgIds[0];
          const facilities = facilitiesByOrgID[firstOrgId];
          if (facilities && facilities.length > 0) {
            setFacility(facilities[0].facilityId);
            setSelectedFacilityID &&
              setSelectedFacilityID(facilities[0].facilityId);
          }
        }
      } else {
        const profileOrgID = await getProfile();
        if (profileOrgID && facilitiesByOrgID[profileOrgID]) {
          setFilteredOrgIds([profileOrgID]);
          const facilities = facilitiesByOrgID[profileOrgID];
          if (facilities && facilities.length > 0) {
            setFacility(facilities[0].facilityId);
            setSelectedFacilityID &&
              setSelectedFacilityID(facilities[0].facilityId);
          } else {
            setFacility("");
            setSelectedFacilityID && setSelectedFacilityID("");
          }
        } else {
          setFilteredOrgIds([]);
          setFacility("");
          setSelectedFacilityID && setSelectedFacilityID("");
        }
      }
    }
    filterFacilities();
  }, [facilitiesByOrgID, setSelectedFacilityID, role]);

  const handleChange = (event) => {
    setFacility(event.target.value);
    setSelectedFacilityID && setSelectedFacilityID(event.target.value);
  };
  console.log("orgIds", orgIds);

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
        {filteredOrgIds.map((orgId) => [
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
