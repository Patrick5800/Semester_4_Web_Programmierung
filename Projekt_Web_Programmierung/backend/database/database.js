import fp from "fastify-plugin";
import Database from "better-sqlite3";

const filePath = "./database/project.db";

const createTableCustomers = 
`
CREATE TABLE IF NOT EXISTS customers 
(
customer_id INTEGER PRIMARY KEY AUTOINCREMENT, 
name TEXT NOT NULL, 
email TEXT NOT NULL
)
`;

function dbConnector(fastify, options, next)
{
    const db = new Database(filePath);

    db.exec(createTableCustomers);

    fastify.decorate("db", db);
    fastify.addHook("onClose", (instance, done) =>
    {
        db.close();
        done();
    });

    next();
}

export default fp(dbConnector);