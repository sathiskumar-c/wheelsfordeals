import axios from "axios";
import BikeDetails from "../data/bike-details.json";

export const getHomePageData = async (apiBaseUrl) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/bikes`);
    return response.data;
  } catch (error) {
    console.error("API error, using mock data:", error);
    return BikeDetails;
  }
};