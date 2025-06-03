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
function ViewAdmin({ isModalopen, handleClose, OrgID }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function handleAPI() {
      try {
        const response = await axios.get(
          `https://localhost:7266/api/User/customer-admin/${OrgID}`,
          {
            headers: {
              Authorization: import.meta.env.VITE_TOKEN_KEY,
            },
          }
        );

        // axios has data property which is the response from the API(it is complete response)
        //and data is the property of each API response

        const admins = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        // console.log(admins);

        setData(admins);
      } catch (error) {
        console.log(error);
      }
    }
    handleAPI();
  }, [OrgID]);
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
                    // onClick={}
                  >
                    <EditIcon />
                  </Button>
                  <Button variant="text" color="error">
                    <DeleteIcon />
                  </Button>
                </Box>
              </Accordion>
            ))
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ViewAdmin;
