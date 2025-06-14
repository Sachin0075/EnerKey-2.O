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
import Skeleton from "@mui/material/Skeleton";

import AddAdmin from "../Organization/Admins/AddAdmin.jsx";
import { useState } from "react";
import ViewMeter from "./ViewMeter.jsx";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddMeter from "./AddMeter.jsx";
import EditFacility from "./EditFacility.jsx";

export default function FacilityBasicTable() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isviewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [facilityId, setFacilityId] = useState(null);

  useEffect(() => {
    handleAPi();
  }, []);
  async function handleAPi() {
    setLoading(true);
    const url = "https://localhost:7108/api/Facility/getAllFacilities";
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching facilities:", error);
      setRows([]);
      setLoading(true);
      toast.error("Failed to fetch facilities. Please try again later.");
    }
  }
  function handleAddopen(facilityId) {
    setFacilityId(facilityId);
    setIsAddModalOpen(true);
  }
  function handleAddClose() {
    setIsAddModalOpen(false);
  }
  function handleViewOpen() {
    setIsViewModalOpen(true);
  }
  function handleViewClose() {
    setIsViewModalOpen(false);
  }

  function handleEditOpen(facilityId) {
    setFacilityId(facilityId);
    console.log("Facility ID:", facilityId);
    setIsEditModalOpen(true);
  }
  function handleEditClose() {
    setIsEditModalOpen(false);
  }
  async function handleDelete(row) {
    const facilityId = row.facilityId;
    const isdelete = confirm(
      "Are you sure you want to delete this facility? This action cannot be undone."
    );
    if (isdelete) {
      const url = `https://localhost:7108/api/Facility/deleteFacility/${facilityId}`;
      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(url, {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log("API response data:", response.data);
        if (response.status === 200) {
          toast.error(`${row.name} deleted successfully!`);

          handleAPi();
        }
      } catch (error) {
        console.error("Error deleting facility:", error);
      }
    }
  }

  return (
    <>
      {isAddModalOpen && (
        <AddMeter
          facilityId={facilityId}
          isModalopen={isAddModalOpen}
          handleClose={handleAddClose}
        />
      )}

      {isviewModalOpen && (
        <ViewMeter
          isModalopen={isviewModalOpen}
          handleClose={handleViewClose}
        />
      )}

      {isEditModalOpen && (
        // <EditAdmin
        //   isModalopen={isEditModalOpen}
        //   handleClose={handleEditClose}
        // />
        <EditFacility
          handleAPi={handleAPi}
          facilityId={facilityId}
          isModalopen={isEditModalOpen}
          handleClose={handleEditClose}
        />
      )}
      <div style={{ padding: 20, marginBottom: 20, height: "100%" }}>
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
              {loading
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <TableRow key={idx}>
                      {Array.from({ length: 9 }).map((_, cellIdx) => (
                        <TableCell key={cellIdx} style={{ padding: "8px" }}>
                          <Skeleton variant="rectangular" height={24} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : rows.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell style={{ padding: "8px" }}>
                        {row.name}
                      </TableCell>
                      <TableCell style={{ padding: "8px" }}>
                        {row.country}
                      </TableCell>
                      <TableCell style={{ padding: "8px" }}>
                        {row.city}
                      </TableCell>
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
                          onClick={() => handleAddopen(row.facilityId)}
                          color="primary"
                          size="small"
                        >
                          <AddIcon />
                        </IconButton>

                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleEditOpen(row.facilityId)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            handleDelete(row);
                          }}
                          color="primary"
                          size="small"
                        >
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
