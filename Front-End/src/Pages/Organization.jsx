import React from "react";
import BasicTable from "../components/Organization/BasicTable";
import NotAuthorized from "../components/NotAuthorized";

const Organization = ({ role }) => {
  return (
    <div>{role !== "superadmin" ? <NotAuthorized /> : <BasicTable />}</div>
  );
};

export default Organization;
