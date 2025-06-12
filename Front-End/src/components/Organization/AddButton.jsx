import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ModalHandle from "./AddOrganization/ModalHandle";
import FacilityModal1 from "../Facilities/Modals/FacilityModal1";

export default function AddButton({ fetchOrganizations }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <div>
          <Stack className="flex justify-end p-10" spacing={2} direction="row">
            <Button
              className="hover:bg-[#EAECF7]! shadow-xl/65! border-none! shadow! rounded!"
              variant="outlined"
              sx={{ textTransform: "capitalize" }}
              onClick={() => setOpen(true)} // Open the modal
            >
              <span className="font-medium">Add Organization</span>
            </Button>
            <ModalHandle
              open={open}
              handleClose={() => {
                setOpen(false);
                fetchOrganizations();
              }}
            />
          </Stack>
        </div>
      </div>
    </>
  );
}
