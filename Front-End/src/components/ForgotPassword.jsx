import { Mail, LoaderCircle } from "lucide-react";
import { useState } from "react";
import DummyLogo from "../app-logo";
import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  async function sendMail() {
    try {
      const url = "https://localhost:7266/api/User/reset-password";
      const token = localStorage.getItem("token");
      const response = await axios.post(
        url,
        {
          email: email,
        },
        { headers: { Authorization: token } }
      );
      if (response.status === 200) {
        console.log("Response is ", response.data);
        setLoading(false);
        setSuccess(true);
        toast.success("Email has been sent.");
      }
    } catch (error) {
      toast.error(`Error While Sending Mail. ${error}`);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    sendMail();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <DummyLogo />
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            Forgot your password?
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Enter your email and we’ll send you instructions.
          </p>
        </div>

        {success ? (
          <div className="text-center text-green-600 font-medium mb-4">
            ✅ Email has been sent. Please check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border px-4 py-2 pl-10 text-sm shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {error && (
                <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-white font-medium transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
            >
              {loading ? (
                <LoaderCircle size={18} className="animate-spin mr-2" />
              ) : null}
              {loading ? "Sending..." : "Reset Password"}
            </button>
          </form>
        )}

        <Button className="mt-6 text-center">
          <Link
            to={"/login"}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ⬅ Back to Login
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
