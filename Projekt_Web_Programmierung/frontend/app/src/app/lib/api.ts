export const BASE_URL = "http://localhost:8080";

export async function fetchAllCustomers() {
    try {
        const response = await fetch(`${BASE_URL}/customer/all`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error("Error fetching customers");
        } 
        if (!Array.isArray(data)) {
            throw new Error("Expected an array of customers");
        }
        return data;
    } catch (error) {
        console.error("Error fetching customers:", error);
        return [];
    }
}

export async function fetchAllOffers() {
    try {
        const response = await fetch(`${BASE_URL}/offer/all`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error("Error fetching offers");
        }
        if (!Array.isArray(data)) {
            throw new Error("Expected an array of offers");
        }
        return data;
    } catch (error) {
        console.error("Error fetching offers:", error);
        return [];
    }
}

export async function fetchCustomerById(customer_id: number) {
    try {
        const response = await fetch(`${BASE_URL}/customer/${customer_id}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error("Error fetching customer");
        }
        return data;
    } catch (error) {
        console.error("Error fetching customer:", error);
        return null;
    }
}

export async function fetchOfferById(offer_id: number) {
    try {
        const response = await fetch(`${BASE_URL}/offer/${offer_id}/offer`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error("Error fetching offer");
        }
        return data;
    } catch (error) {
        console.error("Error fetching offer:", error);
        return null;
    }
}