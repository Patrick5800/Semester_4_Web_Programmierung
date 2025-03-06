export const createFileOptions = {
    schema: {
        params: {
            type: "object",
            properties: {
                offer_id: { type: "integer" },
            },
            required: ["offer_id"],
        },
        response: {
            201: {
                type: "object",
                properties: {
                    file: { $ref: "fileSchema" },
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

export const getFilesByOfferIdOptions = {
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
                type: "array",
                items: { $ref: "fileSchema" },
            },
        },
    },
};

export const getFileByIdOptions = {
    schema: {
        params: {
            type: "object",
            properties: {
                file_id: { type: "string" },
            },
            required: ["file_id"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    file: { $ref: "fileSchema" },
                },
            },
        },
    },
};

export const deleteFileOptions = {
    schema: {
        params: {
            type: "object",
            properties: {
                file_id: { type: "string" },
            },
            required: ["file_id"],
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