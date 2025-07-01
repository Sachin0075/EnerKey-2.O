import axios from "axios";
import { toast } from "react-toastify";
import { isTokenExpired } from "./isTokenExpired";

export default async function getProfile() {
  const url = "https://localhost:7266/api/User/profile";
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("No token found. Please log in again.");
    return null;
  }
  if (isTokenExpired(token)) return null;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (response.status === 200 && response.data && response.data.data) {
      const organizationId = response.data.data.organizationId;
      return organizationId;
    } else {
      toast.error(
        "Failed to fetch profile or data is not in the expected format:",
        response
      );
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}
