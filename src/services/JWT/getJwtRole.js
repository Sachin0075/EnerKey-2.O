import { toast } from "react-toastify";


export function getJwtRole() {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return (
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
        payload.role ||
        null
      );
    } catch (e) {
        toast.error("Invalid token format. Please log in again.", {
          position: "top-right",
          autoClose: 2000,
        });
      console.error("Invalid token", e);
      return null;
    }
  }
