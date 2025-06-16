import React, { useEffect, useState } from "react";
import SideSelections from "../components/Reports/SideSelections.jsx";
import ReportChart from "../components/Reports/ReportChart.jsx";
import { getAllFacilitiesGroupedByOrgID } from "../services/DataServices/FacilityService";
import { getAllOrganizationsIDnName } from "../services/DataServices/getAllOrganizationsIDnName";
import dayjs from "dayjs";

const periodOptions = {
  Year: ["Year", "Quarter", "Month", "Week"],
  Quarter: ["Quarter", "Month", "Week"],
  Month: ["Month", "Week", "Day"],
  Week: ["Week", "Day"],
};

const Reports = () => {
  const [facilityID, setFacilityID] = useState("");
  const [facilitiesByOrg, setFacilitiesByOrg] = useState({});
  const [orgNames, setOrgNames] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const [selectQuantity, setSelectQuantity] = useState(true);
  const [selectedQuantities, setSelectedQuantities] = useState(["Electricity"]);
  const [DateValue, setDateValue] = useState(dayjs());
  const [meterOptions, setMeterOptions] = useState([]);
  const [meterId, setMeterId] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("Year");
  const [selectedFrequency, setSelectedFrequency] = useState(
    periodOptions["Year"][0]
  );

  useEffect(() => {
    setSelectedFrequency(periodOptions[selectedPeriod][0]);
  }, [selectedPeriod]);

  useEffect(() => {
    async function fetchFacilitiesAndOrgs() {
      const grouped = await getAllFacilitiesGroupedByOrgID();
      setFacilitiesByOrg(grouped);
      const orgs = await getAllOrganizationsIDnName();
      setOrgNames(orgs);
    }
    fetchFacilitiesAndOrgs();
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
        facilityID={facilityID}
        setFacility={setFacilityID}
        orgIds={orgIds}
        facilitiesByOrg={facilitiesByOrg}
        orgNames={orgNames}
        tabValue={tabValue}
        setTabValue={setTabValue}
        selectQuantity={selectQuantity}
        setSelectQuantity={setSelectQuantity}
        selectedQuantities={selectedQuantities}
        setSelectedQuantities={setSelectedQuantities}
        DateValue={DateValue}
        setDateValue={setDateValue}
        handleChange={handleFacilityChange}
        setMeterOptions={setMeterOptions}
        meterOptions={meterOptions}
        meterId={meterId}
        setMeterId={setMeterId}
        periodOptions={periodOptions}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedFrequency={selectedFrequency}
        setSelectedFrequency={setSelectedFrequency}
      />
      <div className=" border-l-2 border-gray-300 h-full"></div>
      <ReportChart
        facilityID={facilityID}
        orgIds={orgIds}
        facilitiesByOrg={facilitiesByOrg}
        orgNames={orgNames}
        tabValue={tabValue}
        selectQuantity={selectQuantity}
        selectedQuantities={selectedQuantities}
        DateValue={DateValue}
        selectedPeriod={selectedPeriod}
        selectedFrequency={selectedFrequency}
      />
    </div>
  );
};

export default Reports;
