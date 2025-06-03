import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AddAdmin from "../Organization/Admins/AddAdmin.jsx";
import { useState } from "react";
// import ViewAdmin from "../Organization/Admins/ViewAdmin.jsx";
import EditAdmin from "../Organization/Admins/EditOrg.jsx";
import AddButton from "../Organization/AddButton.jsx";
import ViewMeter from "./ViewMeter.jsx";
import { useEffect } from "react";
import axios from "axios";

export default function FacilityBasicTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isviewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function handleAPi() {
      const url = "https://localhost:7108/api/Facility/getAllFacilities";
      const token = import.meta.env.VITE_TOKEN_KEY;
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log("API response data:", response.data);

        if (Array.isArray(response.data)) {
          setRows(response.data);
        } else if (Array.isArray(response.data.data)) {
          setRows(response.data.data);
        } else {
          setRows([]);
        }
        // console.log(rows);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    }
    handleAPi();
  }, []);
  function handleAddopen() {
    setIsModalOpen(true);
  }
  function handleAddClose() {
    setIsModalOpen(false);
  }
  function handleViewOpen() {
    setIsViewModalOpen(true);
  }
  function handleViewClose() {
    setIsViewModalOpen(false);
  }

  function handleEditOpen() {
    setIsEditModalOpen(true);
  }
  function handleEditClose() {
    setIsEditModalOpen(false);
  }
  return (
    <>
      {isModalOpen && (
        <AddAdmin isModalopen={isModalOpen} handleClose={handleAddClose} />
      )}

      {isviewModalOpen && (
        <ViewMeter
          isModalopen={isviewModalOpen}
          handleClose={handleViewClose}
        />
      )}

      {isEditModalOpen && (
        <EditAdmin
          isModalopen={isEditModalOpen}
          handleClose={handleEditClose}
          // initialData={{
          //   adminName: "John Doe",
          //   email: "}
          //api integration is to be done",
        />
      )}
      <div style={{ padding: 20 }}>
        <TableContainer
          component={Paper}
          style={{ borderRadius: 16, boxShadow: "0 2px 12px #f0f0f0" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="org table" size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontWeight: 600, color: "#3160b6", padding: "8px" }}
                >
                  Facility Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, color: "#3160b6", padding: "8px" }}
                >
                  Country
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, color: "#3160b6", padding: "8px" }}
                >
                  City
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, color: "#3160b6", padding: "8px" }}
                >
                  Address
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, color: "#3160b6", padding: "8px" }}
                >
                  Pincode
                </TableCell>

                <TableCell
                  style={{ fontWeight: 600, color: "#3160b6", padding: "8px" }}
                >
                  Min Consumption
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, color: "#3160b6", padding: "8px" }}
                >
                  Max Consumption
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, color: "#3160b6", padding: "8px" }}
                >
                  Meter
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, color: "#3160b6", padding: "8px" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell style={{ padding: "8px" }}>{row.name}</TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    {row.country}
                  </TableCell>
                  <TableCell style={{ padding: "8px" }}>{row.city}</TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    {row.streetAddress}
                  </TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    {row.pinCode}
                  </TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    {row.targetA}
                  </TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    {row.targetB}
                  </TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleViewOpen}
                      style={{
                        borderRadius: 12,
                        textTransform: "none",
                        fontWeight: 500,
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    <IconButton
                      onClick={handleAddopen}
                      color="primary"
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>

                    <IconButton
                      color="primary"
                      size="small"
                      onClick={handleEditOpen}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton color="primary" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
