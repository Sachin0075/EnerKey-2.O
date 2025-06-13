import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

const EditFacility = () => {
  const [value, setValue] = useState({
    name: "",
    streetAddress: "",
    country: "",
    city: "",
    pinCode: "",
    targetA: "",
    targetB: "",
  });

  function next(event) {
    if (event) event.preventDefault();
    setValue((curr) => ({
      ...curr,
      name: curr.name,
      streetAddress: curr.streetAddress,
      country: curr.country,
      city: curr.city,
      pinCode: curr.pinCode,
      targetA: curr.targetA,
      targetB: curr.targetB,
    }));
    updateFacility();
    console.log("Submitted Data:", value);
  }

  const updateFacility = () => {
    // Your update logic here
  };

  return (
    <form>
      <TextField
        label="Name"
        value={value.name}
        onChange={(e) => setValue({ ...value, name: e.target.value })}
      />
      <TextField
        label="Street Address"
        value={value.streetAddress}
        onChange={(e) => setValue({ ...value, streetAddress: e.target.value })}
      />
      <TextField
        label="Country"
        value={value.country}
        onChange={(e) => setValue({ ...value, country: e.target.value })}
      />
      <TextField
        label="City"
        value={value.city}
        onChange={(e) => setValue({ ...value, city: e.target.value })}
      />
      <TextField
        label="Pin Code"
        value={value.pinCode}
        onChange={(e) => setValue({ ...value, pinCode: e.target.value })}
      />
      <TextField
        label="Target A"
        value={value.targetA}
        onChange={(e) => setValue({ ...value, targetA: e.target.value })}
      />
      <TextField
        label="Target B"
        value={value.targetB}
        onChange={(e) => setValue({ ...value, targetB: e.target.value })}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={next}
      >
        Save Changes
      </Button>
    </form>
  );
};

export default EditFacility;