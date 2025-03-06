export const createCommentOptions = {
    schema: {
        body: {
            type: "object",
            properties: {
                comment_text: { type: "string" },
                offer_id: { type: "integer" },
            },
            required: ["comment_text", "offer_id"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    comment: { $ref: "commentSchema" },
                },
            },
        },
    },
};

export const getCommentsByOfferIdOptions = {
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
                items: { $ref: "commentSchema" },
            },
        },
    },
}

export const getCommentByIdOptions = {
    schema: {
        params: {
            type: "object",
            properties: {
                comment_id: { type: "integer" },
            },
            required: ["comment_id"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    comment: { $ref: "commentSchema" },
                },
            },
        },
    },
};

export const updateCommentOptions = {
    schema: {
        params: {
            type: "object",
            properties: {
                comment_id: { type: "integer" },
            },
            required: ["comment_id"],
        },
        body: {
            type: "object",
            properties: {
                comment_text: { type: "string" },
            },
            required: ["comment_text"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    comment: { $ref: "commentSchema" },
                },
            },
        },
    },
};

export const deleteCommentOptions = {
    schema: {
        params: {
            type: "object",
            properties: {
                comment_id: { type: "integer" },
            },
            required: ["comment_id"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" },
                },
            },
        },
    },
};
