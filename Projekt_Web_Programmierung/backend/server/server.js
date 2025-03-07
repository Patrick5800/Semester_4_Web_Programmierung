import fastify from "fastify"; // Importiert Fastify für API
import cors from "@fastify/cors"; //Importiert CORS für Cross-Origin Resource Sharing mit dem frontend
import multipart from "@fastify/multipart"; // Importiert das Multipart-Plugin für Fastify, um Multipart-Formulardaten für Datei-Uploads zu verarbeiten

import { // Importiere die Routen für Kunden, Angebote, Kommentare, Dateien und Tests
    customerRoutes,
    offerRoutes,
    commentRoutes,
    fileRoutes,
    testRoutes
} from "./routes/routes.js";

import { // Importiere die Schemas für Kunden, Angebote, Dateien und Kommentare
    customerSchema,
    offerSchema,
    fileSchema, 
    commentSchema,
} from "./schemas/schemas.js";

import dbConnector from '../database/database.js'; // Importiere den Datenbank-Connector für die registrierung mit Fastify

const server = fastify({ logger: true }); // Erstelle eine neue Fastify-Instanz

server.addSchema(customerSchema); // Füge die Schemas zur Validierung hinzu
server.addSchema(offerSchema);
server.addSchema(fileSchema);
server.addSchema(commentSchema);

server.register(cors, { // Registriert mit erlaubten Methoden und Ursprüngen für sichere Kommunikation mit dem frontend
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


server.register(multipart); // Registriere das Multipart-Plugin

server.register(dbConnector); //Stellt die Verbindung zur Datenbank herzustellen

server.register(customerRoutes, { prefix: "/customer" }); // Registriere die verschiedenen Routen mit den entsprechenden Präfixen
server.register(offerRoutes, { prefix: "/offer" });
server.register(commentRoutes, { prefix: "/comment" });
server.register(fileRoutes, { prefix: "/files" });
server.register(testRoutes, { prefix: "/test" });


try { // Startet den Server auf Port 8080
    await server.listen({ port: 8080 });
    console.log("Server is running on port 8080");
} catch (error) {
    console.log(error);
    process.exit(1);
}
