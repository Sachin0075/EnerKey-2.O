import { Button, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import FacilityModal1 from "./FacilityModal1";
import FacilityModal2 from "./FacilityModal2";
// import axios from "axios";

function AddButtonFacility({ getAllFacilities, OrgName, role, setOrgName }) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [organizations, setOrganizations] = useState({});
  const [value, setValue] = useState({
    name: "",
    streetAddress: "",
    city: "",
    country: "",
    pinCode: "",
    targetA: "",
    targetB: "",
    organizationId: "",
    metername: "", //meter name
    type: "",
    readingType: "",
    maxMeterValue: "",
    consumedQuantityId: "",
    facilityId: "",
  });

  function handlePageChange(newPage) {
    setPage(newPage);
  }
  return (
    <Stack className="flex justify-end p-10" spacing={2} direction="row">
      <Button
        className="hover:bg-[#EAECF7]! shadow-xl/65! border-none! shadow! rounded!"
        variant="outlined"
        sx={{ textTransform: "capitalize" }}
        onClick={() => setOpen(true)} // Open the modal
      >
        <span className="font-medium">Add Facility</span>
      </Button>

      {page === 1 ? (
        <FacilityModal1
          role={role}
          handlePageChange={handlePageChange}
          open={open}
          OrgName={OrgName}
          setOrgName={setOrgName}
          organizations={organizations}
          handleClose={() => setOpen(false)}
          value={value}
          setValue={setValue}
          setOrganizations={setOrganizations}
        />
      ) : (
        <FacilityModal2
          value={value}
          handlePageChange={handlePageChange}
          organizations={organizations}
          setOrganizations={setOrganizations}
          open={open}
          handleClose={() => setOpen(false)}
          setValue={setValue}
          getAllFacilities={getAllFacilities}
        />
      )}
    </Stack>
  );
}

export default AddButtonFacility;
