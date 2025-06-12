import axios from "axios";

const BASE_URL = "https://localhost:7236/api/Country";

export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetAllCountries`);
    return response.data.map((country) => ({
      id: country.id,
      name: country.name,
      countryCode: country.countryCode,
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

export const getCitiesByCountryId = async (countryId) => {
  try {
    if (!countryId) {
      return [];
    }
    const response = await axios.get(`${BASE_URL}/GetAllCitiesByCountryId/${countryId}`);
    return response.data?.cities?.map(city => city.name) || [];
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
