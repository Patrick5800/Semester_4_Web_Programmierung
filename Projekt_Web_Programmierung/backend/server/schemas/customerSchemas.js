// Diese Routen sind teilweise KI-generiert, da sie sich sehr ähneln.
// Die OfferSchemas sind die Schemas, die für die Offer-Routen verwendet werden.

const createCustomerOptions = {
    schema: {
        body: {
            type: "object",
            properties: {
                name: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                address: { type: "string" },
            },
            required: ["name", "email"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    customer: { $ref: "customerSchema" },
                },
            },
        },
    },
};

const getCustomersOptions = {
    schema: {
        querystring: {
            type: "object",
            properties: {
                name: { type: "string" },
                address: { type: "string" },
            },
        },
        response: {
            200: {
                type: "array",
                items: { $ref: "customerSchema" },
            },
        },
    },
};

const getCustomerByIdOptions = {
    schema: {
        params: {
            type: "object",
            properties: {
                customer_id: { type: "integer" },
            },
            required: ["customer_id"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    customer: { $ref: "customerSchema" },
                },
            },
        },
    },
};

const updateCustomerOptions = {
    schema: {
        params: {
            type: "object",
            properties: {
                customer_id: { type: "integer" },
            },
            required: ["customer_id"],
        },
        body: {
            type: "object",
            properties: {
                name: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                address: { type: "string" },
            },
            required: ["name", "email"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    customer: { $ref: "customerSchema" },
                },
            },
            400: {
                type: "object",
                properties: {
                    error: { type: "string" },
                },
            },
        },
    },
};

const deleteCustomerOptions = {
    schema: {
        params: {
            type: "object",
            properties: {
                customer_id: { type: "integer" },
            },
            required: ["customer_id"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                },
            },
            400: {
                type: "object",
                properties: {
                    error: { type: "string" },
                },
            },
        },
    },
};

export {
    createCustomerOptions,
    getCustomersOptions,
    getCustomerByIdOptions,
    updateCustomerOptions,
    deleteCustomerOptions,
};