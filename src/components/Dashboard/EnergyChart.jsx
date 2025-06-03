import React from "react";
import MonthDropDown from "./MonthDropDown.jsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const electricityData = {
  labels: [
    "May/24",
    "Jun/24",
    "Jul/24",
    "Aug/24",
    "Sept/24",
    "Oct/24",
    "Nov/24",
    "Dec/24",
    "Jan/25",
    "Feb/25",
    "Mar/25",
    "Apr/25",
  ],
  datasets: [
    {
      label: "Electricity",
      data: [200, 165, 168, 100, 105, 102, 135, 140, 0, 0, 0, 0],
      backgroundColor: "rgba(114, 124, 239, 0.7)",
    },
  ],
};

const pieData = {
  labels: ["Electricity", "Water", "Gas"],
  datasets: [
    {
      data: [45, 27, 28],
      backgroundColor: [
        "rgba(114, 124, 239, 0.7)", // purple
        "rgba(164, 210, 238, 0.7)", // light blue
        "rgba(247, 168, 118, 0.7)", // light orange
      ],
      borderWidth: 0,
    },
  ],
};

const EnergyDashboard = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: 20,
        margin: "auto",
        marginLeft: 10,
      }}
    >
      <div className="h-96 " style={{ display: "flex", gap: 5 }}>
        <div
          style={{
            background: "white",
            borderRadius: 10,
            padding: 20,
            flex: 1,
            boxShadow: "0 0 10px #f0f0f0",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 20,
              marginLeft: 10,
            }}
          ></div>
          <div className="flex pl-40 justify-start items-center gap-15">
            <div>Consumption of past 12 months</div>
            <MonthDropDown />
          </div>

          <Bar
            data={electricityData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 220,
                  ticks: {
                    stepSize: 40,
                    color: "#666",
                  },
                  title: {
                    display: true,
                    text: "Consumption (kWh)",
                    font: {
                      weight: "bold",
                    },
                  },
                  grid: {
                    display: false, // Hide Y-axis grid lines
                  },
                },
                x: {
                  ticks: {
                    color: "#666",
                  },
                  title: {
                    display: true,
                    text: "Period Length",
                    font: {
                      weight: "bold",
                    },
                  },
                  grid: {
                    display: false, // Hide X-axis grid lines
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                  labels: {
                    color: "#888",
                    font: {
                      weight: "600",
                    },
                  },
                },
                tooltip: {
                  enabled: true,
                },
              },
            }}
            className="h-70! pl-10!"
          />
        </div>
        {/* Pie Chart Section */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: 20,
            flexBasis: 300,
            boxShadow: "0 0 10px #f0f0f0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <h4 style={{ marginBottom: 20, textAlign: "center" }}>
            Quantity Usage Percentage
          </h4>

          <Pie
            data={pieData}
            options={{
              responsive: true,
              cutout: "60%", // Makes it a donut chart
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    color: "#888",
                    font: {
                      weight: "600",
                    },
                    usePointStyle: true,
                    boxWidth: 24,
                    boxHeight: 16,
                    padding: 24,
                  },
                },
                tooltip: {
                  enabled: true,
                  titleFont: { weight: "bold" },
                  bodyFont: { weight: "bold" },
                  bodyColor: "#222",
                  backgroundColor: "#fff",
                  borderColor: "#888",
                  borderWidth: 1,
                  displayColors: true,
                  callbacks: {
                    label: function (context) {
                      return ` ${context.label}  ${context.parsed}`;
                    },
                  },
                },
                title: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;
