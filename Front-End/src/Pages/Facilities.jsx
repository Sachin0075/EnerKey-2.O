import React from "react";
import FacilityBasicTable from "../components/Facilities/FacilityBasicTable";
import AddButton from "../components/Organization/AddButton";
import AddButtonFacility from "../components/Facilities/Modals/AddButtonFacility";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const Facilities = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
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
      toast.error("Failed to fetch facilities. Please try again later.");
    }
  }
  return (
    <div>
      <AddButtonFacility
        rows={rows}
        loading={loading}
        getAllFacilities={getAllFacilities}
      />
      ;
      <FacilityBasicTable
        rows={rows}
        loading={loading}
        getAllFacilities={getAllFacilities}
      />
    </div>
  );
};

export default Facilities;
