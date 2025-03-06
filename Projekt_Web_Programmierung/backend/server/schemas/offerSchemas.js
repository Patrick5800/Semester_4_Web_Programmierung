export const createOfferOptions = {
    schema: {
        body: {
            type: "object",
            properties: {
                customer_id: { type: "integer" },
                name: { type: "string" },
                price: { type: "number" },
                currency: { type: "string" },
                status: { type: "string", enum: ["Draft", "In Progress", "Active", "On Ice"] },
                hints: { type: "array", items: { type: "string" } },
            },
            required: ["customer_id", "name"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    offer: { $ref: "offerSchema" },
                },
            },
        },
    },
};

export const getOffersOptions = {
    schema: {
        response: {
            200: {
                type: "array",
                items: { $ref: "offerSchema" },
            },
        },
    },
};

export const getOfferByIdOptions = {
    schema: {
        params: {
            type: "object",
            properties: {
                offer_id: { type: "integer" },
            },
            required: ["offer_id"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    offer: { $ref: "offerSchema" },
                },
            },
        },
    },
};

export const updateOfferOptions = {
    schema: {
        params: {
            type: "object",
            properties: {
                offer_id: { type: "integer" },
            },
            required: ["offer_id"],
        },
        body: {
            type: "object",
            properties: {
                customer_id: { type: "integer" },
                name: { type: "string" },
                price: { type: "number" },
                currency: { type: "string" },
                status: { type: "string", enum: ["Draft", "In Progress", "Active", "On Ice"] },
            },
            required: ["customer_id", "name"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    offer: { $ref: "offerSchema" },
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

export const deleteOfferOptions = {
    schema: {
        params: {
            type: "object",
            properties: {
                offer_id: { type: "integer" },
            },
            required: ["offer_id"],
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

export const changeOfferStatusOptions = {
    schema: {
        params: {
            type: "object",
            properties: {
                offer_id: { type: "integer" },
            },
            required: ["offer_id"],
        },
        body: {
            type: "object",
            properties: {
                status: { type: "string", enum: ["Draft", "In Progress", "Active", "On Ice"] },
            },
            required: ["status"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    offer: { $ref: "offerSchema" },
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

export const legacyOfferOptions = {
    schema: {
        body: {
            type: "object",
            properties: {
                xCreatedOn: { type: "string", format: "date-time" },
                xCreatedBy: { type: "string" },
                xOffer: {
                    type: "object",
                    properties: {
                        customerId: { type: "integer" },
                        price: { type: "number" },
                        currency: { type: "string" },
                        state: { type: "string", },
                        name: { type: "string" },
                        hints: { type: "array", items: { type: "string" } },
                    },
                    required: ["customerId", "name", "state"],
                },
            },
            required: ["xCreatedOn", "xCreatedBy", "xOffer"],
        },
        response: {
            201: {
                type: "object",
                properties: {
                    offer: { $ref: "offerSchema" },
                },
            },
            500: {
                type: "object",
                properties: {
                    error: { type: "string" },
                },
            },
        },
    },
};