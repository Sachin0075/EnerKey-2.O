import React from "react";
import SideSelections from "../components/Reports/SideSelections.jsx";
import ReportChart from "../components/Reports/ReportChart.jsx";

const Reports = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 mt-4 h-screen">
      <SideSelections />

      <div className=" border-l-2 border-gray-300 h-full"></div>
      <ReportChart />
    </div>
  );
};

export default Reports;
