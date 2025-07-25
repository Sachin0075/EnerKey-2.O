import { toast } from "react-toastify";

export function isTokenExpired(token) {
  if (typeof token !== "string") return true; // if token is not a string, consider it expired
  if (token === null || token === undefined || token === "") {
    return true;
  }
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000); // in seconds
    return payload.exp < currentTime;
  } catch (e) {
    toast.error("Invalid token format. Please log in again.", {
      position: "top-right",
      autoClose: 2000,
    });
    console.error("Invalid token", e);
    return true;
  }
}
