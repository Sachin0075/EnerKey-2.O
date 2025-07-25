import { toast } from "react-toastify";

export function getJwtOrganizationId() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );
    return decoded.organizationId || null;
  } catch (e) {
    toast.error("Invalid token format. Please log in again.");
    console.error("Failed to decode JWT:", e);
    return null;
  }
}
