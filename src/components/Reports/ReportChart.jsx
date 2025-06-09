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

function ReportChart() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 8,
        padding: 24,
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

export default ReportChart;
