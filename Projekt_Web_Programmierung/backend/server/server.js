import fastify from "fastify";
import 
{
    customerRoutes,
    offerRoutes,
} 
from "./routes/routes.js";

import 
{
    customerSchema,
    offerSchema,
} 
from "./schemas/schemas.js";

import dbConnector from '../database/database.js';

import cors from "@fastify/cors";

const server = fastify
(
    {
         logger: true 
    }
);

server.addSchema(customerSchema);
server.addSchema(offerSchema);

fastify.register(cors,
{/*
    origin: (origin, callback) => {
        const allowedOrigins = ["http://localhost:3000", "*"];
        if (!origin || allowedOrigins.includes(origin)) 
        {callback(null, true);}
        else 
        {callback(new Error("Not allowed by CORS"));}
    }*/
    origin: "*" // für Testzwecke
});
server.register(dbConnector);
server.register(customerRoutes, {prefix: "/customer"}); //customerRoutes
server.register(offerRoutes, {prefix: "/offer"}); //orderRoutes

try
{
    await server.listen({port: 8080})
    console.log("Server is running on port 8080") // TESTzweck
}
catch (error)
{
    console.log(error)
    process.exit(1)
}
