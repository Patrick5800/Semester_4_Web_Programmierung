import fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart"; // Import the multipart plugin

import {
    customerRoutes,
    offerRoutes,
    commentRoutes,
    fileRoutes, // Import the file routes
    testRoutes
} from "./routes/routes.js";

import {
    customerSchema,
    offerSchema,
    fileSchema, // Import the file schema
    commentSchema,
} from "./schemas/schemas.js";

import dbConnector from '../database/database.js';

const server = fastify({ logger: true });

server.addSchema(customerSchema);
server.addSchema(offerSchema);
server.addSchema(fileSchema); // Add the file schema
server.addSchema(commentSchema);

server.register(cors, {
    origin: (origin, callback) => {
        const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"]
});

server.register(multipart); // Register the multipart plugin
server.register(dbConnector);

server.register(customerRoutes, { prefix: "/customer" });
server.register(offerRoutes, { prefix: "/offer" });
server.register(commentRoutes, { prefix: "/comment" });
server.register(fileRoutes, { prefix: "/files" }); // Register the file routes
server.register(testRoutes, { prefix: "/test" });

try {
    await server.listen({ port: 8080 });
    console.log("Server is running on port 8080");
} catch (error) {
    console.log(error);
    process.exit(1);
}
