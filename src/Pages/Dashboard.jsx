import React from "react";
import ResourceCards from "../components/Dashboard/ResourceCards";
import EnergyDashboard from "../components/Dashboard/EnergyChart";

const Dashboard = () => {
  return (
    <div>
      <ResourceCards />
      <EnergyDashboard />
    </div>
  );
};

export default Dashboard;
