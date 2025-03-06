export const BASE_URL = "http://localhost:8080";

// Customer APIs
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

export async function createCustomer(customer: any) {
    try {
        const response = await fetch(`${BASE_URL}/customer/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customer),
        });
        if (!response.ok) {
            throw new Error("Error creating customer");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating customer:", error);
        return null;
    }
}

export async function updateCustomer(customer_id: number, customer: any) {
    try {
        const response = await fetch(`${BASE_URL}/customer/${customer_id}/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customer),
        });
        if (!response.ok) {
            throw new Error("Error updating customer");
        }
    } catch (error) {
        console.error("Error updating customer:", error);
    }
}

export async function deleteCustomer(customer_id: number) {
    try {
        const response = await fetch(`${BASE_URL}/customer/${customer_id}/delete`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error deleting customer");
        }
    } catch (error) {
        console.error("Error deleting customer:", error);
    }
}

// Offer APIs
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

export async function createOffer(offer: any) {
    try {
        const response = await fetch(`${BASE_URL}/offer/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(offer),
        });
        if (!response.ok) {
            throw new Error("Error creating offer");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating offer:", error);
        return null;
    }
}

export async function updateOffer(offer_id: number, offer: any) {
    try {
        const response = await fetch(`${BASE_URL}/offer/${offer_id}/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(offer),
        });
        if (!response.ok) {
            throw new Error("Error updating offer");
        }
    } catch (error) {
        console.error("Error updating offer:", error);
    }
}

export async function deleteOffer(offer_id: number) {
    try {
        const response = await fetch(`${BASE_URL}/offer/${offer_id}/delete`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error deleting offer");
        }
    } catch (error) {
        console.error("Error deleting offer:", error);
    }
}

// Comment APIs
export async function fetchAllComments() {
    try {
        const response = await fetch(`${BASE_URL}/comment/all`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error("Error fetching comments");
        }
        if (!Array.isArray(data)) {
            throw new Error("Expected an array of comments");
        }
        return data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
}

export async function fetchCommentById(comment_id: number) {
    try {
        const response = await fetch(`${BASE_URL}/comment/${comment_id}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error("Error fetching comment");
        }
        return data;
    } catch (error) {
        console.error("Error fetching comment:", error);
        return null;
    }
}

export async function createComment(comment: any) {
    try {
        const response = await fetch(`${BASE_URL}/comment/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        });
        if (!response.ok) {
            throw new Error("Error creating comment");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating comment:", error);
        return null;
    }
}

export async function updateComment(comment_id: number, comment: any) {
    try {
        const response = await fetch(`${BASE_URL}/comment/${comment_id}/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        });
        if (!response.ok) {
            throw new Error("Error updating comment");
        }
    } catch (error) {
        console.error("Error updating comment:", error);
    }
}

export async function getCommentsByOfferId(offer_id: number) {
    try {
        const response = await fetch(`${BASE_URL}/comment/${offer_id}/comment`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error("Error fetching comments by offer id");
        }
        return data;
    } catch (error) {
        console.error("Error fetching comments by offer id:", error);
        return [];
    }
}

export async function deleteComment(comment_id: number) {
    try {
        const response = await fetch(`${BASE_URL}/comment/${comment_id}/delete`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error deleting comment");
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
    }
}
