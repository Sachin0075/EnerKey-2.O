import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Box, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function ViewMeter({ isModalopen, handleClose, facilityId }) {
  const [meterValue, setMeterValue] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  async function fetchMeterData() {
    try {
      const url = `https://localhost:7183/api/MeterDefination/getMeterByFacilityId/${facilityId}`;
      const token = localStorage.getItem("token");
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("API response data:", response.data);
      let meters = [];
      if (Array.isArray(response.data)) {
        meters = response.data;
      } else if (Array.isArray(response.data.data)) {
        meters = response.data.data;
      }
      setMeterValue(meters);
      console.log("Meter data:", meters);
    } catch (error) {
      console.error("Error fetching meter data:", error);
    }
  }
  useEffect(() => {
    fetchMeterData();
  }, []);

  return (
    <div>
      <Dialog open={isModalopen} onClose={handleClose} className="w-7xl">
        <DialogTitle>View Meters</DialogTitle>
        <DialogContent>
          {meterValue.length > 0 ? (
            <>
              {isEditing ? (
                <div></div>
              ) : (
                meterValue.map((meter, idx) => (
                  <Accordion key={meter.meterId || idx}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id={`panel1-header-${meter.meterId}`}
                    >
                      <Typography component="span">
                        {meter.name || `Meter ${meter.meterId}`}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>Type: {meter.type}</div>
                      <div>Reading Type: {meter.readingType}</div>
                      <div>Quantity Type: {meter.consumedQuantityId}</div>
                      <div>Max Meter Value: {meter.maxMeterValue}</div>
                      <AccordionActions>
                        <Box className="flex justify-end gap-1">
                          <Button
                            variant="text"
                            className="flex gap-2  justify-end"
                            color="info"
                            sx={{ color: "black" }}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            variant="text"
                            color="error"
                            sx={{ color: "black" }}
                          >
                            <DeleteIcon />
                          </Button>
                        </Box>
                      </AccordionActions>
                    </AccordionDetails>
                  </Accordion>
                ))
              )}
            </>
          ) : (
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Typography variant="h6">No Meters Found</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
