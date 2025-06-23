import React, { useEffect } from "react";
import FacilityBasicTable from "../components/Facilities/FacilityBasicTable";
import AddButton from "../components/Organization/AddButton";
import AddButtonFacility from "../components/Facilities/Modals/AddButtonFacility";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import getProfile from "../services/JWT/getProfile";
import { getAllOrganizationsIDnName } from "../services/DataServices/getAllOrganizationsIDnName";

const Facilities = ({ role }) => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [OrgName, setOrgName] = useState("");
  const [orgIdNameMap, setOrgIdNameMap] = useState({});

  useEffect(() => {
    async function fetchOrgNames() {
      const map = await getAllOrganizationsIDnName();
      setOrgIdNameMap(map);
    }
    fetchOrgNames();
  }, []);

  // useEffect(() => {
  //   getprofile();
  // });
  async function getAllFacilities() {
    setLoading(true);
    const token = localStorage.getItem("token");
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
      toast.error("Failed to fetch facilities. Please try again later.", {
        position: "top-right",
        autoClose: 2000,
        style: { background: "#f44336", color: "#fff" },
      });
    }
  }
  async function getAdminFacilities() {
    const orgID = await getProfile();
    setLoading(true);
    const token = localStorage.getItem("token");
    const url = `https://localhost:7108/api/Facility/getFacilitiesByOrganizationId/${orgID}`;
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
      toast.error("Failed to fetch facilities. Please try again later.", {
        position: "top-right",
        autoClose: 2000,
        style: { background: "#f44336", color: "#fff" },
      });
    }
  }
  async function getUserFacilities() {
    const orgID = await getProfile();
    setLoading(true);
    const token = localStorage.getItem("token");
    const url = `https://localhost:7108/api/Facility/getFacilitiesByOrganizationId/${orgID}`;
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
      toast.error("Failed to fetch facilities. Please try again later.", {
        position: "top-right",
        autoClose: 2000,
        style: { background: "#f44336", color: "#fff" },
      });
    }
  }

  return (
    <div>
      {role === "superadmin" || role === "customeradmin" ? (
        <AddButtonFacility
          OrgName={OrgName}
          setOrgName={setOrgName}
          rows={rows}
          role={role}
          loading={loading}
          getAllFacilities={
            role === "superadmin"
              ? getAllFacilities
              : role === "customeradmin"
              ? getAdminFacilities
              : getUserFacilities
          }
        />
      ) : (
        <>
          <br />
          <br />
        </>
      )}

      <FacilityBasicTable
        role={role}
        rows={rows}
        loading={loading}
        getAllFacilities={
          role === "superadmin"
            ? getAllFacilities
            : role === "customeradmin"
            ? getAdminFacilities
            : getUserFacilities
        }
        OrgName={OrgName}
        setOrgName={setOrgName}
        orgIdNameMap={orgIdNameMap}
      />
    </div>
  );
};

export default Facilities;
