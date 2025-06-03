import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OrganizationM1 from "./OrganizationM1";
import AdminM2 from "./AdminM2";
import React, { useState } from "react";

const ModalHandle = ({ open, handleClose }) => {
  const [page, setPage] = useState(1);
  const [orgdata, setOrgdata] = useState({
    organization: "",
    email: "",
    contact: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    adminname: "",
    adminemail: "",
    admincontact: "",
    adminpassword: "",
    adminconfirmPassword: "",
  });

  function handleOrgDataChange(newData) {
    setOrgdata((prev) => ({ ...prev, ...newData }));
  }

  function changePage() {
    setPage((prev) => (prev == 1 ? 2 : 1));
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: "center" }}>Add Organization</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {page === 1 ? (
          <OrganizationM1
            setPage={changePage}
            orgdata={orgdata}
            handleOrgDataChange={handleOrgDataChange}
          />
        ) : (
          <AdminM2
            setPage={changePage}
            orgdata={orgdata}
            handleOrgDataChange={handleOrgDataChange}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalHandle;
