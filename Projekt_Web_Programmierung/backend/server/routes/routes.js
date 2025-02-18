import
{
    createCustomerOptions,
    createOfferOptions,
    getCustomersOptions,
    getOffersOptions,
}
from "../schemas/schemas.js";
import
{
    getCustomers,
    getOffers,
    createCustomer,
    createOffer,
}
from "../core/core.js";

/*
In customerRoutes sind folgende Routen definiert:
- Get all customers
- Create a customer
*/

export async function customerRoutes(fastify, options)
{
    fastify.get("/", getCustomerOptions, async (request, reply) =>
    {
        const customers = getCustomers(fastify);
        if (!customers)
        {
            reply.code(404);
            return {error: "No customers found"};
        }
        return customers;
    });
    fastify.post("/", createCustomerOptions, async (request, reply) =>
    {
        const customerProperties = request.body;
        const customer = createCustomer(fastify, customerProperties);
        if (!customer)
        {
            reply.code(500);
            return {error: "Could not create customer"};
        }
        reply.code(201);
        return {customer: customer};
    })
}

/*
In offferRoutes sind folgende Routen definiert:
- Get all offers
- Create an offer
*/

export async function offerRoutes(fastify, options)
{
    fastify.get("/", getOffersOptions, async (request, reply) =>
    {
        const offers = getOffers(fastify);
        if (!offers)
        {
            reply.code(404);
            return {error: "No offers found"};
        }
        return offers;
    });

    fastify.post("/", createOfferOptions, async (request, reply) =>
    {
        const offerProperties = request.body;
        const offer = createOffer(fastify, offerProperties);
        if (!offer)
        {
            reply.code(500);
            return {error: "Could not create offer"};
        }
        reply.code(201);
        return {offer: offer};
    });
}

