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
import { useEffect, useState } from "react";
import axios from "axios";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const quantityColors = [
  {
    main: "#7C3AED", // Deep purple
    compare: "#5B21B6",
  },
  {
    main: "#0EA5E9", // Sky blue
    compare: "#0369A1",
  },
  {
    main: "#F43F5E", // Rose red
    compare: "#BE123C",
  },
];

function ReportChart({
  tabValue,
  facilityID,
  selectedQuantities,
  inspectionDateValue,
  ComparisonDateValue,
  selectedPeriod,
  selectedFrequency,
  consumptionTargets,
  targetA, // min consumption
  targetB, // max consumption
}) {
  const [allChartData, setAllChartData] = useState([]);
  const [allYMax, setAllYMax] = useState([]);

  function getMonthYearLabel(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString("default", { month: "short", year: "2-digit" });
  }
  function getYear(dateStr) {
    return new Date(dateStr).getFullYear();
  }

  useEffect(() => {
    async function fetchData(qid, startDate) {
      const url = "https://localhost:7161/api/MeterReadings/get-meterby-query";
      const periodlength = checkFrequency(selectedPeriod);
      const payload = {
        resolution: selectedFrequency,
        periodLength: periodlength,
        facilityId: facilityID,
        quantityId: qid,
        start: startDate,
      };
      const token = localStorage.getItem("token");
      const response = await axios.post(url, payload, {
        headers: { Authorization: token },
      });
      if (
        response.status === 200 &&
        response.data &&
        Array.isArray(response.data.consumption)
      ) {
        return response.data;
      }
      return null;
    }

    async function updateAllCharts() {
      if (
        tabValue !== undefined &&
        facilityID &&
        selectedQuantities &&
        selectedQuantities.length > 0 &&
        inspectionDateValue &&
        selectedPeriod &&
        selectedFrequency
      ) {
        const qArr = checkQuantity(selectedQuantities);
        const chartDataArr = [];
        const yMaxArr = [];
        for (let i = 0; i < qArr.length; i++) {
          const mainData = await fetchData(qArr[i], inspectionDateValue);
          let comparisonData = null;
          if (ComparisonDateValue) {
            comparisonData = await fetchData(qArr[i], ComparisonDateValue);
          }
          let allLabels = [];
          if (mainData)
            allLabels = mainData.consumption.map((i) =>
              getMonthYearLabel(i.timestamp)
            );
          if (comparisonData) {
            const compLabels = comparisonData.consumption.map((i) =>
              getMonthYearLabel(i.timestamp)
            );
            allLabels = Array.from(new Set([...allLabels, ...compLabels]));
          }
          allLabels = allLabels.sort((a, b) => {
            const [am, ay] = a.split("/");
            const [bm, by] = b.split("/");
            return (
              new Date(
                `20${ay}`,
                new Date(Date.parse(am + " 1, 2000")).getMonth()
              ) -
              new Date(
                `20${by}`,
                new Date(Date.parse(bm + " 1, 2000")).getMonth()
              )
            );
          });
          const mainMap = mainData
            ? Object.fromEntries(
                mainData.consumption.map((i) => [
                  getMonthYearLabel(i.timestamp),
                  i.consumedValue,
                ])
              )
            : {};
          const compMap = comparisonData
            ? Object.fromEntries(
                comparisonData.consumption.map((i) => [
                  getMonthYearLabel(i.timestamp),
                  i.consumedValue,
                ])
              )
            : {};
          const mainArr = allLabels.map((l) => mainMap[l] ?? 0);
          const compArr = allLabels.map((l) => compMap[l] ?? 0);
          const maxVal = Math.max(...mainArr, ...compArr);
          yMaxArr.push(Math.ceil(maxVal * 1.1));
          const colorSet = quantityColors[i % quantityColors.length];
          const datasets = [
            {
              label: `${selectedQuantities[i]} - ${
                mainData ? getYear(mainData.consumption[0].timestamp) : ""
              }`,
              data: mainArr,
              backgroundColor: colorSet.main,
              borderColor: colorSet.compare,
              borderWidth: 1,
              barPercentage: 0.7,
              categoryPercentage: 0.7,
            },
          ];
          if (comparisonData) {
            datasets.push({
              label: `${selectedQuantities[i]} - ${getYear(
                comparisonData.consumption[0].timestamp
              )}`,
              data: compArr,
              backgroundColor: colorSet.compare,
              borderColor: colorSet.compare,
              borderWidth: 1,
              barPercentage: 0.7,
              categoryPercentage: 0.7,
            });
          }
          chartDataArr.push({
            labels: allLabels,
            datasets,
            quantity: selectedQuantities[i],
          });
        }
        setAllChartData(chartDataArr);
        setAllYMax(yMaxArr);
      }
    }
    updateAllCharts();
  }, [
    selectedQuantities,
    selectedPeriod,
    selectedFrequency,
    inspectionDateValue,
    facilityID,
    tabValue,
    ComparisonDateValue,
  ]);

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

  // X and Y axis config cells
  const xAxisCell = {
    title: {
      display: true,
      text: "Period Length",
      color: "#888",
      font: { size: 12 },
    },
    ticks: { color: "#888", font: { size: 14 } },
    grid: { display: false },
  };

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
        {allChartData.length > 0 ? (
          allChartData.map((cd, idx) => (
            <div key={cd.quantity} style={{ marginBottom: 40 }}>
              <Bar
                data={{ labels: cd.labels, datasets: cd.datasets }}
                options={{
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
                    title: { display: false },
                    tooltip: { enabled: true },
                    annotation: {
                      annotations: {
                        minLine:
                          targetA && targetA !== null
                            ? {
                                type: "line",
                                yMin: targetA,
                                yMax: targetA,
                                borderColor: "green",
                                borderWidth: 2,
                                label: {
                                  content: "Min Consumption",
                                  enabled: true,
                                  position: "end",
                                  color: "green",
                                },
                              }
                            : undefined,
                        maxLine:
                          targetB && targetB !== null
                            ? {
                                type: "line",
                                yMin: targetB,
                                yMax: targetB,
                                borderColor: "red",
                                borderWidth: 2,
                                label: {
                                  content: "Max Consumption",
                                  enabled: true,
                                  position: "end",
                                  color: "red",
                                },
                              }
                            : undefined,
                      },
                    },
                  },
                  scales: {
                    x: xAxisCell,
                    y: {
                      title: {
                        display: true,
                        text: "Consumption (kWh)",
                        color: "#888",
                        font: { size: 12 },
                      },
                      ticks: { color: "#888", font: { size: 14 } },
                      grid: { display: false },
                      beginAtZero: true,
                      max: allYMax[idx],
                    },
                  },
                }}
              />
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", color: "#888" }}>
            No data available
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportChart;
