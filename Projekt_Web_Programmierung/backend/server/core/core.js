export function getCustomers(fastify)
{
    const statement = fastify.db.prepare("SELECT * FROM customers");

    try
    {
        const customers = statement.all();
        return customers;
    }
    catch (error)
    {
        fastify.log.error(error);
        return null;
    }
}

export function getOffers(fastify)
{
    const statement = fastify.db.prepare("SELECT * FROM offers");

    try
    {
        const offers = statement.all();
        return offers;
    }
    catch (error)
    {
        fastify.log.error(error);
        return null;
    }
}


export function createCustomer(fastify, request)
{
    const insertIntoStatement = fastify.db.prepare("INSERT INTO customers (name, email) VALUES (?, ?)");
    const selectStatement = fastify.db.prepare("SELECT * FROM customers WHERE customer_id = ?");
    
    const customerToCreate =
    {
        name: request.name, //alternativ : request.body.name
        email: request.email,
    };

    try
    {
        const {name, email} = customerToCreate;
        const info = insertIntoStatement.run(name, email);
        const createdCustomer = selectStatement.get(info.lastInsertRowid);
        return createdCustomer;
    }
    catch (error)
    {
        fastify.log.error(error);
        return null;
    }
}

export function createOffer(fastify, request)
{
    const insertIntoStatement = fastify.db.prepare("INSERT INTO offers (customer_id, title) VALUES (?, ?)");
    const selectStatement = fastify.db.prepare("SELECT * FROM offers WHERE offer_id = ?");
    
    const offerToCreate =
    {
        customer_id: request.customer_id,
        title: request.title,
    };

    try
    {
        const {customer_id, title} = offerToCreate;
        const info = insertIntoStatement.run(customer_id, title);
        const createdOffer = selectStatement.get(info.lastInsertRowid);
        return createdOffer;
    }
    catch (error)
    {
        fastify.log.error(error);
        return null;
    }
}