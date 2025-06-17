import React, { useEffect, useState } from "react";

const ReportChart = () => {
  const [data, setData] = useState(null);
  const [currentQuantity, setCurrentQuantity] = useState(1); // Assuming 1 is the default quantity

  useEffect(() => {
    // Fetch or calculate your data here
    const fetchData = async () => {
      // ...existing code to fetch data...
      setData(fetchedData);
    };

    fetchData();
  }, []); // Add a dependency array here. Use [] if it should run only once, or [dep1, dep2] for specific dependencies.

  // For the useEffect causing the error (around line 87):
  useEffect(() => {
    // If you're setting state here based on some data:
    if (someConditionThatShouldTriggerUpdate) {
      // Only set state when needed
      setYourState(newValue);
    }

    // If you're logging "Consumptons are []" here, ensure it's conditional
    console.log("Consumptons are []"); // This might be causing renders if it updates on each render

    // Add stable dependencies or empty array if it should only run once
  }, []); // Empty array if this should run once, or add specific stable dependencies

  const handleQuantityChange = (newQuantity) => {
    // Only update if actually changed
    if (newQuantity !== currentQuantity) {
      setCurrentQuantity(newQuantity);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const { array } = data; // Destructure array from data

  return (
    <div>
      {/* Render your chart with the fetched data */}
      {array.map((item, index) => (
        <Element
          key={index} // Using index as key (only when items won't be reordered)
          // ...existing props...
        />
      ))}
    </div>
  );
};

export default ReportChart;
