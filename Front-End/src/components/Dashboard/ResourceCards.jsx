import React from "react";
import { Zap, Droplet, Flame } from "lucide-react";
import FacilityDropDown from "./FacilityDropDown";

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

const ResourceCards = () => {
  return (
    <>
      <div className=" flex  justify-around gap-96 mt-6 ! ">
        <h1 className="text-2xl text-[rgb(51,104,192)] mr-52 ">Hi, Sachin</h1>
        <div>
          <FacilityDropDown />
        </div>
      </div>
      <div className="flex gap-6 justify-center items-start ">
        <div>
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
        </div>
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
      </div>
    </>
  );
};

export default ResourceCards;
