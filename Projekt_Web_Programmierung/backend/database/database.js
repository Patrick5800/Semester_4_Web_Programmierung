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
const createTableOffers =
`
CREATE TABLE IF NOT EXISTS offers 
(
  offer_id INTEGER PRIMARY KEY AUTOINCREMENT, 
  title TEXT NOT NULL, 
  customer_id INTEGER NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
)
`;

function dbConnector(fastify, options, next)
{
    const db = new Database(filePath);

    db.exec(createTableCustomers);
    db.exec(createTableOffers);
    
    fastify.decorate("db", db);
    fastify.addHook("onClose", (instance, done) =>
    {
        db.close();
        done();
    });

    next();
}

export default fp(dbConnector);