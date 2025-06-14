import { Button, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import AddUserModal from "./AddUserModal";

// import axios from "axios";

function AddButtonUser({ getAllUser }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Stack className="flex justify-end p-10" spacing={2} direction="row">
        <Button
          className="hover:bg-[#EAECF7]! shadow-xl/65! border-none! shadow! rounded!"
          variant="outlined"
          sx={{ textTransform: "capitalize" }}
          onClick={handleOpen}
        >
          <span className="font-medium">Add User</span>
        </Button>
      </Stack>

      <AddUserModal
        getAllUser={getAllUser}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}

export default AddButtonUser;
