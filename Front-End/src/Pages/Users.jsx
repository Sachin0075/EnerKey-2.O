import React, { useEffect } from "react";
import AddButtonUser from "../components/User/AddButtonUser";
import UsersTable from "../components/User/UsersTable";
import axios from "axios";
import { useState } from "react";

const Users = ({ role }) => {
  const [rows, setRows] = useState([]);
  const [orgMap, setOrgMap] = useState({});

  useEffect(() => {
    getProfile();
  }, []);
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

        // Function to get organization name by orgId and set orgName
        // function getOrgNameById(id) {
        //   const name = orgKeyValue[id] || "";
        //   setOrgName(name);
        //   return name;
        // }
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  }

  async function getAdminUser(orgId) {
    if (!orgId) {
      console.error("Organization ID is not provided.");
      return;
    }
    const url = `https://localhost:7266/api/User/getUsersByOranizationId/${orgId}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.data)
        ? response.data.data
        : [];

      setRows(data);
    } else {
      console.error("Failed to fetch users:", response.statusText);
    }
  }
  async function getProfile() {
    //this is done with jwt role
    const url = "https://localhost:7266/api/User/profile";
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response.status === 200 && response.data && response.data.data) {
        const organizationId = response.data.data.organizationId;
        getAdminUser(organizationId);
      } else {
        console.error(
          "Failed to fetch profile or data is not in the expected format:",
          response
        );
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
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
      <AddButtonUser />
      <UsersTable
        // role={role}
        rows={rows}
        // getUsers={getProfile}
        // getAdminUser={getAdminUser}
        // getAllUser={
        //   role === "superadmin"
        //     ? getAllUser
        //     : role === "customeradmin"
        //     ? getAdminUser
        //     : getProfile
        // }
        getAllUser={role === "superadmin" ? getAllUser : getAdminUser}
        orgMap={orgMap}
      />
    </div>
  );
};

export default Users;
