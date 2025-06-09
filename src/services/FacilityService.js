import axios from "axios";

const Fac_API_URL = "https://localhost:7108/api/Facility/getAllFacilities";

const token = import.meta.env.VITE_TOKEN_KEY;
export async function getAllOrganizations() {
    try {
        const response = await axios.get(Fac_API_URL, {
            headers: {
                Authorization: `${token}`,
            },
        });
        if (response.status === 200) {
            const orgArray = Array.isArray(response.data)
                ? response.data
                : Array.isArray(response.data.data)
                ? response.data.data
                : [];
            return orgArray;
        }
        return [];
    } catch (error) {
        console.error("Error fetching Facility:", error);
        return [];
    }
}

export async function getAllFacilitiesGroupedByOrg() {
  try {
    const response = await axios.get(Fac_API_URL, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (response.status === 200) {
      const facArray = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.data)
        ? response.data.data
        : [];
      // Group by organizationId and store only facility name
      const grouped = facArray.reduce((acc, fac) => {
        if (!acc[fac.organizationId]) {
          acc[fac.organizationId] = [];
        }
        acc[fac.organizationId].push(fac.name);
        return acc;
      }, {});
      return grouped;
    }
    return {};
  } catch (error) {
    console.error("Error fetching Facility:", error);
    return {};
  }
}
