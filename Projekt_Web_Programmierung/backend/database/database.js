import fp from "fastify-plugin"; 
import Database from "better-sqlite3";

const filePath = "./database/project.db"; // Pfad zur SQLite-Datenbank

// Erstellt Tabelle für Kunden mit Primärschlüssel customer_id, Name, E-Mail, Telefon, Adresse, Erstellungsdatum und Aktualisierungsdatum. Required sind dabei nur Name und E-Mail
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

// Erstellt Tabelle für Angebote mit Primärschlüssel offer_id, Fremdschlüssel customer_id, Name, Preis, Währung, Status, Erstellungsdatum und Aktualisierungsdatum. Status ist dabei auf Draft, In Progress, Active und On Ice beschränkt und Required sind Name und customer_id
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

// Erstellt Tabelle für Kommentare mit Primärschlüssel comment_id, Fremdschlüssel offer_id, Kommentar-Text, Ersteller, Erstellungsdatum und Aktualisierungsdatum. Required sind dabei offer_id und comment_text
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

// Erstellt Tabelle für Dateien mit Primärschlüssel file_id, Fremdschlüssel offer_id, Dateiname, Dateipfad, Hochladedatum und Tags. Required sind dabei offer_id, file_name und file_path
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

function dbConnector(fastify, options, next) { //Erstellung der einzelnen Tabellen und Verbindung zur Datenbank
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