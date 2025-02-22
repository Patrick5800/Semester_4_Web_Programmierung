export const BASE_URL = "http://localhost:8080";

export async function fetchCustomers() {
    const response = await fetch(`${BASE_URL}/customer`);

    if (!response.ok) {
        throw new Error("Error fetching customers");
    }
    const data = await response.json();
    return data;
}