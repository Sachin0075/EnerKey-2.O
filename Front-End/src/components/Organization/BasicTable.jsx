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
import AddButton from "./AddButton";
import AddAdmin from "./Admins/AddAdmin";
import { useState } from "react";
import ViewAdmin from "./Admins/ViewAdmin";
import EditAdmin from "./Admins/EditOrg";
import axios from "axios";
import { useEffect } from "react";

const url = "https://localhost:7162/api/Organization/getallorganizations";
const token = localStorage.getItem("token");
export default function BasicTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isviewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [orgId, setOrgId] = useState("");

  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetchOrganizations();
  }, []);
  async function fetchOrganizations() {
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `${token}` },
      });
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  }

  function handleAddopen(organizationId) {
    console.log("Organization ID:", organizationId);
    setOrgId(organizationId);

    setIsModalOpen(true);
  }
  function handleAddClose() {
    setIsModalOpen(false);
  }
  function handleViewOpen(orgId) {
    setIsViewModalOpen(true);
    setOrgId(orgId);
  }
  function handleViewClose() {
    setIsViewModalOpen(false);
  }

  function handleEditOpen(orgId) {
    setIsEditModalOpen(true);
    setOrgId(orgId);
  }
  function handleEditClose() {
    setIsEditModalOpen(false);
  }
  async function handledelete(orgID) {
    // console.log("Organization ID to delete:", orgID);

    const url = `https://localhost:7162/api/Organization/deleteorganization/${orgID}`;
    const deleteorg = confirm(
      "Are you sure you want to delete this organization?"
    );
    if (deleteorg) {
      try {
        const msg = await axios.delete(url, {
          headers: { Authorization: `${token}` },
        });
        alert(msg.data.message);
        fetchOrganizations();
      } catch (error) {
        console.error("Error deleting organization:", error);
      }
    }
  }
  return (
    <>
      {isModalOpen && (
        <AddAdmin
          isModalopen={isModalOpen}
          handleClose={handleAddClose}
          orgID={orgId}
        />
      )}

      {isviewModalOpen && (
        <ViewAdmin
          isModalopen={isviewModalOpen}
          handleClose={handleViewClose}
          OrgID={orgId}
        />
      )}

      {isEditModalOpen && (
        <EditAdmin
          isModalopen={isEditModalOpen}
          handleClose={handleEditClose}
          orgId={orgId}
          // initialData={{
          //   adminName: "John Doe",
          //   email: "}
          //api integration is to be done",
        />
      )}
      <div style={{ padding: 20, marginBottom: 50 }}>
        <AddButton />
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
                  Organization Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, color: "#3160b6", padding: "8px" }}
                >
                  Email
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, color: "#3160b6", padding: "8px" }}
                >
                  Contact
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
                  Admins
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
                    {row.email && row.email.length > 15
                      ? row.email.slice(0, 13) + "..."
                      : row.email}
                  </TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    {row.contact}
                  </TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    {row.country}
                  </TableCell>
                  <TableCell style={{ padding: "8px" }}>{row.city}</TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    {row.streetAddress}
                  </TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewOpen(row.organizationId)}
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
                      onClick={() => handleAddopen(row.organizationId)}
                      color="primary"
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleEditOpen(row.organizationId)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handledelete(row.organizationId)}
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
