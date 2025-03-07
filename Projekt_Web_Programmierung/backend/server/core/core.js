// CRUD-Funktionen für die Customer Tabelle

function getCustomers(fastify, filters) {
    let query = "SELECT * FROM customers WHERE 1=1"; 
    const params = [];

    if (filters.name) { // Hinzufügen der Filterbedingungen name und addresse für Kunden
        query += " AND name LIKE ?";
        params.push(`%${filters.name}%`);
    }
    if (filters.address) {
        query += " AND address LIKE ?";
        params.push(`%${filters.address}%`);
    }

    const statement = fastify.db.prepare(query);

    try {
        const customers = statement.all(...params);
        return customers;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function getCustomerById(fastify, customer_id) {
    const statement = fastify.db.prepare("SELECT * FROM customers WHERE customer_id = ?");

    try {
        const customer = statement.get(customer_id);
        return customer;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function createCustomer(fastify, customerProperties) {
    const insertIntoStatement = fastify.db.prepare("INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)");
    const selectStatement = fastify.db.prepare("SELECT * FROM customers WHERE customer_id = ?");

    const customerToCreate = {
        name: customerProperties.name,
        email: customerProperties.email,
        phone: customerProperties.phone,
        address: customerProperties.address,
    };

    try {
        const { name, email, phone, address } = customerToCreate;
        const info = insertIntoStatement.run(name, email, phone, address);
        const createdCustomer = selectStatement.get(info.lastInsertRowid);
        return createdCustomer;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function updateCustomer(fastify, customer_id, customerProperties) {
    const updateStatement = fastify.db.prepare("UPDATE customers SET name = ?, email = ?, phone = ?, address = ?, updated_at = CURRENT_TIMESTAMP WHERE customer_id = ?");
    const selectStatement = fastify.db.prepare("SELECT * FROM customers WHERE customer_id = ?");

    const customerToUpdate = {
        name: customerProperties.name,
        email: customerProperties.email,
        phone: customerProperties.phone,
        address: customerProperties.address,
    };

    try {
        const { name, email, phone, address } = customerToUpdate;
        updateStatement.run(name, email, phone, address, customer_id);
        const updatedCustomer = selectStatement.get(customer_id);
        return updatedCustomer;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function deleteCustomer(fastify, customer_id) {
    const deleteStatement = fastify.db.prepare("DELETE FROM customers WHERE customer_id = ?");

    try {
        deleteStatement.run(customer_id);
        return true;
    } catch (error) {
        fastify.log.error(error);
        return false;
    }
}

// CRUD-Funktionen für die Offer-Tabelle
//Legacy-Daten-Import-Funktion


function getOffers(fastify, filters) {
    let query = "SELECT * FROM offers WHERE 1=1";
    const params = [];

    if (filters.customer_id) {
        query += " AND customer_id = ?"; //Hinzufügen der Filterbedingungen customer_id, name und status für Angebote
        params.push(filters.customer_id);
    }
    if (filters.name) {
        query += " AND name LIKE ?";
        params.push(`%${filters.name}%`);
    }
    if (filters.status) {
        query += " AND status = ?";
        params.push(filters.status);
    }

    const statement = fastify.db.prepare(query);

    try {
        const offers = statement.all(...params);
        return offers;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function getOfferById(fastify, offer_id) {
    const statement = fastify.db.prepare("SELECT * FROM offers WHERE offer_id = ?");

    try {
        const offer = statement.get(offer_id);
        return offer;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function createOffer(fastify, offerProperties) {
    const insertIntoStatement = fastify.db.prepare("INSERT INTO offers (customer_id, name, price, currency, status) VALUES (?, ?, ?, ?, ?)");
    const selectStatement = fastify.db.prepare("SELECT * FROM offers WHERE offer_id = ?");

    const offerToCreate = {
        customer_id: offerProperties.customer_id,
        name: offerProperties.name,
        price: offerProperties.price,
        currency: offerProperties.currency,
        status: "Draft",
    };

    try {
        const { customer_id, name, price, currency, status } = offerToCreate;
        const info = insertIntoStatement.run(customer_id, name, price, currency, status);
        const createdOffer = selectStatement.get(info.lastInsertRowid);
        return createdOffer;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function createLegacyOffer(fastify, legacyData) {
    const insertIntoStatement = fastify.db.prepare("INSERT INTO offers (customer_id, name, price, currency, status, created_at) VALUES (?, ?, ?, ?, ?, ?)"); 
    const selectStatement = fastify.db.prepare("SELECT * FROM offers WHERE offer_id = ?");
    const offerProperties = transformLegacyData(legacyData); // Transformiere die Legacy-Daten in das neue Format

    const offerToCreate = {
        customer_id: offerProperties.customer_id, //Mappen der Legacy-Daten auf die neuen Spalten
        name: offerProperties.name,
        price: offerProperties.price,
        currency: offerProperties.currency,
        status: offerProperties.status,
        created_at: offerProperties.created_at
    };

    try {
        const { customer_id, name, price, currency, status, created_at } = offerToCreate;
        const info = insertIntoStatement.run(customer_id, name, price, currency, status, created_at); //Ausführen des INSERT-Statements
        const createdOffer = selectStatement.get(info.lastInsertRowid);
        return createdOffer;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function updateOffer(fastify, offer_id, offerProperties) {
    const updateStatement = fastify.db.prepare("UPDATE offers SET customer_id = ?, name = ?, price = ?, currency = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE offer_id = ?");
    const selectStatement = fastify.db.prepare("SELECT * FROM offers WHERE offer_id = ?");

    const offerToUpdate = {
        customer_id: offerProperties.customer_id,
        name: offerProperties.name,
        price: offerProperties.price,
        currency: offerProperties.currency,
        status: offerProperties.status,
    };

    try {
        const { customer_id, name, price, currency, status } = offerToUpdate;
        updateStatement.run(customer_id, name, price, currency, status, offer_id);
        const updatedOffer = selectStatement.get(offer_id);
        return updatedOffer;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function deleteOffer(fastify, offer_id) {
    const deleteStatement = fastify.db.prepare("DELETE FROM offers WHERE offer_id = ?");

    try {
        deleteStatement.run(offer_id);
        return true;
    } catch (error) {
        fastify.log.error(error);
        return false;
    }
}

function changeOfferStatus(fastify, offer_id, status) {
    const updateStatement = fastify.db.prepare("UPDATE offers SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE offer_id = ?");
    const selectStatement = fastify.db.prepare("SELECT * FROM offers WHERE offer_id = ?");

    try {
        updateStatement.run(status, offer_id);
        const updatedOffer = selectStatement.get(offer_id);
        return updatedOffer;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function transformLegacyData(legacyData) { //Funktion um die Legacy-Daten in das neue Format zu transformieren
    const stateMapping = { //Mapping der Legacy-Statuswerte mit Schreibfehlern wie in dem Beispiel JSON auf die neuen Statuswerte
        "Draft": "Draft",
        "Entwurf": "Draft",
        "Draf": "Draft",
        "Drafft": "Draft",

        "In Progress": "In Progress",
        "In-Progress": "In Progress",
        "In Bearbeitung": "In Progress",
        "InProgress": "In Progress",
        "InProgressing": "In Progress",

        "Active": "Active",
        "Aktiv": "Active",
        "Actif": "Active",
        "Actve": "Active",

        "On Ice": "On Ice",
        "On-Ice": "On Ice",
        "Auf Eis": "On Ice",
        "OnIce": "On Ice",
        "On-Ic": "On Ice",
    };

    let state = legacyData.xOffer.state;
    if (stateMapping[state]) {
        state = stateMapping[state];
    } else {
        state = "Draft"; //Setzt den Status auf "Draft", wenn der Status nicht erkannt wird
    }

    return {
        customer_id: legacyData.xOffer.customerId,
        name: legacyData.xOffer.name,
        price: legacyData.xOffer.price,
        currency: legacyData.xOffer.currency,
        status: state,
        created_at: legacyData.xCreatedOn,
    };
}

function getCommentsByOfferId(fastify, offer_id) {
    const statement = fastify.db.prepare("SELECT * FROM comments WHERE offer_id = ?");

    try {
        const comments = statement.all(offer_id);
        return comments;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function getCommentById(fastify, comment_id) {
    const statement = fastify.db.prepare("SELECT * FROM comments WHERE comment_id = ?");

    try {
        const comment = statement.get(comment_id);
        return comment;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function createComment(fastify, commentProperties) {
    const insertIntoStatement = fastify.db.prepare("INSERT INTO comments (offer_id, comment_text) VALUES (?, ?)");
    const selectStatement = fastify.db.prepare("SELECT * FROM comments WHERE comment_id = ?");

    const commentToCreate = {
        offer_id: commentProperties.offer_id,
        comment_text: commentProperties.comment_text,
    };

    try {
        const { offer_id, comment_text } = commentToCreate;
        const info = insertIntoStatement.run(offer_id, comment_text);
        const createdComment = selectStatement.get(info.lastInsertRowid);
        return createdComment;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function updateComment(fastify, comment_id, commentProperties) {
    const updateStatement = fastify.db.prepare("UPDATE comments SET comment_text = ?, updated_at = CURRENT_TIMESTAMP WHERE comment_id = ?");
    const selectStatement = fastify.db.prepare("SELECT * FROM comments WHERE comment_id = ?");

    const commentToUpdate = {
        comment_text: commentProperties.comment_text,
    };

    try {
        const { comment_text } = commentToUpdate;
        updateStatement.run(comment_text, comment_id);
        const updatedComment = selectStatement.get(comment_id);
        return updatedComment;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function deleteComment(fastify, comment_id) {
    const deleteStatement = fastify.db.prepare("DELETE FROM comments WHERE comment_id = ?");

    try {
        deleteStatement.run(comment_id);
        return true;
    } catch (error) {
        fastify.log.error(error);
        return false;
    }
}

// CRUD-Funktionen für die Files-Tabelle (create, read, delete)

function createFile(fastify, fileProperties) {
    const insertIntoStatement = fastify.db.prepare("INSERT INTO files (offer_id, file_name, file_path) VALUES (?, ?, ?)");
    const selectStatement = fastify.db.prepare("SELECT * FROM files WHERE file_id = ?");

    const fileToCreate = {
        offer_id: parseInt(fileProperties.offer_id, 10), // Sichergehen, dass offer_id ein Integer ist
        file_name: fileProperties.file_name,
        file_path: fileProperties.file_path,
    };

    try {
        const { offer_id, file_name, file_path } = fileToCreate;
        const info = insertIntoStatement.run(offer_id, file_name, file_path);
        const createdFile = selectStatement.get(info.lastInsertRowid);
        return createdFile;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function getFilesByOfferId(fastify, offer_id) {
    const statement = fastify.db.prepare("SELECT * FROM files WHERE offer_id = ?");

    try {
        const files = statement.all(parseInt(offer_id, 10));
        return files;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function getFileById(fastify, file_id) {
    const statement = fastify.db.prepare("SELECT * FROM files WHERE file_id = ?");

    try {
        const file = statement.get(parseInt(file_id, 10));
        return file;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function deleteFile(fastify, file_id) {
    const deleteStatement = fastify.db.prepare("DELETE FROM files WHERE file_id = ?");

    try {
        deleteStatement.run(file_id);
        return true;
    } catch (error) {
        fastify.log.error(error);
        return false;
    }
}

// Testfunktionen für das Leichte hinzufügen von Testdaten (createTestCustomer, createTestOffer)

function createTestCustomer(fastify, customerProperties) { 
    const insertIntoStatement = fastify.db.prepare("INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)");
    const selectStatement = fastify.db.prepare("SELECT * FROM customers WHERE customer_id = ?");

    const customerToCreate = {
        name: customerProperties.name,
        email: customerProperties.email,
        phone: customerProperties.phone,
        address: customerProperties.address,
    };

    try {
        const { name, email, phone, address } = customerToCreate;
        const info = insertIntoStatement.run(name, email, phone, address);
        const createdCustomer = selectStatement.get(info.lastInsertRowid);
        return createdCustomer;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

function createTestOffer(fastify, offerProperties) {
    const insertIntoStatement = fastify.db.prepare("INSERT INTO offers (customer_id, name, price, currency, status) VALUES (?, ?, ?, ?, ?)");
    const selectStatement = fastify.db.prepare("SELECT * FROM offers WHERE offer_id = ?");

    const offerToCreate = {
        customer_id: offerProperties.customer_id,
        name: offerProperties.name,
        price: offerProperties.price,
        currency: offerProperties.currency,
        status: offerProperties.status,
    };

    try {
        const { customer_id, name, price, currency, status } = offerToCreate;
        const info = insertIntoStatement.run(customer_id, name, price, currency, status);
        const createdOffer = selectStatement.get(info.lastInsertRowid);
        return createdOffer;
    } catch (error) {
        fastify.log.error(error);
        return null;
    }
}

export { //export für die Weiterverwendung
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getOffers,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer,
    changeOfferStatus,
    transformLegacyData,
    createLegacyOffer,
    getCommentsByOfferId,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    createTestCustomer,
    createTestOffer,
    createFile,
    getFilesByOfferId,
    getFileById,
    deleteFile,
};