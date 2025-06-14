import React from "react";
import AddButtonUser from "../components/User/AddButtonUser";
import UsersTable from "../components/User/UsersTable";
import axios from "axios";
import { useState } from "react";

const Users = () => {
  const [rows, setRows] = useState([]);
  const [orgMap, setOrgMap] = useState({});
  async function fetchOrganizationNames() {
    try {
      const geturl =
        "https://localhost:7162/api/Organization/getallorganizations";
      const token = localStorage.getItem("token");
      const getallresponse = await axios.get(geturl, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (getallresponse.status === 200) {
        let orgArray = Array.isArray(getallresponse.data)
          ? getallresponse.data
          : Array.isArray(getallresponse.data.data)
          ? getallresponse.data.data
          : [];
        const orgKeyValue = orgArray.reduce((acc, org) => {
          acc[org.organizationId] = org.name;
          return acc;
        }, {});
        setOrgMap(orgKeyValue);
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  }
  async function getAllUser() {
    const url = "https://localhost:7266/api/User/getAllUsers";
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (Array.isArray(response.data)) {
        setRows(response.data);
      } else if (Array.isArray(response.data.data)) {
        setRows(response.data.data);
      } else {
        setRows([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    fetchOrganizationNames();
  }
  return (
    <div>
      <AddButtonUser getAllUser={getAllUser} />
      <UsersTable rows={rows} getAllUser={getAllUser} orgMap={orgMap} />
    </div>
  );
};

export default Users;
