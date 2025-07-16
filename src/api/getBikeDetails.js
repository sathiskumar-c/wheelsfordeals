// Import mock JSON
import BikedetailsMock from "../data/bike-details.json";

const useMock = true; // Change this to false to use real API

// Real API fetch function
const fetchBikeDetailsFromAPI = async () => {
  const response = await fetch("https://your-api-endpoint.com/bikes");
  if (!response.ok) {
    throw new Error("Failed to fetch bike details from API");
  }
  const data = await response.json();
  return data;
};

export const getBikeDetails = async () => {
  if (useMock) {
    console.log("Using mock bike details");
    return BikedetailsMock;
  } else {
    console.log("Fetching bike details from real API");
    return await fetchBikeDetailsFromAPI();
  }
};
