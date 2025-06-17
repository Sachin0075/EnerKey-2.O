import React, { useEffect, useState } from "react";
import AddButtonUser from "../components/User/AddButtonUser";
import UsersTable from "../components/User/UsersTable";
import axios from "axios";
import NotAuthorized from "../components/NotAuthorized";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Users = ({ role }) => {
  const [rows, setRows] = useState([]);
  const [orgMap, setOrgMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role === "superadmin" || role === "customeradmin") {
      getProfile();
    }
    // eslint-disable-next-line
  }, [role]);

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

  async function getAdminUser(orgId) {
    if (!orgId) {
      console.error("Organization ID is not provided.");
      setLoading(false);
      return;
    }
    const url = `https://localhost:7266/api/User/getUsersByOranizationId/${orgId}`;
    try {
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
        setRows([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setRows([]);
    }
    setLoading(false);
    fetchOrganizationNames();
  }

  async function getProfile() {
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
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
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
      setRows([]);
    }
    fetchOrganizationNames();
    setLoading(false);
  }

  if (role !== "superadmin" && role !== "customeradmin") {
    return <NotAuthorized />;
  }

  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        <Skeleton height={32} width={200} style={{ marginBottom: 16 }} />
        <Skeleton height={40} style={{ marginBottom: 8 }} count={4} />
      </div>
    );
  }

  return (
    <div>
      <AddButtonUser />
      <UsersTable
        rows={rows}
        getAllUser={role === "superadmin" ? getAllUser : getAdminUser}
        orgMap={orgMap}
      />
    </div>
  );
};

export default Users;
