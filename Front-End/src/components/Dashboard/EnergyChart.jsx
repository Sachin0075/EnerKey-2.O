import React, { useState, useEffect } from "react";
import FrequencyDropDown from "./FrequencyDropDown.jsx";
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
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const token = localStorage.getItem("token");
console.log("Token:", token);

const quantityOptions = [
  { id: 1, label: "Electricity" },
  { id: 2, label: "Water" },
  { id: 3, label: "Gas" },
];
const barColors = {
  Electricity: "rgba(114, 124, 239, 0.7)",
  Water: "rgba(164, 210, 238, 0.7)",
  Gas: "rgba(247, 168, 118, 0.7)",
};

const EnergyDashboard = ({
  frequency,
  setFrequency,
  quantityId,
  // setquantityId,
  selectedFacilityID,
}) => {
  const [loading, setLoading] = useState(true);
  const [barChartData, setBarChartData] = useState(null);
  // Pie chart state
  const [pieChartData, setPieChartData] = useState({
    labels: ["Electricity", "Water", "Gas"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: [
          barColors.Electricity,
          barColors.Water,
          barColors.Gas,
        ],
        borderWidth: 0,
      },
    ],
  });
  const payload = {
    resolution: frequency,
    periodLength: { Year: 1 },
    facilityId: selectedFacilityID,
    start: "2024-06-01T00:00:00.000Z",
    quantityId: quantityId,
  };

  useEffect(() => {
    if (!selectedFacilityID || typeof selectedFacilityID !== "string") return;
    setLoading(true);

    console.log("[EnergyDashboard] Fetching with payload:", payload);
    async function fetchgraph() {
      try {
        const url =
          "https://localhost:7161/api/MeterReadings/get-meterby-query";
        const response = await axios.post(url, payload, {
          headers: { Authorization: `${token}` },
        });
        console.log("[EnergyDashboard] API response:", response.data);
        const apiData = response.data;
        if (apiData && Array.isArray(apiData.consumption)) {
          // Bar chart data
          const labels = apiData.consumption.map((item) => {
            const date = new Date(item.timestamp);
            return date.toLocaleString("default", {
              month: "short",
              year: "2-digit",
            });
          });
          const data = apiData.consumption.map((item) => item.consumedValue);
          // Set color based on selected quantity
          const selectedLabel =
            quantityOptions.find((q) => q.id === quantityId)?.label ||
            "Electricity";
          setBarChartData({
            labels,
            datasets: [
              {
                label: apiData.unit || selectedLabel,
                data,
                backgroundColor: barColors[selectedLabel],
              },
            ],
          });
        } else {
          setBarChartData(null);
          // setPieChartData(null);
        }
      } catch (error) {
        setBarChartData(null);
        // setPieChartData(null);
        console.error("Error fetching graph data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchgraph();
  }, [frequency, quantityId, selectedFacilityID]);

  // Fetch and sum consumption for all quantityIds (1:Electricity, 2:Water, 3:Gas), then render the pie chart with the summed values. The effect runs on frequency or facility change.
  useEffect(() => {
    if (!selectedFacilityID || typeof selectedFacilityID !== "string") return;
    setLoading(true);

    // Helper to fetch and sum for a given quantityId
    const fetchAndSum = async (qId) => {
      const payload = {
        resolution: frequency,
        periodLength: { Year: 1 },
        facilityId: selectedFacilityID,
        start: "2024-06-01T00:00:00.000Z",
        quantityId: qId,
      };
      try {
        const url =
          "https://localhost:7161/api/MeterReadings/get-meterby-query";
        const response = await axios.post(url, payload, {
          headers: { Authorization: `${token}` },
        });
        if (response.data && Array.isArray(response.data.consumption)) {
          return response.data.consumption.reduce(
            (sum, item) => sum + (item.consumedValue || 0),
            0
          );
        }
        return 0;
      } catch (error) {
        toast.error(`Error fetching data for quantityId ${qId}:`, error);
        return;
      }
    };

    async function fetchAllPieData() {
      try {
        const [electricity, water, gas] = await Promise.all([
          fetchAndSum(1),
          fetchAndSum(2),
          fetchAndSum(3),
        ]);
        setPieChartData({
          labels: ["Electricity", "Water", "Gas"],
          datasets: [
            {
              data: [electricity, water, gas],
              backgroundColor: [
                barColors.Electricity,
                barColors.Water,
                barColors.Gas,
              ],
              borderWidth: 0,
            },
          ],
        });
      } catch (error) {
        toast.error("Error fetching pie chart data:", error);
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    }
    fetchAllPieData();
  }, [frequency, selectedFacilityID]);

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
          {/* Skeleton for Bar Chart */}
          {loading ? (
            <Skeleton
              variant="rectangular"
              height={320}
              style={{ borderRadius: 8, marginBottom: 16 }}
            />
          ) : barChartData && barChartData.labels && barChartData.datasets ? (
            <>
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
                <FrequencyDropDown
                  frequency={frequency}
                  setFrequency={setFrequency}
                />
              </div>
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max:
                        barChartData && barChartData.datasets[0].data.length > 0
                          ? Math.max(...barChartData.datasets[0].data, 220)
                          : 220,
                      ticks: {
                        stepSize: 40,
                        color: "#666",
                      },
                      title: {
                        display: true,
                        text: `Consumption (${
                          barChartData && barChartData.datasets[0].label
                        })`,
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
            </>
          ) : (
            <div
              style={{
                height: 320,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#888",
              }}
            >
              No data available for this facility.
            </div>
          )}
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
          {loading ? (
            <Skeleton
              variant="circular"
              width={180}
              height={180}
              style={{ marginBottom: 20 }}
            />
          ) : pieChartData ? (
            <>
              <h4 style={{ marginBottom: 20, textAlign: "center" }}>
                Quantity Usage Percentage
              </h4>
              <Pie
                data={pieChartData}
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
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;
