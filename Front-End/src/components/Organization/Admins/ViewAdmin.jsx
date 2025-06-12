import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";
import { SaveIcon } from "lucide-react";
function ViewAdmin({ isModalopen, handleClose, OrgID }) {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
  });
  useEffect(() => {
    async function handleAPI() {
      try {
        const response = await axios.get(
          `https://localhost:7266/api/User/customer-admin/${OrgID}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        const admins = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        setId(admins[0].id);

        setData(admins);
      } catch (error) {
        console.log(error);
      }
    }
    handleAPI();
  }, [OrgID]);

  async function handleDeleteAdmin() {
    if (data.length === 1) {
      toast.error("atleast one admin is required");
      return;
    }

    try {
      const response = await axios.delete(
        `https://localhost:7266/api/User/deleteUserById/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        setData((prevData) => prevData.filter((admin) => admin.id !== id));
        toast.success("Admin deleted successfully");
      } else {
        toast.error("Failed to delete admin");
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  }
  async function handleUpdateAdmin(id) {
    // Find the current admin's previous values
    const currentAdmin = data.find((admin) => admin.id === id);
    // Merge: use newData if present, otherwise fallback to previous value
    const payload = {
      userName:
        newData.userName !== "" ? newData.userName : currentAdmin.userName,
      email: newData.email !== "" ? newData.email : currentAdmin.email,
      phoneNumber:
        newData.phoneNumber !== ""
          ? newData.phoneNumber
          : currentAdmin.phoneNumber,
      role: "customeradmin",
      organizationId: OrgID,
    };
    const url = `https://localhost:7266/api/User/updateUser/${id}`;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(url, payload, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((admin) =>
            admin.id === id ? { ...admin, ...payload } : admin
          )
        );
        setIsEditing(false);
        toast.success("Admin updated successfully");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      toast.error("Failed to update admin");
    }
  }
  return (
    <div>
      <Dialog open={isModalopen} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>Admins</DialogTitle>
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

        {isEditing ? (
          <DialogContent>
            {data.map((admin, idx) => (
              <Accordion key={idx}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${idx}-content`}
                  id={`panel${idx}-header`}
                >
                  <TextField
                    component="span"
                    value={
                      newData.userName !== ""
                        ? newData.userName
                        : admin.userName
                    }
                    onChange={(e) => {
                      setNewData((prev) => ({
                        ...prev,
                        userName: e.target.value,
                      }));
                    }}
                  />
                </AccordionSummary>
                <AccordionDetails className="flex flex-col gap-6">
                  <Box className="flex gap-2 flex-row ">
                    <EmailIcon />
                    <TextField
                      variant="outlined"
                      required
                      value={newData.email !== "" ? newData.email : admin.email}
                      onChange={(e) => {
                        setNewData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                      }}
                    />
                  </Box>
                  <Box className="flex gap-2 flex-row ">
                    <PhoneIcon />
                    <TextField
                      variant="outlined"
                      required
                      value={
                        newData.phoneNumber !== ""
                          ? newData.phoneNumber
                          : admin.phoneNumber
                      }
                      onChange={(e) => {
                        setNewData((prev) => ({
                          ...prev,
                          phoneNumber: e.target.value,
                        }));
                      }}
                    />
                  </Box>
                </AccordionDetails>
                <Box className="flex justify-end gap-2 p-2">
                  <Button
                    variant="text"
                    className="flex gap-2  justify-end"
                    color="info"
                    onClick={() => handleUpdateAdmin(admin.id)}
                  >
                    <SaveIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Accordion>
            ))}
          </DialogContent>
        ) : (
          <DialogContent>
            {data.length === 0 ? (
              <Typography>No admins found.</Typography>
            ) : (
              data.map((admin, idx) => (
                <Accordion key={idx}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${idx}-content`}
                    id={`panel${idx}-header`}
                  >
                    <Typography component="span">
                      {admin?.userName || "No Name"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="flex flex-col gap-6">
                    <Box className="flex gap-2 flex-row ">
                      <EmailIcon />
                      <h2>{admin?.email || "No Email"}</h2>
                    </Box>
                    <Box className="flex gap-2 flex-row ">
                      <PhoneIcon />
                      <h2>{admin?.phoneNumber || "No Phone"}</h2>
                    </Box>
                  </AccordionDetails>
                  <Box className="flex justify-end gap-2 p-2">
                    <Button
                      variant="text"
                      className="flex gap-2  justify-end"
                      color="info"
                      onClick={() => {
                        setIsEditing(true);
                      }}
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      variant="text"
                      color="error"
                      onClick={handleDeleteAdmin}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                </Accordion>
              ))
            )}
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

export default ViewAdmin;
