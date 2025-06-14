import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import axios from "axios";
import { SaveIcon } from "lucide-react";
import { toast } from "react-toastify";

export default function ViewMeter({
  isModalopen,
  handleClose,
  facilityId,

  getAllFacilities,
}) {
  const [meterValue, setMeterValue] = useState([]);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editMeter, setEditMeter] = useState({
    name: "",
    type: "",
    readingType: "",
    consumedQuantityId: "",
    maxMeterValue: "",
  });

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

  // Handle edit button click
  const handleEdit = (idx) => {
    setEditingIdx(idx);
    setEditMeter({ ...meterValue[idx] });
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setEditMeter((prev) => ({ ...prev, [field]: value }));
  };
  async function updateMeter() {
    try {
      const url = `https://localhost:7183/api/MeterDefination/updateMeterById/${editMeter.id}`;
      const payload = {
        name: editMeter.name,
        type: editMeter.type,
        readingType: editMeter.readingType,
        maxMeterValue: editMeter.maxMeterValue,
        consumedQuantityId: editMeter.consumedQuantityId,
        facilityId: editMeter.facilityId,
      };
      const token = localStorage.getItem("token");
      const response = await axios.put(url, payload, {
        headers: { Authorization: token },
      });
      if (response.status === 200) {
        toast.success(`Updated ${payload.name} Meter`);
      }
      // console.log("Response iss ", response);
    } catch (error) {
      console.error(error);
      toast.error("Error Occured");
    }
    // console.log("Updated meter data:", editMeter);
  }
  async function deleteMeter(id) {
    try {
      console.log("Id issss ", id);

      const url = `https://localhost:7183/api/MeterDefination/deleteMeterById/${id}`;
      const token = localStorage.getItem("token");
      const response = await axios.delete(url, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 200) {
        toast.success(`Successfully Deleted ${editMeter.name}`);
        getAllFacilities();
        handleClose();
      }
    } catch (error) {
      console.log("Error while deleting", error);
    }
  }
  function handleDelete(id) {
    if (meterValue.length < 2) {
      toast.error("Minimum 1 Meter is required");
      return;
    }

    deleteMeter(id);
  }

  // Handle save (submit)
  const handleSave = () => {
    const updated = meterValue.map((meter, idx) =>
      idx === editingIdx ? { ...editMeter } : meter
    );
    setMeterValue(updated);
    setEditingIdx(null);

    console.log("Updated meter data:", editMeter);
    updateMeter();
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingIdx(null);
  };

  return (
    <div>
      <Dialog open={isModalopen} onClose={handleClose} className="w-7xl">
        <DialogTitle>View Meters</DialogTitle>
        <DialogContent>
          {meterValue.length > 0 ? (
            <>
              {meterValue.map((meter, idx) => (
                <Accordion
                  key={meter.meterId || idx}
                  className="meter-accordion"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id={`panel1-header-${meter.meterId}`}
                    className="meter-summary"
                  >
                    {editingIdx === idx ? (
                      <TextField
                        label="Name"
                        value={editMeter.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        fullWidth
                        size="small"
                        className="meter-field"
                      />
                    ) : (
                      <Typography component="span" className="meter-typography">
                        {meter.name || `Meter ${meter.meterId}`}
                      </Typography>
                    )}
                  </AccordionSummary>
                  <AccordionDetails className="meter-details">
                    {editingIdx === idx ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              minWidth: 140,
                              fontWeight: 500,
                            }}
                          >
                            Type:
                          </Typography>
                          <TextField
                            disabled={true}
                            value={editMeter.type}
                            onChange={(e) =>
                              handleInputChange("type", e.target.value)
                            }
                            size="small"
                            variant="standard"
                            sx={{ flex: 1, ml: 1 }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              minWidth: 140,
                              fontWeight: 500,
                            }}
                          >
                            Reading Type:
                          </Typography>

                          <FormControl>
                            <Select
                              id="demo-simple-select"
                              value={editMeter.readingType}
                              onChange={(e) =>
                                handleInputChange("readingType", e.target.value)
                              }
                              sx={{ flex: 1, ml: 1 }}
                              size="small"
                              variant="standard"
                            >
                              <MenuItem value={"Manual"}>Manual</MenuItem>
                              <MenuItem value={"Automatic"}>Automatic</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              minWidth: 140,
                              fontWeight: 500,
                            }}
                          >
                            Quantity Type:
                          </Typography>
                          <FormControl
                            sx={{ flex: 1, ml: 1 }}
                            variant="standard"
                            size="small"
                          >
                            <Select
                              id="quantity-type-select"
                              value={editMeter.consumedQuantityId || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "consumedQuantityId",
                                  Number(e.target.value)
                                )
                              }
                            >
                              <MenuItem value={1}>Electricity</MenuItem>
                              <MenuItem value={2}>Water</MenuItem>
                              <MenuItem value={3}>Gas</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              minWidth: 140,
                              fontWeight: 500,
                            }}
                          >
                            Max Meter Value:
                          </Typography>
                          <TextField
                            value={editMeter.maxMeterValue}
                            onChange={(e) =>
                              handleInputChange("maxMeterValue", e.target.value)
                            }
                            size="small"
                            variant="standard"
                            sx={{ flex: 1, ml: 1 }}
                          />
                        </Box>
                        <AccordionActions className="meter-actions">
                          <Button
                            variant="text"
                            color="success"
                            sx={{ color: "black" }}
                            onClick={handleSave}
                          >
                            <SaveIcon />
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            sx={{ color: "black" }}
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                        </AccordionActions>
                      </>
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              minWidth: 140,
                              fontWeight: 500,
                            }}
                          >
                            Type:
                          </Typography>
                          <Typography sx={{ flex: 1, ml: 1 }}>
                            {meter.type}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              minWidth: 140,
                              fontWeight: 500,
                            }}
                          >
                            Reading Type:
                          </Typography>
                          <Typography sx={{ flex: 1, ml: 1 }}>
                            {meter.readingType}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              minWidth: 140,
                              fontWeight: 500,
                            }}
                          >
                            Quantity Type:
                          </Typography>
                          <Typography sx={{ flex: 1, ml: 1 }}>
                            {editMeter.consumedQuantityId === "1"
                              ? "Electricty"
                              : editMeter.consumedQuantityId === "2"
                              ? "Water"
                              : "Gas"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              minWidth: 140,
                              fontWeight: 500,
                            }}
                          >
                            Max Meter Value:
                          </Typography>
                          <Typography sx={{ flex: 1, ml: 1 }}>
                            {meter.maxMeterValue}
                          </Typography>
                        </Box>
                        <AccordionActions className="meter-actions">
                          <Button
                            variant="text"
                            className="flex gap-2  justify-end"
                            color="info"
                            sx={{ color: "black" }}
                            onClick={() => handleEdit(idx)}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            variant="text"
                            color="error"
                            sx={{ color: "black" }}
                            onClick={() => handleDelete(meter.id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </AccordionActions>
                      </>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
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
