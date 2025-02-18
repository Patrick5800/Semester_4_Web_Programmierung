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

import dbConnector from "./database/database.js";

// Import CORS for frontend development


const server = fastify
(
    {
         logger: true 
    }
);

server.addSchema(customerSchema);
server.addSchema(offerSchema);

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

fastify.register(c)