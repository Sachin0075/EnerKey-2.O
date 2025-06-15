import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import axios from "axios";
import EditUserModal from "./EditUserModal";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UsersTable({ rows, getAllUser, orgMap }) {
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  useEffect(() => {
    getAllUser();
  }, []);

  function handleEdit(id, organizationId) {
    setOpenEditModal(true);
    setSelectedUser(id);
    setSelectedOrgId(organizationId);
    // console.log("Edit user ID:", id, "Organization ID:", organizationId);
  }

  async function handleDelete(row) {
    const userId = row.id;
    const isDelete = confirm(
      `Are you sure you want to delete user ${row.userName}? This action cannot be undone.`
    );

    if (isDelete) {
      const url = `https://localhost:7266/api/User/deleteUserById/${userId}`;

      const token = localStorage.getItem("token");
      try {
        const response = await axios.delete(url, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.status === 200) {
          toast.success(`${row.userName} deleted successfully!`);
          getAllUser();
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error(`Failed to delete user ${row.userName}. Please try again.`);
      }
    }
  }

  return (
    <>
      {openEditModal && (
        <EditUserModal
          userId={selectedUser}
          OrgId={selectedOrgId}
          open={openEditModal}
          handleClose={() => setOpenEditModal(false)}
          getAllUser={getAllUser}
        />
      )}
      <div style={{ padding: 20 }}>
        <TableContainer
          component={Paper}
          style={{ borderRadius: 16, boxShadow: "0 2px 12px #f0f0f0" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="user table" size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontWeight: 600, color: "#3160b6", padding: "8px" }}
                >
                  User Name
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
                  Organization
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, color: "#3160b6", padding: "8px" }}
                >
                  Role
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
                  <TableCell style={{ padding: "8px" }}>
                    {row.userName}
                  </TableCell>
                  <TableCell style={{ padding: "8px" }}>{row.email}</TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    {row.phoneNumber}
                  </TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    {orgMap[row.organizationId] || row.organizationId}
                  </TableCell>
                  <TableCell style={{ padding: "8px" }}>{row.role}</TableCell>
                  <TableCell style={{ padding: "8px" }}>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => {
                        handleEdit(row.id, row.organizationId);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(row)}
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
