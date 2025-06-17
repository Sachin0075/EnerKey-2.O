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
  selectedMeters, // <-- add this prop
  inspectionDateValue,
  ComparisonDateValue,
  selectedPeriod,
  selectedFrequency,
  consumptionTargets,
  setConsumptionTargets,
  meterOptions = [], // <-- add default for meterOptions
}) {
  const [allChartData, setAllChartData] = useState([]);
  const [allYMax, setAllYMax] = useState([]);
  const [targetA, setTargetA] = useState(0);
  const [targetB, setTargetB] = useState(0);

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
        setTargetA(response.data.targetA);
        setTargetB(response.data.targetB);
        return response.data;
      }
      return null;
    }
    async function fetchDataByMeter(meterId, startDate) {
      const url = "https://localhost:7161/api/MeterReadings/get-meterby-query";
      const periodlength = checkFrequency(selectedPeriod);
      const payload = {
        resolution: selectedFrequency,
        periodLength: periodlength,
        facilityId: facilityID,
        meterId: meterId,
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
        setTargetA(response.data.targetA);
        setTargetB(response.data.targetB);
        return response.data;
      }
      return null;
    }

    async function updateAllCharts() {
      console.log("Consumptons are", consumptionTargets);

      if (
        tabValue !== undefined &&
        facilityID &&
        ((selectedQuantities && selectedQuantities.length > 0) ||
          (selectedMeters && selectedMeters.length > 0)) &&
        inspectionDateValue &&
        selectedPeriod &&
        selectedFrequency
      ) {
        let chartDataArr = [];
        let yMaxArr = [];
        if (selectedQuantities && selectedQuantities.length > 0) {
          const qArr = checkQuantity(selectedQuantities);
          for (let i = 0; i < qArr.length; i++) {
            const mainData = await fetchData(qArr[i], inspectionDateValue);
            let comparisonData = null;
            if (ComparisonDateValue) {
              comparisonData = await fetchData(qArr[i], ComparisonDateValue);
            }

            let allLabels = [];
            if (mainData)
              allLabels = mainData.consumption.map((i) =>
                getLabelForXAxis(i.timestamp)
              );
            if (comparisonData) {
              const compLabels = comparisonData.consumption.map((i) =>
                getLabelForXAxis(i.timestamp)
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
                    getLabelForXAxis(i.timestamp),
                    i.consumedValue,
                  ])
                )
              : {};
            const compMap = comparisonData
              ? Object.fromEntries(
                  comparisonData.consumption.map((i) => [
                    getLabelForXAxis(i.timestamp),
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
        }
        if (selectedMeters && selectedMeters.length > 0) {
          for (let i = 0; i < selectedMeters.length; i++) {
            const mainData = await fetchDataByMeter(
              selectedMeters[i],
              inspectionDateValue
            );
            let comparisonData = null;
            if (ComparisonDateValue) {
              comparisonData = await fetchDataByMeter(
                selectedMeters[i],
                ComparisonDateValue
              );
            }
            // Find meter name from meterOptions
            let meterName = selectedMeters[i];
            if (Array.isArray(meterOptions)) {
              const found = meterOptions.find(
                (m) => String(m.id) === String(selectedMeters[i])
              );
              if (found && found.name) meterName = found.name;
            }
            let allLabels = [];
            if (mainData)
              allLabels = mainData.consumption.map((i) =>
                getLabelForXAxis(i.timestamp)
              );
            if (comparisonData) {
              const compLabels = comparisonData.consumption.map((i) =>
                getLabelForXAxis(i.timestamp)
              );
              allLabels = Array.from(new Set([...allLabels, ...compLabels]));
            }
            allLabels = allLabels.sort();
            const mainMap = mainData
              ? Object.fromEntries(
                  mainData.consumption.map((i) => [
                    getLabelForXAxis(i.timestamp),
                    i.consumedValue,
                  ])
                )
              : {};
            const compMap = comparisonData
              ? Object.fromEntries(
                  comparisonData.consumption.map((i) => [
                    getLabelForXAxis(i.timestamp),
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
                label: `Meter - ${meterName}${
                  mainData
                    ? " - " + getYear(mainData.consumption[0].timestamp)
                    : ""
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
                label: `Meter - ${meterName} - ${getYear(
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
              meter: meterName,
            });
          }
        }
        setAllChartData(chartDataArr);
        setAllYMax(yMaxArr);
      }
    }
    updateAllCharts();
  }, [
    selectedQuantities,
    selectedMeters,
    selectedPeriod,
    selectedFrequency,
    inspectionDateValue,
    facilityID,
    tabValue,
    ComparisonDateValue,
    consumptionTargets,
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
  function getXAxisLabel(period, frequency) {
    if (period === "Year" && frequency === "Month") return "Month";
    if (period === "Year" && frequency === "Quarter") return "Quarter";
    if (period === "Year" && frequency === "Week") return "Week";
    if (period === "Year" && frequency === "Year") return "Year";
    if (period === "Quarter" && frequency === "Month") return "Month";
    if (period === "Quarter" && frequency === "Week") return "Week";
    if (period === "Quarter" && frequency === "Quarter") return "Quarter";
    if (period === "Month" && frequency === "Week") return "Week";
    if (period === "Month" && frequency === "Day") return "Day";
    if (period === "Month" && frequency === "Month") return "Month";
    if (period === "Week" && frequency === "Day") return "Day";
    if (period === "Week" && frequency === "Week") return "Week";
    return frequency;
  }
  const xAxisCell = {
    title: {
      display: true,
      text: getXAxisLabel(selectedPeriod, selectedFrequency),
      color: "#888",
      font: { size: 12 },
    },
    ticks: { color: "#888", font: { size: 14 } },
    grid: { display: false },
  };

  function getLabelForXAxis(dateStr) {
    const date = new Date(dateStr);
    if (selectedFrequency === "Day") {
      // Show just the day of the month, zero-padded
      return date.toLocaleString("default", { day: "2-digit" });
    } else if (selectedFrequency === "Month") {
      return date.toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });
    } else if (selectedFrequency === "Week") {
      // Show week number and year short
      const week = getWeekNumber(date);
      const yearShort = date.getFullYear().toString().slice(-2);
      return `W${week}/${yearShort}`;
    } else if (selectedFrequency === "Quarter") {
      const quarter = Math.floor(date.getMonth() / 3) + 1;
      const yearShort = date.getFullYear().toString().slice(-2);
      return `Q${quarter}/${yearShort}`;
    } else if (selectedFrequency === "Year") {
      return date.getFullYear().toString();
    }
    return dateStr;
  }
  function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
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
                          consumptionTargets &&
                          consumptionTargets.includes("targetA") &&
                          targetA
                            ? {
                                type: "line",
                                yMin: targetA,
                                yMax: targetA,
                                borderColor: "green",
                                borderWidth: 2,
                                label: {
                                  content: `Min Consumption: ${targetA}`,
                                  enabled: true,
                                  position: "end",
                                  color: "green",
                                },
                              }
                            : undefined,
                        maxLine:
                          consumptionTargets &&
                          consumptionTargets.includes("targetB") &&
                          targetB
                            ? {
                                type: "line",
                                yMin: targetB,
                                yMax: targetB,
                                borderColor: "red",
                                borderWidth: 2,
                                label: {
                                  content: `Max Consumption: ${targetB}`,
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
                      max: Math.max(
                        allYMax[idx],
                        consumptionTargets.includes("targetB") && targetB
                          ? targetB * 1.1
                          : 0
                      ),
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
