import React from "react";
import FacilityBasicTable from "../components/Facilities/FacilityBasicTable";
import AddButton from "../components/Organization/AddButton";
import AddButtonFacility from "../components/Facilities/Modals/AddButtonFacility";

const Facilities = () => {
  return (
    <div>
      <AddButtonFacility />;
      <FacilityBasicTable />
    </div>
  );
};

export default Facilities;
