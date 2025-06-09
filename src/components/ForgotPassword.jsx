import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="ml-[400px] mt-[200px] h-[200px] p-10 flex flex-col text-center w-[400px] bg-green-400 rounded">
      <h1>Forgot Password ?</h1>
      <h3>Enter your email and we will send you a new password</h3>
      <input
        type="email"
        required
        placeholder="Enter Email"
        className="border-2"
      />
      <div className="flex justify-around mt-4">
        <Link to="/login">
          <Button className="border rounded text-blue-500 ">Back</Button>
        </Link>
        <Button className="border rounded text-blue-500 ">Submit</Button>
      </div>
    </div>
  );
}

export default ForgotPassword;
