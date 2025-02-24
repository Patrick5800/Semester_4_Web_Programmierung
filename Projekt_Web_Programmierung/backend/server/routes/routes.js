import {
    createCustomerOptions,
    getCustomersOptions,
    getCustomerByIdOptions,
    updateCustomerOptions,
    deleteCustomerOptions,
} from "../schemas/customerSchemas.js";

import {
    createOfferOptions,
    getOffersOptions,
    getOfferByIdOptions,
    updateOfferOptions,
    deleteOfferOptions,
    changeOfferStatusOptions,
} from "../schemas/offerSchemas.js";

import {
    createCommentOptions,
    getCommentsByOfferIdOptions,
    getCommentByIdOptions,
    updateCommentOptions,
    deleteCommentOptions,
} from "../schemas/commentSchemas.js";

import {
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
} from "../core/core.js";


// Import tags, tasks, files

/*
In customerRoutes sind folgende Routen definiert:
- Get all customers
- Create a customer
*/

export async function customerRoutes(fastify, options)
{
    fastify.get("/all", getCustomersOptions, async (request, reply) =>
    {
        const customers = getCustomers(fastify);
        if (!customers)
        {
            reply.code(404);
            return {error: "No customers found"};
        }
        return customers;
    });
    fastify.post("/create", createCustomerOptions, async (request, reply) =>
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
    fastify.get("/:customer_id", getCustomerByIdOptions, async (request, reply) => 
    {
        const customer_id = request.params.customer_id;
        const customer = getCustomerById(fastify, customer_id);
        if (!customer)
        {
            reply.code(404);
            return {error: "Customer not found"};
        }
        return {customer: customer};
    });
    fastify.post("/:customer_id/update", updateCustomerOptions, async (request, reply) =>
    {
        const customer_id = request.params.customer_id;
        const customerProperties = request.body;
        const customer = updateCustomer(fastify, customer_id, customerProperties);
        if (!customer)
        {
            reply.code(500);
            return {error: "Could not update customer"};
        }
        return {customer: customer};
    });
    fastify.delete("/:customer_id/delete", deleteCustomerOptions, async (request, reply) =>
    {
        const customer_id = request.params.customer_id;
        const success = deleteCustomer(fastify, customer_id);
        if (!success)
        {
            reply.code(500);
            return {error: "Could not delete customer"};
        }
        return {message: "Customer deleted"};
    });
}

/*
In offferRoutes sind folgende Routen definiert:
- Get all offers
- Create an offer
*/

export async function offerRoutes(fastify, options)
{
    fastify.get("/all", getOffersOptions, async (request, reply) =>
    {
        const offers = getOffers(fastify);
        if (!offers)
        {
            reply.code(404);
            return {error: "No offers found"};
        }
        return offers;
    });

    fastify.post("/create", createOfferOptions, async (request, reply) =>
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
    fastify.get("/:offer_id/offer", getOfferByIdOptions, async (request, reply) =>
    {
        const offer_id = request.params.offer_id;
        const offer = getOfferById(fastify, offer_id);
        if (!offer)
        {
            reply.code(404);
            return {error: "Offer not found"};
        }
        return {offer: offer};
    });
    fastify.post("/:offer_id/update", updateOfferOptions, async (request, reply) =>
    {
        const offer_id = request.params.offer_id;
        const offerProperties = request.body;
        const offer = updateOffer(fastify, offer_id, offerProperties);
        if (!offer)
        {
            reply.code(500);
            return {error: "Could not update offer"};
        }
        return {offer: offer};
    });
    fastify.delete("/:offer_id/delete", deleteOfferOptions, async (request, reply) =>
    {
        const offer_id = request.params.offer_id;
        const success = deleteOffer(fastify, offer_id);
        if (!success)
        {
            reply.code(500);
            return {error: "Could not delete offer"};
        }
        return {message: "Offer deleted"};
    });
    fastify.patch("/:offer_id/status", changeOfferStatusOptions, async (request, reply) =>
    {
        const offer_id = request.params.offer_id;
        const status = request.body.status;
        const offer = changeOfferStatus(fastify, offer_id, status);
        if (!offer)
        {
            reply.code(500);
            return {error: "Could not change status"};
        }
        return {offer: offer};
    });
}

export async function commentRoutes(fastify, options)
{
    fastify.get("/:offer_id/comment", getCommentsByOfferIdOptions, async (request, reply) =>
    {
        const offer_id = request.params.offer_id;
        const comments = getCommentsByOfferId(fastify, offer_id);
        if (!comments)
        {
            reply.code(404);
            return {error: "No comments found"};
        }
        return comments;
    });
    fastify.post("/create", createCommentOptions, async (request, reply) =>
    {
        const commentProperties = request.body;
        const comment = createComment(fastify, commentProperties);
        if (!comment)
        {
            reply.code(500);
            return {error: "Could not create comment"};
        }
        reply.code(201);
        return {comment: comment};
    });
    fastify.get("/:comment_id", getCommentByIdOptions, async (request, reply) =>
    {
        const comment_id = request.params.comment_id;
        const comment = getCommentById(fastify, comment_id);
        if (!comment)
        {
            reply.code(404);
            return {error: "Comment not found"};
        }
        return {comment: comment};
    });
    fastify.post("/:comment_id/update", updateCommentOptions, async (request, reply) =>
    {
        const comment_id = request.params.comment_id;
        const commentProperties = request.body;
        const comment = updateComment(fastify, comment_id, commentProperties);
        if (!comment)
        {
            reply.code(500);
            return {error: "Could not update comment"};
        }
        return {comment: comment};
    });
    fastify.delete("/:comment_id/delete", deleteCommentOptions, async (request, reply) =>
    {
        const comment_id = request.params.comment_id;
        const success = deleteComment(fastify, comment_id);
        if (!success)
        {
            reply.code(500);
            return {error: "Could not delete comment"};
        }
        return {message: "Comment deleted"};
    });
}

export async function fileRoutes(fastify, options)
{}

export async function tagRoutes(fastify, options)
{}

export async function taskRoutes(fastify, options)
{}