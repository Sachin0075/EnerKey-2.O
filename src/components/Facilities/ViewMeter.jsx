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

export default function ViewMeter({ isModalopen, handleClose }) {
  const metertypes = {
    metertype: "main meter",
    readingtype: "Automatic",
    quantitytype: "Water",
    maxmetervalue: 100000,
  };

  return (
    <div>
      <Dialog open={isModalopen} onClose={handleClose} className="w-7xl">
        <DialogTitle>View Meters</DialogTitle>
        <DialogContent>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Meter Mars</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {Object.entries(metertypes).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
              ))}

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
                  <Button variant="text" color="error" sx={{ color: "black" }}>
                    <DeleteIcon />
                  </Button>
                </Box>
              </AccordionActions>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">Meter Jupiter</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {Object.entries(metertypes).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
              ))}
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
                  <Button variant="text" color="error" sx={{ color: "black" }}>
                    <DeleteIcon />
                  </Button>
                </Box>
              </AccordionActions>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography component="span">Meter Mars</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {Object.entries(metertypes).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
              ))}
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
                  <Button variant="text" color="error" sx={{ color: "black" }}>
                    <DeleteIcon />
                  </Button>
                </Box>
              </AccordionActions>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
      </Dialog>
    </div>
  );
}
