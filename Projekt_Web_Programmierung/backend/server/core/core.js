// CRUD-Funktionen für die Customer-Tabelle
function getCustomers(fastify) {
    const statement = fastify.db.prepare("SELECT * FROM customers");

    try {
        const customers = statement.all();
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

function getOffers(fastify) {
    const statement = fastify.db.prepare("SELECT * FROM offers");

    try {
        const offers = statement.all();
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
    const insertIntoStatement = fastify.db.prepare("INSERT INTO comments (offer_id, comment_text, created_by) VALUES (?, ?, ?)");
    const selectStatement = fastify.db.prepare("SELECT * FROM comments WHERE comment_id = ?");

    const commentToCreate = {
        offer_id: commentProperties.offer_id,
        comment_text: commentProperties.comment_text,
        created_by: commentProperties.created_by,
    };

    try {
        const { offer_id, comment_text, created_by } = commentToCreate;
        const info = insertIntoStatement.run(offer_id, comment_text, created_by);
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

export {
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
    getCommentsByOfferId,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
};