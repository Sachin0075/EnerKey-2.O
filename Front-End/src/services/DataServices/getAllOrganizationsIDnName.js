import axios from "axios";

const ORG_API_URL = "https://localhost:7162/api/Organization/getallorganizations";

const token = localStorage.getItem('token');
export async function getAllOrganizationsIDnName() {
  try {
    const response = await axios.get(ORG_API_URL, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (response.status === 200) {
      let orgArray = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.data)
        ? response.data.data
        : [];
      // Return object with organizationId as key and name as value
      return orgArray.reduce((acc, org) => {
        acc[org.organizationId] = org.name;
        return acc;
      }, {});
    }
    return {};
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return {};
  }
}


export async function getAllOrganizationsName() {
  try {
    const response = await axios.get(ORG_API_URL, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (response.status === 200) {
      let orgArray = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.data)
        ? response.data.data
        : [];
      // Return array of organization names
      return orgArray.map(org => org.name);
    }
    return [];
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return [];
  }
}


export async function getOrganizationNameById(organizationId) {
  if (!organizationId) return null;
  try {
    const token = localStorage.getItem("token");
    const url = `https://localhost:7162/api/Organization/getorganizationid/${organizationId}`;
    const response = await axios.get(url, {
      headers: { Authorization: `${token}` },
    });
    if (response.status === 200 && response.data && response.data.name) {
      return response.data.name;
    }
    // Some APIs may return the name inside response.data.data
    if (response.data && response.data.data && response.data.data.name) {
      return response.data.data.name;
    }
    return null;
  } catch (error) {
    console.error("Error fetching organization name:", error);
    return null;
  }
}
