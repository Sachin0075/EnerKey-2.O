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
