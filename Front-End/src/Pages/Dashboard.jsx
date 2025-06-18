import React, { useEffect } from "react";
import ResourceCards from "../components/Dashboard/ResourceCards";
import EnergyDashboard from "../components/Dashboard/EnergyChart";
import { useState } from "react";
import { getAllFacilitiesGroupedByOrgID } from "../services/DataServices/FacilityService";
import { getAllOrganizationsIDnName } from "../services/DataServices/getAllOrganizationsIDnName";
// import axios from "axios";

const Dashboard = ({ name, role }) => {
  const [orgNames, setOrgNames] = useState({});
  const [facilitiesByOrgID, setFacilitiesByOrgID] = useState({});
  const [selectedFacilityID, setSelectedFacilityID] = useState();
  const [frequency, setFrequency] = useState("Month");
  const [quantityId, setquantityId] = useState(1);
  const [facility, setFacility] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orgIds = Object.keys(facilitiesByOrgID);
    if (orgIds.length > 0) {
      const firstOrgId = orgIds[0];
      const firstfacilityid = facilitiesByOrgID[firstOrgId];
      if (firstfacilityid && firstfacilityid.length > 0) {
        setSelectedFacilityID(firstfacilityid[0].facilityId);
      }
    }
  }, [facilitiesByOrgID]);
  useEffect(() => {
    async function fetchFacilitiesAndOrgs() {
      try {
        const grouped = await getAllFacilitiesGroupedByOrgID();
        setFacilitiesByOrgID(grouped);
        console.log("facilitiesByOrgID", grouped);
        // console.log("org is key and array of  facilities", grouped);

        const orgs = await getAllOrganizationsIDnName();
        // console.log("all the organizations without repeat", orgs);

        setOrgNames(orgs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFacilitiesAndOrgs();
  }, []);

  // Show loading state while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ResourceCards
        name={name}
        role={role}
        setSelectedFacilityID={setSelectedFacilityID}
        setquantityId={setquantityId}
        facilitiesByOrgID={facilitiesByOrgID}
        setFacilitiesByOrgID={setFacilitiesByOrgID}
        orgNames={orgNames}
        setOrgNames={setOrgNames}
        facility={facility}
        setFacility={setFacility}
        // fetchgraph={fetchgraph}
      />
      <EnergyDashboard
        selectedFacilityID={selectedFacilityID}
        facilitiesByOrg={facilitiesByOrgID}
        frequency={frequency}
        setFrequency={setFrequency}
        quantityId={quantityId}
        facility={facility}
      />
    </div>
  );
};

export default Dashboard;
