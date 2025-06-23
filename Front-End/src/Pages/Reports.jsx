import React, { useEffect, useState } from "react";
import SideSelections from "../components/Reports/SideSelections.jsx";
import ReportChart from "../components/Reports/ReportChart.jsx";
import { getAllFacilitiesGroupedByOrgID } from "../services/DataServices/FacilityService";
import { getAllOrganizationsIDnName } from "../services/DataServices/getAllOrganizationsIDnName";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import getProfile from "../services/JWT/getProfile.js";

dayjs.extend(utc);

const periodOptions = {
  Year: ["Year", "Quarter", "Month", "Week"],
  Quarter: ["Quarter", "Month", "Week"],
  Month: ["Month", "Week", "Day"],
  Week: ["Week", "Day"],
};

const Reports = ({ role }) => {
  const [facilityID, setFacilityID] = useState("");
  const [facilitiesByOrg, setFacilitiesByOrg] = useState({});
  const [orgNames, setOrgNames] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [selectQuantity, setSelectQuantity] = useState(true);
  const [selectedQuantities, setSelectedQuantities] = useState(["Electricity"]);
  const [inspectionDateValue, setInspectionDateValue] = useState(
    dayjs().utc().startOf("day").toISOString()
  );
  const [ComparisonDateValue, setComparisonDateValue] = useState(null);
  const [meterOptions, setMeterOptions] = useState([]);
  // const [meterId, setMeterId] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("Year");
  const [selectedFrequency, setSelectedFrequency] = useState("Month");
  const [consumptionTargets, setConsumptionTargets] = useState([]);
  const [selectedMeters, setSelectedMeters] = useState([]);
  const [selectVirtualMeter, setSelectVirtualMeter] = useState(false);

  useEffect(() => {
    if (!periodOptions[selectedPeriod].includes(selectedFrequency)) {
      setSelectedFrequency(periodOptions[selectedPeriod][0]);
    }
  }, [selectedPeriod, selectedFrequency]);

  useEffect(() => {
    async function fetchFacilitiesAndOrgs() {
      const grouped = await getAllFacilitiesGroupedByOrgID();
      setFacilitiesByOrg(grouped);
      const orgs = await getAllOrganizationsIDnName();
      setOrgNames(orgs);
    }
    async function fetchProfile() {
      try {
        const profileOrgID = await getProfile();
        if (profileOrgID) {
          // Only fetch and show facilities for this orgId
          const grouped = await getAllFacilitiesGroupedByOrgID(profileOrgID);
          setFacilitiesByOrg({ [profileOrgID]: grouped[profileOrgID] || [] });
          // Only set orgNames for this orgId
          const orgs = await getAllOrganizationsIDnName();
          setOrgNames(
            orgs && orgs[profileOrgID]
              ? { [profileOrgID]: orgs[profileOrgID] }
              : {}
          );
        } else {
          setFacilitiesByOrg({});
          setOrgNames({});
        }
      } catch (error) {
        console.error("Error fetching profile or facilities:", error);
        setFacilitiesByOrg({});
        setOrgNames({});
      }
    }
    if (role === "superadmin") {
      fetchFacilitiesAndOrgs();
    } else {
      fetchProfile();
    }
  }, []);

  useEffect(() => {
    console.log("tabValue:", tabValue);
  }, [tabValue]);

  const orgIds = Array.isArray(facilitiesByOrg)
    ? facilitiesByOrg
    : Object.keys(facilitiesByOrg);

  const handleFacilityChange = (event) => {
    setFacilityID(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 mt-4 h-screen">
      <SideSelections
        selectVirtualMeter={selectVirtualMeter}
        setSelectVirtualMeter={setSelectVirtualMeter}
        role={role}
        facilityID={facilityID}
        setFacilityID={setFacilityID}
        orgIds={orgIds}
        facilitiesByOrg={facilitiesByOrg}
        orgNames={orgNames}
        tabValue={tabValue}
        setTabValue={setTabValue}
        selectQuantity={selectQuantity}
        setSelectQuantity={setSelectQuantity}
        selectedQuantities={selectedQuantities}
        setSelectedQuantities={setSelectedQuantities}
        inspectionDateValue={inspectionDateValue}
        setInspectionDateValue={setInspectionDateValue}
        ComparisonDateValue={ComparisonDateValue}
        setComparisonDateValue={setComparisonDateValue}
        handleChange={handleFacilityChange}
        setMeterOptions={setMeterOptions}
        meterOptions={meterOptions}
        periodOptions={periodOptions}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedFrequency={selectedFrequency}
        setSelectedFrequency={setSelectedFrequency}
        consumptionTargets={consumptionTargets}
        setConsumptionTargets={setConsumptionTargets}
        selectedMeters={selectedMeters}
        setSelectedMeters={setSelectedMeters}
      />
      <div className=" border-l-2 border-gray-300 h-full"></div>
      <ReportChart
        role={role}
        facilityID={facilityID}
        orgIds={orgIds}
        facilitiesByOrg={facilitiesByOrg}
        orgNames={orgNames}
        tabValue={tabValue}
        selectQuantity={selectQuantity}
        selectedQuantities={selectedQuantities}
        inspectionDateValue={inspectionDateValue}
        ComparisonDateValue={ComparisonDateValue}
        selectedPeriod={selectedPeriod}
        selectedFrequency={selectedFrequency}
        consumptionTargets={consumptionTargets}
        setConsumptionTargets={setConsumptionTargets}
        selectedMeters={selectedMeters}
        meterOptions={meterOptions}
      />
    </div>
  );
};

export default Reports;
