import axios from "axios";

const Fac_API_URL = "https://localhost:7108/api/Facility/getAllFacilities";

const token = localStorage.getItem('token');
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

export async function getAllFacilitiesGroupedByOrgID() {
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
        : [];      // Group by organizationId and store array of { facilityId, name }
      const grouped = facArray.reduce((acc, fac) => {
        if (!acc[fac.organizationId]) {
          acc[fac.organizationId] = [];
        }
        acc[fac.organizationId].push({
          facilityId: fac.facilityId,
          name: fac.name
        });
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


export async function getFacilityByOrganizationId(organizationID) {
  try {
    const url=`https://localhost:7108/api/Facility/getFacilitiesByOrganizationId/${organizationID}`
    const response = await axios.get(url, {
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
      // Map to only facilityId and name
      return facArray.map(fac => ({
        facilityId: fac.facilityId,
        name: fac.name
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching FacilityId-Name map:", error);
    return [];
  }
}