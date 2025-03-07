export const BASE_URL = "http://localhost:8080";

// Helper function to get the Authorization header
function getAuthorizationHeader() {
    const role = localStorage.getItem("role");
    return role ? `Basic ${role}` : "";
}

// Customer APIs
export async function fetchAllCustomers(filters: { name?: string; address?: string } = {}) {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${BASE_URL}/customer/all?${queryParams}`, {
            headers: {
                "Authorization": getAuthorizationHeader(),
            },
        });
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
        const response = await fetch(`${BASE_URL}/customer/${customer_id}`, {
            headers: {
                "Authorization": getAuthorizationHeader(),
            },
        });
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
                "Authorization": getAuthorizationHeader(),
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
                "Authorization": getAuthorizationHeader(),
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
            headers: {
                "Authorization": getAuthorizationHeader(),
            },
        });
        if (!response.ok) {
            throw new Error("Error deleting customer");
        }
    } catch (error) {
        console.error("Error deleting customer:", error);
    }
}

// Offer APIs
export async function fetchAllOffers(filters: { customer_id?: string; name?: string; status?: string } = {}) {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${BASE_URL}/offer/all?${queryParams}`, {
            headers: {
                "Authorization": getAuthorizationHeader(),
            },
        });
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
        const response = await fetch(`${BASE_URL}/offer/${offer_id}/offer`, {
            headers: {
                "Authorization": getAuthorizationHeader(),
            },
        });
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
                "Authorization": getAuthorizationHeader(),
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
                "Authorization": getAuthorizationHeader(),
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

export async function updateOfferStatus(offer_id: number, status: string) {
    try {
        const response = await fetch(`${BASE_URL}/offer/${offer_id}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getAuthorizationHeader(),
            },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) {
            throw new Error("Error updating offer status");
        }
    } catch (error) {
        console.error("Error updating offer status:", error);
    }
}

export async function deleteOffer(offer_id: number) {
    try {
        const response = await fetch(`${BASE_URL}/offer/${offer_id}/delete`, {
            method: "DELETE",
            headers: {
                "Authorization": getAuthorizationHeader(),
            },
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
        const response = await fetch(`${BASE_URL}/comment/all`, {
            headers: {
                "Authorization": getAuthorizationHeader(),
            },
        });
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
        const response = await fetch(`${BASE_URL}/comment/${comment_id}`, {
            headers: {
                "Authorization": getAuthorizationHeader(),
            },
        });
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
                "Authorization": getAuthorizationHeader(),
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
                "Authorization": getAuthorizationHeader(),
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
        const response = await fetch(`${BASE_URL}/comment/${offer_id}/comment`, {
            headers: {
                "Authorization": getAuthorizationHeader(),
            },
        });
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
            headers: {
                "Authorization": getAuthorizationHeader(),
            },
        });
        if (!response.ok) {
            throw new Error("Error deleting comment");
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
    }
}

// Document APIs
export async function fetchDocumentsByOfferId(offer_id: number) {
    try {
        const response = await fetch(`${BASE_URL}/files/${offer_id}`, {
            headers: {
                "Authorization": getAuthorizationHeader(),
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error("Error fetching documents");
        }
        if (!Array.isArray(data)) {
            throw new Error("Expected an array of documents");
        }
        return data;
    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
}

export async function deleteDocument(file_id: number) {
    try {
        const response = await fetch(`${BASE_URL}/files/${file_id}/delete`, {
            method: "DELETE",
            headers: {
                "Authorization": getAuthorizationHeader(),
            },
        });
        if (!response.ok) {
            throw new Error("Error deleting document");
        }
    } catch (error) {
        console.error("Error deleting document:", error);
    }
}

export async function uploadDocument(file: File, offer_id: number) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(`${BASE_URL}/files/upload/${offer_id}`, {
            method: "POST",
            headers: {
                "Authorization": getAuthorizationHeader(),
            },
            body: formData,
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error uploading document: ${errorText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error uploading document:", error);
        return null;
    }
}
