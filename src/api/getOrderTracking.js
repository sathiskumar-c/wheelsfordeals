// Mock data for Order 
import mockOrderTracking from "../data/order-tracking.json";

// Set to true to use local mock data. Set to false to make a real API call.
const useMock = true;

export const getOrderTrackingDetails = async (orderId) => {
    console.log(`Fetching details for order: ${orderId}`);

    if (useMock) {
        // --- MOCK DATA ---
        console.log("Using mock order tracking data.");
        const dataToReturn = {
            ...mockOrderTracking,
            id: orderId || mockOrderTracking.id,
        };
        return new Promise((resolve) => {
            setTimeout(() => resolve(dataToReturn), 1000);
        });
    } else {
        // --- REAL API CALL ---
        console.log("Fetching order tracking data from API.");
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch order details from API");
        }
        return response.json();
    }
};