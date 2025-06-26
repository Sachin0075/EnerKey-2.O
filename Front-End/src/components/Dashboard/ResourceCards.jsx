import React from "react";
import FacilityDropDown from "./FacilityDropDown";
import { Box, ButtonBase } from "@mui/material";

const ResourceCard = ({ icon: Icon, label, color, bgColor, iconColor }) => {
  return (
    <div
      className={`flex items-start  justify-center gap-1.5 p-4 mt-10  w-40 rounded-xl text-shadow-s ${bgColor} hover:scale-105 transition-transform duration-500 ease-out`}
    >
      <span className={`text-lg font-medium ${color}`}>{label}</span>
      {Icon && <Icon className={`w-6 h-6 ${iconColor}`} />}
    </div>
  );
};

export function sum(a, b) {
  return a + b;
}

const ResourceCards = ({
  facilitiesByOrgID,
  setFacilitiesByOrg,
  setquantityId,
  orgNames,
  setOrgNames,
  facility,
  setFacility,
  fetchgraph,
  setSelectedFacilityID,
  quantityId, // <-- add this prop
  name,
  role,
}) => {
  return (
    <>
      <div className=" flex  justify-around gap-96 mt-6 ! ">
        <h1 className="text-2xl text-[rgb(51,104,192)] mr-52 ">Hi, {name}</h1>
        <div>
          <FacilityDropDown
            role={role}
            setSelectedFacilityID={setSelectedFacilityID}
            facilitiesByOrgID={facilitiesByOrgID}
            setFacilitiesByOrg={setFacilitiesByOrg}
            orgNames={orgNames}
            setOrgNames={setOrgNames}
            facility={facility}
            setFacility={setFacility}
            fetchgraph={fetchgraph}
          />
        </div>
      </div>{" "}
      <Box className="flex gap-6 justify-center items-start ">
        <ButtonBase
          onClick={() => {
            setquantityId(1);
          }}
          disableRipple
          sx={{
            backgroundColor: quantityId === 1 ? "#9EA0F0" : "transparent",
            boxShadow: quantityId === 1 ? "0 2px 8px #e0e0ff" : "none",
            borderRadius: 2,
            pointerEvents: quantityId === 1 ? "none" : "auto",
            transition: "all 0.2s",
          }}
        >
          <ResourceCard
            icon={() => (
              <i
                className="fa-solid fa-bolt text-xl "
                style={{ color: "white" }}
              ></i>
            )}
            label="Electricity"
            color="text-white"
            bgColor="bg-[#9EA0F0]"
            iconColor="text-white"
          />
        </ButtonBase>
        <ButtonBase
          onClick={() => {
            setquantityId(2);
          }}
          disableRipple
          sx={{
            backgroundColor: quantityId === 2 ? "#D8EFFE" : "transparent",
            boxShadow: quantityId === 2 ? "0 2px 8px #b3e0ff" : "none",
            borderRadius: 2,
            pointerEvents: quantityId === 2 ? "none" : "auto",
            transition: "all 0.2s",
          }}
        >
          <ResourceCard
            icon={() => (
              <i
                className="fa-solid fa-droplet text-2xl"
                style={{ color: "skyblue" }}
              ></i>
            )}
            label="Water"
            color="text-[#1B5E85]"
            bgColor="bg-[#D8EFFE]"
            iconColor="text-[#1B5E85]"
          />
        </ButtonBase>
        <ButtonBase
          onClick={() => {
            setquantityId(3);
          }}
          disableRipple
          sx={{
            backgroundColor: quantityId === 3 ? "#FFE9DC" : "transparent",
            boxShadow: quantityId === 3 ? "0 2px 8px #ffd6c2" : "none",
            borderRadius: 2,
            pointerEvents: quantityId === 3 ? "none" : "auto",
            transition: "all 0.2s",
          }}
        >
          <ResourceCard
            icon={() => (
              <i
                className="fa-solid fa-fire-flame-curved text-2xl"
                style={{ color: "salmon" }}
              ></i>
            )}
            label="Gas"
            color="text-[#E2543E]"
            bgColor="bg-[#FFE9DC]"
            iconColor="text-[#E2543E]"
          />
        </ButtonBase>
      </Box>
    </>
  );
};

export default ResourceCards;
