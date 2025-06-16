import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Jan/24",
    "Feb/24",
    "Mar/24",
    "Apr/24",
    "May/24",
    "Jun/24",
    "Jul/24",
    "Aug/24",
    "Sept/24",
    "Oct/24",
    "Nov/24",
    "Dec/24",
  ],
  datasets: [
    {
      label: "Electricity - 2024",
      data: [370, 40, 55, 143, 198, 165, 166, 100, 106, 102, 132, 137],
      backgroundColor: "rgba(162, 89, 230, 0.4)",
      borderColor: "#B1A9F9",
      borderWidth: 1,
      borderRadius: 4,
      barPercentage: 0.7,
      categoryPercentage: 0.7,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#888",
        font: { size: 16, weight: "bold" },
        boxWidth: 30,
      },
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Period Length",
        color: "#888",
        font: { size: 12 },
      },
      ticks: { color: "#888", font: { size: 14 } },
      grid: { display: false },
    },
    y: {
      title: {
        display: true,
        text: "Consumption (kWh)",
        color: "#888",
        font: { size: 12 },
      },
      ticks: { color: "#888", font: { size: 14 } },
      grid: { display: false },
      min: 0,
      max: 450,
    },
  },
};

function ReportChart({
  tabValue,
  facilityID,
  selectedQuantities,
  DateValue,
  selectedPeriod,
  selectedFrequency,
}) {
  const [chartData, setChartData] = useState([]);
  const [quantityArray, setQuantityArray] = useState([]);

  useEffect(() => {
    if (tabValue === 0) {
      const qArr = checkQuantity(selectedQuantities);
      qArr.forEach((qid) => {
        updateChartByFacility(qid);
        console.log("Quantity ID:", qid);
      });
    } else {
      updateChartByMeter();
    }
  }, [
    selectedQuantities,
    selectedPeriod,
    selectedFrequency,
    DateValue,
    facilityID,
    tabValue,
  ]);

  async function updateChartByFacility(qid) {
    try {
      const url = "https://localhost:7161/api/MeterReadings/get-meterby-query";
      const periodlength = checkFrequency(selectedFrequency);
      // console.log("Selected Frequency:", selectedFrequency);

      setQuantityArray(checkQuantity(selectedQuantities));
      // console.log("Checked Quantity is ", checkQuantity(selectedQuantities));[1,3]

      const payload = {
        resolution: selectedPeriod,
        periodLength: periodlength,
        facilityId: facilityID,
        quantityId: qid,
        start: DateValue,
      };
      const token = localStorage.getItem("token");
      const response = await axios.post(url, payload, {
        headers: { Authorization: token },
      });
      if (response.status === 200) {
        toast.success("Chart updated successfully!");
        setChartData(response.data);
        console.log("Chart data:", response.data);
      }
    } catch (error) {
      console.error("Error updating chart by facility:", error);
      toast.error("Failed to update chart. Please try again.");
    }
  }
  function checkFrequency(freq) {
    return freq === "Year"
      ? { year: 1 }
      : freq === "Month"
      ? { Month: 1 }
      : freq === "Quarter"
      ? { Month: 3 }
      : freq === "Week"
      ? { week: 1 }
      : { day: 1 };
  }
  // Utility function to map quantity names to IDs
  function checkQuantity(selectedQuantities) {
    const quantityMap = {
      Electricity: 1,
      Water: 2,
      Gas: 3,
    };
    return selectedQuantities.map((q) => quantityMap[q]).filter(Boolean);
  }

  async function updateChartByMeter() {
    try {
      const url = "https://localhost:7161/api/MeterReadings/get-meterby-query";
      const periodlength = checkFrequency(selectedFrequency);
      const quantityId = checkQuantity(selectedQuantities);
      const payload = {
        resolution: { selectedPeriod },
        periodLength: periodlength,
        facilityId: { facilityID },
        quantityId: quantityId,
        start: DateValue,
      };
      const token = localStorage.getItem("token");
      const response = await axios.post(url, payload, {
        headers: { Authorization: token },
      });

      if (response.status === 200) {
        toast.success("Chart updated successfully!");
        setChartData(response.data);
        console.log("Chart data:", response.data);
      }
    } catch (error) {
      console.error("Error updating chart by meter:", error);
      toast.error("Failed to update chart by meter. Please try again.");
    }
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 8,
        padding: 24,
        overflowX: "auto",
      }}
    >
      <div style={{ minWidth: 750, whiteSpace: "nowrap" }}>
        <Bar data={data} options={options} />
        <Bar data={data} options={options} />
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default ReportChart;
