const customerSchema = {
    $id: "customerSchema",
    type: "object",
    properties: {
        customer_id: { type: "integer" },
        name: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        address: { type: "string" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
    },
    required: ["customer_id", "name"]
};

const offerSchema = {
    $id: "offerSchema",
    type: "object",
    properties: {
        offer_id: { type: "integer" },
        customer_id: { type: "integer" },
        name: { type: "string" },
        price: { type: "number" },
        currency: { type: "string" },
        status: { type: "string", enum: ["Draft", "In Progress", "Active", "On Ice"] },
        hints: { type: "array", items: { type: "string" } },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
    },
    required: ["offer_id", "customer_id", "name"]
};

const fileSchema = {
    $id: "fileSchema",
    type: "object",
    properties: {
        file_id: { type: "string" },
        offer_id: { type: "integer" },
        file_name: { type: "string" },
        file_path: { type: "string" },
        uploaded_at: { type: "string", format: "date-time" },
        tags: { type: "array", items: { type: "string" } },
    },
    required: ["file_id", "offer_id", "file_name", "file_path"]
};

const commentSchema = {
    $id: "commentSchema",
    type: "object",
    properties: {
        comment_id: { type: "integer" },
        offer_id: { type: "integer" },
        comment_text: { type: "string" },
        created_by: { type: "string" },
        created_at: { type: "string", format: "date-time" },
    },
    required: ["comment_id", "offer_id", "comment_text"]
};

const tagSchema = {
    $id: "tagSchema",
    type: "object",
    properties: {
        tag_id: { type: "integer" },
        file_id: { type: "integer" },
        tag_name: { type: "string" },
    },
    required: ["tag_id", "file_id", "tag_name"]
};

const taskSchema = {
    $id: "taskSchema",
    type: "object",
    properties: {
        task_id: { type: "integer" },
        status: { type: "string", enum: ["Start", "Pending", "Completed"] },
        payload: { type: "object" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
    },
    required: ["task_id", "status"]
};

export {
    fileSchema,
    customerSchema,
    offerSchema,
    commentSchema,
    tagSchema,
    taskSchema,
};