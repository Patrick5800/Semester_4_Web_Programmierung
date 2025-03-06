import fp from "fastify-plugin";
import Database from "better-sqlite3";

const filePath = "./database/project.db";

const createTableCustomers = 
`
CREATE TABLE IF NOT EXISTS customers 
(
  customer_id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name TEXT NOT NULL, 
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NULL
)
`;

const createTableOffers =
`
CREATE TABLE IF NOT EXISTS offers 
(
  offer_id INTEGER PRIMARY KEY AUTOINCREMENT, 
  customer_id INTEGER NOT NULL,
  name TEXT NOT NULL, 
  price REAL,
  currency TEXT,
  status TEXT CHECK(status IN ('Draft', 'In Progress', 'Active', 'On Ice')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
)
`;

const createTableComments =
`
CREATE TABLE IF NOT EXISTS comments
(
  comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  offer_id INTEGER NOT NULL,
  comment_text TEXT NOT NULL,
  created_by TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NULL,
  FOREIGN KEY (offer_id) REFERENCES offers(offer_id)
)
`;

const createTableFiles =
`
CREATE TABLE IF NOT EXISTS files
(
  file_id INTEGER PRIMARY KEY AUTOINCREMENT,
  offer_id INTEGER NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tags JSON,
  FOREIGN KEY (offer_id) REFERENCES offers(offer_id)
)
`;

function dbConnector(fastify, options, next) {
    const db = new Database(filePath);

    db.exec(createTableCustomers);
    db.exec(createTableOffers);
    db.exec(createTableComments);
    db.exec(createTableFiles);

    fastify.decorate("db", db);
    fastify.addHook("onClose", (instance, done) => {
        db.close();
        done();
    });

    next();
}

export default fp(dbConnector);